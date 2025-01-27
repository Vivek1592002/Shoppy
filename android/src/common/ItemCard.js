import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';

const fallbackImage = require('../images/default.jpg');

const ItemCard = ({ item ,onAddToCart,onAddWishList}) => {
  const imageSource = item.image
    ? { uri: item.image.startsWith('//') ? `https:${item.image}` : item.image } // Handle Contentful's image URLs
    : fallbackImage;

  return (
    
    <View
      style={{
        width: 200,
        height: 250,
        borderRadius: 10,
        elevation: 5,
        backgroundColor: '#fff',
        marginLeft: 20,
        marginRight: 10,
        marginBottom: 10,
      }}
    >
      <Image
        source={imageSource}
        style={{
          width: '100%',
          height: '65%',
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}
        resizeMode="cover" 
      />
      <Text style={{ marginLeft: 10, marginTop: 10, fontSize: 18, fontWeight: '600' }}>
        {item.name}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingLeft: 10,
          paddingRight: 10,
          alignItems: 'center',
        }}
      >
        <Text style={{color:'green'}}>₹ {item.price}</Text>
        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderRadius: 10,
            padding: 10,
            backgroundColor: '#f0f0f0',
          }}
          onPress={() =>{
            onAddToCart(item);
          }}
        >
          <Text style={{ color: '#000' }}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={{
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
        }}
        onPress={() =>{
          onAddWishList(item);
        }}
      >
        <Image source={require('../images/love.png')} style={{ width: 24, height: 24 }} />
      </TouchableOpacity>
    </View>
  );
};

export default ItemCard;
