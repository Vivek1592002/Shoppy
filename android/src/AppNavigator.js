import { View, Text } from 'react-native'
import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import SplashScreen from './screens/SplashScreen';
import Home from './screens/Home';
import Main from './screens/Main';
import Cart from './screens/Cart';
import Checkout from './screens/Checkout';
import WishList from './screens/Wishlist';
import Profile from './screens/Profile';
import Insta from './screens/insta';
import Search from './screens/Search';
const Stack = createStackNavigator();


const AppNavigator = () => {
  return (<NavigationContainer>
    <Stack.Navigator>
    <Stack.Screen options ={{headerShown: false}}name="SplashScreen" component={SplashScreen} />
    <Stack.Screen options ={{headerShown: false}}name="Home" component={Home} />
    <Stack.Screen  options ={{headerShown: false}} name="Main" component={Main} />
    <Stack.Screen   options ={{headerShown: true}} name="Cart" component={Cart}/>
    <Stack.Screen   name="Checkout" component={Checkout}/>
    <Stack.Screen   name="Insta" component={Insta}/>
    <Stack.Screen   name="WishList" component={WishList}/>
    <Stack.Screen   name="Search" component={Search}/>
    
    <Stack.Screen  options ={{headerShown: false}} name="Profile" component={Profile}/>

    </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigator