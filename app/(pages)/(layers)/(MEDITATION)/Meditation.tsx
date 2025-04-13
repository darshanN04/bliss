import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Pressable, Image } from "react-native";
import { Audio } from "expo-av";
import { Asset } from 'expo-asset';

const Stopwatch: React.FC = () => {
  const [running, setRunning] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [musicPlaying, setMusicPlaying] = useState<boolean>(false);
  const [selectedSong, setSelectedSong] = useState<number>(0);
  const songFiles = [
    require("@/assets/songs/meditation/flute.mp3"),
    require("@/assets/songs/meditation/zither.mp3"),
    require("@/assets/songs/meditation/song.mp3"),
  ];
  const songNames = ["Flute", "Zither", "Serenity"];
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);
  useEffect(() => {
    return () => {
      if (sound) {
        sound.stopAsync();
        sound.unloadAsync();
      }
    };
  }, [sound]);

  const playSound = async () => {
    console.log("Playing music...");

    const audioAsset = Asset.fromModule(songFiles[selectedSong]);
    await audioAsset.downloadAsync();
    console.log("Asset URI: ", audioAsset.uri);
    console.log("Asset local URI: ", audioAsset.localUri);

    try{
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: audioAsset.uri },
        { shouldPlay: true, isLooping: true },
      );
      setSound(newSound);
      await newSound.playAsync();
      console.log("Sound is playing...");
    }
    catch (error) {
      console.log("Error playing sound:", error);
    }
  };

  const stopSound = async () => {
    console.log("Stopping music...");
    
    if (sound) {
      try {
        await sound.stopAsync();
        await sound.unloadAsync();
        setSound(null);
      } catch (error) {
        console.log("Error stopping sound:", error);
      }
    }
  };

  const toggleMusic = async () => {
    console.log("Toggle pressed. Current state:", musicPlaying);
    setMusicPlaying((prevState) => {
      const newState = !prevState;
      if (newState) {
        playSound();
      } else {
        stopSound();
      }
      return newState;
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground 
        source={require('@/assets/images/meditation/pagebackground.jpg')} 
        style={styles.backgroundImage}
        >
        <View style={styles.container}>
          <Text style={styles.timer}>
            {new Date(time * 1000).toISOString().substr(11, 8)}
          </Text>
          <Pressable onPress={toggleMusic} style={styles.musicButton}>
            <Image
              source={
                musicPlaying
                  ? require("@/assets/icons/music_on.png")
                  : require("@/assets/icons/music_off.png")
              }
              style={styles.musicIcon}
            />
          </Pressable>
          <TouchableOpacity
            style={styles.button}
            onPress={async () => {
              if (running) {
                setRunning(false);
                if (musicPlaying) {
                  await stopSound();
                  setMusicPlaying(false);
                }
              } else {
                setRunning(true);
                if (!musicPlaying) {
                  await playSound();
                  setMusicPlaying(true);
                }
              }
            }}
          >
            <Text style={styles.buttonText}>{running ? "Stop" : "Start"}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => { setTime(0); setRunning(false); }}
          >
            <Text style={styles.buttonText}>Reset</Text>
          </TouchableOpacity>
          <View style={styles.songSelector}>
            {[0, 1, 2].map((index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.songButton,
                  selectedSong === index && styles.songButtonSelected,
                ]}
                onPress={() => {
                  if (musicPlaying) {
                    stopSound(); // stop current before switching
                    setMusicPlaying(false);
                  }
                  setSelectedSong(index);
                }}
              >
                <Text style={styles.songButtonText}>{songNames[index]}</Text>
              </TouchableOpacity>
            ))}
          </View>
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
    marginBottom: 200,
    color: "white",
  },
  button: {
    backgroundColor: "rgba(30, 50, 123, 0.72)",
    padding: 15,
    margin: 10,
    paddingTop: 10,
    borderRadius: 5,
    width: '60%'
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    alignSelf: 'center',
  },
  musicButton: {
    position: "absolute",
    bottom: 140,
    right: 30,
  },
  musicIcon: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  songSelector: {
    flexDirection: "row",
    marginTop: 30,
    marginBottom: 30,
    justifyContent: "center",
  },
  songButton: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  songButtonSelected: {
    backgroundColor: "rgba(255,255,255,0.7)",
  },
  songButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default Stopwatch;
