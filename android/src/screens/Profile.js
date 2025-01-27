import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Profile = () => {
  return (
    <SafeAreaView style={{flex:1}}>
      <View style={{width:'100%',height:70,justifyContent:'space-between',flexDirection:'row',alignItems:'center'}}>
    <Text style={{fontWeight:'600',fontSize:19,marginLeft:15}}>Profile</Text>
    <TouchableOpacity style={{width:30,height:30,marginRight:20,justifyContent:'center',alignItems:'center'}}>
    <Image source={require('../images/settings.png')}
    style={{width:24,height:24}}/>
    </TouchableOpacity>
      </View>
      <Image source={require('../images/profile.png')}
      style={{width:80,height:80,alignSelf:'center',marginTop:20}}
      />
      <Text style={{alignSelf:'center',marginTop:20,fontSize:19}}>Vivek Shekhawat</Text>
    </SafeAreaView>
  )
}

export default Profile