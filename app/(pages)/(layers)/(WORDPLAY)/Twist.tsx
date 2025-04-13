import { FlatList, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { supabase } from '@/lib/supabase';

type Twisters = {
  id: any;
  text: string;
};

const Twist = () => {
  const [index, setIndex] = useState(0);
  const [Data, setData] = useState<Twisters[]>([]);
  
  useEffect(() => {
    const fetchTwisters = async () => {
      const { data, error } = await supabase.rpc('get_twisters'); // Replace with your function name

      if (error) {
        console.error('Error fetching quotes:', error.message);
      } else {
        setData(data);
      }
    }
  
    fetchTwisters();
  }, [])

  return (
    <LinearGradient
      colors={['rgb(168, 213, 186)', 'rgb(255, 216, 182)']} //light green and light orange
      style={{ flex: 1 }}>
      <View style={styles.container}>      
        <View style={styles.header}>
          <Text style={{position: "fixed", top: -180, fontSize: 30, fontWeight: "900", color: "white"}}>Twist it up</Text>
        </View>
        {Data.length > 0 ? (
          <View style={styles.cardContainer}>
            <View style={styles.card}>
              <Text style={styles.text}>{Data[index].text}</Text>
            </View>
          </View>
        ) : (
          <Text style={styles.text}>Loading...</Text>
        )}

        {/* Navigation */}
        <View style={styles.navContainer}>
          <TouchableOpacity
            disabled={index === 0}
            onPress={() => setIndex((prev) => prev - 1)}
          >
            <AntDesign name="leftsquareo" size={40} color={index === 0 ? 'gray' : 'black'} />
          </TouchableOpacity>

          <TouchableOpacity
            disabled={index === Data.length - 1}
            onPress={() => setIndex((prev) => prev + 1)}
          >
            <AntDesign name="rightsquareo" size={40} color={index === Data.length - 1 ? 'gray' : 'black'} />
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  )
}

export default Twist

const styles = StyleSheet.create({
  container:{
    flex: 1,
    padding: 20,
    // backgroundColor: "rgb(24, 163, 29)",
    justifyContent: "center",
    alignItems: "center",
    
  },
  header: {
    marginTop: "20%",
  },
  
  cardContainer: {
    width: 300,
    height: 200,
    marginBottom: 10,
  },
  card:{
    padding: 10,
    borderRadius: 10,
    width: 300,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.37)",
    borderColor: "white",
    borderWidth: 2,
  
  },
  text:{
    fontSize: 15,
    textAlign: "center",
    fontWeight: "bold",
  },
  navContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 150,
    marginTop: 20,
  },
})