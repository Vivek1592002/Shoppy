import { View, Text, TouchableOpacity } from 'react-native'
import React, { useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FlatList } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import Wish from '../common/wish'
import { addItemToCart, removeFromCart, removeFromWishList } from '../redux/actions/Actions'
import Share from 'react-native-share';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { captureRef } from 'react-native-view-shot';


const WishList = () => {
  const wishdata = useSelector(state => state.reducers2);
  const dispatch = useDispatch();

  // Reference to the wishlist view
  const wishlistRef = useRef();

  // const handleShareWishlistImage = async () => {

  //   const isInstagramAvailable = await Share.isPackageInstalled('com.instagram.android');
  //   if (!isInstagramAvailable) {
  //     Alert.alert('Instagram not installed', 'Please install Instagram to share.');
  //     return;
  //   }

  //   try {
  //     // Capture the wishlist view as an image
  //     const uri = await captureRef(wishlistRef, {
  //       format: "jpg",
  //       quality: 0.8, // Adjust quality as needed
  //     });

  //     // Share the captured image to Instagram
  //     const options = {
  //       title: "Share Wishlist",
  //       message: "Check out my wishlist!",
  //       url: uri,
  //       social: Share.Social.INSTAGRAM, // Specifically share to Instagram
  //     };

  //     await Share.open(options);
  //   } catch (error) {
  //     Alert.alert("Error", "Could not share the wishlist as an image.");
  //   }
  // };

  const handleShareWishlist = async () => {
    try {
      // Generate a combined message for the entire wishlist with name, price, and image
      const wishlistMessage = wishdata
        .map(
          (item, index) =>
            `${index + 1}. ${item.name}\nPrice: ₹${item.price}\nImage: ${item.image
              ? item.image.startsWith('//')
                ? `https:${item.image}`
                : item.image
              : 'No image available'
            }`
        )
        .join('\n\n');

      const options = {
        title: 'Check out these amazing products from my wishlist!',
        message: `Here are some fantastic products I found:\n\n${wishlistMessage}`,

      };

      await Share.open(options);
    } catch (error) {
      Alert.alert('Error', 'Could not share the wishlist.');
    }
  };


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }} ref={wishlistRef}>
        {wishdata.length > 0 ? (<FlatList
          data={wishdata}
          renderItem={({ item, index }) => {
            return <Wish item={item} onRemoveItem={() => {
              dispatch(removeFromWishList(index))
            }} onAddToCart={(x) => {
              dispatch(addItemToCart(x));
            }} />;
          }}

        ListFooterComponent={

          <View style={{
            marginTop: 20,
            padding: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <TouchableOpacity style={{
              backgroundColor: '#4CAF50',
              paddingVertical: 15,
              paddingHorizontal: 30,
              borderRadius: 10,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.3,
              shadowRadius: 5,
              elevation: 5,
            }} onPress={handleShareWishlist} >
              <Text style={{
                color: '#fff',
                fontSize: 18,
                fontWeight: 'bold',
                textAlign: 'center',
              }}>Share</Text>
            </TouchableOpacity>
          </View>


        }
        />

        ) : (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text >No item Added in WishList</Text>
          </View>)}</View>

      {/* <View
        style={{
          marginTop: 20,
          padding: 20,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "#4CAF50",
            paddingVertical: 15,
            paddingHorizontal: 30,
            borderRadius: 10,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 5,
            elevation: 5,
          }}
          onPress={handleShareWishlist}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 18,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            share
          </Text>
        </TouchableOpacity>
      </View> <View
        style={{
          marginTop: 20,
          padding: 20,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "#4CAF50",
            paddingVertical: 15,
            paddingHorizontal: 30,
            borderRadius: 10,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 5,
            elevation: 5,
          }}
          onPress={handleShareWishlistImage}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 18,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Share Wishlist to Instagram
          </Text>
        </TouchableOpacity>
      </View> */}

      <View style={{ width: '100%', height: 70, }}></View>

    </SafeAreaView>
  )
}

export default WishList

