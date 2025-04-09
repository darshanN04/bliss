import { StyleSheet, Text, View, Image, Modal, Pressable, FlatList, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

type Asana = {
  id: string;
  name: string;
  description: string;
  instruction: string;
  precaution: string;
  benefit: string;
  target: string;
  src: any;
};

const asanas: Asana[] = [
  {
    id: 'setu-bandhasana',
    name: 'Setu Bandhasana',
    description: 'Setu Bandhasana, or Bridge Pose, strengthens the back and opens the chest.',
    instruction: `Lie on your back with your knees bent and feet flat on the floor.\nPlace your feet hip-width apart and arms by your sides.\nPress your feet into the floor and lift your hips towards the ceiling.\nClasp your hands underneath your back and press your shoulders into the mat.`,
    precaution: 'Avoid if you have neck or back injuries.',
    benefit: 'Strengthens the lower back\nOpens the chest and heart\nImproves spinal flexibility',
    target: 'Spine, Chest, Legs',
    src: require("@/assets/images/Yoga/Yogapos/setubandhasana.png")
  },
  {
    id: 'dhanurasana',
    name: 'Dhanurasana',
    description: 'Dhanurasana, or Bow Pose, stretches the front of the body and strengthens the back.',
    instruction: `Lie flat on your stomach, bend your knees, and hold your ankles.\nLift your chest and legs off the floor, pulling your ankles toward your glutes.\nEngage your back muscles and hold the position.`,
    precaution: 'Avoid if you have back injuries.',
    benefit: 'Stretches the front body\nStrengthens the back and legs\nImproves flexibility',
    target: 'Back, Chest, Legs',
    src: require("@/assets/images/Yoga/Yogapos/dhanurasana.png")
  },
  {
    id: 'ustrasana',
    name: 'Ustrasana',
    description: 'Ustrasana, or Camel Pose, stretches the chest and hip flexors.',
    instruction: `Kneel with your knees hip-width apart.\nPlace your hands on your lower back and arch your spine backward.\nReach for your ankles, lifting your chest towards the ceiling.\nKeep your thighs and pelvis lifted.`,
    precaution: 'Avoid if you have neck or back injuries.',
    benefit: 'Stretches the chest and hip flexors\nImproves spinal flexibility\nRelieves tension in the back',
    target: 'Spine, Chest, Hip flexors',
    src: require("@/assets/images/Yoga/Yogapos/ustrasana.png")
  },
  {
    id: 'ardha-matsyendrasana',
    name: 'Ardha Matsyendrasana',
    description: 'Ardha Matsyendrasana, or Half Lord of the Fishes Pose, improves flexibility in the spine.',
    instruction: `Sit on the floor and bend your left leg so your left foot is flat on the ground.\nPlace your right leg over your left, and twist your torso to the right.\nPlace your left arm on your right knee and your right hand behind you for support.`,
    precaution: 'Avoid if you have back or neck issues.',
    benefit: 'Improves spinal flexibility\nStimulates abdominal organs\nStretches the hips and back',
    target: 'Spine, Abdomen, Hips',
    src: require("@/assets/images/Yoga/Yogapos/ardhamatsyendrasana.png")
  },
  {
    id: 'ardha-pincha-mayurasana',
    name: 'Ardha Pincha Mayurasana',
    description: 'Ardha Pincha Mayurasana, or Dolphin Pose, strengthens the arms and shoulders.',
    instruction: `Start in a tabletop position and then lift your hips toward the ceiling.\nKeep your elbows bent at 90 degrees, with your forearms on the floor.\nPress your feet into the floor and engage your core to balance.`,
    precaution: 'Avoid if you have shoulder or wrist issues.',
    benefit: 'Strengthens arms, shoulders, and core\nImproves balance',
    target: 'Arms, Shoulders, Core',
    src: require("@/assets/images/Yoga/Yogapos/ardhapinchamayurasana.png")
  },
  {
    id: 'ardhanavasana',
    name: 'Ardha Navasana',
    description: 'Ardha Navasana, or Half Boat Pose, strengthens the core and improves balance.',
    instruction: `Sit on the floor with your legs extended straight in front of you.\nLean back slightly and lift your legs off the floor, keeping them bent at a 90-degree angle.\nExtend your arms forward, parallel to the floor.\nHold the pose, keeping your back straight and core engaged.`,
    precaution: 'Avoid this pose if you have back or hip injuries.',
    benefit: 'Strengthens the core\nImproves balance and stability\nTones the abdominal muscles',
    target: 'Core, Hip flexors',
    src: require("@/assets/images/Yoga/Yogapos/ardhanavasana.png")
  },
  {
    id: 'chaturangadandasana',
    name: 'Chaturanga Dandasana',
    description: 'Chaturanga Dandasana, or Four-Limbed Staff Pose, strengthens the arms, core, and legs.',
    instruction: `Start in a high plank position with your hands directly under your shoulders.\nLower your body towards the floor, keeping your elbows bent at a 90-degree angle.\nEngage your core and legs to prevent sagging in the lower back.\nHold the pose, keeping your body in a straight line from head to heels.`,
    precaution: 'Avoid this pose if you have wrist, shoulder, or lower back issues.',
    benefit: 'Strengthens the arms, shoulders, and core\nImproves endurance\nTones the entire body',
    target: 'Arms, Core, Shoulders',
    src: require("@/assets/images/Yoga/Yogapos/chaturangadandasana.png")
  },
  {
    id: 'ekapadarajakapotasana',
    name: 'Eka Pada Rajakapotasana',
    description: 'Eka Pada Rajakapotasana, or One-Legged King Pigeon Pose, opens the hips and stretches the chest.',
    instruction: `Start in a tabletop position and bring your right knee forward, placing it behind your right wrist.\nExtend your left leg straight behind you.\nBend your right leg at the knee and place your right foot near your left wrist.\nReach back with your left hand to grab your left foot, and gently bring your chest toward your shin.\nHold the pose, breathing deeply, then switch sides.`,
    precaution: 'Avoid this pose if you have knee, hip, or back injuries.',
    benefit: 'Opens the hips and chest\nStretches the thighs, groins, and back\nImproves flexibility and balance',
    target: 'Hips, Chest, Back, Thighs',
    src: require("@/assets/images/Yoga/Yogapos/ekapadarajakapotasana.png")
  },
  {
    id: 'natarajasana',
    name: 'Natarajasana',
    description: 'Natarajasana, or Dancer Pose, improves balance, flexibility, and strengthens the legs.',
    instruction: `Stand tall with your feet hip-width apart.\nLift your right leg behind you, holding the outer edge of your right foot with your right hand.\nExtend your left arm forward, keeping your torso upright.\nPush your foot into your hand as you lift your chest, engaging your core.\nHold the pose, then switch sides.`,
    precaution: 'Avoid this pose if you have knee or back injuries.',
    benefit: 'Improves balance and stability\nStrengthens the legs and core\nStretches the hips and chest',
    target: 'Legs, Hips, Core, Chest',
    src: require("@/assets/images/Yoga/Yogapos/natarajasana.png")
  },
  {
    id: 'vasishthasana',
    name: 'Vasishthasana',
    description: 'Vasishthasana, or Side Plank Pose, strengthens the core, arms, and legs while improving balance.',
    instruction: `Start in a plank position and shift your weight to your right hand, stacking your feet on top of each other.\nLift your left arm toward the ceiling, keeping your body in a straight line from head to heels.\nEngage your core and hold the pose, then switch sides.`,
    precaution: 'Avoid this pose if you have wrist, shoulder, or hip injuries.',
    benefit: 'Strengthens the arms, core, and legs\nImproves balance and stability\nTones the entire body',
    target: 'Core, Arms, Shoulders',
    src: require("@/assets/images/Yoga/Yogapos/vasishthasana.png")
  }  
];

const Intermediate: React.FC = () => {
  const [modalVisible, setModalVisible] = useState<string | null>(null);

  return (
    <LinearGradient
      colors={['rgb(168, 213, 186)', 'rgb(255, 216, 182)']} //light green and light orange
      style={{ flex: 1 }}>
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
            onRequestClose={() => setModalVisible(null)}>
            <View style={styles.overlay}>
              <View style={styles.modalView}>
                <LinearGradient
                  colors={['rgba(168, 213, 186, 0.7)', 'rgba(255, 216, 182, 0.7)']} //light green and light orange
                  style={{ flex: 1 }}>
                  <Text style={styles.modalText}>{asana.name}</Text>
                  <Image source={asana.src} style={styles.image} />
                  <View style={styles.imageGap} />
                  <ScrollView contentContainerStyle={styles.modalContent}>
                    <Text style={styles.modalTextOverlay}>{"Description"}</Text>
                    <Text style={styles.textOverlay}>{asana.description}</Text>
                    <Text style={styles.modalTextOverlay}>{"\nInstruction"}</Text>
                    <Text style={styles.textOverlay}>{asana.instruction
                      .split('\n') // Split the string by newlines
                      .map((line, index) => (
                        <Text key={index} style={styles.listItem}>
                          {index + 1}. {line.trim()}{'\n'}
                        </Text>
                      ))}</Text>
                    <Text style={styles.modalTextOverlay}>{"\nPrecautions"}</Text>
                    <Text style={styles.textOverlay}>{asana.precaution}</Text>
                    <Text style={styles.modalTextOverlay}>{"\nBenefit"}</Text>
                    <Text style={styles.textOverlay}>{asana.benefit
                      .split('\n')
                      .map((line, index) => (
                        <Text key={index} style={styles.listItem}>
                          {`\u2022`} {line.trim()}{'\n'}
                        </Text>
                      ))}</Text>
                    <Text style={styles.modalTextOverlay}>{"\nTargets"}</Text>
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
    backgroundColor:'rgb(180, 200, 190)',
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
    marginRight: 80,
    marginLeft: 80,
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
    bottom: 20,
    top: 60,
    left: 10,
    right: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.83)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
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
    paddingBottom: 20,
  },
  modalText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    alignSelf: 'center',
    textShadowColor: 'black',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,
    paddingTop: 10,
  },
  modalTextOverlay:{
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    // textAlign: 'center',
    // alignSelf: 'center',
    textDecorationLine: 'underline',
    textShadowColor: 'black', // Outline color
    textShadowOffset: { width: 0, height: 0 }, // Center the shadow
    textShadowRadius: 3, // Adjust thickness
    marginBottom: 10,
    paddingLeft: 20 ,
    paddingRight: 10,
  },
  textOverlay: {
    fontSize: 16,
    color: 'white',
    textAlign: 'left',
    marginBottom: 20,
    paddingLeft: 15,
    paddingRight: 15,
    textShadowColor: 'black', // Outline color
    textShadowOffset: { width: 0, height: 0 }, // Center the shadow
    textShadowRadius: 3, // Adjust thickness
  },
  listItem: {
    fontSize: 16,
    marginLeft: 5,
    marginBottom: 5,
  },
  closeButton: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
