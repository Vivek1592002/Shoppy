import { UserProvider } from './common/UserContext';
import AppNavigator from './AppNavigator';

const MainContainer = () => {
 

  return ( <UserProvider>
    <AppNavigator/>
  </UserProvider>);
};

export default MainContainer;
