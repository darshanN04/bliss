import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
  Modal,
  Pressable,
  Image,
  Alert,
} from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/providers/auth-provider';

type Emoji = {
  id: string;
  src: any;
};

const emojis: Emoji[] = [
  { id: '0', src: require('@/assets/icons/ryd.png') },
  { id: '1', src: require('@/assets/icons/Angry.png') },
  { id: '2', src: require('@/assets/icons/Anxious.png') },
  { id: '3', src: require('@/assets/icons/Blush.png') },
  { id: '4', src: require('@/assets/icons/Bored.png') },
  { id: '5', src: require('@/assets/icons/Cry.png') },
  { id: '6', src: require('@/assets/icons/Happy.png') },
  { id: '7', src: require('@/assets/icons/Loved.png') },
  { id: '8', src: require('@/assets/icons/Sad.png') },
  { id: '9', src: require('@/assets/icons/Neutral.png') },
];

const Rate: React.FC = () => {
  const params = useLocalSearchParams();

  const [selectedMood, setSelectedMood] = useState<string>((params.mood as string) || '0');
  const [title, setTitle] = useState<string>((params.title as string) || '');
  const [content, setContent] = useState<string>((params.content as string) || '');
  const [date, setDate] = useState<Date>(params.date ? new Date(params.date as string) : new Date());
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const [emojiModalVisible, setEmojiModalVisible] = useState<boolean>(false);
  const { session } = useAuth();
  const router = useRouter();

  const formattedDate = date.toDateString();
  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (Platform.OS === 'android') setShowPicker(false);
    if (selectedDate) setDate(selectedDate);
  };

  const handleMoodSelect = (emojiId: string) => {
    setSelectedMood(emojiId);
    setEmojiModalVisible(false);
  };

  const getEmojiSrc = (id: string) => {
    return emojis.find((e) => e.id === id)?.src;
  };

  const saveEntry = async () => {
    const userId = session?.user?.id;
    if (!userId) {
      console.error('User not authenticated.');
      return;
    }
    if(!params.id){
      const { error } = await supabase.rpc('insert_diary_entry_and_daily_insight', {
        entry_date: formattedDate,
        entry_emotion: parseInt(selectedMood),
        entry_title: title,
        entry_text: content,
        entry_user_id: userId,
      });
      if (error) {
        console.error('Error saving diary entry:', error.message);
      } else {
        router.push('..');
      }
    }
    else{
      const { error } = await supabase.rpc('update_diary_entry_by_id', {
        entry_id: params.id,
        new_date: formattedDate,
        new_emotion: parseInt(selectedMood),
        new_entry: content,
        new_title: title,
      });
      if (error) {
        console.error('Error updating diary entry:', error.message);
      } else {
        router.push('..');
      }
    }

  };
  console.log(params)
  const deleteEntry = async () => {
    if (!params.id) return;
    Alert.alert(
      'Delete Entry',
      "Are you sure?",
      [
        {
          text:"Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            const { error } = await supabase.rpc('delete_diary_entry_and_insight', {
              diary_id_input: params.id,
            });
            if (error) {
              console.error('Error deleting diary entry:', error.message);
            } else {
              router.push('..');
            }
          },
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => setShowPicker(true)} style={styles.dateButton}>
          <Text style={styles.dateText}>{formattedDate}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ marginBottom: 30, marginLeft: 30 }} onPress={deleteEntry}>
          <Feather name="trash-2" size={22} color="rgba(0, 0, 0, 0.47)" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setEmojiModalVisible(true)}>
          <Image source={getEmojiSrc(selectedMood)} style={styles.bigEmoji} />
        </TouchableOpacity>
      </View>

      {showPicker && (
        <DateTimePicker value={date} mode="date" display="calendar" onChange={onChange} />
      )}

      {/* Mood Emoji Modal */}
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
                <TouchableOpacity key={emoji.id} onPress={() => handleMoodSelect(emoji.id)}>
                  <Image source={emoji.src} style={styles.modalEmoji} />
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
  );
};

export default Rate;

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
    width: 50,
    height: 50,
    marginLeft: 10,
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
    width: 40,
    height: 40,
    margin: 10,
  },
});
