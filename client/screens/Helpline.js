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
        <Text style={styles.textHeader}>Helpline</Text>
        <Text style={styles.text}>
        
At Reverie Facade, your well-being is our top priority. If you have any questions, need support, or seek guidance on using our app, our dedicated helpline is here to assist you. Our team of experts is available to provide the help you need to make the most of your journey towards self-awareness and recovery from maladaptive dreaming.
Contact us at: Email: support@reveriefacadeapp.com Phone: 1-800-123-4567
Don't hesitate to reach out; we're here to help you every step of the way.{'\n'}
          
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
