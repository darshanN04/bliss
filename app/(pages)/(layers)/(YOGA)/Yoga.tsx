import { Link } from "expo-router";
import React, { useState } from "react";
import { View, StyleSheet, Text, ImageBackground, Pressable, FlatList } from "react-native";


type pageData={
  id: string,
  name: string,
  src: any,
  link: any;
}
const Data: pageData[] = [
  {
    id: "1",
    name: "Beginner",
    src: "none",
    link: "/(layers)/(YOGA)/Beginner"
  },
  {
    id: "2",
    name: "Intermediate",
    src: "none",
    link: "/(layers)/(YOGA)/Intermediate"
  },
  {
    id: "3",
    name: "Advanced",
    src: "none",
    link: "/(layers)/(YOGA)/Advanced"
  }
];

type pageProps={
  item: pageData,
  onPress: () => void,
  backgroundColor: string,
  textColor: string,
}

const Page = ({item }: pageProps) => {
  return (
    <Pressable style={{alignItems: "center", marginBottom: "5%"}}>
      <Link href={item.link}>
        <View style={styles.box}>
          <Text style={styles.boxtext}>{item.name}</Text>
        </View>
      </Link>
    </Pressable>
  )
}

const Yoga = () => {
  const[selectedId, setSelectedId] = useState<string>();

  const renderItem=({item}:{item: pageData})=>{
    const backgroundColor = item.id === selectedId ? "rgba(204, 38, 46, 0.8)" : "rgba(228, 233, 204, 0.8)";
    const color = item.id === selectedId ? "rgb(201, 12, 12)" : "rgb(0, 0, 0)";
    return (
      <Page
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };
  return (
    <ImageBackground source={require("@/assets/images/Yoga/pagebackground.jpg")} style={styles.container}>
      
      <FlatList
              style={{width: "100%", top: "35%", }}
              data={Data}
              renderItem={renderItem} 
              keyExtractor={item => item.id}
              numColumns={1}
              />  
      
    </ImageBackground>
  )
}

export default Yoga

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
  box:{
    height: 140,
    width: "100%",
    backgroundColor: "rgba(228, 233, 204, 0.8)", 
    justifyContent: "center", 
    alignItems: "center",
    borderRadius: 7,
    margin: 10,
  },
   boxtext:{
    fontSize: 20,
    fontWeight: "bold",
    color: "rgb(0, 0, 0)"
   }
  
});