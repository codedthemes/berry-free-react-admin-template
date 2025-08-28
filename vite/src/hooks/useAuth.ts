import { use } from 'react';

// auth provider
// import AuthContext from '../contexts/JWTContext';
import AuthContext from '../contexts/FirebaseContext';
// import AuthContext from '../contexts/FirebaseContext';
// import AuthContext from '../contexts/Auth0Context';
// import AuthContext from '../contexts/AWSCognitoContext';
// import AuthContext from '../contexts/SupabaseContext';

// ==============================|| AUTH HOOKS ||============================== //

export default function useAuth() {
  const context = use(AuthContext);

  if (!context) throw new Error('context must be use inside provider');

  return context;
}
