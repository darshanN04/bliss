import { StyleSheet, Text, View, Image, Modal, Pressable, FlatList, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

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
  { id: 'padmasana',
    name: 'Padmasana',
    description: 'Padmasana is a cross-legged sitting meditation pose in yoga.',
    instruction: `1. Sit on the floor with your legs stretched out.
                  2. Bend your right knee and place your right foot on your left thigh.
                  3. Bend your left knee and place your left foot on your right thigh.
                  4. Turn the soles of your feet upward.
                  5. Stretch your arms out and let your palms rest against your knees.`,
    precaution: 'People with injured or weak ankles or knees, sciatica, or severe back pain should avoid practicing padmasana.',
    benefit: 'Mental calmness\nFocus\nInner peace & Stress relief\nImproved posture\nPhysical stability\nDigestive health\nFlexibility\n',
    target: 'Hip flexors, knees, and ankles',
    src: require("@/assets/images/Yoga/Yogapos/padmasana.png") },
    {
      id: 'vajrasana',
      name: 'Vajrasana',
      description: 'Vajrasana is a kneeling pose that aids digestion and meditation.',
      instruction: `1. Kneel on the floor with your knees and feet together.
                    2. Sit back on your heels with your thighs against your abdomen.
                    3. Keep your spine straight and shoulders relaxed.
                    4. Place your hands on your knees, palms facing upwards.`,
      precaution: 'People with knee injuries or discomfort should avoid this pose.',
      benefit: 'Improves digestion\nIncreases blood flow to the lower body\nRelieves stress\nPromotes mental clarity and focus',
      target: 'Knees, thighs, and digestive system',
      src: require("../../../../assets/images/Yoga/Yogapos/vajrasana.png")
    },
    {
      id: 'bhujangasana',
      name: 'Bhujangasana',
      description: 'Also known as Cobra Pose, Bhujangasana strengthens the spine.',
      instruction: `1. Lie flat on your stomach with your hands placed under your shoulders.
                    2. Press your palms into the floor, and slowly lift your chest and upper body off the ground.
                    3. Keep your elbows bent and close to your body.
                    4. Arch your back gently and look up while keeping your legs and feet grounded.`,
      precaution: 'Avoid if you have back or neck injuries.',
      benefit: 'Strengthens the spine\nOpens the chest\nImproves flexibility in the back\nRelieves stress',
      target: 'Spine, chest, shoulders',
      src: 'https://example.com/bhujangasana.jpg'
    },
    {
      id: 'tadasana',
      name: 'Tadasana',
      description: 'Tadasana, or Mountain Pose, is a foundational yoga pose that improves posture.',
      instruction: `1. Stand tall with your feet together and arms at your sides.
                    2. Ground your feet into the floor and engage your thighs.
                    3. Stretch your arms overhead, palms facing each other.
                    4. Lift your chest and elongate your spine.`,
      precaution: 'People with balance issues should perform this pose near a wall for support.',
      benefit: 'Improves posture\nIncreases awareness\nStrengthens legs\nImproves balance',
      target: 'Spine, legs, arms',
      src: 'https://example.com/tadasana.jpg'
    },
    {
      id: 'trikonasana',
      name: 'Trikonasana',
      description: 'Trikonasana, or Triangle Pose, stretches and strengthens muscles.',
      instruction: `1. Stand with feet wide apart, about 3-4 feet.
                    2. Turn your right foot out 90 degrees and your left foot slightly inward.
                    3. Stretch your arms out to the sides, palms facing down.
                    4. Reach your right hand toward your right foot and extend your left arm upwards.
                    5. Keep both legs straight and open your chest.`,
      precaution: 'Avoid if you have neck or back issues.',
      benefit: 'Stretches the hamstrings, hips, and spine\nStrengthens legs and core\nImproves balance and flexibility',
      target: 'Hips, legs, spine',
      src: 'https://example.com/trikonasana.jpg'
    },
    {
      id: 'savasana',
      name: 'Savasana',
      description: 'Savasana, or Corpse Pose, is a relaxation pose often used for meditation.',
      instruction: `1. Lie flat on your back with your legs extended and arms by your sides.
                    2. Close your eyes and relax your body.
                    3. Focus on your breath and let go of all tension.
                    4. Stay in the pose for several minutes.`,
      precaution: 'None.',
      benefit: 'Promotes deep relaxation\nReduces stress and anxiety\nHelps lower blood pressure',
      target: 'Full body relaxation',
      src: 'https://example.com/savasana.jpg'
    },
    {
      id: 'vrikshasana',
      name: 'Vrikshasana',
      description: 'Vrikshasana, or Tree Pose, helps improve balance and focus.',
      instruction: `1. Stand with your feet together and hands at your sides.
                    2. Lift your right leg and place the sole of your foot on the inner left thigh or calf (avoid the knee).
                    3. Bring your palms together in front of your chest in a prayer position.
                    4. Hold your balance and focus.`,
      precaution: 'Avoid if you have ankle or knee issues.',
      benefit: 'Improves balance and focus\nStrengthens legs and core\nIncreases flexibility in the hips',
      target: 'Legs, hips, core',
      src: 'https://example.com/vrikshasana.jpg'
    },
    {
      id: 'paschimottanasana',
      name: 'Paschimottanasana',
      description: 'Paschimottanasana is a seated forward bend that stretches the back and hamstrings.',
      instruction: `1. Sit with your legs extended straight in front of you.
                    2. Keep your spine straight and inhale.
                    3. Exhale and fold forward, bringing your chest toward your thighs.
                    4. Hold your feet or shins, depending on your flexibility.`,
      precaution: 'Avoid if you have back or hamstring injuries.',
      benefit: 'Stretches the hamstrings and lower back\nCalms the nervous system\nImproves digestion',
      target: 'Hamstrings, lower back',
      src: 'https://example.com/paschimottanasana.jpg'
    },
    {
      id: 'setu-bandhasana',
      name: 'Setu Bandhasana',
      description: 'Setu Bandhasana, or Bridge Pose, strengthens the back and opens the chest.',
      instruction: `1. Lie on your back with your knees bent and feet flat on the floor.
                    2. Place your feet hip-width apart and arms by your sides.
                    3. Press your feet into the floor and lift your hips towards the ceiling.
                    4. Clasp your hands underneath your back and press your shoulders into the mat.`,
      precaution: 'Avoid if you have neck or back injuries.',
      benefit: 'Strengthens the lower back\nOpens the chest and heart\nImproves spinal flexibility',
      target: 'Spine, chest, legs',
      src: 'https://example.com/setu-bandhasana.jpg'
    },
    {
      id: 'halasana',
      name: 'Halasana',
      description: 'Halasana, or Plow Pose, is a deep forward bend that stretches the back and shoulders.',
      instruction: `1. Lie on your back with your arms at your sides.
                    2. Lift your legs overhead and bring them towards the floor behind your head.
                    3. Keep your arms on the floor, palms facing down, and press your shoulders into the ground.`,
      precaution: 'Avoid if you have neck or back issues.',
      benefit: 'Stretches the spine, shoulders, and hamstrings\nRelieves tension in the back\nImproves flexibility',
      target: 'Spine, hamstrings, shoulders',
      src: 'https://example.com/halasana.jpg'
    }
  ];

