import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import Share from 'react-native-share';

const fallbackImage = require('../images/default.jpg');

const Wish = ({ item, onRemoveItem, onAddToCart }) => {
  const imageSource = item.image
    ? { uri: item.image.startsWith('//') ? `https:${item.image}` : item.image }
    : fallbackImage;

  return (
    <View style={styles.container}>
      <Image
        source={imageSource}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.title}>{item.name}</Text>
      <View style={styles.detailsContainer}>
        <Text style={styles.price}>₹ {item.price}</Text>
        <TouchableOpacity style={styles.addToCartButton} onPress={() => onAddToCart(item)}>
          <Text style={styles.addToCartText}>Add to cart</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => onRemoveItem()}
      >
        <Image source={require('../images/heart.png')} style={styles.removeIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  container: {
    width: '60%',
    height: 250,
    borderRadius: 20,
    elevation: 5,
    alignSelf:'center',
    backgroundColor: '#fff',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  image: {
    width: '60%',
    height: '67%',
    alignSelf:'center'
    
  },
  title: {
    marginLeft: 10,
    marginTop: 10,
    fontSize: 18,
    fontWeight: '600',
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: 'center',
  },
  price: {
    color: 'green',
  },
  addToCartButton: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  addToCartText: {
    color: '#000',
  },
  removeButton: {
    width: 40,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 20,
    elevation: 0,
    position: 'absolute',
    top: 5,
    right: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeIcon: {
    width: 24,
    height: 24,
  },
};

export default Wish;
