
import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import Header from './components/Header';
import Home from './screens/Home';
import Journal from './screens/Journal';
import Analytic from './screens/Analytic';
import Profile from './screens/auth';
import Tracker from './screens/tracker';
import Privacy from './screens/PrivacyPolicy';
import About from './screens/About';
import Tests from './screens/tests';
import Helpline from './screens/Helpline';
import DreamLog from './screens/DreamLog';
import Terms from './screens/Terms';
import PasswordScreen from './screens/passwordScreen';
import TestSummaryScreen from './screens/testSummaryScreen';

import JournalLogo from './assets/journallogo';
import AnalyticsLogo from './assets/analyticslogo';
import HomeLogo from './assets/homelogo';
import ReminderLogo from './assets/Reminderlogo';
import JournalLogoFocused from './assets/journallogoFocused';
import AnalyticsLogoFocused from './assets/analyticslogoFocused';
import HomeLogoFocused from './assets/homelogoFocused';
import ReminderLogoFocused from './assets/ReminderlogoFocused';
import MenuLogo from './assets/menulogo';
import TaskCompleteScreen from './screens/taskComplete';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function CustomTabBarIcon({ route, focused, color, size }) {
  let iconComponent;
  let label;

  if (route.name === 'Home') {
    iconComponent = focused
      ? (<HomeLogoFocused style={styles.icon} />)
      : (<HomeLogo style={styles.icon} />)
    label = 'Home';
  } else if (route.name === 'Tracker') {
    iconComponent = focused
      ? (<ReminderLogoFocused style={styles.icon} />)
      : (<ReminderLogo style={styles.icon} />)
    label = 'Tracker';
  } else if (route.name === 'Analytics') {
    iconComponent = focused
      ? (<AnalyticsLogoFocused style={styles.icon} />)
      : (<AnalyticsLogo style={styles.icon} />)
    label = 'Analytics';
  } else if (route.name === 'Journal') {
    iconComponent = focused
      ? (<JournalLogoFocused style={styles.icon} />)
      : (<JournalLogo style={styles.icon} />)
    label = 'Journal';
  }

  return (
    <View style={[styles.iconContainer, focused && styles.focusedIconContainer]}>
      {iconComponent}
      {focused && <Text style={styles.iconLabel}>{label}</Text>}
    </View>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: ({ focused, color, size }) => (
          <CustomTabBarIcon route={route} focused={focused} color={color} size={size} />
        ),
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: '#4D6175',
        tabBarStyle: {
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
          backgroundColor: 'white',
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Tracker" component={Tracker} />
      <Tab.Screen name="Journal" component={Journal} />
      <Tab.Screen name="Analytics" component={Analytic} />
    </Tab.Navigator>
  );
}

function CustomDrawerContent(props) {
  return (
    <>
    <View style={styles.menuLogo}>
      <TouchableOpacity onPress={() => props.navigation.toggleDrawer()}>
        <MenuLogo />
      </TouchableOpacity>
      </View>
    <DrawerContentScrollView {...props} style={styles.drawer}>
      
      <DrawerItem
        label="Home"
        onPress={() => props.navigation.navigate('Home')}
        style={styles.drawerItem}
        labelStyle={styles.drawerItemLabel}
      />
      <DrawerItem
        label="Tests"
        onPress={() => props.navigation.navigate('Tests')}
        style={styles.drawerItem}
        labelStyle={styles.drawerItemLabel}
      />
      {/* <DrawerItem
        label="Dream Analyser"
        onPress={() => props.navigation.navigate('')}
        style={styles.drawerItem}
        labelStyle={styles.drawerItemLabel}
      /> */}
      <DrawerItem
        label="Dream Logs"
        onPress={() => props.navigation.navigate('DreamLog')}
        style={styles.drawerItem}
        labelStyle={styles.drawerItemLabel}
      />
      <DrawerItem
        label="Privacy policy"
        onPress={() => props.navigation.navigate('Privacy')}
        style={styles.drawerItem}
        labelStyle={styles.drawerItemLabel}
      />
      {/* <DrawerItem
        label="Helpline"
        onPress={() => props.navigation.navigate('Helpline')}
        style={styles.drawerItem}
        labelStyle={styles.drawerItemLabel}
      /> */}
      <DrawerItem
        label="About Us"
        onPress={() => props.navigation.navigate('About')}
        style={styles.drawerItem}
        labelStyle={styles.drawerItemLabel}
      />
      
    </DrawerContentScrollView>
    </>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          header: ({ route }) => (
            route.name=== 'Privacy' ||route.name=== 'About' || route.name=== 'Tests' || route.name=== 'Helpline' || route.name=== 'PasswordScreen' || route.name=== 'Terms' || route.name=== 'TestSummaryScreen'? <></>:
            <Header title={route.name === 'ReverieFacade' ? 'ReverieFacade' : route.name === 'DreamLog'?'Dream Logs':route.name} />
            
          ),
        }}
      >
        <Drawer.Screen name="ReverieFacade" component={MainTabs} />
        <Drawer.Screen name="Profile" component={Profile} />
        <Drawer.Screen name="Privacy" component={Privacy} />
        <Drawer.Screen name="About" component={About} />
        <Drawer.Screen name="Tests" component={Tests} />
        {/* <Drawer.Screen name="Helpline" component={Helpline} /> */}
        <Drawer.Screen name="DreamLog" component={DreamLog} />
        <Drawer.Screen name="Terms" component={Terms} />
        <Drawer.Screen name="PasswordScreen" component={PasswordScreen} />
        <Drawer.Screen name="TaskComplete" component={TaskCompleteScreen} />
        <Drawer.Screen name="TestSummaryScreen" component={TestSummaryScreen} />
        
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 50,
    borderRadius: 10,
    flexDirection: 'row',
  },
  focusedIconContainer: {
    backgroundColor: '#4D6175',
    borderRadius: 10,
  },
  iconLabel: {
    marginLeft: 8,
    color: 'white',
    fontWeight: 'bold',
  },
  drawerItem: {
    marginVertical: 5,
    backgroundColor:'#2B303C',
    borderRadius:15,
    borderColor:'white',
    borderWidth:3,
    
  },
  drawerItemLabel: {
    fontSize: 18,
    color:'white'
  },
  drawer:{
    backgroundColor:'#689195',
    
  },
  menuLogo:{
    justifyContent:'center',
    backgroundColor:'#E2EEF0',
    marginTop:30,
    height:40,
    paddingLeft:'88%',
    height:50
  }
});