const Beginner: React.FC = () => {
  const [modalVisible, setModalVisible] = useState<string | null>(null);

  return (
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
          onRequestClose={() => setModalVisible(null)}
        >
          <View style={styles.overlay}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>{'\n'+asana.name}</Text>
              <Image source={asana.src} style={styles.image} />
              <View style={styles.imageGap} />
              <ScrollView contentContainerStyle={styles.modalContent}>
                <Text style={styles.modalTextOverlay}>{"Description"}</Text>
                <Text style={styles.descriptionOverlay}>{asana.description}</Text>
                <Text style={styles.modalTextOverlay}>{"\nInstruction"}</Text>
                <Text style={styles.instructionOverlay}>{asana.instruction}</Text>
                <Text style={styles.modalTextOverlay}>{"\nPrecautions"}</Text>
                <Text style={styles.precautionOverlay}>{asana.precaution}</Text>
                <Text style={styles.modalTextOverlay}>{"\nBenefit"}</Text>
                <Text style={styles.benefitOverlay}>{asana.benefit}</Text>
                <Text style={styles.modalTextOverlay}>{"\nTargets"}</Text>
                <Text style={styles.targetOverlay}>{asana.target}</Text>
                <Pressable style={styles.closeButton} onPress={() => setModalVisible(null)}>
                    <Text style={styles.buttonText}>Close</Text>
                </Pressable>
              </ScrollView>
            </View>
          </View>
        </Modal>
      ))}
    </SafeAreaView>
  );
};

export default Beginner;

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
    backgroundColor: 'rgba(255, 255, 255, 0.83)', // Semi-transparent black background
    justifyContent: 'center', // Center the modal vertically
    alignItems: 'center', // Center the modal horizontally
    borderRadius: 30, // Rounded corners
    // borderBottomLeftRadius : 0,
    // borderBottomRightRadius: 0,
    // height: '80%', // Adjust height
    alignSelf: 'center', // Ensure it stays in the center
    overflow: 'hidden', // Ensure rounded corners work properly
  },
  modalView: {
    position: 'absolute',
    bottom: 0,
    top: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.34)',
  },
  modalContent: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  modalText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  modalTextOverlay:{
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'left',
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  description: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  descriptionOverlay: {
    fontSize: 16,
    color: 'white',
    textAlign: 'left',
    marginBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
  instruction: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  instructionOverlay: {
    fontSize: 16,
    color: 'white',
    textAlign: 'left',
    marginBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
  precaution: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  precautionOverlay: {
    fontSize: 16,
    color: 'white',
    textAlign: 'left',
    marginBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
  benefit: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  benefitOverlay: {
    fontSize: 16,
    color: 'white',
    textAlign: 'left',
    marginBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
  target: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  targetOverlay: {
    fontSize: 16,
    color: 'white',
    textAlign: 'left',
    marginBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
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
