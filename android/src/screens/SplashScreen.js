// import { View, Image } from 'react-native';
// import React, { useEffect,useContext } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useNavigation } from '@react-navigation/native';
// import { UserContext } from '../common/UserContext';
// const SplashScreen = () => {
//     const navigation = useNavigation();
//    useEffect(()=>{
//     setTimeout(() => {
//        navigation.navigate('Home');
//     }, 3000)})
//     return (
//         <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
//             <Image source={require('../images/image.png')} style={{width:250,height:200,borderRadius:50}}/>
//         </View>
//     );
// };

// export default SplashScreen;

// 

import React, { useEffect, useContext } from 'react';
import { View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../common/UserContext';

const SplashScreen = () => {
  const navigation = useNavigation();
  const { user } = useContext(UserContext);

  useEffect(() => {
    
    const navigateToNextScreen = setTimeout(() => {
      navigation.replace(user ? 'Home' : 'Login');
    }, 1500); 
    return () => clearTimeout(navigateToNextScreen);
  }, [user, navigation]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Image source={require('../images/image.png')} style={{ width: 250, height: 200, borderRadius: 50 }} />
    </View>
  );
};

export default SplashScreen;
