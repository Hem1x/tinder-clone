import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAGGVdKyEAJvg45V5FH7YJB4PP7a3rstxo',
  authDomain: 'atomic-horizon-389117.firebaseapp.com',
  projectId: 'atomic-horizon-389117',
  storageBucket: 'atomic-horizon-389117.appspot.com',
  messagingSenderId: '996128480693',
  appId: '1:996128480693:web:e781c3ac5f76f2f4304dfc',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
