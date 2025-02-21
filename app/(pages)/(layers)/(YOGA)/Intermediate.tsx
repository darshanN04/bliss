import { StyleSheet, Text, View, Image, Modal, Pressable, FlatList } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

type Asana = {
  id: string;
  name: string;
  description: string;
  src: any;
};

const asanas: Asana[] = [
  { id: 'padmasana', name: 'Padmasana', description: 'Padmasana is a cross-legged sitting meditation pose in yoga.', src: require("@/assets/images/Yoga/Yogapos/padmasana.png") },
  { id: 'vajrasana', name: 'Vajrasana', description: 'Vajrasana is a kneeling pose that aids digestion and meditation.', src: 'https://example.com/vajrasana.jpg' },
  { id: 'bhujangasana', name: 'Bhujangasana', description: 'Also known as Cobra Pose, Bhujangasana strengthens the spine.', src: 'https://example.com/bhujangasana.jpg' },
  { id: 'tadasana', name: 'Tadasana', description: 'Tadasana, or Mountain Pose, is a foundational yoga pose.', src: 'https://example.com/tadasana.jpg' },
  { id: 'trikonasana', name: 'Trikonasana', description: 'Trikonasana, or Triangle Pose, stretches and strengthens muscles.', src: 'https://example.com/trikonasana.jpg' },
  { id: 'savasana', name: 'Savasana', description: 'Savasana, or Corpse Pose, is a relaxation pose.', src: 'https://example.com/savasana.jpg' },
  { id: 'vrikshasana', name: 'Vrikshasana', description: 'Vrikshasana, or Tree Pose, helps improve balance.', src: 'https://example.com/vrikshasana.jpg' },
  { id: 'paschimottanasana', name: 'Paschimottanasana', description: 'Paschimottanasana is a seated forward bend.', src: 'https://example.com/paschimottanasana.jpg' },
  { id: 'setu-bandhasana', name: 'Setu Bandhasana', description: 'Setu Bandhasana, or Bridge Pose, strengthens the back.', src: 'https://example.com/setu-bandhasana.jpg' },
  { id: 'halasana', name: 'Halasana', description: 'Halasana, or Plow Pose, is a deep forward bend.', src: 'https://example.com/halasana.jpg' }
];

const Intermediate: React.FC = () => {
  const [modalVisible, setModalVisible] = useState<string | null>(null);

  return (
    <SafeAreaView style={styles.container}>
        <View style={{alignItems: "center", marginBottom: "5%"}}>
                    <Text style={{fontSize: 20, fontWeight: 900}}>Intermediate</Text>
                </View>
      <FlatList
        data={asanas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable style={styles.card} onPress={() => setModalVisible(item.id)}>
            <Image source={item.src} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
          </Pressable>
        )}
      />

      {asanas.map((asana) => (
        <Modal
          key={asana.id}
          animationType="slide"
          transparent={true}
          visible={modalVisible === asana.id}
          onRequestClose={() => setModalVisible(null)}
        >
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{asana.name}</Text>
            <Text style={styles.description}>{asana.description}</Text>
            <Pressable style={styles.closeButton} onPress={() => setModalVisible(null)}>
              <Text style={styles.buttonText}>Close</Text>
            </Pressable>
          </View>
        </Modal>
      ))}
    </SafeAreaView>
  );
};

export default Intermediate;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignSelf: 'center',
    paddingTop: 20,
    backgroundColor: "#2a9d8f"
  },
  card: {
    backgroundColor: "#e9c46a",
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 15,
    marginBottom: 20,
    marginRight: 40,
    marginLeft: 40,
  },
  image: {
    width: 100,
    height: 140,
    borderRadius: 10,
  },
  name: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
