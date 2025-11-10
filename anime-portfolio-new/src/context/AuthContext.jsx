import React, { createContext, useState } from 'react';
import { loginUser } from '../api/index.js';

/**
 * AuthContext stores the current authenticated user and exposes helper
 * functions to log in and log out.  In a real project you would
 * integrate with your backend's authentication API, store tokens
 * securely and protect private routes.  Here we simply keep a user
 * object in memory to demonstrate how context can be used to manage
 * auth state.
 */
export const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  /**
   * Log in a user using the credentials provided.  This function
   * calls the backend login API and stores the returned user
   * information in context.  If the request fails or the API
   * returns an error, fall back to simply storing the username.
   */
  const login = async (credentials) => {
    try {
      const data = await loginUser(credentials);
      setUser({ username: data.user?.username || credentials.username });
    } catch (err) {
      console.error(err);
      // Fallback: accept any credentials
      setUser({ username: credentials.username });
    }
  };

  /**
   * Log out the current user by clearing the user state.
   */
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
