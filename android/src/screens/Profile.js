import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = () => {
  const [profileImage, setProfileImage] = useState(require('../images/profile.png')); 

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

  const handleImageUpload = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, async (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.error('Image Picker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const selectedImage = { uri: response.assets[0].uri };

        try {
          await AsyncStorage.setItem('profileImage', response.assets[0].uri);
          setProfileImage(selectedImage); 
        } catch (error) {
          console.error('Failed to save profile image:', error);
        }
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Profile</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Image
            source={require('../images/settings.png')}
            style={styles.settingsIcon}
          />
        </TouchableOpacity>
      </View>

      {/* Profile Image */}
      <TouchableOpacity onPress={handleImageUpload}>
        <Image
          source={profileImage}
          style={styles.profileImage}
        />
      </TouchableOpacity>

      {/* Profile Name */}
      <Text style={styles.profileName}>Vivek Shekhawat</Text>
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
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 40, // Circular image
  },
  profileName: {
    alignSelf: 'center',
    marginTop: 20,
    fontSize: 19,
  },
});

export default Profile;
