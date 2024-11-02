import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Arrow from '../assets/leftArrow';


const openURL = (url) => {
    const formattedURL = url.startsWith('http://') || url.startsWith('https://') ? url : `https://${url}`;
    Linking.openURL(formattedURL).catch((err) => console.error("Failed to open URL:", err));
};

function PrivacyPolicy() {
  const navigation = useNavigation();

  return (
    <View style={{backgroundColor:'#E6F0F1',marginTop:40,height:'100%'}}>
    <View style={styles.content}>
        <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate('Home')}>
          <Arrow />
        </TouchableOpacity>
        <Text style={styles.textHeader}>Privacy Policy</Text>
        <Text style={styles.text}>
          At Reverie Facade, we prioritize your privacy and are committed to protecting your personal information. Our privacy policy outlines how we collect, use, and safeguard your data while you use our app. We ensure that your information is handled with the utmost care and in compliance with all relevant regulations. To learn more about our practices, please visit our full Privacy Policy page.
          {'\n'}
          {/* Read our full Privacy Policy at {'\n'}
          <TouchableOpacity onPress={() => openURL('https://www.reveriefacadeapp.com/privacy')}>
            <Text  style={styles.link}>www.reveriefacadeapp.com/privacy</Text>
          </TouchableOpacity> */}
        </Text>
    </View>
    </View>
  );
}

export default PrivacyPolicy;

const styles = StyleSheet.create({
  textHeader: {
    color: '#5D6277',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5
  },
  content: {
    margin: 28,
    
    backgroundColor: '#ABCACF',
    borderRadius: 15,
    height: '80%',
    padding: 15,
    marginTop:50
  },
  text: {
    fontSize: 20,
    color: '#0A1366',
    fontWeight: 'bold',
    
  },
  link: {
    fontSize: 22,
    color: '#0A1366',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    
    
  },
  icon: {
    marginBottom: 40,
  }
});
