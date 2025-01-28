import { View, Image } from 'react-native';
import React, { useEffect,useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../common/UserContext';
const SplashScreen = () => {
    const navigation = useNavigation();
   useEffect(()=>{
    setTimeout(() => {
       navigation.navigate('Home');
    }, 3000)})




// const navigation = useNavigation();
// const { setUser } = useContext(UserContext);

// useEffect(() => {
//   const checkLoginState = async () => {
//     const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
//     if (isLoggedIn === 'true') {
//       // Retrieve user info from AsyncStorage
//       const userInfo = await AsyncStorage.getItem('userInfo');
//       if (userInfo) {
//         setUser(JSON.parse(userInfo)); // Update context with user info
//       }
//       navigation.replace('Home'); // Navigate to Home
//     } else {
//       navigation.replace('Login'); // Navigate to Login
//     }
//   };

//   setTimeout(checkLoginState, 3000);
// }, []);


    return (
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <Image source={require('../images/image.png')} style={{width:250,height:200,borderRadius:50}}/>
        </View>
    );
};

export default SplashScreen;
