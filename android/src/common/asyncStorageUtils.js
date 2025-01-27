import AsyncStorage from '@react-native-async-storage/async-storage';

// Save state to AsyncStorage
export const saveToAsyncStorage = async (state) => {
  try {
    const serializedState = JSON.stringify(state);
    await AsyncStorage.setItem('appState', serializedState);
  } catch (error) {
    console.error('Error saving state to AsyncStorage:', error);
  }
};

// Load state from AsyncStorage
export const loadFromAsyncStorage = async () => {
  try {
    const serializedState = await AsyncStorage.getItem('appState');
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch (error) {
    console.error('Error loading state from AsyncStorage:', error);
    return undefined;
  }
};
