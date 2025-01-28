import React, { useContext } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from '../common/UserContext';

const Login = ({ navigation }) => {
  const { setUser } = useContext(UserContext);

  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setUser(userInfo.user); 
      await AsyncStorage.setItem('isLoggedIn', 'true'); 
      await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo.user)); // Save user info to AsyncStorage
      navigation.replace('Home');
    } catch (error) {
      navigation.replace('Home');
      console.error('Google Sign-In Error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Sign in with Google" onPress={handleGoogleSignIn} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Login;
