import { View, Text, TouchableOpacity,Image } from 'react-native'
import React, { useState } from 'react'
import Profile from './Profile';
import Main from './Main';
import Wishlist from './Wishlist';
import Cart from './Cart';
import Search from './Search';

const Home = () => {
    const [selected,setSelected] = useState(0);
  return (
    <View style={{flex:1}}>
        {selected==0?(<Main/>):selected==1?(<Search/>):selected==2?(<Cart/>):selected==3?(<Wishlist/>):(<Profile/>)}
    <View style={{width:'100%',height:70,backgroundColor: '#fff',position:'absolute',bottom:0,flexDirection:'row',alignItems:'center'}}>
    
    <TouchableOpacity style={{width:'20%',height:'100%',justifyContent:'center',alignItems:'center'}} onPress={() => setSelected(0)}>
        <Image source={require('../images/home.png')} style={{width:24,height:24}} />
        
    </TouchableOpacity>

    <TouchableOpacity style={{width:'20%',height:'100%',justifyContent:'center',alignItems:'center' }} onPress={() => setSelected(1)}>
        <Image source={require('../images/search.png')} style={{width:24,height:24}} />
    </TouchableOpacity>

    
       <TouchableOpacity style ={{width:'20%',height:'100%',justifyContent:'center',alignItems:'center'}} onPress={() => setSelected(2)}>
       <Image source={require('../images/cart.png')} style={{width:29,height:24,}} />
       </TouchableOpacity>
    

    <TouchableOpacity style={{width:'20%',height:'100%',justifyContent:'center',alignItems:'center'}} onPress={() => setSelected(3)}>
        <Image source={require('../images/love.png')} style={{width:24,height:24}} />
    </TouchableOpacity>
   
    <TouchableOpacity style={{width:'20%',height:'100%',justifyContent:'center',alignItems:'center' }} onPress={() => setSelected(4)}>
        <Image source={require('../images/user.png')} style={{width:24,height:24, }} />
    </TouchableOpacity>

    </View>
    </View>
  )
}

export default Home