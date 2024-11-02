import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Arrow from '../assets/leftArrow';
import BackGr from '../assets/cloudIcon';
// import TestSummary from './testSummaryScreen';
const screenWidth = Dimensions.get("window").width;
const questions = [
  { id: '1', question: 'How often do you find yourself daydreaming?' },
  { id: '2', question: 'Are your daydreams vivid and immersive, often lasting a long time?' },
  { id: '3', question: 'How often do you daydream when you should be focused, like at work or while driving?' },
  { id: '4', question: 'Do you daydream in stressful situations?' },
  { id: '5', question: 'How often do you listen to music?' },
  { id: '6', question: 'How often do you daydream while listening to music?' },
  { id: '7', question: 'Is it hard to control when you start daydreaming?' },
  { id: '8', question: 'Do you feel restlessness in your body, especially your legs?' },
  { id: '9', question: 'Do you start pacing while daydreaming?' },
  { id: '10', question: 'How often do you lose track of time while daydreaming?' },
  { id: '11', question: 'Do you make facial expression while daydreaming?' },
  { id: '12', question: 'How often do you daydream in social situations?' },
  { id: '13', question: 'Have often people have noticed your facial expressions?' },
  { id: '14', question: 'How often do you feel like to avoid people and interations?' },
  { id: '15', question: 'Do you notice changes in your mood after daydreaming?' },
  { id: '16', question: 'Do you feel guilty or ashamed about how much you daydream?' },
  { id: '17', question: 'Do you create detailed, ongoing storylines in your daydreams?' },
  { id: '18', question: "Do you feel anxious or irritable when you can't daydream?" },
];

const options = ['Very often', 'Often', 'Sometimes', 'Rarely or never'];

export default function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const navigation = useNavigation();

  const handleAnswer = (answer) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = answer;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      submitAnswers();
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const submitAnswers = async () => {
    try{
    const token = await AsyncStorage.getItem('token');
    const name = 'Maladaptive Daydreaming Detection and Severity Test'
    const response = await axios.post('http://192.168.0.103:5000/api/test/',
       {answers,name},
      {
        headers: {
        Authorization: `Bearer ${token}`
      }
    }
    );
    setAnswers(Array(questions.length).fill(null));
    navigation.navigate('TestSummaryScreen');
    }
    catch(error){
      console.log(error);
    }
  };

  const renderQuestion = () => {
    return (
      <>
        <View style={styles.graphicContainer}>
          <BackGr screenwidth={screenWidth} />
          <TouchableOpacity style={styles.navigateHomeArrow} onPress={() => { navigation.navigate('Home') }}>
            <Arrow color='#FFFFFF' />
          </TouchableOpacity>
        </View>
        <View style={styles.questionContainer}>
          <Text style={styles.questionHeader}>Question {currentQuestionIndex + 1}/{questions.length}</Text>
          <Text style={styles.questionText}>{questions[currentQuestionIndex].question}</Text>
        </View>
        <View style={styles.optionContainer}>
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionButton,
                answers[currentQuestionIndex] === option && styles.selectedOption,
              ]}
              onPress={() => handleAnswer(option)}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.navigationContainer}>
          {currentQuestionIndex > 0 && (
            <TouchableOpacity style={styles.navButton} onPress={handlePrev}>
              <Text style={styles.navButtonText}>Previous</Text>
            </TouchableOpacity>
          )}
          {currentQuestionIndex < questions.length - 1 ? (
            <TouchableOpacity style={styles.navButton} onPress={handleNext}>
              <Text style={styles.navButtonText}>Next</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.navButton} onPress={submitAnswers}>
              <Text style={styles.navButtonText}>Submit</Text>
            </TouchableOpacity>
          )}
        </View>
      </>
    );
  };

  return (
    <View style={styles.container}>
      {renderQuestion()}
    </View>
  );
}

const styles = StyleSheet.create({
  graphicContainer: {
    height: 100,
    width: '95%',
    borderRadius: 25,
    position: 'relative',
  },
  container: {
    flex: 1,
    backgroundColor: '#E6F0F1',
    paddingTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionContainer: {
    backgroundColor: '#CBDEE1',
    borderRadius: 15,
    padding: 20,
    width: '80%',
    alignItems: 'center',
    marginTop: 30,
  },
  questionHeader: {
    fontSize: 14,
    color: '#5D6277',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  questionText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  optionButton: {
    backgroundColor: '#2E456F',
    padding: 15,
    borderRadius: 25,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
  },
  selectedOption: {
    backgroundColor: '#5A81A7',
  },
  optionText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  navButton: {
    backgroundColor: '#2E456F',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    width: '27%',
    alignItems: 'center',
    marginLeft: 50,
    marginRight: 50,
    // height: 45,
  },
  navButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  optionContainer: {
    alignItems: 'center',
    marginTop: 40,
    width: 200,
  },
  navigationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  navigateHomeArrow: {
    position: 'absolute',
    top: 0, 
    left: 0, 
    padding: 20, 
  },
});
