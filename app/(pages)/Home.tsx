import { ActivityIndicator, StyleSheet, Text, View, Image, FlatList, Pressable } from 'react-native'
import React, { useState } from 'react'
import { Link, Redirect } from 'expo-router'
import { useAuth } from '@/providers/auth-provider';
import { SafeAreaView } from 'react-native-safe-area-context';


type ItemData = {
  id: string,
  name: string,
  src: any,
  link: any;
};

const Data: ItemData[] = [
  {
    id: "1",
    name: "Yoga",
    src: require("../../assets/images/yoga.jpg"),
    link: "/(layers)/Yoga"
  },
  {
    id: "2",
    name: "Meditation",
    src: require("../../assets/images/meditate.jpg"),
    link: "/(layers)/Meditation"
  },
  {
    id: "3",
    name: "music",
    src: require("../../assets/images/music.jpg"),
    link: "/(layers)/Music"
  },
  {
    id: "4",
    name: "wordplay",
    src: require("../../assets/images/wordplay.jpg"),
    link: "/(layers)/Wordplay"
  },
  {
    id: "5",
    name: "quotes",
    src: require("../../assets/images/quotes.jpg"),
    link: "/(layers)/Quotes"
  },
  {
    id: "6",
    name:"rate",
    src: require("../../assets/images/rate.jpg"),
    link: "/(layers)/Rate"
  }
];

type ItemProps ={
  item: ItemData,
  onPress: () => void,
  backgroundColor: string,
  textColor: string,
}

const Item = ({ item }: ItemProps) => (
  <View style={styles.card}>
    <Link href={item.link} asChild>
      <Pressable>
        <Image source={item.src} style={styles.image} />
        <Text style={styles.cardtext}>{item.name}</Text>
      </Pressable>
    </Link>
  </View>
);


//REAL FUNCTION STARTS HERE

const Home = () => {

  // const {session, mounting } = useAuth();
  // if(mounting) return <ActivityIndicator size="large" color="#0000ff" />
  // if(!session) return <Redirect href="/Auth" />
  const [selectedId, setSelectedId] = useState<string>();

  const renderItem = ({item}: {item: ItemData}) => {
    const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
    const color = item.id === selectedId ? 'white' : 'black';

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };
  
  return (
    <View style={{flex: 1, backgroundColor: "rgb(113, 146, 16)"}}>
      <SafeAreaView>
        <Text>Home</Text>
        <Text style={styles.title}>Welcome User</Text>
        <FlatList
        data={Data}
        renderItem={renderItem} 
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        />        
      </SafeAreaView>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  button: {
    marginTop: 15,
    paddingVertical: 15,
    color: 'black',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    
  },
  row: {
    flex: 1,
    justifyContent: "space-between",
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    
    gap: 20
    
  },
  card: {
    flex: 1,
    backgroundColor: "rgb(194, 193, 193)",
    margin: 5,
    padding: 0,
    borderRadius: 10,
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 10,
    elevation: 10,

  },
  
  cardtext: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: "bold",
    flex: 1,
    flexWrap: "wrap",
    textAlign: "center",
    backgroundColor: "rgba(214, 35, 35, 0)",
  },
  title:{
    marginBottom: 100,
  }
})