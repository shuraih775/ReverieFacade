// DailyAnalytics.js

import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get("window").width;

const DailyAnalytics = () => {
  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [1000, 4000, 2000, 500, 3000, 1000, 1000],
        color: (opacity = 1) => `rgba(0, 197, 197, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.chartContainer}>
        <Text style={styles.title}>Daydreams & Productivity</Text>
        <LineChart
          data={data}
          width={screenWidth - 40}
          height={220}
          yAxisLabel=""
          yAxisSuffix="k"
          chartConfig={chartConfig}
          bezier
          fromZero
        />
      </View>
      <View style={styles.legendContainer}>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: '#0037ff' }]} />
          <Text style={styles.legendText}>Productivity & Tasks</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: '#00c5c5' }]} />
          <Text style={styles.legendText}>Daydreams</Text>
        </View>
      </View>
      <View style={styles.controlContainer}>
        <TouchableOpacity style={[styles.controlButton, styles.activeControl]}>
          <Text style={styles.controlText}>Spent</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton}>
          <Text style={styles.controlText}>Categories</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.weekdaysContainer}>
        {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((day, index) => (
          <TouchableOpacity key={index} style={styles.dayButton}>
            <Text style={styles.dayText}>{day}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const chartConfig = {
  backgroundColor: '#cde7e8',
  backgroundGradientFrom: '#cde7e8',
  backgroundGradientTo: '#cde7e8',
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: '#cde7e8',
  },
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f4f7',
    flexGrow: 1,
  },
  chartContainer: {
    marginVertical: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  legendColor: {
    width: 15,
    height: 15,
    marginRight: 5,
  },
  legendText: {
    fontSize: 14,
    color: '#333',
  },
  controlContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  controlButton: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    marginHorizontal: 5,
  },
  activeControl: {
    backgroundColor: '#00c5c5',
  },
  controlText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  weekdaysContainer: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
  },
  dayButton: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#00c5c5',
    marginHorizontal: 5,
  },
  dayText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default DailyAnalytics;
