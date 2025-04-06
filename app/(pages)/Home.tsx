import { StyleSheet, Text, View, Image, FlatList, Pressable, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, Redirect } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from "react-native-paper";
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '@/providers/auth-provider';
import { supabase } from '@/lib/supabase'


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
    name: "Music",
    src: require("../../assets/images/music.jpg"),
    link: "/(layers)/Music"
  },
  {
    id: "4",
    name: "Wordplay",
    src: require("../../assets/images/wordplay.jpg"),
    link: "/(layers)/Wordplay"
  },
  {
    id: "5",
    name: "Quotes",
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

type ItemProps = {
  item: ItemData,
  onPress: () => void,
  backgroundColor: string,
  textColor: string,
}

const Item = ({ item }: ItemProps) => (
  <View style={{width: 130, height: 150, borderRadius: 12, overflow: "hidden", elevation: 0, backgroundColor: "rgb(227, 212, 42)"}}>
    <Link href={item.link} asChild>
        <Pressable>
          <Card style={{backgroundColor: "rgb(236, 254, 255)",}}>
            <Card.Cover source={item.src} style={{height: 120, backgroundColor: "rgba(201, 9, 9, 0)", borderRadius: 0}}/>
            <Card.Content style={{alignItems: "center", top: "3%"}}>
              <Text style={{fontSize: 15, fontWeight: 900}}>{item.name}</Text>
            </Card.Content> 
          </Card>         
        </Pressable>
    </Link>
  </View>
);

const Home = () => {

  const {session, mounting } = useAuth();
  // {console.log(session)}
  if(mounting) return <ActivityIndicator size="large" color="#0000ff" />
  if(!session) return <Redirect href="/Auth" />
  const [username, setUsername] = useState<string | null>(null);
  useEffect(() => {
    if (session?.user) {
      fetchUserName(session.user.id);
    }
  }, [session]);

  const fetchUserName = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('users') 
        .select('full_name') 
        .eq('id', userId)
        .single(); 

      if (error) throw error;
      setUsername(data?.full_name || 'User');
    } catch (error) {
      console.error('Error fetching username:', error);
      setUsername('User'); // Default fallback name
    }
  };

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
    <LinearGradient
      // colors={['#90D5FF', '#FFFFFF']} //light blue and light orange
      // colors={['#90D5FF', '#A8D5BA']} //light blue and light green
      // colors={['#90D5FF', '#FFF0A6']} //light blue and light yellow 
      // colors={['#90D5FF', '#FFD8B6']} //light blue and light orange
      // colors={['#A8D5BA', '#61A7A1']} //light green and dark green
      colors={['#A8D5BA', '#FFD8B6']} //light green and light orange
      // locations={[0.2, 1.5]}
      style={{ flex: 1 }}
    >
      <SafeAreaView>

        <View style={{position: 'fixed', top: 0, left: "75%", padding: 10, marginTop: 10}}>
          <Link href="/Profile">
            <Image source={require("@/assets/icons/logo.png")} style={{ width: 50, height: 50 }} />
          </Link>
        </View>

        <View style={{top: "0%", height: "10%"}}>
            <Text style={{alignSelf: 'center', fontSize: 20}}>Welcome {username}</Text>    
        </View>     

        <FlatList
          data={Data}
          renderItem={renderItem} 
          keyExtractor={item => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
        />        
      </SafeAreaView>
    </LinearGradient>
  )
}

export default Home;

const styles = StyleSheet.create({
  row: {
    flex: 1,
    justifyContent: "space-between",
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    gap: 20
  },
  title: {
    marginTop: 70,
    marginBottom: 70,
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  }
});