import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import CartItems from '../common/cartItems';
import { addToWishList, removeFromCart } from '../redux/actions/Actions';
import Checkout from './Checkout';
import { useNavigation } from '@react-navigation/native';

const Cart = () => {
  const cartdata = useSelector((state) => state.reducers1 || []);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  return (
     
    <SafeAreaView style={{ flex: 1 }}>
      {cartdata.length > 0 ? (
        <FlatList
          data={cartdata}
          renderItem={({ item, index }) => {
            return (
              <CartItems
                item={item}
                onRemoveItem={() => dispatch(removeFromCart(index))}
                onAddWishList={(x) => dispatch(addToWishList(x))}
              />
            );
          }}
          ListFooterComponent={
            <View style={styles.footer}>
              <TouchableOpacity style={styles.checkoutButton} onPress={()=>{navigation.navigate('Checkout')}} >
                <Text style={styles.checkoutText}>Checkout</Text>
              </TouchableOpacity>
            </View>
          }
        />
      ) : (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>No item Added in Cart</Text>
        </View>
      )}
       <View style={{ width: '100%', height: 70,}}></View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  footer: {
    marginTop: 20,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkoutButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  checkoutText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Cart;
