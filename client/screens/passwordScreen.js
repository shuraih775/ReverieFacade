import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ExitLogo from '../assets/exitLogo';
import axios from 'axios';

const App = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [age, setAge] = useState('');
  const [region, setRegion] = useState('');
  const navigation = useNavigation();

  const retrieveEmail = async () => {
    try {
      const email = await AsyncStorage.getItem('userEmail');
      if (email !== null) {
        setEmail(email);
      }
    } catch (error) {
      console.error('Error retrieving email:', error);
    }
  };

  const handleSignUp = async () => {
    retrieveEmail();

    if (!username || !password || password !== confirmPassword) {
      alert('Please enter a valid username and password.');
      return;
    }

    try {
      const response = await axios.post('https://reveriefacade.onrender.com:5000/api/auth/signup', {
        email,
        username,
        password,
        age: age || null, // Send null if age is empty
        region: region || null // Send null if region is empty
      });
      console.log('done');
      if (response.status === 201) {
        await AsyncStorage.setItem('userEmail', "");
        setPassword('');
        setConfirmPassword('');
        setUsername('');
        setAge('');
        setRegion('');
        navigation.navigate('Tests')
      }
    } catch (error) {
      console.error(error);
    }
    console.log('Sign up pressed');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.backButtonContainer}>
        <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate('Profile')}>
          <ExitLogo />
        </TouchableOpacity>
      </View>
      <View style={styles.logoContainer}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <Text style={styles.appName}>REVERIE FACADE</Text>
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.createAccountText}>Create an account</Text>
        <Text style={styles.instructionsText}>Enter Password and other necessary details to sign up</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter new password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Re-enter password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Age (optional)"
          keyboardType="numeric"
          value={age}
          onChangeText={setAge}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Country/Region (optional)"
          value={region}
          onChangeText={setRegion}
        />
        <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
          <Text style={styles.signUpButtonText}>Sign up</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.footerText}>
        By clicking continue, you agree to our{' '}
        <Text style={styles.linkText}>Privacy Policy</Text>
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6F0F8',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20
  },
  backButtonContainer: {
    position: 'absolute',
    top: 40,
    left: 20
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A237E'
  },
  formContainer: {
    width: '100%',
    alignItems: 'center'
  },
  createAccountText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10
  },
  instructionsText: {
    fontSize: 16,
    marginBottom: 20
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#FFFFFF'
  },
  signUpButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#0A1366',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 20,
  },
  signUpButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  footerText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#777777'
  },
  linkText: {
    color: 'black',
    textDecorationLine: 'underline',
  },
  icon: {
    marginTop: 40,
  }
});

export default App;
