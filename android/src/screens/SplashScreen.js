import { View, Image } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text } from 'react-native-gesture-handler';

const SplashScreen = () => {
    const navigation = useNavigation();
   useEffect(()=>{
    setTimeout(() => {
       navigation.navigate('Home');
    }, 3000)})

    return (
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <Image source={require('../images/image.png')} style={{width:250,height:200,borderRadius:50}}/>
        </View>
    );
};

export default SplashScreen;
