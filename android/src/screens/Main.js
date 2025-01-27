// import { View, Text, TouchableOpacity, Image } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useNavigation } from '@react-navigation/native';
// import Head from './Head';
// import { products } from '../Products';
// import { FlatList, ScrollView } from 'react-native-gesture-handler';
// import ItemCard from '../common/ItemCard';

// const Main = () => {
//   const navigation = useNavigation();
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     setCategories(products.category || []); 
//   }, []);

//   return (
//     <ScrollView style={{ flex: 1 }}>
//       <View style={{ flex: 1 }}>
//         <Head />
//         <Image
//           source={require('../images/nayi.jpg')}
//           style={{
//             width: '99%',
//             height: 220,
//             borderRadius: 10,
//             alignSelf: 'center',
//           }}
//         />
//         <View style={{ marginTop: 20 }}>
//           <FlatList
//             data={categories}
//             horizontal
//             showsHorizontalScrollIndicator={false}
//             renderItem={({ item }) => (
//               <TouchableOpacity
//                 style={{
//                   padding: 10,
//                   borderWidth: 1,
//                   marginLeft: 20,
//                   borderRadius: 20,
//                 }}
//               >
//                 <Text style={{ color: '#000' }}>{item.category}</Text>
//               </TouchableOpacity>
//             )}
//           />
//         </View>
//         {categories.map((category) => (
//           <View style={{ marginTop: 20 }}>
//             <Text
//               style={{
//                 margin: 20,
//                 color: '#000',
//                 fontSize: 16,
//                 fontWeight: '600',
//               }}
//             >
//               {category.category}
//             </Text>
//             <FlatList
//               data={category.data}
//               horizontal
//               showsHorizontalScrollIndicator={false}
//               renderItem={({ item }) => <ItemCard item={item} />}
//             />
//           </View>
//         ))}
//       </View>
//     </ScrollView>
//   );
// };

// export default Main;

import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Head from './Head';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import ItemCard from '../common/ItemCard';
import { useDispatch } from 'react-redux';
import { addItemToCart, addToWishList ,removeFromWishList} from '../redux/actions/Actions';
import { SafeAreaView } from 'react-native-safe-area-context';

const SPACE_ID = 'hn7gf8i5a9fi'; 
const ACCESS_TOKEN = 'YRJjo0bUtuMfBntHKDJNwg4pMQHAqgU71KzF1FDPiQY';
const BASE_URL = `https://cdn.contentful.com/spaces/${SPACE_ID}`;

const Main = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [categories, setCategories] = useState([]);
  const [bannerImages, setBannerImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const goToCart = () => {
    navigation.navigate('Cart');
  };

  useEffect(() => {
    const fetchCategoriesWithProducts = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/entries?content_type=category&access_token=${ACCESS_TOKEN}&include=2`
        );
        const data = await response.json();

        const allImages = [];
        const formattedCategories = data.items.map((item) => {
          const { category, data: productLinks } = item.fields;

          const products = productLinks.map((productLink) => {
            const product = data.includes.Entry.find(
              (entry) => entry.sys.id === productLink.sys.id
            );

            const imageId = product.fields.image?.sys.id;
            const imageAsset = data.includes.Asset.find(
              (asset) => asset.sys.id === imageId
            );
            const imageUrl = imageAsset?.fields?.file?.url || '';

            if (imageUrl) {
              allImages.push(`https:${imageUrl}`);
            }

            return {
              name: product.fields.name || 'Unknown',
              price: product.fields.price || 0,
              gender: product.fields.gender || 'Unspecified',
              image: `https:${imageUrl}`, 
            };
          });

          return {
            category: category || 'Uncategorized',
            data: products,
          };
        });

        setCategories(formattedCategories);
        setBannerImages(allImages);
      } catch (error) {
        console.error('Error fetching data from Contentful:', error);
      }
    };

    fetchCategoriesWithProducts();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        (prevIndex + 1) % bannerImages.length
      );
    }, 3000); 
    return () => {
      clearInterval(interval);
    };

  }, [bannerImages]);

  return (
    <SafeAreaView style={styles.container}>
      <Head imagesource={require('../images/checkout.png')} title={"SHOPPY"} destiny={goToCart} />
      <ScrollView style={styles.scrollView}>
        <View style={styles.mainView}>
          {bannerImages.length > 0 && (
            <View style={{width:'100%',height:220}}><Image
              source={{ uri: bannerImages[currentImageIndex] }}
              style={styles.bannerImage}
            /></View>
          )}
          <View style={styles.categoryListContainer}>
            <FlatList
              data={categories}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => `category-${index}`}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.categoryButton}>
                  <Text style={styles.categoryText}>{item.category}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
          {categories.map((category, index) => (
            <View key={`category-${index}`} style={styles.categoryContainer}>
              <Text style={styles.categoryTitle}>{category.category}</Text>
              <FlatList
                data={category.data}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => `product-${index}`}
                renderItem={({ item }) => (
                  <ItemCard
                    item={item}
                    onAddWishList={(x) => dispatch(addToWishList(x))}
                    onAddToCart={(x) => dispatch(addItemToCart(x))}
                    onRemoveWishList={(x) => dispatch(removeFromWishList(index))}
                  />
                )}
              />
            </View>
          ))}
        </View>
        <View style={styles.footerSpacer}></View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  mainView: {
    flex: 1,
  },
  bannerImage: {
    width: '60%',
    height: '100%',
    elevation:10,
    marginbottom:10,
    alignSelf: 'center',
  },
  categoryListContainer: {
    marginTop: 20,
  },
  categoryButton: {
    padding: 10,
    borderWidth: 1,
    marginLeft: 20,
    borderRadius: 20,
  },
  categoryText: {
    color: '#000',
  },
  categoryContainer: {
    marginTop: 20,
  },
  categoryTitle: {
    margin: 20,
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
  footerSpacer: {
    width: '100%',
    height: 70,
  },
});

export default Main;
