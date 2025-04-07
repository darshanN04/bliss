import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import { useToast } from 'react-native-toast-notifications';
import { supabase } from '@/lib/supabase';
import { router } from 'expo-router';

const Passchange = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      toast.show('Passwords do not match', { type: 'danger' });
      return;
    }

    if (!newPassword.trim() || !currentPassword.trim()) {
      toast.show('Please fill in all password fields', { type: 'danger' });
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
      const { error: passwordError } = await supabase.auth.signInWithPassword({
        email: data.user.email ?? '',
        password: currentPassword,
      });

      if (passwordError) {
        toast.show('Current password is incorrect', { type: 'danger' });
        setLoading(false);
        return;
      }

      // Update password
      const { error: updateError } = await supabase.auth.updateUser({ 
        password: newPassword 
      });

      if (updateError) {
        toast.show(updateError.message, { type: 'danger' });
        setLoading(false);
        return;
      }
      
      toast.show('Password updated successfully! Signing out...', { type: 'success' });
      
      // Complete sign out process with explicit navigation
      setTimeout(async () => {
        try {
          // Sign out with Supabase
          await supabase.auth.signOut();
          
          // Hard navigation to Auth screen
          router.replace('/Auth');
        } catch (e) {
          // If signout fails, still try to navigate
          router.replace('/Auth');
        }
      }, 1500);
      
    } catch (error) {
      toast.show('An unexpected error occurred. Please try again later.', { type: 'danger' });
    } finally {
      setLoading(false);
    }
  };

  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Change Password</Text>

      <TextInput
        style={styles.input}
        placeholder="Current Password"
        secureTextEntry
        value={currentPassword}
        onChangeText={setCurrentPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="New Password"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handlePasswordChange} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Update Password</Text>}
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()} disabled={loading}>
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </TouchableOpacity>
      
      
    </View>
  );
};

export default Passchange;

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
  cancelButton: {
    padding: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  cancelButtonText: {
    color: '#333',
    fontSize: 16,
  },
});