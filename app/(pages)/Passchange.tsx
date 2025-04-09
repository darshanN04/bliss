import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { useToast } from 'react-native-toast-notifications';
import { supabase } from '@/lib/supabase';

const Passchange = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1 - current password, 2 - OTP, 3 - verify OTP
  const toast = useToast();

  // Debugging: log the current step
  console.log('Current Step:', step);

  // Step 1: Handle Current Password Submission 
  const handleCurrentPasswordSubmit = async () => {
    if (!currentPassword.trim()) {
      toast.show('Please enter your current password', { type: 'danger' });
      return;
    }

    setLoading(true);

    try {
      // Get the current session's user
      const { data, error } = await supabase.auth.getUser();

      if (error || !data.user) {
        toast.show('No user found, please sign in again.', { type: 'danger' });
        setLoading(false);
        return;
      }

      // Check if the current password is correct
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: data.user.email ?? '',
        password: currentPassword,
      });

      if (signInError) {
        toast.show('Current password is incorrect', { type: 'danger' });
        setLoading(false);
        return;
      }

      // If password is correct -> Step 1 complete: Password is correct, proceed to OTP
      toast.show('Password verified. Sending OTP...', { type: 'success' });
      console.log('Step 1 complete: Moving to Step 2 (OTP)');
      setStep(2);  // Move to OTP step

      // Step 2: Send OTP to the user's email for verification
      const { error: otpError } = await supabase.auth.signInWithOtp({
        email: data.user.email ?? '',
        options: {
          shouldCreateUser: false, // Ensure no new user is created if the email doesn't exist
        },
      });

      if (otpError) {
        toast.show('Failed to send OTP. Please try again later.', { type: 'danger' });
        setLoading(false);
        return;
      }

      // Move to Step 3: Ask for OTP verification
      console.log('OTP sent: Moving to Step 3 (OTP Verification)');
      setStep(3);  // Transition to OTP input step (step 3)

      toast.show('OTP sent to your email. Please check your inbox.', { type: 'success' });
    } catch (error) {
      toast.show('An unexpected error occurred. Please try again later.', { type: 'danger' });
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Handle OTP Verification
  const handleOtpSubmit = async () => {
    if (!otp.trim()) {
      toast.show('Please enter the OTP', { type: 'danger' });
      return;
    }

    setLoading(true);

    try {
      // Get the current session's user
      const { data, error } = await supabase.auth.getUser();

      if (error || !data.user) {
        toast.show('No user found, please sign in again.', { type: 'danger' });
        setLoading(false);
        return;
      }

      // Verify OTP
      const { data: session, error: otpVerifyError } = await supabase.auth.verifyOtp({
        email: data.user.email ?? '',
        token: otp,
        type: 'email', // Make sure type is 'email'
      });

      if (otpVerifyError) {
        toast.show('OTP verification failed. Please try again.', { type: 'danger' });
        setLoading(false);
        return;
      }

      toast.show('OTP verified successfully! You can now reset your password.', { type: 'success' });
      // Proceed with password reset or further steps

    } catch (error) {
      toast.show('An unexpected error occurred. Please try again later.', { type: 'danger' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {step === 1 && (
        <>
          <Text style={styles.title}>Enter Current Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Current Password"
            secureTextEntry
            value={currentPassword}
            onChangeText={setCurrentPassword}
          />
          <TouchableOpacity 
            style={styles.button} 
            onPress={handleCurrentPasswordSubmit} 
            disabled={loading}>
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Submit</Text>}
          </TouchableOpacity>
        </>
      )}

      {step === 2 && (
        <>
          <Text style={styles.title}>OTP Sent!</Text>
          <Text style={styles.message}>Check your email inbox for the OTP.</Text>
        </>
      )}

      {step === 3 && (
        <>
          <Text style={styles.title}>Enter OTP</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter OTP"
            value={otp}
            onChangeText={setOtp}
          />
          <TouchableOpacity 
            style={styles.button} 
            onPress={handleOtpSubmit} 
            disabled={loading}>
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Verify OTP</Text>}
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  message: {
    fontSize: 16,
    color: '#333',
    marginTop: 20,
  },
});

export default Passchange;
