import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import LeftArrow from '../assets/leftArrow'

const MaladaptiveDaydreamingScreen = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <LeftArrow />
      </TouchableOpacity>

      <View style={styles.card}>
        {/* <Text style={styles.title}>You show slight inclinations towards Maladaptive daydreaming</Text> */}
        <Text style={styles.title}>Your response has been recorded</Text>
      </View>

      <View style={styles.helpContainer}>
        <Text style={styles.helpHeader}>Here's how we can help</Text>
        <Text style={styles.helpText}>• Log daydream as and when it occurs.</Text>
        {/* <Text style={styles.helpText}>• Use the analyzer to better understand your daydreams.</Text>
        <Text style={styles.helpText}>• We will collect your data and analyze it for better understanding.</Text> */}
        <Text style={styles.helpText}>• The analytics will help set up timely reminders for you.</Text>
        <Text style={styles.helpText}>• Our goal is to help remind you towards self-realization and improve productivity.</Text>
        <Text style={styles.helpText}>• Thank you, wish you the best.</Text>
      </View>

      <View style={styles.infoContainer}>
        <Ionicons name="information-circle-outline" size={18} color="gray" />
        <Text style={styles.infoText}>This information will be recorded and used for later analysis, refer to the privacy policy</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#E5F0F2',
    marginTop:30
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 10,
  },
  card: {
    backgroundColor: '#A8C8C8',
    borderRadius: 15,
    padding: 20,
    marginTop: 80,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3D4C4C',
    textAlign: 'center',
  },
  helpContainer: {
    backgroundColor: '#A8C8C8',
    borderRadius: 15,
    padding: 20,
    marginTop: 20,
  },
  helpHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  helpText: {
    fontSize: 14,
    marginVertical: 5,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
  },
  infoText: {
    fontSize: 12,
    color: 'gray',
    marginLeft: 5,
  },
});

export default MaladaptiveDaydreamingScreen;
