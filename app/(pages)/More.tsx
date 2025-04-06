import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/providers/auth-provider';
import { useToast } from 'react-native-toast-notifications';

const More = () => {
  const { session } = useAuth();
  
  const toast = useToast();
  
  const [fullName, setFullName] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Custom date picker states
  const [showDateModal, setShowDateModal] = useState(false);
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  
  // Gender selection modal state
  const [showGenderModal, setShowGenderModal] = useState(false);
  
  
  const genderOptions = ['Male', 'Female', 'Non-binary', 'Prefer not to say'];
  
  // Generate arrays for date selection
  const days = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0'));
  const months = [
    '01 (Jan)', '02 (Feb)', '03 (Mar)', '04 (Apr)', '05 (May)', '06 (Jun)',
    '07 (Jul)', '08 (Aug)', '09 (Sep)', '10 (Oct)', '11 (Nov)', '12 (Dec)'
  ];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => String(currentYear - i));

  const isFormValid = fullName && gender && dob && phone;

  // Set date and close modal
  const setDateAndClose = () => {
    if (day && month && year) {
      const selectedMonth = month.substring(0, 2);
      setDob(`${day}/${selectedMonth}/${year}`);
      setShowDateModal(false);
    }
  };

  // Select gender option
  const selectGender = (option: React.SetStateAction<string>) => {
    setGender(option);
    setShowGenderModal(false);
  };

  // Save profile data to Supabase
  const saveProfile = async () => {
    if (!session) {
      toast.show("You must be logged in", {
        type: 'error',
        placement: 'top',
        duration: 2000,
      });
      return;
    }
    
    if (!isFormValid) {
      toast.show("Please fill in all fields", {
        type: 'error',
        placement: 'top',
        duration: 2000,
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // First, log the data to make sure it's correctly formatted
      // console.log("Saving profile with data:", {
      //   id: session.user.id,
      //   full_name: fullName,
      //   gender: gender,
      //   date_of_birth: dob,
      //   phone_number: phone,
      //   profile_completed: true
      // });
      
      // Update the user's profile in the 'users' table
      const { data, error } = await supabase
        .from('users')
        .update({
          full_name: fullName,
          gender: gender,
          date_of_birth: dob,
          phone_number: phone,
          profile_completed: true
        })
        .eq('id', session.user.id);
        
      if (error) {
        console.error('Error saving profile:', error);
        toast.show(`Failed to save profile: ${error.message}`, {
          type: 'error',
          placement: 'top',
          duration: 4000,
        });
      } else {
        toast.show("Profile saved successfully", {
          type: 'success',
          placement: 'top',
          duration: 2000,
        });
        
        // Navigate to Home page
        router.replace('/Home');
      }
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      toast.show(`An unexpected error occurred: ${errorMessage}`, {
        type: 'error',
        placement: 'top',
        duration: 4000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Getting to Know You</Text>
      <Text style={styles.subtitle}>Please enter the following details to build your profile</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your Full Name"
        value={fullName}
        onChangeText={setFullName}
      />

      <TouchableOpacity 
        style={styles.input} 
        onPress={() => setShowGenderModal(true)}
      >
        <Text style={[styles.inputText, !gender && styles.placeholder]}>
          {gender || "Enter your Gender"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.input} 
        onPress={() => setShowDateModal(true)}
      >
        <Text style={[styles.inputText, !dob && styles.placeholder]}>
          {dob || "Enter your Date of Birth"}
        </Text>
        <Text style={styles.calendarIcon}>📅</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Enter your Phone Number"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />

      <TouchableOpacity
        style={[styles.button, { backgroundColor: isFormValid ? '#6200ea' : '#ccc' }]}
        disabled={!isFormValid || isSubmitting}
        onPress={saveProfile}
      >
        <Text style={styles.buttonText}>
          {isSubmitting ? 'Saving...' : 'Continue'}
        </Text>
      </TouchableOpacity>

      {/* Custom Date Picker Modal */}
      <Modal
        visible={showDateModal}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Date of Birth</Text>
            
            <View style={styles.datePickerContainer}>
              {/* Day Picker */}
              <View style={styles.datePickerColumn}>
                <Text style={styles.datePickerLabel}>Day</Text>
                <ScrollView style={styles.datePickerScroll}>
                  {days.map((d) => (
                    <TouchableOpacity
                      key={`day-${d}`}
                      style={[
                        styles.dateOption,
                        d === day && styles.selectedDateOption
                      ]}
                      onPress={() => setDay(d)}
                    >
                      <Text style={[
                        styles.dateOptionText,
                        d === day && styles.selectedDateOptionText
                      ]}>{d}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
              
              {/* Month Picker */}
              <View style={styles.datePickerColumn}>
                <Text style={styles.datePickerLabel}>Month</Text>
                <ScrollView style={styles.datePickerScroll}>
                  {months.map((m) => (
                    <TouchableOpacity
                      key={`month-${m}`}
                      style={[
                        styles.dateOption,
                        m === month && styles.selectedDateOption
                      ]}
                      onPress={() => setMonth(m)}
                    >
                      <Text style={[
                        styles.dateOptionText,
                        m === month && styles.selectedDateOptionText
                      ]}>{m}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
              
              {/* Year Picker */}
              <View style={styles.datePickerColumn}>
                <Text style={styles.datePickerLabel}>Year</Text>
                <ScrollView style={styles.datePickerScroll}>
                  {years.map((y) => (
                    <TouchableOpacity
                      key={`year-${y}`}
                      style={[
                        styles.dateOption,
                        y === year && styles.selectedDateOption
                      ]}
                      onPress={() => setYear(y)}
                    >
                      <Text style={[
                        styles.dateOptionText,
                        y === year && styles.selectedDateOptionText
                      ]}>{y}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </View>
            
            <View style={styles.modalButtonsContainer}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelModalButton]}
                onPress={() => setShowDateModal(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmModalButton]}
                onPress={setDateAndClose}
                disabled={!day || !month || !year}
              >
                <Text style={styles.confirmButtonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Gender Selection Modal */}
      <Modal
        visible={showGenderModal}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Gender</Text>
            <ScrollView style={styles.modalScroll}>
              {genderOptions.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.optionItem}
                  onPress={() => selectGender(option)}
                >
                  <Text style={styles.optionText}>{option}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setShowGenderModal(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default More;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#444',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
    justifyContent: 'center',
    position: 'relative',
  },
  inputText: {
    color: '#000',
  },
  placeholder: {
    color: '#999',
  },
  calendarIcon: {
    position: 'absolute',
    right: 10,
    fontSize: 16,
  },
  button: {
    width: '100%',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // Modal styles
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '70%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalScroll: {
    maxHeight: 200,
  },
  optionItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  optionText: {
    fontSize: 16,
  },
  cancelButton: {
    marginTop: 15,
    padding: 15,
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#6200ea',
    fontWeight: 'bold',
  },
  // Date picker styles
  datePickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  datePickerColumn: {
    flex: 1,
    marginHorizontal: 5,
  },
  datePickerLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  datePickerScroll: {
    height: 150,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
  },
  dateOption: {
    padding: 10,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  selectedDateOption: {
    backgroundColor: '#6200ea',
  },
  dateOptionText: {
    fontSize: 16,
  },
  selectedDateOptionText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelModalButton: {
    backgroundColor: '#f2f2f2',
  },
  confirmModalButton: {
    backgroundColor: '#6200ea',
  },
  confirmButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});