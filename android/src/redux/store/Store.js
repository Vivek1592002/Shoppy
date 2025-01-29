// import { createStore } from "redux";
// import { combineReducers } from "redux";
// import reducers2 from "../reducers/Reducer2";
// import reducers1 from "../reducers/Reducers";
// const routeReducer = combineReducers({reducers1,reducers2})
// const store= createStore(routeReducer);
// export default store;



// src/redux/store/Store.js
// import { createStore, combineReducers } from "redux";
// import reducers2 from "../reducers/Reducer2";
// import reducers1 from "../reducers/Reducers";
// import { saveToAsyncStorage,loadFromAsyncStorage } from "../../common/asyncStorageUtils";
// // Combine reducers
// const rootReducer = combineReducers({

//   reducers1,
//   reducers2,
// });

// // Function to configure the store
// const configureStore = async () => {
//   const preloadedState = await loadFromAsyncStorage(); // Load persisted state from AsyncStorage
//   const store = createStore(rootReducer, preloadedState);

//   // Save state to AsyncStorage whenever it changes
//   store.subscribe(() => {
//     saveToAsyncStorage(store.getState());
//   });

//   return store;
// };

// export default configureStore;



import { createStore ,combineReducers} from "redux";
import { saveToAsyncStorage, loadFromAsyncStorage } from "../../common/asyncStorageUtils";
import reducers1 from "../reducers/Reducers";
import reducers2 from "../reducers/Reducer2";

// Combine reducers
const appReducer = combineReducers({
  reducers1,
  reducers2,
});

// Root reducer to handle logout and reset state
const rootReducer = (state, action) => {
  if (action.type === "LOGOUT") {
    state = undefined; // Reset state to initial state
  }
  return appReducer(state, action);
};

// Function to configure the store
const configureStore = async () => {
  const preloadedState = await loadFromAsyncStorage(); // Load persisted state from AsyncStorage
  const store = createStore(rootReducer, preloadedState);

  // Save state to AsyncStorage whenever it changes
  store.subscribe(() => {
    saveToAsyncStorage(store.getState());
  });

  return store;
};

export default configureStore;
