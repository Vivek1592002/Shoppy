import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import Profile from './Profile';
import Main from './Main';
import Wishlist from './Wishlist';
import Cart from './Cart';
import Search from './Search';
import { useSelector } from 'react-redux';

const Home = () => {

    const [selected, setSelected] = useState(0);
    const data = useSelector(state =>state)
   
    return (
        <View style={{ flex: 1 }}>
            {selected == 0 ? (<Main />) : selected == 1 ? (<Search />) : selected == 2 ? (<Cart />) : selected == 3 ? (<Wishlist />) : (<Profile />)}
            <View style={{ width: '100%', height: 70, backgroundColor: '#fff', position: 'absolute', bottom: 0, flexDirection: 'row', alignItems: 'center' }}>

                <TouchableOpacity style={{ width: '20%', height: '100%', justifyContent: 'center', alignItems: 'center' }} onPress={() => setSelected(0)}>
                    <Image source={require('../images/home.png')} style={{ width: 24, height: 24 }} />

                </TouchableOpacity>

                <TouchableOpacity style={{ width: '20%', height: '100%', justifyContent: 'center', alignItems: 'center' }} onPress={() => setSelected(1)}>
                    <Image source={require('../images/search.png')} style={{ width: 24, height: 24 }} />
                </TouchableOpacity>


                <TouchableOpacity style={{ width: '20%', height: '100%', justifyContent: 'center', alignItems: 'center' }} onPress={() => setSelected(2)}>
                    <Image source={require('../images/cart.png')} style={{ width: 29, height: 24, }} />
                    <View style={{
                        width: 20,
                        height: 20,
                        backgroundColor: 'red',
                        borderRadius: 7,
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'absolute',
                        top: 15,
                        right: 15,

                    }}>
                        <Text style={{ color: '#fff', fontWeight: 600 }}>{data.reducers1.length}</Text>

                    </View>
                </TouchableOpacity>


                <TouchableOpacity style={{ width: '20%', height: '100%', justifyContent: 'center', alignItems: 'center' }} onPress={() => setSelected(3)}>
                    <Image source={require('../images/love.png')} style={{ width: 24, height: 24 }} />
                    <View style={{
                        width: 20,
                        height: 20,
                        backgroundColor: 'red',
                        borderRadius: 7,
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'absolute',
                        top: 15,
                        right: 19,

                    }}>
                        <Text style={{ color: '#fff', fontWeight: 600 }}>{data.reducers2.length}</Text>

                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={{ width: '20%', height: '100%', justifyContent: 'center', alignItems: 'center' }} onPress={() => setSelected(4)}>
                    <Image source={require('../images/user.png')} style={{ width: 24, height: 24, }} />
                </TouchableOpacity>

            </View>
        </View>
    )
}

export default Home