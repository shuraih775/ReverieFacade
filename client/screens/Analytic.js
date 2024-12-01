import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity ,RefreshControl} from 'react-native';
import { BarChart, PieChart,LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const screenWidth = Dimensions.get("window").width;

const DailyAnalytics = ({dailydata}) => {
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  console.log(dailydata)
  const weeklyDurations = Array(7).fill(0);
  for (const [day, entries] of Object.entries(dailydata)) {
    const dayIndex = daysOfWeek.indexOf(day);
    
    if (dayIndex !== -1) {
      // Sum up all durations for the current day
      const totalDurationForDay = entries.reduce((sum, entry) => sum + entry.duration, 0);
      weeklyDurations[dayIndex] = totalDurationForDay;
    }
  }
  // console.log(weeklyDurations)
  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      
      {
        data: weeklyDurations,
        color: (opacity = 1) => `rgba(0, 197, 197, ${opacity})`, // Daydreams
        strokeWidth: 2,
      },
    ],
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      

      <View style={styles.chartContainer}>
        <Text style={styles.title}>Daydreams (in mins)</Text>
        <LineChart
          data={data}
          width={screenWidth - 40}
          height={220}
          yAxisLabel=""
          yAxisSuffix="min"
          chartConfig={chartConfig}
          bezier
          fromZero
        />
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

const WeeklyAnalytics = ({data1}) => {
  // console.log(data1);
  let weekData = Array(4).fill(0);
  const weekLabels = ['Week 1', 'Week 2', 'Week 3', 'Week 4']
  for (let i = 0; i < weekLabels.length; i++) {
    let week = weekLabels[i];
    if (data1[week]) {
      weekData[i] = data1[week].totalDuration; // Set the duration at the corresponding index
    }
  }

  // data1.map

  return (
    <ScrollView contentContainerStyle={styles.container}>
      

      <Text style={styles.title}>Daydreams(in mins)</Text>

      <BarChart
        data={{
          labels: weekLabels,
          datasets: [
            { data:weekData, color: () => '#007bff' },
            // { data: [6000, 1500, 5000, 4000], color: () => '#28a745' },
          ],
        }}
        width={screenWidth - 40}
        height={220}
        yAxisSuffix="min"
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

      {/* <View style={styles.legend}>
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
            <Text style={styles.barText}>Total Time Spent Daydreaming : 3 Hours</Text>
          </View>
        ))}
      </View> */}

{/*       
      <View style={styles.totalTimeContainer}>
        <Text style={styles.totalTime}>12 Hours</Text>
        <Text style={styles.totalTimeText}>Total Time Spent Daydreaming Over The Weeks</Text>
      </View>
      */}
    </ScrollView>
  );
};

const MonthlyAnalytics = ({data}) => {
  // console.log(data);
  const maxHeight = 150;
  const [selectedMonth, setSelectedMonth] = useState((new Date().getMonth() + 1).toString());

  const monthList = [
    { label: "Jan", value: "1" },
    { label: "Feb", value: "2" },
    { label: "Mar", value: "3" },
    { label: "Apr", value: "4" },
    { label: "May", value: "5" },
    { label: "Jun", value: "6" },
    { label: "Jul", value: "7" },
    { label: "Aug", value: "8" },
    { label: "Sep", value: "9" },
    { label: "Oct", value: "10" },
    { label: "Nov", value: "11" },
    { label: "Dec", value: "12" }
  ];
// const monthList = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
let monthlyData = Array(12).fill(0);
  for (let month = 1; month <= 12; month++) {
    const monthString = month.toString();
    
    if(data[monthString]){
      for(i=0;i<data[monthString].length;i++){
     
        monthlyData[monthString-1] += data[monthString][i].duration; 
      }
    }
  }
  
  
  const monthlyValues = Object.values(monthlyData);
  
  const maxData = Math.max(...monthlyValues);
  
  let heights = Array(12).fill(0);  

  monthlyValues.forEach((value, index) => {
    if (value !== 0) {
      heights[index] = (value / maxData) * maxHeight;
    } else {
      heights[index] = 0;
    }
  });
  const themeCounts = {};
  if (data[selectedMonth]) {
    data[selectedMonth].forEach(item => {
      const theme = item["theme"] || "Other";
      // console.log(theme);
      themeCounts[theme] = (themeCounts[theme] || 0) + 1;
    });
  }
  const colors = [
    "#DC143C", // Crimson
    "#008080", // Teal
    "#FA8072", // Salmon
    "#808000", // Olive
    "#40E0D0", // Turquoise
    "#CCCCFF", // Periwinkle
    "#FF7F50", // Coral
    "#E6E6FA", // Lavender
    "#6A5ACD", // SlateBlue
    "#E0B0FF", // Mauve
    "#7FFF00", // Chartreuse
    "#FFBF00", // Amber
    // "#F08080"  // LightCoral
];


  const pieChartData = Object.keys(themeCounts).map((theme, index) => ({
    name: theme,
    population: themeCounts[theme],
    color: colors[index % colors.length], 
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
}));

  
  
  // const heights = monthlyData.map(value =>{value !== 0?(value / maxData) * maxHeight:0});

  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      <View style={[{width:screenWidth - 30},styles.barChartContainer]}>
      <Text style={styles.header}>Daydreams (in mins)</Text>
        <View style={[{ height: maxHeight + 30 }, styles.barChart]}>
          <Text style={[{bottom:maxHeight/5*5,transform: [{ translateX: 0 }, { translateY: 6 }],fontSize:10},styles.scaleBar]}>{Math.round(maxData/5*5)}  {' -'.repeat(Math.floor(screenWidth / 7.5))}</Text>
          <Text style={[{bottom:maxHeight/5*4,transform: [{ translateX: 0 }, { translateY: 6 }],fontSize:10},styles.scaleBar]}>{Math.round(maxData/5*4)}  {' -'.repeat(Math.floor(screenWidth / 7.5))}</Text>
          <Text style={[{bottom:maxHeight/5*3,transform: [{ translateX: 0 }, { translateY: 6 }],fontSize:10},styles.scaleBar]}>{Math.round(maxData/5*3)}  {' -'.repeat(Math.floor(screenWidth / 7.5))}</Text>
          <Text style={[{bottom:maxHeight/5*2,transform: [{ translateX: 0 }, { translateY: 6}],fontSize:10},styles.scaleBar]}>{Math.round(maxData/5*2)}  {' -'.repeat(Math.floor(screenWidth / 7.5))}</Text>
          <Text style={[{bottom:maxHeight/5*1,transform: [{ translateX: 0 }, { translateY: 6 }],fontSize:10},styles.scaleBar]}>{Math.round(maxData/5*1)}  {' -'.repeat(Math.floor(screenWidth / 7.5))}</Text>
          {heights.map((height, index) => (
            <View
              key={index}
              style={{
                height,
                backgroundColor: "blue",
                marginLeft: 9,
                marginRight: 6,
                width: 6,
                
                marginTop:"auto",
                
                borderTopLeftRadius:5,
                borderTopRightRadius:5
              }}
            >
            </View>
            
          ))}
          

        </View>
        <View style={styles.labelContainer}>
    {monthList.map((month, index) => (
      <Text
        key={index}
        style={{
          marginLeft: 4.5,
          marginRight: .6,
          width: 16,
          fontSize: 8.3, 
          textAlign: 'center',
          fontWeight:"ultralight",
          marginTop:1
        }}
      >
        {month.label}
      </Text>
    ))}
  </View>
      </View>
      
      <Text>Select Month:</Text>
      <RNPickerSelect
        value={selectedMonth}
        // style={pickerSelectStyles}
        onValueChange={(itemValue) => setSelectedMonth(itemValue)}
        items={monthList}
      />
      <PieChart
        data={pieChartData}
        width={screenWidth - 30}
        height={220}
        chartConfig={{
          backgroundColor: '#fff',
          color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        style={styles.chart}
      />
      <Text style={styles.reductionText}>30% Reduction of daydreaming compared to previous month</Text>
    </ScrollView>
  );
}

const AnalyticsScreen = () => {
  const [currentScreen, setCurrentScreen] = useState("Monthly");
  const [data, setData] = useState([]);
  const [monthlyData, setMonthlyData] = useState({});
  const [weeklyData, setWeeklyData] = useState({});
  const [dailyData, setDailyData] = useState({});
  const [refreshing, setRefreshing] = useState(false);

  
  const getData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get('https://reveriefacade.onrender.com/api/journal/analytics', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // console.log(response.data);
      setData(response.data.journalEntries);
      // console.log(response.data.journalEntries);
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await getData();
    computeMonthlyAnalytics();
    computeDailyAnalytics();
    computeWeeklyAnalytics();
    setRefreshing(false);
  };

  const computeMonthlyAnalytics = () => {
    // console.log(data);
    const groupedData = data.reduce((acc, entry) => {
      const month = new Date(entry.date).getMonth() + 1; 
      if (!acc[month]) {
        acc[month] = [];
      }
      acc[month].push(entry);
      return acc;
    }, {});
    // console.log(groupedData);
    setMonthlyData(groupedData);
  };

  const computeDailyAnalytics = () => {
    const days = {};
    const today = new Date();
  
    // Calculate the start of the week (Monday)
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay() + 1);
    // console.log(today.getDate(), today.getDay())
    data.forEach(entry => {
      const entryDate = new Date(entry.date);
  
      // Check if the entry is within the ongoing week
      if (entryDate >= startOfWeek && entryDate <= today) {
        const dayKey = entryDate.toLocaleDateString('en-US', { weekday: 'long' });
  
        if (!days[dayKey]) {
          days[dayKey] = [];
        }
  
        days[dayKey].push(entry);
      }
    });
    console.log(days);
    setDailyData(days);
  };
  

  const computeWeeklyAnalytics = () => {
    const weeks = {};
  
    data.forEach(entry => {
      const entryDate = new Date(entry.date);
      const entryMonth = entryDate.getMonth() + 1;
  
      if (entryMonth === 8) {
        const startOfWeek = new Date(entryDate);
        startOfWeek.setDate(entryDate.getDate() - entryDate.getDay() + 1);
  
        const weekNumber = Math.ceil(startOfWeek.getDate() / 7);
        const weekKey = `Week ${weekNumber}`;
  
        if (!weeks[weekKey]) {
          weeks[weekKey] = {
            totalDuration: 0,
            entries: []
          };
        }
  
        const duration = entry.duration; // Assuming entry has a `duration` field in minutes
        weeks[weekKey].totalDuration += duration;
        weeks[weekKey].entries.push(entry);
      }
    });
  
    setWeeklyData(weeks);
  };
  
  

  useEffect(() => {
    getData();
    computeMonthlyAnalytics();
    computeDailyAnalytics();
    computeWeeklyAnalytics();
  }, []);
  

  return (
    <View style={styles.body}>
      <View style={[{width:screenWidth - 30},styles.mainContainer]}>
        <TouchableOpacity onPress={() => { setCurrentScreen("Daily") }} style={currentScreen === "Daily" ? styles.analyticBtnFocused : styles.analyticBtnUnfocused}>
          <Text style={currentScreen === "Daily" ? styles.analyticBtnText : ""}>Daily</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { setCurrentScreen("Weekly") }} style={currentScreen === "Weekly" ? styles.analyticBtnFocused : styles.analyticBtnUnfocused}>
          <Text style={currentScreen === "Weekly" ? styles.analyticBtnText : ""}>Weekly</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { setCurrentScreen("Monthly") }} style={currentScreen === "Monthly" ? styles.analyticBtnFocused : styles.analyticBtnUnfocused}>
          <Text style={currentScreen === "Monthly" ? styles.analyticBtnText : ""}>Monthly</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {currentScreen === "Daily" ? (
          <DailyAnalytics dailydata={dailyData} />
        ) : currentScreen === "Weekly" ? (
          <WeeklyAnalytics data1={weeklyData}/>
        ) : (
          <MonthlyAnalytics data={monthlyData} />
        )}
      </ScrollView>
      </View>
  );
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: "#E7EDF1",
    minHeight: "100%",
  },
  mainContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: 40,
    marginTop: 20,
    height: 60,
    backgroundColor: "white",
    padding: 5,
    paddingLeft: 30,
    paddingRight: 30,
    marginLeft:"auto",
    marginRight:"auto",
  },
  analyticBtnFocused: {
    backgroundColor: "#4D6175",
    borderRadius: 20,
    height: "100%",
    width: "34%",
    textAlign: "center",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    color: "white"
  },
  analyticBtnUnfocused: {
    borderRadius: 20,
    height: "100%",
    width: "34%",
    textAlign: "center",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center"
  },
  analyticBtnText: {
    color: "white"
  },
  container: {
    alignItems: 'center',
    paddingTop: 20,
    backgroundColor: '#f0f4f7',
    flexGrow: 1,
    margin:0,
    padding:0,
    // marginBottom:60
    
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
  },
  chart: {
    marginVertical: 10,
    borderRadius: 16,
  },
  reductionText: {
    marginTop: 20,
    fontSize: 16,
    color: '#333',
  },
  barChartContainer:{
    backgroundColor:"#fff",
    padding:20,
    borderRadius:20
    
  },
  barChart:{
    backgroundColor:"white",
    flexDirection:"row",
    borderBottomWidth:1,
    borderBottomColor:"#222",
    width:"100%",
    marginLeft:"auto",
    marginRight:"auto",
    justifyContent:"center",
    textAlign:"center",
    borderTopLeftRadius:20,
    borderTopRightRadius:20,
    paddingTop:30,
    position:"relative"
  },
  labelContainer:{
    backgroundColor:"white",
    justifyContent:"center",
    flexDirection:"row",
    width:"100%",
    marginLeft:"auto",
    marginRight:"auto",
    borderBottomLeftRadius:20,
    borderBottomRightRadius:20,
    paddingBottom:10
  },
  scaleBar:{
    position:"absolute",
    left:0,
    color:"grey",
    
    
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    marginHorizontal: 5,
  },
  activeTab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#9DA3E1',
    borderRadius: 20,
    marginHorizontal: 5,
  },
  tabText: {
    color: '#000',
  },
  activeTabText: {
    color: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  legendText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  barContainer: {
    marginTop: 20,
  },
  bar: {
    marginBottom: 10,
  },
  weekText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  barInner: {
    flexDirection: 'row',
    height: 20,
    borderRadius: 5,
    overflow: 'hidden',
  },
  barSection: {
    height: '100%',
  },
  barText: {
    marginTop: 5,
    fontSize: 12,
    color: '#6c757d',
  },
  totalTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  totalTime: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 5,
  },
  totalTimeText: {
    fontSize: 14,
    color: '#6c757d',
  },
  chartContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    // alignSelf:"center",
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  legendContainer: {
    flexDirection: 'row',
    marginBottom: 20,
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
  },
  controlContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  controlButton: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: '#6f7e8a',
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  activeControl: {
    backgroundColor: '#fff',
    color: '#6f7e8a',
  },
  controlText: {
    color: '#fff',
  },
  weekdaysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: '#6f7e8a',
    marginHorizontal: 5,
  },
  dayText: {
    color: '#fff',
  },
  
});

export default AnalyticsScreen;
