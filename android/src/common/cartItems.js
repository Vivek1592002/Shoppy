import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';

const fallbackImage = require('../images/default.jpg');

const CartItems = ({ item, onRemoveItem, onAddWishList,onIncrement,onDecrement }) => {
  const imageSource = item.image
    ? { uri: item.image.startsWith('//') ? `https:${item.image}` : item.image }
    : fallbackImage;

  return (
    <View style={styles.container}>
      <Image
        source={imageSource}
        style={styles.image}
        
      />
      <Text style={styles.itemName}>{item.name}</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.price}>₹ {item.price}</Text>
        <TouchableOpacity style={styles.removeButton} onPress={onRemoveItem}>
          <Text style={styles.removeButtonText}>Remove Item</Text>
        </TouchableOpacity>
        {/* <View style={styles.but}>
        <TouchableOpacity style={styles.removeButton} onPress={onDecrement}>
          <Text style={styles.removeButtonText}>-</Text>
        </TouchableOpacity>
        <View style={styles.removeButton}>
          <Text style={styles.removeButtonText}>{item.quantity}</Text>
        </View>
        <TouchableOpacity style={styles.removeButton} onPress={onIncrement}>
          <Text style={styles.removeButtonText}>+</Text>
        </TouchableOpacity>
        </View> */}
      </View>
      <TouchableOpacity
        style={styles.wishButton}
        onPress={() => {
          onAddWishList(item);
        }}
      >
        <Image source={require('../images/love.png')} style={styles.wishIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '60%',
    height: 250,
    borderRadius: 20,
    elevation: 5,
    alignSelf:'center',
    backgroundColor: '#fff',
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
    marginTop: 10,
  },
  image: {
    width: '60%',
    height: '67%',
    alignSelf:'center',
   
  },
  itemName: {
    marginLeft: 10,
    marginTop: 10,
    fontSize: 18,
    fontWeight: '600',
  },
  but:{
    flexDirection: 'row',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: 'center',
  },
  price: {
    color: 'green',
  },
  removeButton: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  removeButtonText: {
    color: '#000',
  },
  wishButton: {
    width: 40,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 20,
    elevation: 5,
    position: 'absolute',
    top: 10,
    right: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wishIcon: {
    width: 24,
    height: 24,
  },
});

export default CartItems;
