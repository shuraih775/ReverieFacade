import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const MoodJournalScreen = () => {
  const [moodText, setMoodText] = useState('');
  const [selectedMood, setSelectedMood] = useState(null);
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [selectedCurrentWork, setSelectedCurrentWork] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [duration, setDuration] = useState('');

  const moodImages = [
    { name: 'angry', image: require('../assets/mood1-icon.jpg') },
    { name: 'happy', image: require('../assets/mood2-icon.jpg') },
    { name: 'normal', image: require('../assets/mood3-icon.jpg') },
    { name: 'sad', image: require('../assets/mood4-icon.jpg') },
    { name: 'very sad', image: require('../assets/mood5-icon.jpg') },
  ];

  const timeOptions = [
    { label: 'Morning', value: 'morning' },
    { label: 'Afternoon', value: 'afternoon' },
    { label: 'Evening', value: 'evening' },
    { label: 'Night', value: 'night' },
  ];

  const workOptions = [
    { label: 'Eating', value: 'eating' },
    { label: 'Scrolling social media apps', value: 'scrolling' },
    { label: 'Listening to music', value: 'music' },
    { label: 'Simply Walking', value: 'walking' },
    { label: 'Studying or working', value: 'studying' },
    { label: 'Binge watching', value: 'binge watching' },
    { label: 'Having a conversation', value: 'conversation' },
    { label: 'Bathing or using washroom', value: 'using washroom' },
    { label: 'Being idle', value: 'idle' },
    { label: 'Laying on bed before or after sleep', value: 'laying' },
    { label: 'Doing a physical activity', value: 'activity' },
    { label: 'Other', value: 'other' },
  ];

  const themeOptions = [
    { label: 'Fulfilling Relationships', value: 'relationships' },
    { label: 'Conquering Challenges', value: 'challenges' },
    { label: 'Being center of attention', value: 'being center of attention' },
    { label: 'Being Succesful', value: 'being succesful' },
    { label: 'Fantasy', value: 'fantasy' },
    { label: 'Righting Wrongs', value: 'justice' },
    { label: 'Power & Control', value: 'power' },
    { label: 'Supernatural', value: 'supernatural' },
    { label: 'Sexual', value: 'sexual' },
    // { label: 'Creativity & Self-Expression', value: 'creativity' },
    { label: 'Revenge or Vindication', value: 'revenge' },
    { label: 'Griefing', value: 'grief' },
    { label: 'Other', value: 'other' },
  ];

  const resetFields = () =>{
  setMoodText('');
  setDuration('');
  }
  const handleLogDream = async () => {
    const dreamData = {
      mood: selectedMood,
      theme: selectedTheme,
      time: selectedTime,
      duration: duration,
      // workBeforeDream: selectedPreviousWork,
      workDuringDream: selectedCurrentWork,
      dreamDescription: moodText,
    };

    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.post('https://reveriefacade.onrender.com/api/journal', dreamData,
        {
          headers: {
          Authorization: `Bearer ${token}`
        }
      }
      
      );
      await AsyncStorage.setItem('dreamLogFlag','1');
      await AsyncStorage.setItem('analyticFlag','1');
      resetFields();
    } catch (error) {
      
      console.error(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Journal</Text>
      <Text style={styles.subtitle}>How was your mood before you started to daydream?</Text>
      <View style={styles.moodIcons}>
        {moodImages.map((mood, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setSelectedMood(mood.name)}
            style={[
              styles.moodIconContainer,
              selectedMood === mood.name && styles.selectedMood,
            ]}
          >
            <Image source={mood.image} style={styles.moodIcon} />
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.subtitle}>What was the theme of your dream?</Text>
      <View style={styles.dropdownContainer}>
        <RNPickerSelect
          onValueChange={(value) => setSelectedTheme(value)}
          items={themeOptions}
          style={pickerSelectStyles}
          placeholder={{ label: 'Select a theme...', value: null }}
        />
      </View>
      <Text style={styles.subtitle}>At what time of the day?</Text>
      <View style={styles.dropdownContainer}>
        <RNPickerSelect
          onValueChange={(value) => setSelectedTime(value)}
          items={timeOptions}
          style={pickerSelectStyles}
          placeholder={{ label: 'Select a time...', value: null }}
        />
      </View>
      <Text style={styles.subtitle}>What was the duration of your dream?</Text>
      <TextInput
        style={styles.textInput}
        placeholder="in minutes"
        value={duration}
        onChangeText={setDuration}
      />
      <Text style={styles.subtitle}>What were you doing when you started daydreaming?</Text>
      <View style={styles.dropdownContainer}>
        <RNPickerSelect
          onValueChange={(value) => setSelectedCurrentWork(value)}
          items={workOptions}
          style={pickerSelectStyles}
          placeholder={{ label: 'Select a task...', value: null }}
        />
      </View>
    
      <Text style={styles.subtitle}>Write about your dream</Text>
      <TextInput
        style={styles.textInput}
        placeholder="write about the characters and the story"
        multiline
        value={moodText}
        onChangeText={setMoodText}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogDream}>
        <Text style={styles.buttonText}>Log Dream</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E7EDF1',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F1F1F',
    marginBottom: 10,
  },
  moodIcons: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  moodIconContainer: {
    marginHorizontal: 5,
    padding: 10,
    borderRadius: 25,
  },
  moodIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  selectedMood: {
    backgroundColor: '#ccc',
  },
  subtitle: {
    fontSize: 18,
    color: '#1F1F1F',
    marginBottom: 10,
  },
  dropdownContainer: {
    width: '100%',
    backgroundColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
    padding: 10,
  },
  textInput: {
    width: '100%',
    height: 65,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#1F1F1F',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
    backgroundColor: '#fff',
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
    backgroundColor: '#fff',
  },
});

export default MoodJournalScreen;
