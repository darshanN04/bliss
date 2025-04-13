import { StyleSheet, Text, TouchableOpacity, View, Dimensions, TextInput, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Redirect, useRouter } from 'expo-router'
import { useAuth } from '@/providers/auth-provider';
import { useToast } from 'react-native-toast-notifications';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const Passchange = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  const toast = useToast();
  const router = useRouter();
  const { session, mounting } = useAuth();

  const handlePasswordChange = async () => {
    if (newPassword.length < 6) {
      toast.show('Password must be at least 6 characters', { type: 'error' });
      return;
    }
  
    if (newPassword !== confirmPassword) {
      toast.show('Passwords do not match', { type: 'error' });
      return;
    }
  
    
    toast.show('Password changed successfully', { type: 'success' });
    router.push('/Auth');
    
    
      const { data, error } = await supabase.auth.updateUser({
        password: newPassword,
      });
      console.log('Password changed successfully:', data);
      
      if (error) {
        throw error;
      }
     
    
  };
  

  if (mounting) return <ActivityIndicator size="large" color="#0000ff" />;
  if (!session) return <Redirect href="/Auth" />;
  
  return (
    <LinearGradient
      colors={['rgb(168, 213, 186)', 'rgb(255, 216, 182)']}
      style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 20, alignItems: "center" }}>
        <View style={{ paddingBottom: 50, paddingTop: 80 }}>
          <Text style={{ fontSize: 30, fontWeight: '900', color: "white" }}>Change Password</Text>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="New Password"
            placeholderTextColor="#666"
            secureTextEntry
            value={newPassword}
            onChangeText={setNewPassword}
          />
          
          <TextInput
            style={styles.input}
            placeholder="Confirm New Password"
            placeholderTextColor="#666"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          <TouchableOpacity 
            style={styles.button} 
            onPress={handlePasswordChange}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Change Password</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.button, { backgroundColor: '#ccc' }]} 
            onPress={() => router.back()}
            disabled={loading}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  )
}

export default Passchange

const styles = StyleSheet.create({
  inputContainer: {
    width: width * 0.8,
    alignItems: 'center',
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    width: '100%',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  }
})