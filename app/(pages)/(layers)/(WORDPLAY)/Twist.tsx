import { FlatList, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { AntDesign } from '@expo/vector-icons';

const twisters =[
  {text: "Peter Piper picked a peck of pickled peppers.\nA peck of pickled peppers Peter Piper picked.\nIf Peter Piper picked a peck of pickled peppers,\nWhere’s the peck of pickled peppers Peter Piper picked?"},
  {text: "How much wood would a woodchuck chuck\nIf a woodchuck could chuck wood?\nHe would chuck as much wood\nAs a woodchuck would\nIf a woodchuck could chuck wood."},
  {text: "I scream, you scream, we all scream for ice cream."},
  {text: "She sells seashells by the seashore."},
  {text: "Fuzzy Wuzzy was a bear.\nFuzzy Wuzzy had no hair.\nFuzzy Wuzzy wasn’t very fuzzy, was he?"},
  {text: "How can a clam cram in a clean cream can?"},
  {text: "I saw Susie sitting in a shoe shine shop.\nWhere she sits she shines, and where she shines she sits."},  
]

const Twist = () => {
  const [index, setIndex] = useState(0);
  return (
    <View style={styles.container}>
    
          <View style={styles.header}>
            <Text style={{position: "fixed", top: -180, fontSize: 30, fontWeight: "900", color: "white"}}>Twist it up</Text>
          </View>
    
    
          <View style={styles.cardContainer}>
            <View style={styles.card}>
              <Text>{twisters[index].text}</Text>
            </View>
          </View>

        <View style={styles.navContainer}>
            <TouchableOpacity
              disabled={index === 0}
              onPress={()=> setIndex((prev) => prev - 1)}
            >
              <AntDesign name="leftsquareo" size={40} color={index === 0 ? "gray" : "black"} />
            </TouchableOpacity>

            <TouchableOpacity
              disabled={index === twisters.length - 1}
              onPress={() => {
                setIndex((prev) => prev + 1);
              }}
            >
              <AntDesign name="rightsquareo" size={40} color={index === twisters.length - 1 ? "gray" : "black"} />
            </TouchableOpacity>
          </View>
    
        </View>
  )
}

export default Twist

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
    fontSize: 20,
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