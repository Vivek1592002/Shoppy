import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { UserContext } from '../common/UserContext';
import { useNavigation } from '@react-navigation/native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';

const Login = () => {
  const navigation = useNavigation();
  const { login } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

useEffect(()=>{
  GoogleSignin.configure({
    webClientId: '945182083766-q8r81qjlkjp7p9abanoc8ubfkh3pi1ca.apps.googleusercontent.com',
  });
},[])


async function onGoogleButtonPress() {
  try {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

    // Get the user's ID token
    const signInResult = await GoogleSignin.signIn();

    let idToken = signInResult.data?.idToken || signInResult.idToken;
    if (!idToken) {
      throw new Error('No ID token found');
    }

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    const userCredential = await auth().signInWithCredential(googleCredential);

    // Show success alert and log user info
    console.log('User Info:', userCredential.user);
    Alert.alert('Success', 'Signed in successfully!');
  } catch (error) {
    // Handle errors and show failure alert
    console.error('Google Sign-In Error:', error);
    Alert.alert('Failure', 'Google Sign-In failed. Please try again.');
  }
}

  const handleLogin = () => {
    if (email && username && password) {
      login({ email, username });
      navigation.replace('Home');
    } else {
      Alert.alert('Please fill all fields.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onGoogleButtonPress} style={styles.button}>
        <Text style={styles.buttonText}>Glogin</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, padding: 10, marginVertical: 10, borderRadius: 5 },
  button: { backgroundColor: '#007bff', padding: 15, borderRadius: 5, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});

export default Login;
