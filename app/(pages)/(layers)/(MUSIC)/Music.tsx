import { FlatList, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { Card } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

type data = {
  id: string,
  name: string,
  link: any;
}

const Data: data[] = [
  {
    id: "1",
    name: "Study Music",
    link:"https://www.youtube.com/watch?v=sjkrrmBnpGE",
  },
  {
    id: "2",
    name: "Isha Playlist",
    link: "https://www.youtube.com/watch?v=5O-NomO_4_8"
  },
  {
    id: "3",
    name: "Meditate alone",
    link:"https://www.youtube.com/watch?v=YB-nFu50R1M"
  },
  {
    id: "4",
    name: "Memory Reboot",
    link: "https://youtu.be/q5P4ZOEs8so"
  },
  {
    id: "5",
    name: "English Breakdown",
    link: "https://www.youtube.com/watch?v=ujAXBVfAlUY&list=PL8TV4m3E3io5A2TqCj2k1970YTBRuyWvT"
  },
]
type ItemProps = {
  item: data,
  onPress: () => void,
  backgroundColor: string,
  textColor: string,
}
const Item = ({ item }: ItemProps) => (
    <SafeAreaView style={{marginBottom: 30}}>
      <Pressable>
        <Link href={item.link}>
          <Card style={{backgroundColor: "rgb(236, 254, 255)",width: "100%", height: 100, borderRadius: 20}}>
            <Card.Content style={{alignItems: "center", top: "3%", justifyContent: "center"}}>
              <Text style={{fontSize: 20,color: "black", fontWeight: 900, paddingTop: 15}}>{item.name}</Text>
            </Card.Content> 
          </Card> 
        </Link>
      </Pressable>
    </SafeAreaView>
)
const Music = () => {
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
          keyExtractor={item => item.id}
          style={{paddingTop: 20}}
          renderItem={({ item }) => 
            <Item 
              item={item}
              onPress={() => {}} 
              backgroundColor="rgb(227, 212, 42)" 
              textColor="black"
            />
          }
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
})