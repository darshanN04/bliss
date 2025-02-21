import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from "react-native";
import { Audio } from "expo-av";


const Stopwatch: React.FC = () => {
  const [running, setRunning] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);
  const [sound, setSound] = useState<Audio.Sound | null>(null);


  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
      playSound();

    } else {
      clearInterval(interval);
      stopSound();

    }
    return () => clearInterval(interval);
  }, [running]);

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require("@/assets/songs/meditation/song.mp3")
    );
    setSound(sound);
    await sound.playAsync();
  }

  async function stopSound() {
    if (sound) {
      await sound.stopAsync();
      setSound(null);
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground 
        source={require('@/assets/images/meditation/pagebackground.jpg')} 
        style={styles.backgroundImage}
      >
        <View style={styles.container}>
          <Text style={styles.timer}>{new Date(time * 1000).toISOString().substr(11, 8)}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setRunning(!running)}
          >
            <Text style={styles.buttonText}>{running ? "Stop" : "Start"}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => { setTime(0); setRunning(false); }}
          >
            <Text style={styles.buttonText}>Reset</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  timer: {
    fontSize: 50,
    fontWeight: "bold",
    marginBottom: 20,
    color: "white",
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    margin: 10,
    borderRadius: 5,
    width: '60%'
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    alignSelf: 'center',
  },
});

export default Stopwatch;
