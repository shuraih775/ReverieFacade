// MonthlyAnalytics.js

import React from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get("window").width;

const MonthlyAnalytics = () => {
  const data = [
    { name: 'Tasks', population: 50, color: '#0037ff', legendFontColor: '#0037ff', legendFontSize: 15 },
    { name: 'Daydreams', population: 50, color: '#00c5c5', legendFontColor: '#00c5c5', legendFontSize: 15 },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.chartContainer}>
        <Text style={styles.title}>Daydreams & Productivity</Text>
        <PieChart
          data={data}
          width={screenWidth - 40}
          height={220}
          chartConfig={{
            color: () => '#00c5c5',
            labelColor: () => '#333',
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          center={[10, 10]}
          absolute
        />
      </View>
      <View style={styles.legendContainer}>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: '#0037ff' }]} />
          <Text style={styles.legendText}>Tasks</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: '#00c5c5' }]} />
          <Text style={styles.legendText}>Daydreams</Text>
        </View>
      </View>
      <View style={styles.dataContainer}>
        <View style={styles.dataItem}>
          <Text style={styles.dataLabel}>Total Tasks</Text>
          <Text style={styles.dataValue}>12</Text>
        </View>
        <View style={styles.dataItem}>
          <Text style={styles.dataLabel}>Total Daydreams</Text>
          <Text style={styles.dataValue}>8</Text>
        </View>
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
  dataContainer: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
    width: '100%',
  },
  dataItem: {
    alignItems: 'center',
  },
  dataLabel: {
    fontSize: 14,
    color: '#333',
  },
  dataValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00c5c5',
  },
});

export default MonthlyAnalytics;
