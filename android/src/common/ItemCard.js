import { View, Text, Image, TouchableOpacity, StyleSheet,ToastAndroid } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { removeFromCart } from '../redux/actions/Actions';

const fallbackImage = require('../images/default.jpg');
const loveIcon = require('../images/love.png'); 
const heartIcon = require('../images/heart.png');



const ItemCard = ({ item, onAddToCart, onAddWishList,onRemoveWishList }) => {
  const wishList = useSelector((state) => state.reducers2);
  const isInWishlist = wishList.some((wishItem) => wishItem.name === item.name);
  const [ImageSource,SetImageSource] = useState(loveIcon);
  const imageSource = item.image
    ? { uri: item.image.startsWith('//') ? `https:${item.image}` : item.image }
    : fallbackImage;
    useEffect(() => {
      SetImageSource((wishList.some((wishItem) => wishItem.name === item.name)) ? heartIcon : loveIcon);
    },[wishList.some((wishItem) => wishItem.name === item.name)]);

    const handleWishListClick = () => {
      if (isInWishlist) {
        onRemoveWishList(item);
        SetImageSource(loveIcon);
        ToastAndroid.show('Item removed from wishlist!', ToastAndroid.SHORT);
      } else {
        onAddWishList(item);
        SetImageSource(heartIcon);
        ToastAndroid.show('Item added to wishlist!', ToastAndroid.SHORT);
      }
    };

  return (
    <View style={styles.cardContainer}>
      <Image
        source={imageSource}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.itemName}>{item.name}</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.price}>₹ {item.price}</Text>
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={() => onAddToCart(item)}
        >
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.wishButton}
        onPress={handleWishListClick}
      >
        <Image source={ImageSource} style={styles.wishIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: 200,
    height: 250,
    borderRadius: 10,
    elevation: 5,
    backgroundColor: '#fff',
    marginLeft: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: '65%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  itemName: {
    marginLeft: 10,
    marginTop: 10,
    fontSize: 18,
    fontWeight: '600',
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
  addToCartButton: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  addToCartText: {
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

export default ItemCard;
