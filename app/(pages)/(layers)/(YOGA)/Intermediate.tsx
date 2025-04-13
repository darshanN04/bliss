import { StyleSheet, Text, View, Image, Modal, Pressable, FlatList, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { supabase } from '@/lib/supabase'; // Adjust path as needed


type Asana = {
  id: string;
  name: string;
  description: string;
  instruction: string;
  precaution: string;
  benefit: string;
  target: string;
  src: string;
  url: string;
};

const Intermediate: React.FC = () => {
  const [modalVisible, setModalVisible] = useState<string | null>(null);
  const [asanas, setAsanas] = useState<Asana[]>([]);

  useEffect(() => {
      const fetchAsanas = async () => {
        const { data, error } = await supabase.rpc('get_intermediate_yoga'); // Replace with your function name
  
        if (error) {
          console.error('Error fetching asanas:', error.message);
        } else {
          // console.log('Fetched Asanas:', data); // ✅ Console confirmation
          setAsanas(data);
        }
      };
  
      fetchAsanas();
    }, []);
  return (
    <LinearGradient
      colors={['rgb(168, 213, 186)', 'rgb(255, 216, 182)']} //light green and light orange
      style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <View style={{alignItems: "center", marginBottom: "4%"}}>
                  <Text style={{fontSize: 20, fontWeight: 900, color:'white', textShadowColor: 'black', textShadowOffset: { width: 0, height: 0 }, textShadowRadius: 5}}>INTERMEDIATE PRACTITIONERS</Text>
        </View>
         <FlatList
                  data={asanas}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <Pressable style={styles.card} onPress={() => setModalVisible(item.id)}>
                      <Image source={{ uri: item.src }} style={styles.image} />
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
            onRequestClose={() => setModalVisible(null)}>
            <View style={styles.overlay}>
              <View style={styles.modalView}>
                <LinearGradient
                  colors={['rgb(255, 255, 255)', 'rgb(255, 255, 255)']}
                  style={{ flex: 1 }}>
                  <Text style={styles.modalText}>{asana.name}</Text>
                  <Image source={{uri:asana.src}} style={styles.image} />
                  <View style={styles.imageGap} />
                  <ScrollView contentContainerStyle={styles.modalContent}>
                    <Text style={styles.modalTextOverlay}>{"DESCRIPTION"}</Text>
                    <Text style={styles.textOverlay}>{asana.description}</Text>
                    <Text style={styles.modalTextOverlay}>{"\nINSTRUCTIONS"}</Text>
                    <Text style={styles.textOverlay}>{asana.instruction
                      .split('\n') // Split the string by newlines
                      .map((line, index) => (
                        <Text key={index} style={styles.listItem}>
                          {index + 1}. {line.trim()}{'\n'}
                        </Text>
                      ))}</Text>
                    <Text style={styles.modalTextOverlay}>{"\nPRECAUTIONS"}</Text>
                    <Text style={styles.textOverlay}>{asana.precaution}</Text>
                    <Text style={styles.modalTextOverlay}>{"\nBENEFITS"}</Text>
                    <Text style={styles.textOverlay}>{asana.benefit
                      .split('\n')
                      .map((line, index) => (
                        <Text key={index} style={styles.listItem}>
                          {`\u2022`} {line.trim()}{'\n'}
                        </Text>
                      ))}</Text>
                    <Text style={styles.modalTextOverlay}>{"\nTARGETS"}</Text>
                    <Text style={styles.textOverlay}>{asana.target
                      .split(', ')
                      .map((line, index) => (
                        <Text key={index} style={styles.listItem}>
                          {`\u2022`} {line.trim()}{'\n'}
                        </Text>
                      ))}</Text>
                  </ScrollView>
                  <Pressable style={styles.closeButton} onPress={() => setModalVisible(null)}>
                    <Text style={styles.buttonText}>Close</Text>
                  </Pressable>
                </LinearGradient>
              </View>
            </View>
          </Modal>
        ))}
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Intermediate;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignSelf: 'center',
    paddingTop: 20,
  },
  card: {
    backgroundColor:'white',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 15,
    marginTop: 10,
    marginBottom: 10,
    marginRight: 40,
    marginLeft: 40,
  },
  image: {
    width: 200,
    height: 140,
    borderRadius: 10,
    alignSelf: 'center',
  },
  imageGap: {
    height: 20,
  },
  name: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    top: 55,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.83)',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 30,
    borderTopRightRadius:30,
    alignSelf: 'center',
    overflow: 'hidden',
  },
  modalView: {
    position: 'absolute',
    bottom: 0,
    top: 0,
    left: -5,
    right: -10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.34)',
  },
  modalContent: {
    // alignItems: 'stretch',
    // alignItems: 'center',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingBottom: 0,
  },
  modalText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'rgb(129, 180, 149)',
    marginBottom: 10,
    alignSelf: 'center',
    textShadowColor: 'rgb(255, 216, 182)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,
    paddingTop: 10,
  },
  modalTextOverlay:{
    fontSize: 22,
    fontWeight: 'bold',
    color: 'rgb(129, 180, 149)',
    // textAlign: 'center',
    // alignSelf: 'center',
    // textDecorationLine: 'underline',
    textShadowColor: 'rgb(255, 216, 182)', // Outline color
    textShadowOffset: { width: 0, height: 0 }, // Center the shadow
    textShadowRadius: 3, // Adjust thickness
    marginBottom: 10,
    paddingLeft: 15 ,
    paddingRight: 10,
  },
  textOverlay: {
    fontSize: 16,
    color: 'black',
    textAlign: 'left',
    marginBottom: 20,
    paddingLeft: 15,
    paddingRight: 15,
  },
  listItem: {
    fontSize: 16,
    marginLeft: 5,
    marginBottom: 5,
  },
  closeButton: {
    backgroundColor: 'rgb(129, 180, 149)',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  buttonText: {
    color:'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
