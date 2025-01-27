import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import Wish from '../common/wish';
import { addItemToCart, removeFromWishList } from '../redux/actions/Actions';
import Share from 'react-native-share';
import Head from './Head';
import { useNavigation } from '@react-navigation/native';

const WishList = () => {
  const wishdata = useSelector((state) => state.reducers2);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const goto = () => {
    navigation.navigate('Insta');
  };

  const handleShareWishlist = async () => {
    try {
      const wishlistMessage = wishdata
        .map(
          (item, index) =>
            `${index + 1}. ${item.name}\nPrice: ₹${item.price}\nImage: ${
              item.image
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
    <SafeAreaView style={styles.container}>
      <Head
        title={'WishList'}
        imagesource={require('../images/instagram.png')}
        destiny={goto}
      />
      <View style={styles.mainView}>
        {wishdata.length > 0 ? (
          <FlatList
            data={wishdata}
            renderItem={({ item, index }) => (
              <Wish
                item={item}
                onRemoveItem={() => {
                  dispatch(removeFromWishList(index));
                }}
                onAddToCart={(x) => {
                  dispatch(addItemToCart(x));
                }}
              />
            )}
            ListFooterComponent={
              <View style={styles.footerContainer}>
                <TouchableOpacity
                  style={styles.shareButton}
                  onPress={handleShareWishlist}
                >
                  <Text style={styles.shareButtonText}>Share</Text>
                </TouchableOpacity>
              </View>
            }
          />
        ) : (
          <View style={styles.emptyView}>
            <Text style={styles.emptyText}>No item Added in WishList</Text>
          </View>
        )}
      </View>
      <View style={styles.bottomSpacer}></View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainView: {
    flex: 1,
  },
  footerContainer: {
    marginTop: 20,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shareButton: {
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
  shareButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  emptyView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: '#000',
  },
  bottomSpacer: {
    width: '100%',
    height: 70,
  },
});

export default WishList;
