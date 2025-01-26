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

import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Head from './Head';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import ItemCard from '../common/ItemCard';

const SPACE_ID = 'hn7gf8i5a9fi'; 
const ACCESS_TOKEN = 'YRJjo0bUtuMfBntHKDJNwg4pMQHAqgU71KzF1FDPiQY';
const BASE_URL = `https://cdn.contentful.com/spaces/${SPACE_ID}`;

const Main = () => {
  const navigation = useNavigation();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategoriesWithProducts = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/entries?content_type=category&access_token=${ACCESS_TOKEN}&include=2`
        );
        const data = await response.json();

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
      } catch (error) {
        console.error('Error fetching data from Contentful:', error);
      }
    };

    fetchCategoriesWithProducts();
  }, []);

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Head />
        <Image
          source={require('../images/nayi.jpg')}
          style={{
            width: '99%',
            height: 220,
            borderRadius: 10,
            alignSelf: 'center',
          }}
        />
        <View style={{ marginTop: 20 }}>
          <FlatList
            data={categories}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => `category-${index}`}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{
                  padding: 10,
                  borderWidth: 1,
                  marginLeft: 20,
                  borderRadius: 20,
                }}
              >
                <Text style={{ color: '#000' }}>{item.category}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
        {categories.map((category, index) => (
          <View key={`category-${index}`} style={{ marginTop: 20 }}>
            <Text
              style={{
                margin: 20,
                color: '#000',
                fontSize: 16,
                fontWeight: '600',
              }}
            >
              {category.category}
            </Text>
            <FlatList
              data={category.data}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => `product-${index}`}
              renderItem={({ item }) => <ItemCard item={item} />}
            />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default Main;
