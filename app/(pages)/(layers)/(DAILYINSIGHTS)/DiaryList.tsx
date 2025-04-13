import React, { useEffect, useState } from 'react'
import {  View,  Text,  FlatList,  TouchableOpacity,  StyleSheet,  Image, ImageBackground } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { useRouter } from 'expo-router'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/providers/auth-provider';
import { Int32 } from 'react-native/Libraries/Types/CodegenTypes'
import { LinearGradient } from 'expo-linear-gradient'

type Emoji = {
  id: Int32;
  src: any;
};

const emojis: Emoji[] = [
  { id: 0, src: require('@/assets/icons/ryd.png') },
  { id: 1, src: require('@/assets/icons/Angry.png') },
  { id: 2, src: require('@/assets/icons/Anxious.png') },
  { id: 3, src: require('@/assets/icons/Blush.png') },
  { id: 4, src: require('@/assets/icons/Bored.png') },
  { id: 5, src: require('@/assets/icons/Cry.png') },
  { id: 6, src: require('@/assets/icons/Happy.png') },
  { id: 7, src: require('@/assets/icons/Loved.png') },
  { id: 8, src: require('@/assets/icons/Sad.png') },
  { id: 9, src: require('@/assets/icons/Neutral.png') },
];


type DiaryEntry = {
  diary_entry_id: any;
  entry_date: string;
  title: string;
  emotion: string;
  entry: string;
}

const DiaryList: React.FC = () => {
  const navigation = useNavigation()
  const isFocused = useIsFocused() 
  const router = useRouter()
  const [entries, setEntries] = useState<DiaryEntry[]>([])
  const {session, mounting } = useAuth();
  

  useEffect(() => {
      const fetchEntries = async () => {
        if (!session?.user?.id) return;
        const { data, error } = await supabase.rpc('get_user_diary_entries', {
          user_uuid: session.user.id,
        });
        if (error) {
          console.error('Error fetching quotes:', error.message);
        } else {
          setEntries(data);
        }
      };
      if(isFocused) {
        fetchEntries();
      }
      if(isFocused){
        fetchEntries();
      }
    }, [isFocused, session?.user.id]);
 return (
  <LinearGradient
            colors={['rgb(168, 213, 186)', 'rgb(255, 216, 182)']} //light green and light orange
            style={{ flex: 1 }}>
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.header}>📓 My Diary</Text>
        <TouchableOpacity
          style={styles.newEntryButton}
          onPress={() => router.push('/Rate')}
        >
          <Text style={styles.newEntryText}>+ New Entry</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={[...entries].reverse()}
        keyExtractor={(item, index) => `${item.entry_date}-${index}`}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => router.push({
                pathname: '/Rate',
                params: {
                id: item.diary_entry_id,
                date: item.entry_date,
                title: item.title,
                content: item.entry,
                mood: item.emotion,
                },
            })}>
             
            <Text style={styles.date}>{item.entry_date}</Text>
            
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <Text style={styles.title}>{item.title}</Text>
            <Image source={emojis[parseInt(item.emotion)].src} style={{ height: 30, width: 30}} />
            </View>
            <Text numberOfLines={2} style={styles.content}>{item.entry}</Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity onPress={async () => {
        await AsyncStorage.removeItem('diaryEntries')
        setEntries([])
        }
        }>
        <Text style={{ color: 'blue', textAlign: 'center', marginTop: 20 }}>Delete selected Entries</Text>
      </TouchableOpacity>
    </View>
    </LinearGradient>
  )
}

export default DiaryList

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.28)',
    padding: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: '700',
  },
  newEntryButton: {
    backgroundColor: '#4c8dff',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  newEntryText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    elevation: 2,
  },
  date: {
    fontSize: 14,
    // color: '#888',
    color: "red",
    fontWeight: '600',
    marginBottom: 4,  
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 4,
  },
  mood: {
    fontSize: 10,
    marginBottom: 4,
  },
  content: {
    fontSize: 14,
    color: '#444',
  },
})
