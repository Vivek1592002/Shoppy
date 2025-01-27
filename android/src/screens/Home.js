import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import Profile from './Profile';
import Main from './Main';
import Wishlist from './Wishlist';
import Cart from './Cart';
import Search from './Search';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
    const [selected, setSelected] = useState(0);
    const data = useSelector(state => state);
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            {selected == 0 ? (<Main />) : selected == 1 ? (navigation) : selected == 2 ? (<Cart />) : selected == 3 ? (<Wishlist />) : (<Profile />)}
            <View style={styles.navBar}>

                <TouchableOpacity style={styles.navButton} onPress={() => setSelected(0)}>
                    <Image source={require('../images/home.png')} style={styles.icon} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.navButton} onPress={() => {

                    setSelected(1)}}>
                        
                    <Image source={require('../images/search.png')} style={styles.icon} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.navButton} onPress={() => setSelected(2)}>
                    <Image source={require('../images/cart.png')} style={[styles.icon, styles.cartIcon]} />
                    <View style={styles.badgeContainer}>
                        <Text style={styles.badgeText}>{data.reducers1.length}</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navButton} onPress={() => setSelected(3)}>
                    <Image source={require('../images/love.png')} style={styles.icon} />
                    <View style={styles.badgeContainerWishlist}>
                        <Text style={styles.badgeText}>{data.reducers2.length}</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navButton} onPress={() => setSelected(4)}>
                    <Image source={require('../images/user.png')} style={styles.icon} />
                </TouchableOpacity>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    navBar: {
        width: '100%',
        height: 70,
        backgroundColor: '#fff',
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        alignItems: 'center',
    },
    navButton: {
        width: '20%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        width: 24,
        height: 24,
    },
    cartIcon: {
        width: 29,
    },
    badgeContainer: {
        width: 20,
        height: 20,
        backgroundColor: 'red',
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 15,
        right: 15,
    },
    badgeContainerWishlist: {
        width: 20,
        height: 20,
        backgroundColor: 'red',
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 15,
        right: 19,
    },
    badgeText: {
        color: '#fff',
        fontWeight: '600',
    },
});

export default Home;