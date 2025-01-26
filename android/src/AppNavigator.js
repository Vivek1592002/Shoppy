import { View, Text } from 'react-native'
import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import SplashScreen from './screens/SplashScreen';
import Home from './screens/Home';
import Main from './screens/Main';
import Cart from './screens/Cart';
const Stack = createStackNavigator();


const AppNavigator = () => {
  return (<NavigationContainer>
    <Stack.Navigator>
    <Stack.Screen options ={{headerShown: false}}name="SplashScreen" component={SplashScreen} />
    <Stack.Screen options ={{headerShown: false}}name="Home" component={Home} />
    <Stack.Screen  options ={{headerShown: false}} name="Main" component={Main} />
    <Stack.Screen  options ={{headerShown: false}} name="Cart" component={Cart}/>
    </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigator