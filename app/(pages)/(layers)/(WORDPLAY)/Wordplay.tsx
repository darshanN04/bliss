import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Pressable } from 'react-native';
import { Link } from 'expo-router';
import { Card } from 'react-native-paper';
import { FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

type ItemData = {
  id: string,
  name: string,
  link: any;
}

const Data: ItemData[] = [
  {
    id: "1",
    name: "Groan Zone",
    link: "/GroanZone"
  },
  {
    id: "2",
    name: "Crack the Clue",
    link: "/Crack"
  },
  {
    id: "3",
    name: "Twist it Up",
    link: "/Twist"
  },
  {
    id: "4",
    name: "Brain Teaser",
    link: "/Brain"
  }
  // {
  //   id: "4",
  //   name: "Emoji Phrase Craze",
  //   link: "/Emoji"
  // }
];

type ItemProps = {
  item: ItemData,
  onPress: () => void,
  backgroundColor: string,
  textColor: string,
}

const Item = ({ item }: ItemProps) => (
  <View >
    <Link href={item.link} asChild>
      <Pressable>
        <Card style={[styles.wordplayContainer, {backgroundColor: "rgb(236, 254, 255)",}]}>
          <Card.Content style={{alignItems: "center", top: "3%"}}>
            <Text style={{fontSize: 20, fontWeight: 900, textAlign: "center"}}>{item.name}</Text>
          </Card.Content> 
        </Card>         
      </Pressable>
    </Link>
  </View>
);

const Wordplay = () => {
  return (
    <LinearGradient
          colors={['rgb(168, 213, 186)', 'rgb(255, 216, 182)']} //light green and light orange
          style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>WordPlay</Text>
        </View>

        <View>
          <FlatList
            data={Data}
            keyExtractor={(item) => item.id}
            numColumns={2}
            renderItem={({ item }) => (
              <Item
                item={item}
                onPress={() => console.log(item.id)}
                backgroundColor="#f9c2ff"
                textColor="rgb(3, 3, 3)"
              />
            )}
            />
        </View>
      </View>
    </LinearGradient>
  )
}

export default Wordplay

const styles = StyleSheet.create({
  container:{
    flex: 1,
    padding: 20,
    // backgroundColor: "rgb(24, 163, 29)",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    marginTop: "60%",
    marginBottom: "20%",
    padding: 20

  },
  headerText:{
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    // textShadowColor: 'black',
    // textShadowOffset: { width: 0, height: 0 },
    // textShadowRadius: 5
  },
  wordplayContainer: {
    width: 150, 
    height: 150, 
    borderRadius: 12, 
    justifyContent: "center",
    margin: 5,
    marginTop: 20,
  }
})