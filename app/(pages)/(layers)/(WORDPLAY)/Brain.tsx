import { Pressable, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';
import { supabase } from '@/lib/supabase';

type Joke = {
  id: any;
  question: string;
  punchline: string;
};

const Brain = () => {
  const [Data, setData] = useState<Joke[]>([]);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const rotate=useSharedValue(0);

  useEffect(() => {
  const fetchJoke = async () => {
    const { data, error } = await supabase.rpc('get_groan_zone');

    if (error) {
      console.error('Error fetching joke:', error.message);
    } else {
      setData(data);
    }
  }

  fetchJoke();
}, [])

  const flipCard = () => {
    rotate.value = withTiming(flipped ? 0 : 180, {duration: 300});
    setFlipped(!flipped);
  }
  const frontStyle = useAnimatedStyle(() => ({
    transform: [{rotateY: `${rotate.value}deg`}],
  }));
  const backStyle = useAnimatedStyle(() => ({
    transform: [{rotateY: `${rotate.value + 180}deg`}],
  }));


  return (
    <LinearGradient
      colors={['rgb(168, 213, 186)', 'rgb(255, 216, 182)']} //light green and light orange
      style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={{position: "fixed", top: -150, fontSize: 30, fontWeight: "900",color:'white'}}>Brain Teaser</Text>

        {Data.length > 0 ? (
        <View style={styles.cardContainer}>
          {!flipped ? (
            <Pressable onPress={flipCard}>
              <Animated.View style={[styles.card, frontStyle]}>
                <Text>{Data[index].question}</Text>
              </Animated.View>
            </Pressable>
          ) : (
            <Pressable onPress={flipCard}>
              <Animated.View style={[styles.card, backStyle]}>
                <Text style={styles.text}>{Data[index].punchline}</Text>
              </Animated.View>
            </Pressable>
          )}
        </View>
      ) : (
        <Text style={styles.text}>Loading...</Text>
      )}

      <View style={styles.navContainer}>
        <TouchableOpacity
          disabled={index === 0}
          onPress={() => {
            setFlipped(false);
            setIndex((prev) => prev - 1);
            rotate.value = withTiming(0, { duration: 0 });
          }}
        >
          <AntDesign name="arrowleft" size={40} color={index === 0 ? "gray" : "black"} />
        </TouchableOpacity>

        <TouchableOpacity
          disabled={index === Data.length - 1}
          onPress={() => {
            setFlipped(false);
            setIndex((prev) => prev + 1);
            rotate.value = withTiming(0, { duration: 0 });
          }}
        >
          <AntDesign name="arrowright" size={40} color={index === Data.length - 1 ? "gray" : "black"} />
        </TouchableOpacity>
      </View>

      </View>
    </LinearGradient>
  )
}

export default Brain

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