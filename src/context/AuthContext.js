import { onAuthStateChanged } from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../firebase/firebaseConfig';

const AuthContext = createContext();

// Hook for get the context
const useAuth = () => {
  return useContext(AuthContext);
}

const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);

  // check of onAuthStateChanged
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Access to service Auth FireStore
    const cancelSubscription = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return cancelSubscription;
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider, useAuth };