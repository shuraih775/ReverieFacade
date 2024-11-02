import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity,Linking} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Arrow from '../assets/leftArrow';
const openURL = (url) => {
    const formattedURL = url.startsWith('http://') || url.startsWith('https://') ? url : `https://${url}`;
    Linking.openURL(formattedURL).catch((err) => console.error("Failed to open URL:", err));
};
function About() {
    const navigation = useNavigation();
  return (
    <View style={{backgroundColor:'#E6F0F1',marginTop:40,height:'100%'}}>
    <View style={styles.content}>
        <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate('Home')}>
        <Arrow/>
        </TouchableOpacity>
        <Text style={styles.textHeader}>About Us</Text>
        <Text style={styles.text}>
        
Welcome to Reverie Facade, your trusted companion in the journey towards self-awareness and recovery from maladaptive dreaming. Our app is designed to help you explore and understand the hidden layers of your daydreams, promoting a balanced and mindful approach to your inner world. By unveiling the facade of dreams, we empower you to reclaim your focus and live a more grounded and fulfilling life. Join our community and start your path to self-discovery today!
{'\n'}
Learn more at <TouchableOpacity onPress={() => openURL('www.reveriefacadeapp.com/privacy')}>
          <Text style={styles.link}>www.reveriefacadeapp.com</Text>
        </TouchableOpacity></Text>
    </View>
    </View>
  )
}

export default About;

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
  