import { StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { supabase } from '@/lib/supabase'
import { Link } from 'expo-router'

const Profile = () => {

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    
  }   


  return (
    <View>
      <Text>Profile</Text>

      <View>
        <Link href="../Auth">
          <TouchableOpacity onPress={handleSignOut}>
            <Text>Sign Out</Text>
          </TouchableOpacity>
        </Link>
        
      </View>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({})