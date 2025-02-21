import { StyleSheet, Text, View, Image, FlatList, Pressable } from 'react-native'
import React, { useState } from 'react'
import { Link } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card  } from "react-native-paper";


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
    src: require("@/assets/images/yoga.jpg"),
    link: "/(layers)/(YOGA)/Yoga"
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
    <View style={{width: 130, height: 150, borderRadius: 12, overflow: "hidden", elevation: 0, backgroundColor: "rgb(227, 212, 42)"}}>
      <Link href={item.link} asChild>
          <Pressable>
            <Card style={{backgroundColor: "rgb(131, 152, 177)",}}>
              <Card.Cover source={item.src} style={{height: 120, backgroundColor: "rgba(201, 9, 9, 0)", borderRadius: 0}}/>
              <Card.Content style={{alignItems: "center", top: "3%"}}>
                <Text style={{fontSize: 15, fontWeight: 900}}>{item.name}</Text>
              </Card.Content> 
            </Card>         
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
    <View style={{flex: 1, backgroundColor: "#2a9d8f"}}>
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
    row: {
    flex: 1,
    justifyContent: "space-between",
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    gap: 20
    
  },
  title:{
    marginBottom: 100,
  }
})