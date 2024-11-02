import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BellIcon from '../assets/bellIcon';
import CompletedIcon from '../assets/completedIcon';
import CloseIcon from '../assets/closeIcon';
import PauseIcon from '../assets/pauseIcon';
// import Journal from './Journal';

const TaskCompleteScreen = ({ onReset }) => {
    const navigation = useNavigation();
    const handleIncomplete = ()=>{
        onReset();
        navigation.navigate('Journal');
    }
  return (
    <View style={styles.container}>
      <View style={styles.notificationIcon}>
        <BellIcon/>
      </View>
      <Text style={styles.currentReminder}>Current Reminder</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.statusButton} onPress={onReset}>
          
          <View style={styles.statusIcon}><CompletedIcon/></View>
          <Text style={styles.statusText}>Completed</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.statusButton}>
            
            <View style={styles.statusIcon}><PauseIcon/></View>
          <Text style={styles.statusText}>Snooze</Text>
          
        </TouchableOpacity>
        <TouchableOpacity style={styles.statusButton} onPress={handleIncomplete}>
        <View style={styles.statusIcon}><CloseIcon/></View>
          <Text style={styles.statusText}>Incomplete</Text>
          
        </TouchableOpacity>
      </View>
      <View style={styles.questionContainer}>
        <TouchableOpacity style={styles.questionButton}>
          <Text style={styles.questionText}>Did you daydream during the duration? tasks complete or incomplete</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.questionButton}>
          <Text style={styles.questionText}>No daydream and tasks were completed successfully</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.resetButton} onPress={onReset}>
        <Text style={styles.resetButtonText}>Reset Timer</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#3D3D3D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationIcon: {
    marginBottom: 20,
    backgroundColor:'#ABCACF' ,
    height:150,
    width:150,
    borderRadius:100,
    alignItems:'center',
    alignContent:'center',
    justifyContent:'center',
    borderColor:'black',
    borderWidth:5
  },
  bellIcon: {
    fontSize: 100,
    color: '#4D6175',
  },
  currentReminder: {
    fontSize: 16,
    marginBottom: 20,
    color: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    width: '100%',
  },
  statusButton: {
    // backgroundColor: '#6D7A8B',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    width: '30%',
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 14,
    marginTop:4
  },
  statusIcon:{
    backgroundColor:'#ABCACF',
    borderRadius:100,
    height:60,
    width:60,
    alignItems:'center',
    alignContent:'center',
    justifyContent:'center'

  },
  questionContainer: {
    width: '100%',
    marginBottom: 20,
  },
  questionButton: {
    backgroundColor: '#ABCACF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  questionText: {
    color: '#222222',
    fontSize: 14,
    fontWeight:'600'
  },
  resetButton: {
    backgroundColor: '#FF231F7C',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    width: '50%',
  },
  resetButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default TaskCompleteScreen;
