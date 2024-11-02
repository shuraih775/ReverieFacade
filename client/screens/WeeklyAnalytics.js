// WeeklyAnalytics.js

import React from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get("window").width;

const WeeklyAnalytics = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Daydreams (in mins)</Text>
      <BarChart
        data={{
          labels: ['1st Week', '2nd Week', '3rd Week', '4th Week'],
          datasets: [
            { data: [10000, 2000, 10000, 8000], color: () => '#007bff' },
            { data: [6000, 1500, 5000, 4000], color: () => '#28a745' },
          ],
        }}
        width={screenWidth - 40}
        height={220}
        yAxisSuffix="k"
        chartConfig={{
          backgroundColor: '#f5f5f5',
          backgroundGradientFrom: '#f5f5f5',
          backgroundGradientTo: '#f5f5f5',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726',
          },
        }}
        style={styles.chart}
      />
      <View style={styles.legend}>
        <Text style={[styles.legendText, { color: '#007bff' }]}>Productivity</Text>
        <Text style={[styles.legendText, { color: '#28a745' }]}>Daydreams</Text>
      </View>
      <View style={styles.barContainer}>
        {['Week 1', 'Week 2', 'Week 3', 'Week 4'].map((week, index) => (
          <View key={index} style={styles.bar}>
            <Text style={styles.weekText}>{week}</Text>
            <View style={styles.barInner}>
              <View style={[styles.barSection, { flex: 1, backgroundColor: '#007bff' }]} />
              <View style={[styles.barSection, { flex: 1, backgroundColor: '#28a745' }]} />
              <View style={[styles.barSection, { flex: 1, backgroundColor: '#6c757d' }]} />
            </View>
            <Text style={styles.barText}>Total Time Spent Daydreaming: 3 Hours</Text>
          </View>
        ))}
      </View>
      <View style={styles.totalTimeContainer}>
        <Text style={styles.totalTime}>12 Hours</Text>
        <Text style={styles.totalTimeText}>Total Time Spent Daydreaming Over The Weeks</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f4f7',
    flexGrow: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  chart: {
    marginVertical: 10,
    borderRadius: 16,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  legendText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  barContainer: {
    marginTop: 20,
    width: screenWidth - 40,
  },
  bar: {
    marginBottom: 20,
  },
  weekText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  barInner: {
    flexDirection: 'row',
    height: 20,
    borderRadius: 5,
  },
  barSection: {
    marginHorizontal: 2,
    height: 20,
    borderRadius: 5,
  },
  barText: {
    fontSize: 14,
    color: '#333',
    marginTop: 5,
  },
  totalTimeContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  totalTime: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007bff',
  },
  totalTimeText: {
    fontSize: 16,
    color: '#333',
    marginTop: 5,
  },
});

export default WeeklyAnalytics;
