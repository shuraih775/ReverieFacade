import React, { useState,useCallback,useEffect,useRef} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image,Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import PasswordScreen from './passwordScreen';
import EyeclosedIcon from '../assets/eyeclosed';
import EyeopenIcon from '../assets/eyeopen';
import MailIcon from '../assets/mailIcon';
import LockIcon from '../assets/lockIcon';
import { Updates } from 'expo-updates';

const Tab = createMaterialTopTabNavigator();

const ProfileScreen = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [region, setRegion] = useState('');

  useEffect(() => {
    const loadUser = async () => {
      const user = JSON.parse(await AsyncStorage.getItem('user'));
      if (user) {
        setUsername(user.username);
        setAge(user.age.toString());
        setEmail(user.email);
        setRegion(user.region);
      }
    };
    loadUser();
  }, []);
  const handleLogout = async () => {
    await AsyncStorage.clear();
    await Updates.reloadAsync();
    const token = await AsyncStorage.getItem('token');
    console.log(token);
  };
  const handleProfileSave = async () => {
    const updatedProfile = {
      username,
      age,
      email,
      region,
    };

    try {

      const token = await AsyncStorage.getItem('token'); // Retrieve token from AsyncStorage

    const response = await axios.put('https://reveriefacade.onrender.com/api/auth/', 
      updatedProfile, 
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Include the Authorization header
        }
      }
    );

      // const  = await response.json();
      if (response.ok) {
        await AsyncStorage.setItem('user', JSON.stringify(updatedProfile));
        Alert.alert('Profile updated successfully!');
        setIsEditing(false);
      } else {
        // Alert.alert('Failed to update profile', .message);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Error', 'An error occurred while updating your profile.');
    }
  };

  return (
    <View style={styles.profileContainer}>
      {isEditing ? (
        <TouchableOpacity
          style={styles.reportProblemContainer}
          onPress={() => {
            setIsEditing(false);
            handleProfileSave();
          }}>
          <Text style={styles.reportProblemText}>Save Profile</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.reportProblemContainer}
          onPress={() => setIsEditing(true)}>
          <Text style={styles.reportProblemText}>Edit Profile</Text>
        </TouchableOpacity>
      )}

      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.profileInput}
          value={username}
          onChangeText={setUsername}
          editable={isEditing}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.profileInput}
          value={email}
          onChangeText={setEmail}
          editable={isEditing}
        />

        <Text style={styles.label}>Age</Text>
        <TextInput
          style={styles.profileInput}
          value={age}
          onChangeText={setAge}
          editable={isEditing}
        />

        <Text style={styles.label}>Country/Region</Text>
        <TextInput
          style={styles.profileInput}
          value={region}
          onChangeText={setRegion}
          editable={isEditing}
        />

        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Log out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://reveriefacade.onrender.com/api/auth/login', { email, password });
      console.log(response.data);
      const token = response.data.token;
      const user = response.data.user;


      if (response.status === 201) {
        setPassword('');
        setEmail('');
      }

      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('user', JSON.stringify(user));
      navigation.navigate("ReverieFacade");
    } catch (error) {
      console.error(error);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.externalButton}>
        <Text style={styles.externalButtonText}>Login with Google</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.externalButton}>
        <Text style={styles.externalButtonText}>Login with Apple</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>or continue with email</Text>
      <View style={styles.inputContainer}>
        <View style={styles.icon}>
          <MailIcon />
        </View>
        <TextInput
          style={styles.input}
          placeholder="Email Address"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.icon}>
          <LockIcon />
        </View>
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity onPress={toggleShowPassword} style={styles.icon}>
          {showPassword ? <EyeclosedIcon /> : <EyeopenIcon />}
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.linkText}>Forgot password?</Text>

      <Text style={styles.termsText}>
        By signing in with an account, you agree to our{' '}
        {/* <TouchableOpacity onPress={() => navigation.navigate('Terms')}>
          <Text style={styles.linkText}>Terms of Service</Text>
        </TouchableOpacity>{' '}
        and{' '} */}
        <TouchableOpacity onPress={() => navigation.navigate('Privacy')}>
          <Text style={styles.linkText}>Privacy Policy</Text>
        </TouchableOpacity>
      </Text>
    </View>
  );
};

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const storeEmail = async (email) => {
    try {
      await AsyncStorage.setItem('userEmail', email);
    } catch (error) {
      console.error('Error storing email:', error);
    }
  };

  const handleSignUp = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailPattern.test(email)) {
      console.log(email);
      setEmailError('');
      storeEmail(email);
      navigation.navigate('PasswordScreen');
      // setEmail('');
    } else {
      setEmailError('Please enter a valid email address');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>Create an account</Text>
      <Text style={styles.instruction}>Enter your email to sign up for this app</Text>
      <View style={styles.inputContainer}>
        <View style={styles.icon}>
          <MailIcon />
        </View>
        <TextInput
          style={styles.input}
          placeholder="email@domain.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign up with email</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>or continue with</Text>

      <TouchableOpacity style={styles.googleButton}>
        <Text style={styles.googleButtonText}>Google</Text>
      </TouchableOpacity>

      <Text style={styles.termsText}>
        By clicking continue, you agree to our{' '}
        {/* <TouchableOpacity onPress={() => navigation.navigate('Terms')}>
          <Text style={styles.linkText}>Terms of Service</Text>
        </TouchableOpacity>{' '}
        and{' '} */}
        <TouchableOpacity onPress={() => navigation.navigate('Privacy')}>
          <Text style={styles.linkText}>Privacy Policy</Text>
        </TouchableOpacity>
      </Text>
    </View>
  );
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkLoginStatus = async () => {
    const token = await AsyncStorage.getItem('token');
    setIsLoggedIn(!!token);
  };

  useFocusEffect(
    useCallback(() => {
      checkLoginStatus();
    }, [])
  );

  useEffect(() => {
    const interval = setInterval(checkLoginStatus, 1000); 

    return () => clearInterval(interval); 
  }, []);
  

  return (
    <>
      {isLoggedIn ? (
        <ProfileScreen />
      ) : (
        <>
        <View style={styles.content}>
          <Image source={require('../assets/logo.png')} style={styles.logo} />
          <Text style={styles.title}>REVERIE FACADE</Text>
          <Text style={styles.orText}>Login or Sign up to access your account</Text>
          </View>
          <Tab.Navigator
        screenOptions={{
          tabBarIndicatorStyle: {
            backgroundColor: '#0A1366',
            height: 4,
          },
          tabBarLabelStyle: {
            fontSize: 15,
          },
          tabBarStyle: {
            backgroundColor: '#E7EDF1',
          },
        }}
      >
        <Tab.Screen name="Login" component={LoginScreen} />
        <Tab.Screen name="Sign Up" component={SignUpScreen} />
      </Tab.Navigator>
        </>
      )}
      
    </>
  );
};

