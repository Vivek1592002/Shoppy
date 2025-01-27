import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import CartItems from '../common/cartItems';
import { addToWishList, removeFromCart,addItemToCart } from '../redux/actions/Actions';
import Checkout from './Checkout';
import { useNavigation } from '@react-navigation/native';
import Head from './Head';

const Cart = () => {
  const cartdata = useSelector((state) => state.reducers1 || []);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <Head title={"Cart"} />
      {cartdata.length > 0 ? (
        <FlatList
          data={cartdata}
          keyExtractor={(item, index) => `product-${index}`}
          renderItem={({ item, index }) => {
            return (
              <CartItems
                item={item}
                onRemoveItem={() => dispatch(removeFromCart(index))}
                onIncrement={(x) => dispatch(addItemToCart(index))}
                onDecrement={(x) => dispatch(removeFromCart(index))}
                onAddWishList={(x) => dispatch(addToWishList(x))}
              />
            );
          }}
          ListFooterComponent={
            <View style={styles.footer}>
              <TouchableOpacity style={styles.checkoutButton} onPress={() => { navigation.navigate('Checkout'); }}>
                <Text style={styles.checkoutText}>Checkout</Text>
              </TouchableOpacity>
            </View>
          }
        />
      ) : (
        <View style={styles.emptyCartContainer}>
          <Text style={styles.emptyCartText}>No item Added in Cart</Text>
        </View>
      )}
      <View style={styles.bottomSpacer}></View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyCartText: {
    fontSize: 16,
    color: '#333',
  },
  bottomSpacer: {
    width: '100%',
    height: 70,
  },
});

export default Cart;
