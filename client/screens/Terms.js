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
        <Text style={styles.textHeader}>Terms and Conditions</Text>
        <Text style={styles.text}>
        

Welcome to Reverie Facade, an application designed to aid in self-awareness and recovery from maladaptive daydreaming. By accessing and using Reverie Facade (referred to as "the App"), you agree to comply with and be bound by the following terms and conditions of use. Please read these terms carefully before using the App.

Acceptance of Terms: By accessing or using the App, you agree to be bound by these terms and conditions, our Privacy Policy, and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing the App.

Purpose of the App: Reverie Facade is intended to assist users in exploring and understanding their daydreams, fostering mindfulness and promoting personal growth. The App does not provide medical or psychological advice. It is not intended to diagnose, treat, cure, or prevent any disease or condition.

User Responsibilities: Users are solely responsible for their use of the App and any consequences thereof. Users agree not to use the App in any manner that violates any applicable laws or regulations or infringes on the rights of others.

Disclaimer of Warranties: The App is provided on an "as-is" and "as-available" basis. We make no warranties, expressed or implied, regarding the accuracy, reliability, or suitability of the App for any particular purpose. Your use of the App is at your own risk.

Limitation of Liability: To the fullest extent permitted by law, we shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising out of your access to or use of the App. This includes damages for lost profits, data, or other intangibles.

Changes to Terms: We reserve the right to modify or replace these terms and conditions at any time. Changes will be effective immediately upon posting on this page. Your continued use of the App after any such changes constitutes acceptance of the modified terms.

Intellectual Property: All content and materials available on the App, including but not limited to text, graphics, logos, button icons, images, audio clips, and software, are the property of Reverie Facade or its licensors and are protected by copyright, trademark, and other intellectual property laws. You may not modify, reproduce, distribute, transmit, display, perform, or create derivative works from any of the content or materials on the App without prior written consent from us.

Governing Law: These terms and conditions shall be governed by and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions.

Contact Us: If you have any questions about these terms and conditions, please contact us at [Contact Email].
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
    height: 'auto',
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
