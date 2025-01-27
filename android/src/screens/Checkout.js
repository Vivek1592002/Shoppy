import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { FlatList } from 'react-native-gesture-handler';

const Checkout = () => {
  const cartdata = useSelector((state) => state.reducers1 || []);
  const fallbackImage = 'https://via.placeholder.com/150'; // Fallback image

  const getTotal = () => {
    let total = 0;
    cartdata.map((item) => {
      total += item.price;
    });
    return total;
  };

  const handlePaymentPress = () => {
    Alert.alert(
      "Payment Feature",
      "This feature will be available next time!",
      [
        {
          text: "OK",
          onPress: () => console.log("OK Pressed"),
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.cartItems}>
        <FlatList
          data={cartdata}
          renderItem={({ item }) => {
            return (
              <View style={styles.itemContainer}>
                <Image
                  source={
                    item.image
                      ? { uri: item.image.startsWith('//') ? `https:${item.image}` : item.image }
                      : { uri: fallbackImage }
                  }
                  style={styles.itemImage}
                />
                <View style={styles.itemDetails}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemPrice}>₹ {item.price}</Text>
                </View>
              </View>
            );
          }}
        />
      </View>

      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total: ₹</Text>
        <Text style={styles.totalAmount}>{getTotal()}</Text>
      </View>
      <View style={styles.footer}>
                    <TouchableOpacity style={styles.checkoutButton} onPress={handlePaymentPress} >
                      <Text style={styles.checkoutText}>Checkout</Text>
                    </TouchableOpacity>
                  </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  cartItems: {
    flex: 1,
  },
  itemContainer: {
    width: '100%',
    height: 70,
    flexDirection: 'row',
    marginTop: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
  },
  itemPrice: {
    fontSize: 14,
    color: 'green',
    marginTop: 5,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderTopWidth: 0.5,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  totalText: {
    fontSize: 18,
    fontWeight: '500',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  footer: {
    marginBottom:20,
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
});

export default Checkout;
