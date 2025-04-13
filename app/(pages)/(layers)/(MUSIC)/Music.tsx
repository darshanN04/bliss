import { FlatList, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link } from 'expo-router'
import { Card } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { supabase } from '@/lib/supabase';

type Songs = {
  id: string,
  name: string,
  link: any;
}

const Music = () => {
  const [Data, setData] = useState<Songs[]>([]);
  useEffect(() => {
        const fetchMusic = async () => {
          const { data, error } = await supabase.rpc('get_music'); // Replace with your function name
    
          if (error) {
            console.error('Error fetching songs:', error.message);
          } else {
            // console.log('Fetched Asanas:', data); // ✅ Console confirmation
            setData(data);
          }
        };
    
        fetchMusic();
      }, []);
  return (
    <LinearGradient
      colors={['rgb(168, 213, 186)', 'rgb(255, 216, 182)']} //light green and light orange
      style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Music</Text>
        </View>
        <FlatList
          data={Data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (

            <Pressable style={styles.card}>
              <Link href={item.link}>
              <Text style={styles.name}>{item.name}</Text>
              </Link>
            </Pressable>
          )}
        />  
        </SafeAreaView>
    </LinearGradient>
  )
}

export default Music
const styles = StyleSheet.create({
  container:{
    flex: 1,
    padding: 20,
    // backgroundColor: "rgb(24, 163, 29)",
  
  },
  header: {
    // marginTop: "5%",
    // marginBottom: "20%",
    padding: 20

  },
  headerText:{
    alignSelf: "center",
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
  },
  card: {
    backgroundColor:'white',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 15,
    marginTop: 10,
    marginBottom: 10,
    marginRight: 40,
    marginLeft: 40,
  },
  name: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
})