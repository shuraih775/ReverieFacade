import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const DreamLogsScreen = () => {
  const [dreams, setDreams] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchDreams = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      console.log(token);
      const response = await axios.get('http://192.168.0.103:5000/api/journal', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setDreams(response.data.journalEntries);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDreams();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchDreams();  // Refresh the data
    setRefreshing(false);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {dreams && dreams.map((dream, index) => (
        <View key={index} style={styles.dreamItem}>
          <View style={styles.dreamTextContainer}>
            <Text style={styles.dreamText}>Mood: </Text>
            <Text style={styles.dreamValueText}>{dream.mood}</Text>
          </View>
          <View style={styles.dreamTextContainer}>
            <Text style={styles.dreamText}>Theme: </Text>
            <Text style={styles.dreamValueText}>{dream.theme}</Text>
          </View>
          <View style={styles.dreamTextContainer}>
            <Text style={styles.dreamText}>Time: </Text>
            <Text style={styles.dreamValueText}>{dream.time}</Text>
          </View>
          <View style={styles.dreamTextContainer}>
            <Text style={styles.dreamText}>Duration: </Text>
            <Text style={styles.dreamValueText}>{dream.duration} minutes</Text>
          </View>
          <View style={styles.dreamTextContainer}>
            <Text style={styles.dreamText}>Task: </Text>
            <Text style={styles.dreamValueText}>{dream.taskDuring}</Text>
          </View>
          <View style={styles.dreamTextContainer}>
            <Text style={styles.dreamText}>Description: </Text>
            <Text style={[{ flexShrink: 1 }, styles.dreamValueText]}>{dream.description}</Text>
          </View>
        </View>
      ))}
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
  dreamItem: {
    width: '100%',
    backgroundColor: '#ABCACF',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  dreamTextContainer: {
    flexDirection: "row"
  },
  dreamText: {
    fontSize: 18,
    fontWeight: "bold",
    color: '#2B303C',
    marginBottom: 5,
    width: "40%"
  },
  dreamValueText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: "300",
  }
});

export default DreamLogsScreen;
