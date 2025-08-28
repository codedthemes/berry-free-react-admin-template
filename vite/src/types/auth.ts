// third party
import firebase from 'firebase/compat/app';

// project imports
import { UserProfile } from 'types/user-profile';
import { PopupLoginOptions, RedirectLoginOptions } from '@auth0/auth0-react';

type CanRemove = {
  login?: (email: string, password: string) => Promise<void>;
  register?: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  codeVerification?: (verificationCode: string) => Promise<void>;
  resendConfirmationCode?: () => Promise<void>;
  firebaseRegister?: (email: string, password: string) => Promise<firebase.auth.UserCredential>;
  firebaseEmailPasswordSignIn?: (email: string, password: string) => Promise<firebase.auth.UserCredential>;
  logoutAuth?: () => void;
  loginAuth?: (options?: PopupLoginOptions) => Promise<void>;
  loginWithRedirect?: (options?: RedirectLoginOptions) => Promise<void>;
  confirmRegister?: (email: string, code: string) => Promise<void>;
  forgotPassword?: (email: string) => Promise<void>;
  resendCodeRegister?: (email: string) => Promise<void>;
  newPassword?: (email: string, code: string, password: string) => Promise<void>;
  updatePassword?: (password: string) => Promise<void>;
  resetPassword?: (email: string) => Promise<void>;
  awsResetPassword?: (verificationCode: string, newPassword: string) => Promise<any>;
};

export type FirebaseContextType = CanRemove & {
  isLoggedIn: boolean;
  isInitialized?: boolean;
  user?: UserProfile | null | undefined;
  logout: () => Promise<void>;
  firebaseRegister: (email: string, password: string) => Promise<firebase.auth.UserCredential>;
  firebaseEmailPasswordSignIn: (email: string, password: string) => Promise<firebase.auth.UserCredential>;
  firebaseGoogleSignIn: () => Promise<firebase.auth.UserCredential>;
  firebaseTwitterSignIn: () => Promise<firebase.auth.UserCredential>;
  firebaseFacebookSignIn: () => Promise<firebase.auth.UserCredential>;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: VoidFunction;
};

export type Auth0ContextType = CanRemove & {
  isLoggedIn: boolean;
  isInitialized?: boolean;
  user?: UserProfile | null | undefined;
  logout: () => void;
  loginAuth: (options?: PopupLoginOptions) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: VoidFunction;
};

export interface JWTDataProps {
  userId: string;
}

export type JWTContextType = CanRemove & {
  isLoggedIn: boolean;
  isInitialized?: boolean;
  user?: UserProfile | null | undefined;
  logout: () => void;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: VoidFunction;
};

export type AWSCognitoContextType = CanRemove & {
  isLoggedIn: boolean;
  isInitialized?: boolean;
  user?: UserProfile | null | undefined;
  logout: () => void;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, firstName: string, lastName: string) => Promise<unknown>;
  awsResetPassword: (verificationCode: string, newPassword: string) => Promise<any>;
  forgotPassword: (email: string) => Promise<void>;
  updateProfile: VoidFunction;
};

export type SupabaseContextType = CanRemove & {
  isLoggedIn: boolean;
  isInitialized?: boolean;
  user: UserProfile | null | undefined;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
};

export interface InitialLoginContextProps {
  isLoggedIn: boolean;
  isInitialized?: boolean;
  user?: UserProfile | null | undefined;
}
