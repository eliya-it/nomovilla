import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import { getAuth, User as FirebaseUser } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY as string,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN as string,
  projectId: import.meta.env.VITE_PROJECT_ID as string,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET as string,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID as string,
  appId: import.meta.env.VITE_APP_ID as string,
};

export interface CustomUser extends FirebaseUser {
  accessToken: string;
  name: string | null;
  token: string;
  stsTokenManager?: any; // Adjust based on your actual implementation
}
export interface User {
  name: string | "";
  email: string | "";
  displayName?: string;
  accessToken?: string;
  token: string;
  uid: string;
  stsTokenManager: string;
  expiresIn?: number;
  emailVerified?: boolean;
}
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const user = auth.currentUser;

export default app;
