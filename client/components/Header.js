// components/Header.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import ProfileLogo from '../assets/profile';
import HomeLogo from '../assets/homelogo';
import MenuLogo from '../assets/menulogo';
import { useNavigation } from '@react-navigation/native';
import { Title } from 'react-native-paper';

const Header = ({ title }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
        <MenuLogo />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>{title}</Text>
      {title === 'Profile'?
      (<TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <HomeLogo />
      </TouchableOpacity>)
      :(<TouchableOpacity onPress={() => navigation.navigate('Profile')}>
      <ProfileLogo />
    </TouchableOpacity>)}
      
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 30,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ABCACF',
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Header;