const styles = StyleSheet.create({
  content:{
    alignItems:'center',
    marginTop:30
  },
  inputContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  iconContainer: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: '#ccc',
    borderRightWidth: 1,
  },
  input: {
    flex: 1,
    height: 45,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    width: 'auto',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E7EDF1',
    padding: 20,
  },
  logo: {
    width: 60,
    height: 60,
    marginBottom: 10,
    borderRadius:20
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F1F1F',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#1F1F1F',
    marginBottom: 5,
  },
  instruction: {
    fontSize: 14,
    color: '#1F1F1F',
    marginBottom: 10,
    textAlign: 'center',
  },
  icon: {
    padding: 10,
    width: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#0A1366',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  externalButton: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  externalButtonText: {
    fontSize: 16,
    color: '#1F1F1F',
  },
  orText: {
    fontSize: 14,
    color: '#1F1F1F',
    marginBottom: 10,
  },
  googleButton: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  googleButtonText: {
    fontSize: 16,
    color: '#1F1F1F',
  },
  linkText: {
    color: '#4D6175',
    textDecorationLine: 'underline',
    fontSize:12
  },
  termsText: {
    fontSize: 12,
    color: '#4D6175',
    textAlign: 'center',
    marginTop: 20,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  profileContainer: {
    flex: 1,
    backgroundColor: '#f2f6fa',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#e0e8f9',
  },
  backButton: {
    fontSize: 24,
    color: '#000',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  placeholder: {
    width: 24, // Placeholder for alignment
  },
  profileImageContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  profileImagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#dcdcdc',
  },
  detailsContainer: {
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  profileInput: {
    height: 40,
    borderColor: '#dcdcdc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  dropdown: {
    marginBottom: 10,
  },
  reportProblemContainer: {
    marginTop: 20,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft:20,
    backgroundColor:"#ccc",
    marginRight:"auto",
    padding:5,
    borderColor:"#222",
    borderWidth:1,
    borderRadius:2
  },
  reportProblemText: {
    fontSize: 16,
    color: '#000',
  },
  logoutButton: {
    marginTop: 30,
    backgroundColor: '#dcdcdc',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  logoutButtonText: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },
});
export default App;