import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const Head = ({ imagesource, title, destiny }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity style={styles.button} onPress={destiny}>
        <Image source={imagesource} style={styles.image} />
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  container: {
    width: '100%',
    height: 70,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 0.2,
    backgroundColor: '#fff',
    borderBottomColor: '#8e8e8e',
    marginTop: 10,
  },
  title: {
    fontWeight: '600',
    fontSize: 20,
    color: '#000',
    marginLeft: 20,
  },
  button: {
    width: '20%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 24,
    height: 24,
  },
};

export default Head;
