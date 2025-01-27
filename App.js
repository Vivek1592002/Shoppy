// import { View, Text } from 'react-native'
// import React from 'react'
// import AppNavigator from './android/src/AppNavigator'
// import MainContainer from './android/src/MainContainer'
// import { Provider } from 'react-redux'
// import store from './android/src/redux/store/Store'
// const App = () => {
//   return (
//       <Provider store = {store}>
      
//         <MainContainer/>
      
//       </Provider>
//   )
// }

// export default App


// App.js
import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";
import MainContainer from "./android/src/MainContainer";
import configureStore from "./android/src/redux/store/Store";
import { Text,View, ActivityIndicator } from "react-native";

const App = () => {
  const [store, setStore] = useState(null);

  useEffect(() => {
    const setupStore = async () => {
      const configuredStore = await configureStore();
      setStore(configuredStore);
    };
    setupStore();
  }, []);

  if (!store) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    ); // Loading screen while store is being set up
  }

  return (
    <Provider store={store}>
      <MainContainer />
    </Provider>
  );
};

export default App;
