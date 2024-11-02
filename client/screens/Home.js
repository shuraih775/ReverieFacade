import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl, ImageBackground, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CircularProgress from '../assets/circularBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const screenWidth = Dimensions.get("window").width;

export default function DashboardScreen() {
  const navigation = useNavigation();
  const [dreamCount, setDreamCount] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const fetchDreamCount = async () => {
    const dreamsCount = await AsyncStorage.getItem('dreamCount') || null;
    const token = await AsyncStorage.getItem('token') || null;
    // console.log(token, dreamsCount);
    if (!dreamsCount && token) {
      try {
        const res = await axios.get("https://reveriefacade.onrender.com:5000/api/journal/getTodayDreamCount", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log(res.data);
        setDreamCount(res.data.count);
        await AsyncStorage.setItem("dreamCount", res.data.count.toString());
      } catch (error) {
        console.error("Error fetching dream count:", error);
      }
    }
  };
  const fetchDreamsCount = async () => {
    // const dreamsCount = await AsyncStorage.getItem('dreamCount') || null;
    const token = await AsyncStorage.getItem('token') || null;
    // console.log(token);
    if (token) {
      try {
        const res = await axios.get("https://reveriefacade.onrender.com:5000/api/journal/getTodayDreamCount", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log(res.data);
        setDreamCount(res.data.count);
        await AsyncStorage.setItem("dreamCount", res.data.count.toString());
      } catch (error) {
        console.error("Error fetching dream count:", error);
      }
    }
  };

  useEffect(() => {
    fetchDreamsCount();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchDreamsCount();
    setRefreshing(false);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.topHalfContainer}>
        <View style={styles.topHalfContainerChild}>
          <Text style={styles.barTextInner}>DayDreaming{'\n'}75%</Text>
          <Text style={styles.barTextOuter}>Productivity{'\n'}75%</Text>
          <CircularProgress size={230} strokeWidth={15} progress1={75} progress2={75} />
        </View>
      </View>

      <View style={styles.bottomHalfContainer}>
        <ImageBackground source={require('../assets/homebottombackground.png')} style={styles.background}>
          <View style={styles.taskDetailsContainer}>
            <View style={styles.detailItem}>
              <Text style={styles.detailHeader}>Next Reminder in</Text>
              <Text style={styles.detailValue}>4:04</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailHeader}>DREAM COUNT</Text>
              <Text style={styles.detailValue}>{dreamCount}</Text>
            </View>
          </View>

          <View style={styles.tipsContainer}>
            <Text style={styles.tipsHeader}>TIPS</Text>
            <View style={styles.tipsContent}>
              <Text style={styles.tips}> - Meditate Everyday</Text>
              <Text style={styles.tips}> - Drink Enough Water</Text>
            </View>
          </View>
        </ImageBackground>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#E6F0F1',
    alignItems: 'center',
    height:"100%",
    marginBottom:100
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 10,
    backgroundColor: '#2E456F',
  },
  menuIcon: {
    padding: 10,
  },
  profileIcon: {
    padding: 10,
  },
  circularProgressContainer: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  circularProgress: {
    width: screenWidth * 0.8,
    height: screenWidth * 0.8,
    backgroundColor: '#CBDEE1',
    borderRadius: screenWidth * 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressText: {
    fontSize: 14,
    color: '#5D6277',
    fontWeight: 'bold',
  },
  progressValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  taskDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    padding: 10,
    marginTop: 10,
  },
  detailItem: {
    alignItems: 'center',
    backgroundColor: 'rgba(204, 204, 204, 0.4)',
    width:100,
    height:80,
    borderRadius:10,
    padding:7

  },
  detailHeader: {
    fontSize: 12,
    color: '#ccc',
    marginBottom:10
  },
  detailValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E456F',
  },
  bottomHalfContainer:{
    height:"50%",
    width:"100%"
  },
  background:{
    height:"100%",
    width:"100%"
  },
  topHalfContainer:{
    height:"50%",
    width:"100%",
    backgroundColor:"#2B303C",
    alignItems:"center",
    justifyContent:"center"
  },
  topHalfContainerChild:{
    backgroundColor:"#ABCACF",
    width:"90%",
    height:"90%",
    alignItems:"center",
    justifyContent:"center",
    marginLeft:"auto",
    marginRight:"auto",
    position:"relative"
  },
  barTextInner:{
    position:"absolute",
    fontSize:15,
    fontWeight:"900",
    color:'#2B303C',
    top:"50%",
    left:"38%",
    textAlign:"center"
  },
  barTextOuter:{
    position:"absolute",
    fontSize:15,
    fontWeight:"900",
    color:'#0A1366',
    top:"34%",
    left:"38%",
    textAlign:"center"
  },
  tipsContainer: {
    flex: 1,
    backgroundColor: '#ABCACF',
    height:screenWidth-200,
    // padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width:screenWidth-100,
    marginLeft:"auto",
    marginRight:"auto",
    marginBottom:10,
  },
  tipsHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#5D6277',
  },
  tipsContent: {
    marginTop: 10,
    height: 100,
    width: '80%',
    backgroundColor: '#2B303C',
  },
  tips:{
    margin:.8,
    color:'#ccc',
    fontSize:13
  }
});
