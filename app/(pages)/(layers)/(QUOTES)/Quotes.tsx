import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { supabase } from '@/lib/supabase';

// Define the type for quotes data
type QuotesData = {
  id: string,
  text: string;
};

const Quotes = () => {
  const [Data, setData] = useState<QuotesData[]>([]);

  useEffect(() => {
    const fetchQuotes = async () => {
      const { data, error } = await supabase.rpc('get_quotes'); // Replace with your function name

      if (error) {
        console.error('Error fetching quotes:', error.message);
      } else {
        setData(data);
      }
    }
  
    fetchQuotes();
  }, [])
  

  return (
    <LinearGradient
      colors={['rgb(168, 213, 186)', 'rgb(255, 216, 182)']} //light green and light orange
      style={{ flex: 1 }}>
      <View style={styles.container}>

        <View style={styles.header}>
          <Text style={styles.headerText}>Quotes</Text>
        </View>


        <View>
          <FlatList
            data={Data}
            horizontal
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={[styles.card]}> 
                <Text style={[styles.text, { color: "black" }]}>{item.text}</Text>
              </View>
            )}  
            showsHorizontalScrollIndicator={false}
          />
        </View>


      </View>
    </LinearGradient>
  );
};

export default Quotes;

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
  headerText:{
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
  },
  card:{
    padding: 20,
    margin: 10,
    marginTop: 200,
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
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
  }
});