import { Pressable, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';


const clues =[
  {question: "What comes once in a minute, twice in a moment, but never in a thousand years?", answer: "The letter 'm'"},
  {question: "What has keys but can't open locks?", answer: "A piano"},
  {question: "What has a head, a tail, is brown, and has no legs?", answer: "A penny"},
  {question: "What has a neck but no head?", answer: "A bottle"},
  {question: "What has a thumb and four fingers but is not alive?", answer: "A glove"},
  {question: "What has a heart that doesn't beat?", answer: "An artichoke"},
  {question: "What has a bark but no bite?", answer: "A tree"},
  {question: "What has a foot but no legs?", answer: "A ruler"},
  {question: "What has a bed but never sleeps?", answer: "A river"},
]

const Crack = () => {

  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const rotate=useSharedValue(0);

  const flipCard = () => {
    rotate.value = withTiming(flipped ? 0 : 180, {duration: 200});
    setFlipped(!flipped);
  }
  const frontStyle = useAnimatedStyle(() => ({transform: [{rotateY: `${rotate.value}deg`}]}));
  const backStyle = useAnimatedStyle(() => ({transform: [{rotateY: `${rotate.value + 180}deg`}]}));

  return (
    <LinearGradient
      colors={['rgb(168, 213, 186)', 'rgb(255, 216, 182)']} //light green and light orange
      style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={{position: "fixed", top: -150, fontSize: 30, fontWeight: "900",color:'white'}}>Crack The Clue</Text>

        <View style={styles.cardContainer}>
          {!flipped && (
            <Pressable onPress={flipCard}>
              <Animated.View style={[styles.card, frontStyle]}>
                  <Text>{clues[index].question}</Text>
              </Animated.View>
            </Pressable>
          )}
          {flipped && (
            <Pressable onPress={flipCard}>
              <Animated.View style={[styles.card, backStyle]}>
                <Text style={styles.text}>{clues[index].answer}</Text>
              </Animated.View>
            </Pressable>
          )}
        </View>

        <View style={styles.navContainer}>
          <TouchableOpacity
            disabled={index === 0}
            onPress={() => {
              setFlipped(false);
              setIndex((prev) => prev - 1);
              rotate.value = withTiming(0, {duration: 0}); 
            }}
          >
            <AntDesign name="arrowleft" size={40} color={index === 0 ? "gray" : "black"} />
          </TouchableOpacity>

          <TouchableOpacity
            disabled={index === clues.length - 1}
            onPress={() => {
              setFlipped(false);
              setIndex((prev) => prev + 1);
              rotate.value = withTiming(0, {duration: 0});
            }}
          >
            <AntDesign name="arrowright" size={40} color={index === clues.length - 1 ? "gray" : "black"} />
          </TouchableOpacity>
        </View>

      </View>
    </LinearGradient>
  )
}

export default Crack

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#f4f4f4",
  },
  cardContainer: {
    width: 300,
    height: 200,
    marginBottom: 20,
  },
  card: {
    width: "100%",
    height: "100%",
    // backgroundColor: "white",
    backgroundColor: "rgba(255, 255, 255, 0.37)",
    borderColor: "white",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    // elevation: 5,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  navContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 150,
    marginTop: 20,
  },
})