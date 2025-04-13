// DiaryList.tsx
import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { useRouter } from 'expo-router'


type DiaryEntry = {
  date: string
  title: string
  content: string
  mood: string
}

const DiaryList: React.FC = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([])
  const navigation = useNavigation()
  const isFocused = useIsFocused() // Ensures refresh when coming back
  const router = useRouter()

  useEffect(() => {
    const loadEntries = async () => {
      const data = await AsyncStorage.getItem('diaryEntries')
      if (data) {
        setEntries(JSON.parse(data))
      }
    }

    if (isFocused) {
      loadEntries()
    }
  }, [isFocused])

  return (
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
        keyExtractor={(item, index) => `${item.date}-${index}`}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => router.push({
                pathname: '/Rate',
                params: {
                date: item.date,
                title: item.title,
                content: item.content,
                mood: item.mood,
                },
            })}>
            <Text style={styles.date}>{item.date}</Text>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.mood}>{item.mood}</Text>
            <Text numberOfLines={2} style={styles.content}>{item.content}</Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity onPress={async () => {
        await AsyncStorage.removeItem('diaryEntries')
        setEntries([])
        }
        }>
        <Text style={{ color: 'blue', textAlign: 'center', marginTop: 20 }}>Delete All Entries</Text>
      </TouchableOpacity>
    </View>
  )
}

export default DiaryList

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f6ff',
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
    fontSize: 22,
    marginBottom: 4,
  },
  content: {
    fontSize: 14,
    color: '#444',
  },
})
