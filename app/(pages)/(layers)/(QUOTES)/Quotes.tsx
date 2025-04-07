import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import React from 'react';

// Define the type for quotes data
type QuotesData = {
  id: string,
  text: string;
};

// Sample Data
const Data: QuotesData[] = [
  {
    id: '1',
    text:"\"The only limit to our realization of tomorrow is our doubts of today.\"",
  },
  {
    id: '2',
    text:  "\"Do what you can, with what you have, where you are.\"",
  },
  {
    id: '3',
    text:"\"Success is not final, failure is not fatal: it is the courage to continue that counts.\"",
  },
  {
    id: '4',
    text:  "\"Believe you can and you're halfway there.\"",
  },
  {
    id: '5',
    text:  "\"You\'r Awesome.\"",
  },
];

// Define Props for QuotesCard Component
type QuotesProps = {
  item: QuotesData;
  onPress: () => void;
  backgroundColor: string;
  textColor: string;
};

const QuotesCard = ({ item, backgroundColor, textColor } : QuotesProps) => {
  return (
    <View style={[styles.card]}> 
      <Text style={[styles.text, { color: textColor }]}>{item.text}</Text>
    </View>
  );
};

const Quotes = () => {
  return (
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
            <QuotesCard 
              item={item} 
              onPress={() => console.log(item.id)} 
              backgroundColor="#f9c2ff"
              textColor="rgb(3, 3, 3)"
            />
          )}
          showsHorizontalScrollIndicator={false}
        />
      </View>


    </View>
  );
};

export default Quotes;

const styles = StyleSheet.create({
  container:{
    flex: 1,
    padding: 20,
    backgroundColor: "rgb(24, 163, 29)",
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