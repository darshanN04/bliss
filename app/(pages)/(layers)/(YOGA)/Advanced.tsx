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
    id: 'halasana',
    name: 'Halasana',
    description: 'Halasana, or Plow Pose, stretches the back and shoulders while calming the mind.',
    instruction: `Lie on your back with your arms by your sides.\nLift your legs over your head and bring them to the floor behind you.\nKeep your arms extended on the floor, palms facing down.\nHold the pose, keeping your legs straight and your back relaxed.`,
    precaution: 'Avoid this pose if you have neck, back, or shoulder injuries.',
    benefit: 'Stretches the spine and shoulders\nCalms the nervous system\nImproves flexibility',
    target: 'Spine, Shoulders, Back',
    src: require("@/assets/images/Yoga/Yogapos/halasana.png")
  },
  {
    id: 'adhomukhavrikshasana',
    name: 'Adho Mukha Vrikshasana',
    description: 'Adho Mukha Vrikshasana, or Handstand, strengthens the arms, shoulders, and core.',
    instruction: `Start in a downward-facing dog position.\nKick one leg up and use the other leg to propel yourself into a handstand.\nEngage your core and keep your arms straight and strong.\nBalance in the pose for a few breaths, then slowly come down.`,
    precaution: 'Avoid this pose if you have shoulder or wrist injuries.',
    benefit: 'Strengthens the arms, shoulders, and core\nImproves balance and coordination\nIncreases body awareness',
    target: 'Arms, Shoulders, Core',
    src: require("@/assets/images/Yoga/Yogapos/adhomukhavrikshasana.png")
  },
  {
    id: 'shirshasana',
    name: 'Shirshasana',
    description: 'Shirshasana, or Headstand, improves balance and strengthens the upper body.',
    instruction: `Kneel down and place your forearms on the floor.\nInterlace your fingers and place the top of your head on the floor, ensuring a stable base.\nLift your legs off the floor and straighten them, engaging your core.\nBalance in the pose, keeping your body aligned from head to heels.`,
    precaution: 'Avoid this pose if you have neck or spine injuries.',
    benefit: 'Strengthens the shoulders, arms, and core\nImproves circulation\nEnhances mental clarity',
    target: 'Shoulders, Arms, Core',
    src: require("@/assets/images/Yoga/Yogapos/shirshasana.png")
  },
  {
    id: 'pinchamayurasana',
    name: 'Pincha Mayurasana',
    description: 'Pincha Mayurasana, or Forearm Stand, improves balance and strengthens the upper body.',
    instruction: `Start in a dolphin pose, with your forearms on the floor and your hips lifted.\nLift one leg up and use the other leg to kick yourself into the full pose.\nEngage your core and keep your body in a straight line.\nBalance in the pose, keeping your legs strong and straight.`,
    precaution: 'Avoid this pose if you have shoulder or neck injuries.',
    benefit: 'Strengthens the shoulders, arms, and core\nImproves balance\nIncreases flexibility in the spine',
    target: 'Shoulders, Arms, Core',
    src: require("@/assets/images/Yoga/Yogapos/pinchamayurasana.png")
  },
  {
    id: 'parivrittaekapadakoundinyasana',
    name: 'Parivritta Eka Pada Koundinyasana',
    description: 'Parivritta Eka Pada Koundinyasana, or Revolved Flying Man, is a challenging arm balance that requires core strength, balance, and flexibility.',
    instruction: `Start in a seated position and place your hands on the floor in front of you.\nBring one leg behind your arm and twist your torso to the opposite side.\nLift your other leg off the ground, balancing on your hands.\nEngage your core and hold the pose while keeping your body balanced and strong.`,
    precaution: 'Avoid this pose if you have wrist, shoulder, or back injuries.',
    benefit: 'Strengthens the arms, shoulders, and core\nImproves balance and coordination\nEnhances flexibility in the spine and hips',
    target: 'Arms, Shoulders, Core, Spine, Hips',
    src: require("@/assets/images/Yoga/Yogapos/parivrittaekapadakoundinyasana.png")
  },
  {
    id: 'navasana',
    name: 'Navasana',
    description: 'Navasana, or Boat Pose, strengthens the core and improves balance.',
    instruction: `Sit on the floor with your legs extended straight in front of you.\nLean back slightly and lift your legs off the floor, keeping them bent at a 90-degree angle.\nExtend your arms forward, parallel to the floor.\nHold the pose, keeping your back straight and core engaged.`,
    precaution: 'Avoid this pose if you have back or hip injuries.',
    benefit: 'Strengthens the core\nImproves balance and stability\nTones the abdominal muscles',
    target: 'Core, Hip flexors',
    src: require("@/assets/images/Yoga/Yogapos/navasana.png")
  },
  {
    id: 'utthitavasishthasana',
    name: 'Utthita Vasishthasana',
    description: 'Utthita Vasishthasana, or Extended Side Plank, strengthens the core, shoulders, and arms.',
    instruction: `Start in a plank position and shift your weight onto one hand.\nStack your feet and lift your other arm towards the sky, keeping your body in a straight line.\nHold the pose, engaging your core and keeping your body strong.`,
    precaution: 'Avoid this pose if you have wrist or shoulder injuries.',
    benefit: 'Strengthens the core, shoulders, and arms\nImproves balance and stability\nIncreases flexibility in the spine',
    target: 'Core, Shoulders, Arms',
    src: require("@/assets/images/Yoga/Yogapos/utthitavasishthasana.png")
  },
  {
    id: 'ashtavakrasana',
    name: 'Ashtavakrasana',
    description: 'Ashtavakrasana, or Eight-Angle Pose, is an arm balance that strengthens the arms and core.',
    instruction: `Sit with your legs extended in front of you.\nBend your knees and place your feet on the floor.\nTwist your torso and place your hands on the floor, lifting your legs and balancing on your hands.\nHold the pose, keeping your core engaged and your body strong.`,
    precaution: 'Avoid this pose if you have wrist or shoulder injuries.',
    benefit: 'Strengthens the arms, shoulders, and core\nImproves balance\nTones the body',
    target: 'Arms, Shoulders, Core',
    src: require("@/assets/images/Yoga/Yogapos/ashtavakrasana.png")
  },
  {
    id: 'urdhvadhanurasana',
    name: 'Urdhva Dhanurasana',
    description: 'Urdhva Dhanurasana, or Wheel Pose, opens the chest and strengthens the back and arms.',
    instruction: `Lie on your back with your knees bent and feet flat on the floor.\nPlace your hands on the floor beside your head, fingers pointing towards your shoulders.\nPress into your hands and feet, lifting your chest and hips towards the sky.\nStraighten your arms and legs to form a wheel shape.`,
    precaution: 'Avoid this pose if you have neck, back, or shoulder injuries.',
    benefit: 'Opens the chest and shoulders\nStrengthens the back and arms\nIncreases flexibility in the spine',
    target: 'Back, Chest, Shoulders, Arms',
    src: require("@/assets/images/Yoga/Yogapos/urdhvadhanurasana.png")
  },
  {
    id: 'bakasana',
    name: 'Bakasana',
    description: 'Bakasana, or Crane Pose, is an arm balance that strengthens the arms and core.',
    instruction: `Start in a squat position with your feet close together.\nPlace your hands on the floor and shift your weight onto them.\nLift your feet off the floor and balance on your hands, keeping your elbows bent.\nEngage your core and hold the pose.`,
    precaution: 'Avoid this pose if you have wrist or shoulder injuries.',
    benefit: 'Strengthens the arms, shoulders, and core\nImproves balance and focus\nTones the body',
    target: 'Arms, Shoulders, Core',
    src: require("@/assets/images/Yoga/Yogapos/bakasana.png")
  },
  {
    id: 'kapotasana',
    name: 'Kapotasana',
    description: 'Kapotasana, or Pigeon Pose, opens the hips and stretches the chest and spine.',
    instruction: `Kneel on the floor and bring one foot forward, placing it in front of your body.\nStretch your other leg back and keep your hips square.\nArch your back and reach your hands towards your feet.\nHold the pose, breathing deeply and stretching the chest.`,
    precaution: 'Avoid this pose if you have knee, hip, or back injuries.',
    benefit: 'Opens the hips and chest\nIncreases spinal flexibility\nStretches the thighs and groin',
    target: 'Hips, Chest, Spine',
    src: require("@/assets/images/Yoga/Yogapos/kapotasana.png")
  }
];

const Advanced: React.FC = () => {
  const [modalVisible, setModalVisible] = useState<string | null>(null);

  return (
    <LinearGradient
      colors={['rgb(168, 213, 186)', 'rgb(255, 216, 182)']} //light green and light orange
      style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
          <View style={{alignItems: "center", marginBottom: "4%"}}>
                    <Text style={{fontSize: 20, fontWeight: 900, color:'white', textShadowColor: 'black', textShadowOffset: { width: 0, height: 0 }, textShadowRadius: 5}}>ADVANCED PRACTITIONERS</Text>
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
                  colors={['rgb(255, 255, 255)', 'rgb(255, 255, 255)']}
                  style={{ flex: 1 }}>
                  <Text style={styles.modalText}>{asana.name}</Text>
                  <Image source={asana.src} style={styles.image} />
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

export default Advanced;

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
