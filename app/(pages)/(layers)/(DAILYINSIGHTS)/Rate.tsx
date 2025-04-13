// Rate.tsx
import React, { useState } from 'react'
import {
  StyleSheet, Text, View, TextInput, TouchableOpacity, Platform, Modal, Pressable,
} from 'react-native'
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import { useRouter } from 'expo-router'
import { useLocalSearchParams } from 'expo-router'
import { Feather } from '@expo/vector-icons'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/providers/auth-provider'


const emojis: string[] = ['😄', '😊', '😐', '😔', '😢', '😠']

type DiaryEntry = {
  id: any;
  date: string
  title: string
  content: string
  mood: any
}

const Rate: React.FC = () => {
  const navigation = useNavigation()
  const params = useLocalSearchParams()
  const [selectedMood, setSelectedMood] = useState<string>((params.mood as string) || '😐')
  const [title, setTitle] = useState<string>((params.title as string) || '')
  const [content, setContent] = useState<string>((params.content as string) || '')
  const [date, setDate] = useState<Date>(params.date ? new Date(params.date as string) : new Date())
  const [showPicker, setShowPicker] = useState<boolean>(false)
  const [emojiModalVisible, setEmojiModalVisible] = useState<boolean>(false)
  const isEditing = !!params.title // or any field
  const { session } = useAuth()

  const router = useRouter()

  const formattedDate = date.toDateString()

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (Platform.OS === 'android') setShowPicker(false)
    if (selectedDate) setDate(selectedDate)
  }

  const handleMoodSelect = (emoji: string) => {
    setSelectedMood(emoji)
    setEmojiModalVisible(false)
  }

  const saveEntry = async () => {
    const userId = session?.user?.id;
    if (!userId) {
      console.error('User not authenticated.');
      return;
    }

    const { error } = await supabase.rpc('insert_diary_entry_and_daily_insight', {
      entry_date: formattedDate,
      entry_emotion: selectedMood,
      entry_title: title,
      entry_text: content,
      entry_user_id: userId,
    });

    if (error) {
      console.error('Error saving diary entry:', error.message);
      // Optionally display an error message to the user
    } else {
      router.push('..'); // Navigate back on success
    }
  };


  const deleteEntry = async () => {
    const {data, error} = await supabase.rpc('delete_diary_entry_and_insight');
  }
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => setShowPicker(true)} style={styles.dateButton}>
          <Text style={styles.dateText}>{formattedDate}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{marginBottom: 30, marginLeft: 30}} onPress={()=> deleteEntry()}>
          <Feather name="trash-2" size={22} color="rgba(0, 0, 0, 0.47)" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setEmojiModalVisible(true)}>
          <Text style={styles.bigEmoji}>{selectedMood}</Text>
        </TouchableOpacity>
      </View>

      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="calendar"
          onChange={onChange}
        />
      )}

      <Modal
        visible={emojiModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setEmojiModalVisible(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setEmojiModalVisible(false)}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Choose your mood</Text>
            <View style={styles.modalEmojiRow}>
              {emojis.map((emoji) => (
                <TouchableOpacity key={emoji} onPress={() => handleMoodSelect(emoji)}>
                  <Text style={styles.modalEmoji}>{emoji}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </Pressable>
      </Modal>

      <TextInput
        style={styles.titleInput}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        placeholderTextColor="#999"
      />

      <TextInput
        style={styles.contentInput}
        placeholder="Write your diary entry..."
        value={content}
        onChangeText={setContent}
        multiline
        textAlignVertical="top"
        placeholderTextColor="#999"
      />

      <TouchableOpacity style={styles.saveButton} onPress={saveEntry}>
        <Text style={styles.saveButtonText}>Save Entry</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Rate

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e5f0ff',
    padding: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateButton: {
    padding: 10,
    backgroundColor: '#d0e4ff',
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  dateText: {
    fontSize: 16,
    color: '#333',
  },
  bigEmoji: {
    fontSize: 50,
  },
  titleInput: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#bbb',
    paddingVertical: 8,
  },
  contentInput: {
    flex: 1,
    marginTop: 20,
    backgroundColor: '#fff',
    padding: 16,
    fontSize: 16,
    color: '#333',
    borderRadius: 12,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  saveButton: {
    backgroundColor: '#4c8dff',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: '500',
    color: '#333',
  },
  modalEmojiRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  modalEmoji: {
    fontSize: 30,
    margin: 10,
  },
})
