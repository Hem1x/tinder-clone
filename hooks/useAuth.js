import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { auth } from '../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        setUser(null);
      } else {
        setUser(user);
      }
      console.log(user);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: user,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
