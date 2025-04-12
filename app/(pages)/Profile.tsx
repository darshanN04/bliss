import { StyleSheet, Text, Touchable, TouchableOpacity, View, Dimensions, Pressable, ActivityIndicator } from 'react-native'
import React from 'react'
import { supabase } from '@/lib/supabase'
import { Link, Redirect, useRouter } from 'expo-router'
import { useAuth } from '@/providers/auth-provider';
import { useToast } from 'react-native-toast-notifications';
import { LinearGradient } from 'expo-linear-gradient';


const { width, height } = Dimensions.get('window');

const Profile = () => {
  const toast = useToast();
  const router = useRouter();
  const handlePasswordChange = async () => {
      router.push("/Passchange")
  }

  
  const handleTestSignOut = () => {
      // Direct navigation and sign out
      toast.show('Signing out...', { type: 'info' });
      
      setTimeout(async () => {
        await supabase.auth.signOut();
        router.replace('/Auth');
      }, 500);
    };

  const {session, mounting } = useAuth();
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
                    // style={[styles.button, {marginTop: 20, backgroundColor: '#f44336'}]} 
                    onPress={handleTestSignOut}
                  >
                <Text style={[styles.btntext]}>Sign Out Directly</Text>
            </TouchableOpacity>
          </View>
          
          <View >
            <TouchableOpacity
              style={[styles.button, {marginTop: 20, backgroundColor: '#f44336'}]} >
              <Text style={styles.btntext}>Delete Account</Text>
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