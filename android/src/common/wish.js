import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import Share from 'react-native-share';

const fallbackImage = require('../images/default.jpg');

const Wish = ({ item ,onRemoveItem,onAddToCart,}) => {
  const imageSource = item.image
    ? { uri: item.image.startsWith('//') ? `https:${item.image}` : item.image } // Handle Contentful's image URLs
    : fallbackImage;


  return (
    
    <View
      style={{
        width: '90%',
        height: 250,
        borderRadius: 20,
        elevation: 5,
        backgroundColor: '#fff',
        marginLeft: 20,
        marginRight: 20,
        marginTop:10,
        marginBottom: 10,
      }}
    >
      <Image
        source={imageSource}
        style={{
          width: '100%',
          height: '67%',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
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
          <Text style={{ color: '#000' }}>Add to cart</Text>
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
          onRemoveItem();
        }}
      >
        <Image source={require('../images/heart.png')} style={{ width: 24, height: 24 }} />
      </TouchableOpacity>



      {/* Share Button */}
      {/* <View style={{ marginTop: 10, alignItems: 'center' }}>
        <TouchableOpacity
          style={{
            padding: 10,
            backgroundColor: '#f0f0f0',
            borderRadius: 10,
            width: '90%',
            alignItems: 'center',
          }}
          onPress={handleShare}
        >
          <Text style={{ color: '#000' }}>Share</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

export default Wish;
