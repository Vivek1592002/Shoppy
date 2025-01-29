// import React, { useState, useEffect, useContext } from 'react';
// import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { launchImageLibrary } from 'react-native-image-picker';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { UserContext } from '../common/UserContext';
// import { useNavigation } from '@react-navigation/native';


// const Profile = () => {
//   const navigation = useNavigation();
//   const { user, logout } = useContext(UserContext);
//   const [profileImage, setProfileImage] = useState(require('../images/profile.png')); 
//   const handleLogout = () => {
//     logout();
//     setProfileImage(require('../images/profile.png'));
//     navigation.replace('Login');
//   };
//   useEffect(() => {
//     const loadProfileImage = async () => {
//       try {
//         const savedImageUri = await AsyncStorage.getItem('profileImage');
//         if (savedImageUri) {
//           setProfileImage({ uri: savedImageUri });
//         }
//       } catch (error) {
//         console.error('Failed to load profile image:', error);
//       }
//     };

//     loadProfileImage();
//   }, []);

//   const handleImageUpload = () => {
//     const options = {
//       mediaType: 'photo',
//       quality: 1,
//     };

//     launchImageLibrary(options, async (response) => {
//       if (response.didCancel) {
//         console.log('User cancelled image picker');
//       } else if (response.errorCode) {
//         console.error('Image Picker Error: ', response.errorMessage);
//       } else if (response.assets && response.assets.length > 0) {
//         const selectedImage = { uri: response.assets[0].uri };

//         try {
//           await AsyncStorage.setItem('profileImage', response.assets[0].uri);
//           setProfileImage(selectedImage); 
//         } catch (error) {
//           console.error('Failed to save profile image:', error);
//         }
//       }
//     });
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <Text style={styles.headerText}>Profile</Text>
//         <TouchableOpacity style={styles.settingsButton} onPress={handleLogout}>
//           <Image
//             source={require('../images/settings.png')}
//             style={styles.settingsIcon}
//           />
//         </TouchableOpacity>
//       </View>

//       {/* Profile Image */}
//       <TouchableOpacity onPress={handleImageUpload}>
//         <Image
//           source={profileImage}
//           style={styles.profileImage}
//         />
//       </TouchableOpacity>

//       {/* Profile Name */}
//       <Text style={styles.profileName}>Vivek Shekhawat</Text>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1 },
//   header: {
//     width: '100%',
//     height: 70,
//     justifyContent: 'space-between',
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   headerText: { fontWeight: '600', fontSize: 19, marginLeft: 15 },
//   settingsButton: {
//     width: 30,
//     height: 30,
//     marginRight: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   settingsIcon: { width: 24, height: 24 },
//   profileImage: {
//     width: 80,
//     height: 80,
//     alignSelf: 'center',
//     marginTop: 20,
//     borderRadius: 40, // Circular image
//   },
//   profileName: {
//     alignSelf: 'center',
//     marginTop: 20,
//     fontSize: 19,
//   },
// });

// export default Profile;

import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from '../common/UserContext';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import reducers1 from '../redux/reducers/Reducers';
import { LOGOUT } from '../redux/ActionTypes';


const Profile = () => {
  const navigation = useNavigation();
  const { user, logout } = useContext(UserContext);
  const dispatch = useDispatch();
  const defaultImage = require('../images/profile.png');
  const [profileImage, setProfileImage] = useState(defaultImage);

  useEffect(() => {
    const loadProfileImage = async () => {
      try {
        const savedImageUri = await AsyncStorage.getItem('profileImage');
        if (savedImageUri) {
          setProfileImage({ uri: savedImageUri });
        }
      } catch (error) {
        console.error('Failed to load profile image:', error);
      }
    };
    loadProfileImage();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.clear();
    dispatch({type: LOGOUT})
    navigation.replace('Login');
  };

  const handleImageOption = () => {
    Alert.alert(
      'Choose Image Source',
      'How would you like to set your profile picture?',
      [
        { text: 'Camera', onPress: captureImage },
        { text: 'Gallery', onPress: pickImage },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const captureImage = () => {
    launchCamera({ mediaType: 'photo', quality: 1 }, handleImageResponse);
  };

  const pickImage = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 1 }, handleImageResponse);
  };

  const handleImageResponse = async (response) => {
    if (response.didCancel) {
      console.log('User cancelled image selection');
    } else if (response.errorCode) {
      console.error('Image Picker Error: ', response.errorMessage);
    } else if (response.assets && response.assets.length > 0) {
      const selectedImageUri = response.assets[0].uri;
      setProfileImage({ uri: selectedImageUri });
      try {
        await AsyncStorage.setItem('profileImage', selectedImageUri);
      } catch (error) {
        console.error('Failed to save profile image:', error);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      
      <View style={styles.header}>
        <Text style={styles.headerText}>Profile</Text>
        <TouchableOpacity style={styles.settingsButton} onPress={handleLogout}>
          <Image source={require('../images/logout.png')} style={styles.settingsIcon} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={handleImageOption}>
        <Image source={profileImage} style={styles.profileImage} />
      </TouchableOpacity>

      <Text style={styles.profileName}>{user?.username || 'Guest'}</Text>
      <Text style={styles.profileEmail}>{user?.email || 'No Email Available'}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    width: '100%',
    height: 70,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: { fontWeight: '600', fontSize: 19, marginLeft: 15 },
  settingsButton: {
    width: 30,
    height: 30,
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsIcon: { width: 24, height: 24 },
  profileImage: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 50,
  },
  profileName: {
    alignSelf: 'center',
    marginTop: 10,
    fontSize: 18,
  },
  profileEmail: {
    alignSelf: 'center',
    fontSize: 14,
    color: 'gray',
    marginTop: 5,
  },
});

export default Profile;
