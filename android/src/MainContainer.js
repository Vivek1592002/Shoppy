
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useEffect } from 'react';
import { UserProvider } from './common/UserContext';
import AppNavigator from './AppNavigator';

// const configureGoogleSignin = () => {
//   GoogleSignin.configure({
//     webClientId: '939948783552-j4qjkmfra0k4ri5o6vgqpm87l24i914k.apps.googleusercontent.com', // Replace with your Web Client ID from Google Cloud Console
//     offlineAccess: true,
//   });
// };

const MainContainer = () => {
  // useEffect(() => {
  //   configureGoogleSignin();
  // }, []);

  return ( <UserProvider>
    <AppNavigator/>
  </UserProvider>);
};

export default MainContainer;
