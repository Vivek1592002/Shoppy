// import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
// import React from 'react';
// import { useSelector } from 'react-redux';
// import { FlatList } from 'react-native-gesture-handler';

// const Insta = () => {
//   const wishdata = useSelector((state) => state.reducers2 || []);
  

//   const handle = () => {
   
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.cartItems}>
//         <FlatList
//           data={wishdata}
//           renderItem={({ item }) => {
//             return (
//               <View style={styles.itemContainer}>
//                 <Image
//                   source={
//                     item.image
//                       ? { uri: item.image.startsWith('//') ? `https:${item.image}` : item.image }
//                       : { uri: fallbackImage }
//                   }
//                   style={styles.itemImage}
//                 />
//                 <View style={styles.itemDetails}>
//                   <Text style={styles.itemName}>{item.name}</Text>
//                   <Text style={styles.itemPrice}>₹ {item.price}</Text>
//                 </View>
//               </View>
//             );
//           }}
//         />
//       </View>
//       <View style={styles.footer}>
//         <TouchableOpacity style={styles.checkoutButton} onPress={handle} >
//           <Text style={styles.checkoutText}>Post the picture</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//   },
//   cartItems: {
//     flex: 1,
//   },
//   itemContainer: {
//     width: '100%',
//     height: 70,
//     flexDirection: 'row',
//     marginTop: 10,
//     backgroundColor: '#fff',
//     borderRadius: 8,
//     padding: 10,
//     marginBottom: 10,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 2,
//     elevation: 2,
//   },
//   itemImage: {
//     width: 50,
//     height: 50,
//     borderRadius: 8,
//     marginRight: 10,
//   },
//   itemDetails: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   itemName: {
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   itemPrice: {
//     fontSize: 14,
//     color: 'green',
//     marginTop: 5,
//   },
//   totalContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 20,
//     borderTopWidth: 0.5,
//     borderColor: '#ccc',
//     backgroundColor: '#fff',
//   },
//   totalText: {
//     fontSize: 18,
//     fontWeight: '500',
//   },
//   totalAmount: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#333',
//   },
//   footer: {
//     marginBottom: 20,
//     padding: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   checkoutButton: {
//     backgroundColor: '#4CAF50',
//     paddingVertical: 15,
//     paddingHorizontal: 30,
//     borderRadius: 10,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 5,
//     elevation: 5,
//   },
// });

// export default Insta;




import React, { useRef } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { FlatList } from 'react-native-gesture-handler';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';
import RNFS from 'react-native-fs';

const Insta = () => {
  const wishdata = useSelector((state) => state.reducers2 || []);
  const viewShotRef = useRef();

  const handlePostToInsta = async () => {
    try {
      const uri = await viewShotRef.current.capture();
      console.log('Captured Image URI:', uri);

      const shareOptions = {
        title: 'Post to Instagram Story',
        url: uri,
        type: 'image/jpeg',
        social: Share.Social.INSTAGRAM,
        message: 'Check out my wishlist!',
      };

      const isInstagramAvailable = await Share.isPackageInstalled('com.instagram.android');

      if (isInstagramAvailable) {
        
        await Share.shareSingle(shareOptions);
        Alert.alert('Success', 'Posted the picture to Instagram!');
      } else {
        
        const fileName = `wishlist_${Date.now()}.jpg`;
        const filePath = `${RNFS.DownloadDirectoryPath}/${fileName}`;

        await RNFS.copyFile(uri, filePath);
        Alert.alert('Saved Locally', `Image saved to your device:\n${filePath}`);
        console.log('Image saved to:', filePath);
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An error occurred. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
    
      <ViewShot ref={viewShotRef} style={styles.cartItems} options={{ format: 'jpg', quality: 0.9 }}>
        <FlatList
          data={wishdata}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Image
                source={
                  item.image
                    ? { uri: item.image.startsWith('//') ? `https:${item.image}` : item.image }
                    : require('../images/default.jpg') 
                }
                style={styles.itemImage}
              />
              <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>₹ {item.price}</Text>
              </View>
            </View>
          )}
        />
      </ViewShot>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.checkoutButton} onPress={handlePostToInsta}>
          <Text style={styles.checkoutText}>Post the picture</Text>
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
  footer: {
    marginBottom: 20,
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
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Insta;
