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
    id: 'padmasana',
    name: 'Padmasana',
    description: 'Padmasana is a cross-legged sitting meditation pose in yoga.',
    instruction: `Sit on the floor with your legs stretched out.\nBend your right knee and place your right foot on your left thigh.\nBend your left knee and place your left foot on your right thigh.\nTurn the soles of your feet upward.\nStretch your arms out and let your palms rest against your knees.`,
    precaution: 'People with injured or weak ankles or knees, sciatica, or severe back pain should avoid practicing padmasana.',
    benefit: 'Mental calmness\nFocus\nInner peace & Stress relief\nImproved posture\nPhysical stability\nDigestive health\nFlexibility',
    target: 'Hip flexors, Knees, Ankles',
    src: require("@/assets/images/Yoga/Yogapos/padmasana.png")
  },
  {
    id: 'vajrasana',
    name: 'Vajrasana',
    description: 'Vajrasana is a kneeling pose that aids digestion and meditation.',
    instruction: `Kneel on the floor with your knees and feet together.\nSit back on your heels with your thighs against your abdomen.\nKeep your spine straight and shoulders relaxed.\nPlace your hands on your knees, palms facing upwards.`,
    precaution: 'People with knee injuries or discomfort should avoid this pose.',
    benefit: 'Improves digestion\nIncreases blood flow to the lower body\nRelieves stress\nPromotes mental clarity and focus',
    target: 'Knees, Thighs, Digestive system',
    src: require("@/assets/images/Yoga/Yogapos/vajrasana.png")
  },
  {
    id: 'bhujangasana',
    name: 'Bhujangasana',
    description: 'Also known as Cobra Pose, Bhujangasana strengthens the spine.',
    instruction: `Lie flat on your stomach with your hands placed under your shoulders.\nPress your palms into the floor, and slowly lift your chest and upper body off the ground.\nKeep your elbows bent and close to your body.\nArch your back gently and look up while keeping your legs and feet grounded.`,
    precaution: 'Avoid if you have back or neck injuries.',
    benefit: 'Strengthens the spine\nOpens the chest\nImproves flexibility in the back\nRelieves stress',
    target: 'Spine, Chest, Shoulders',
    src: require("@/assets/images/Yoga/Yogapos/bhujangasana.png")
  },
  {
    id: 'tadasana',
    name: 'Tadasana',
    description: 'Tadasana, or Mountain Pose, is a foundational yoga pose that improves posture.',
    instruction: `Stand tall with your feet together and arms at your sides.\nGround your feet into the floor and engage your thighs.\nStretch your arms overhead, palms facing each other.\nLift your chest and elongate your spine.`,
    precaution: 'People with balance issues should perform this pose near a wall for support.',
    benefit: 'Improves posture\nIncreases awareness\nStrengthens legs\nImproves balance',
    target: 'Spine, Legs, Arms',
    src: require("@/assets/images/Yoga/Yogapos/tadasana.png")
  },
  {
    id: 'trikonasana',
    name: 'Trikonasana',
    description: 'Trikonasana, or Triangle Pose, stretches and strengthens muscles.',
    instruction: `Stand with feet wide apart, about 3-4 feet.\nTurn your right foot out 90 degrees and your left foot slightly inward.\nStretch your arms out to the sides, palms facing down.\nReach your right hand toward your right foot and extend your left arm upwards.\nKeep both legs straight and open your chest.`,
    precaution: 'Avoid if you have neck or back issues.',
    benefit: 'Stretches the hamstrings, hips, and spine\nStrengthens legs and core\nImproves balance and flexibility',
    target: 'Hips, Legs, Spine',
    src: require("@/assets/images/Yoga/Yogapos/trikonasana.png")
  },
  {
    id: 'vrikshasana',
    name: 'Vrikshasana',
    description: 'Vrikshasana, or Tree Pose, helps improve balance and focus.',
    instruction: `Stand with your feet together and hands at your sides.\nLift your right leg and place the sole of your foot on the inner left thigh or calf (avoid the knee).\nBring your palms together in front of your chest in a prayer position.\nHold your balance and focus.`,
    precaution: 'Avoid if you have ankle or knee issues.',
    benefit: 'Improves balance and focus\nStrengthens legs and core\nIncreases flexibility in the hips',
    target: 'Legs, Hips, Core',
    src: require("@/assets/images/Yoga/Yogapos/vrikshasana.png")
  },
  {
    id: 'paschimottanasana',
    name: 'Paschimottanasana',
    description: 'Paschimottanasana is a seated forward bend that stretches the back and hamstrings.',
    instruction: `Sit with your legs extended straight in front of you.\nKeep your spine straight and inhale.\nExhale and fold forward, bringing your chest toward your thighs.\nHold your feet or shins, depending on your flexibility.`,
    precaution: 'Avoid if you have back or hamstring injuries.',
    benefit: 'Stretches the hamstrings and lower back\nCalms the nervous system\nImproves digestion',
    target: 'Hamstrings, Lower back',
    src: require("@/assets/images/Yoga/Yogapos/paschimottanasana.png")
  },
  {
    id: 'virabhadrasana',
    name: 'Virabhadrasana',
    description: 'Virabhadrasana, or Warrior Pose, builds strength and flexibility in the legs and arms.',
    instruction: `Stand with your feet wide apart, arms outstretched.\nTurn your right foot 90 degrees and bend your right knee.\nStretch your arms parallel to the floor, palms facing down.\nKeep your left leg straight and engage your core.`,
    precaution: 'Avoid if you have knee injuries.',
    benefit: 'Strengthens legs and arms\nImproves balance and coordination\nStretches the hips and chest',
    target: 'Legs, Arms, Core',
    src: require("@/assets/images/Yoga/Yogapos/virabhadrasana.png")
  },
  {
    id: 'vakrasana',
    name: 'Vakrasana',
    description: 'Vakrasana, or Twisted Pose, helps to increase flexibility in the spine and improve digestion.',
    instruction: `Sit with your legs extended straight in front of you.\nBend your right leg and place your right foot outside your left knee.\nTwist your torso to the right, placing your left elbow on your right knee and your right hand behind you for support.\nKeep your back straight and engage your core.\nHold the pose for a few breaths and then switch sides.`,
    precaution: 'Avoid this pose if you have neck, back, or shoulder injuries.',
    benefit: 'Improves spinal flexibility\nStimulates digestion\nRelieves tension in the back and shoulders',
    target: 'Spine, Abdomen, Hips',
    src: require("@/assets/images/Yoga/Yogapos/vakrasana.png")
  },
  {
    id: 'shavasana',
    name: 'Shavasana',
    description: 'Shavasana, or Corpse Pose, is a relaxation pose often used for meditation.',
    instruction: `Lie flat on your back with your legs extended and arms by your sides.\nClose your eyes and relax your body.\nFocus on your breath and let go of all tension.\nStay in the pose for several minutes.`,
    precaution: 'None.',
    benefit: 'Promotes deep relaxation\nReduces stress and anxiety\nHelps lower blood pressure',
    target: 'Full body relaxation',
    src:  require("@/assets/images/Yoga/Yogapos/shavasana.png")
  }
];

const Beginner: React.FC = () => {
  const [modalVisible, setModalVisible] = useState<string | null>(null);

  return (
    <LinearGradient
      colors={['rgb(168, 213, 186)', 'rgb(255, 216, 182)']} //light green and light orange
      style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <View style={{alignItems: "center", marginBottom: "5%"}}>
          <Text style={{fontSize: 20, fontWeight: 900}}>Beginner</Text>
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

export default Beginner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignSelf: 'center',
    paddingTop: 20,
  },
  card: {
    // backgroundColor:'rgb(255, 255, 255)', 
    // backgroundColor:'rgb(216, 229, 243)',
    // backgroundColor:'rgb(235, 225, 200)',
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
    bottom: 20,
    top: 60,
    left: 10,
    right: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.83)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    // borderBottomLeftRadius : 0,
    // borderBottomRightRadius: 0,
    // height: '80%',
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
