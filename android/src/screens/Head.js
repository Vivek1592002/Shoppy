import { View, Text, TouchableOpacity,Image ,Button} from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import Cart from './Cart';

const Head = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        width: '100%',
        height: 70,
        justifyContent: 'space-between',
        alignItems: 'center', 
        flexDirection: 'row',
        borderBottomWidth: 0.2,
        backgroundColor: '#fff',
        borderBottomColor: '#8e8e8e',
      }}
    >
      <Text
        style={{
          fontWeight: '600',
          fontSize: 20,
          color: '#000',
          marginLeft: 20,
        }}
      > SHOPPY </Text>
     <TouchableOpacity style={{width:'20%',height:'100%',justifyContent:'center',alignItems:'center' }} onPress={() => navigation.navigate('Cart')}>
             <Image source={require('../images/checkout.png')} style={{width:24,height:24}} />
         </TouchableOpacity>
         
    </View>
  );
};

export default Head;
