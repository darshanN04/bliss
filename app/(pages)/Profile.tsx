import { StyleSheet, Text, TouchableOpacity, View, Dimensions, ActivityIndicator, Alert } from 'react-native'
import React from 'react'
import { supabase } from '@/lib/supabase'
import { Redirect, useRouter } from 'expo-router'
import { useAuth } from '@/providers/auth-provider';
import { useToast } from 'react-native-toast-notifications';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const Profile = () => {
  const toast = useToast();
  const router = useRouter();
  const { session, mounting } = useAuth();

  const handlePasswordChange = async () => {
    router.push("/Passchange")
  }

  const handleTestSignOut = () => {
    // Direct navigation and sign out
    toast.show('Signed Out', { type: 'success' });
    
    setTimeout(async () => {
      await supabase.auth.signOut();
      router.replace('/Auth');
    }, 500);
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            toast.show('Deleting account...', { type: 'danger' });
            
            setTimeout(async () => {
              try {
                // Call the Supabase RPC function to delete the user account
                const { data, error } = await supabase.rpc('delete_user_account');
                
                if (error) throw error;
                
                if (data) {
                  // Successful deletion
                  toast.show('Account deleted successfully', { type: 'success' });
                  // Sign out and redirect to Auth page
                  await supabase.auth.signOut();
                  router.replace('/Auth');
                } else {
                  throw new Error('Failed to delete account');
                }
              } catch (error) {
                console.error('Error deleting account:', error);
                toast.show('Failed to delete account. Please try again.', { type: 'error' });
              }
            }, 500);
          }
        }
      ]
    );
  };
  
  if(mounting) return <ActivityIndicator size="large" color="#0000ff" />
  if(!session) return <Redirect href="/Auth" />
  
  return (
    <LinearGradient
      colors={['rgb(168, 213, 186)', 'rgb(255, 216, 182)']} //light green and light orange
      style={{ flex: 1 }}>
      <View style={{flex:1, padding: 10, alignItems: "center"}}>

        <View style={{paddingBottom: 100, paddingTop: 80}}>
          <Text style={{fontSize: 30, fontWeight: 900, color: "white"}}>Profile</Text>
        </View>

        <View>
          <View style={styles.buttons}>
            <TouchableOpacity onPress={handlePasswordChange}>
              <Text style={styles.btntext}>Password Change</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttons}>
            <TouchableOpacity 
                    onPress={handleTestSignOut}
                  >
                <Text style={[styles.btntext]}>Sign Out Directly</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.buttons}>
            <TouchableOpacity onPress={handleDeleteAccount}>
              <Text style={[styles.btntext, {color: '#f44336'}]}>Delete Account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </LinearGradient>
  )
}

export default Profile

const styles = StyleSheet.create({
  buttons: {
    marginTop: 20,
    marginBottom: 20,
    padding: 15,
    backgroundColor: "rgba(255, 255, 255, 0.37)",
    borderColor: "white",
    borderWidth: 1,
    width: width*0.7,
    borderRadius: 8,
    alignItems: "center"
  },
  btntext:{
    color: "black",
    fontWeight: "bold",
    position: "relative",
    width: width*0.4,
    alignContent: "center",
    textAlign: "center",
    height: 20,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
})