import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Auth from "./Auth"
import { Link, SplashScreen } from 'expo-router';
import { useFonts } from 'expo-font';


const index = () => {
  
  SplashScreen.preventAutoHideAsync();
  
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  if (showIntro) {
    return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity onPress={() => setShowIntro(false)}>
        <Text style={{ fontSize: 24 }}>➡️ Tap to Enter</Text>
      </TouchableOpacity>
    </View>    )
  }
  else{
  return (
    <Auth />
  )
}
}

export default index

const styles = StyleSheet.create({
  button: {
    marginTop: 15,
    paddingVertical: 15,
    color: 'black',
  },
})