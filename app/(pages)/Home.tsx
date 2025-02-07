import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link, Redirect } from 'expo-router'
import { useAuth } from '@/providers/auth-provider';

const Home = () => {

  const {session, mounting } = useAuth();
  if(mounting) return <ActivityIndicator size="large" color="#0000ff" />
  console.log("HSession:", session);
  if(!session) return <Redirect href="/Auth" />
   
  return (
    <View>
      <Text>Home</Text>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  button: {
    marginTop: 15,
    paddingVertical: 15,
    color: 'black',
  },
})