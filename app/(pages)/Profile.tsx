import { StyleSheet, Text, Touchable, TouchableOpacity, View, Dimensions, Pressable, ActivityIndicator } from 'react-native'
import React from 'react'
import { supabase } from '@/lib/supabase'
import { Link, Redirect, useRouter } from 'expo-router'
import { useAuth } from '@/providers/auth-provider';


const { width, height } = Dimensions.get('window');

const Profile = () => {

  const router = useRouter();
  const handlePasswordChange = async () => {
    router.push('/Passchange')
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
  }   

  const {session, mounting } = useAuth();
  if(mounting) return <ActivityIndicator size="large" color="#0000ff" />
  if(!session) return <Redirect href="/Auth" />
  
  return (
    <View style={{flex:1, padding: 10, alignItems: "center", backgroundColor: "rgba(24, 163, 29, 0.9)"}}>

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
          <TouchableOpacity onPress={handleSignOut}>
            <Text style={[styles.btntext, {paddingRight: 10}]}>Sign Out</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.buttons}>
          <TouchableOpacity>
            <Text style={styles.btntext}>Delete Account</Text>
          </TouchableOpacity>
        </View>
      </View>


    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  buttons: {
    marginTop: 20,
    marginBottom: 20,
    padding: 20,
    backgroundColor: "rgb(7, 148, 155)",
    width: width*0.7,
    borderRadius: 20,
    alignItems: "center"
  },
  btntext:{
    color: "black",
    fontWeight: "bold",
    position: "relative",
    width: width*0.4,
    alignContent: "center",
    textAlign: "center",
    height: 20
  }
})