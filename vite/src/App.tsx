import { RouterProvider } from 'react-router-dom';

// routing
import router from './routes';

// project imports
import Locales from './ui-component/Locales';
import NavigationScroll from './layout/NavigationScroll';
// import RTLLayout from '../ui-component/RTLLayout';
import Snackbar from './ui-component/extended/Snackbar';
import Notistack from './ui-component/third-party/Notistack';

import ThemeCustomization from './themes';

// auth provider
// import { JWTProvider as AuthProvider } from '../contexts/JWTContext';
import { FirebaseProvider as AuthProvider } from './contexts/FirebaseContext';
// import { Auth0Provider as AuthProvider } from '../contexts/Auth0Context';
// import { AWSCognitoProvider as AuthProvider } from '../contexts/AWSCognitoContext';
// import { SupabseProvider as AuthProvider } from '../contexts/SupabaseContext';

// ==============================|| APP ||============================== //

export default function App() {
  return (
    <ThemeCustomization>
      {/* <RTLLayout> */}
      <Locales>
        <NavigationScroll>
          <AuthProvider>
            <>
              <Notistack>
                <RouterProvider router={router} />
                <Snackbar />
              </Notistack>
            </>
          </AuthProvider>
        </NavigationScroll>
      </Locales>
      {/* </RTLLayout> */}
    </ThemeCustomization>
  );
}
