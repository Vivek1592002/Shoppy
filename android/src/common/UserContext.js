import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      const savedUser = await AsyncStorage.getItem('user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    };
    loadUser();
  }, []);

  const login = async (userData) => {
    setUser(userData);
    await AsyncStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem('user');
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
