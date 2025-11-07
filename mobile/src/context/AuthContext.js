import React, { createContext, useContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authAPI } from '../utils/api';

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, loading: true, error: null };
    case 'LOGIN_SUCCESS':
      return { ...state, loading: false, user: action.payload, isAuthenticated: true };
    case 'LOGIN_FAILURE':
      return { ...state, loading: false, error: action.payload, isAuthenticated: false };
    case 'LOGOUT':
      return { ...state, user: null, isAuthenticated: false };
    case 'UPDATE_USER':
      return { ...state, user: { ...state.user, ...action.payload } };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  });

  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const user = await AsyncStorage.getItem('user');
      
      if (token && user) {
        dispatch({ type: 'LOGIN_SUCCESS', payload: JSON.parse(user) });
      }
    } catch (error) {
      console.error('Error checking auth state:', error);
    }
  };

  const login = async (credentials) => {
    dispatch({ type: 'LOGIN_START' });
    try {
      const response = await authAPI.login(credentials);
      const { token, user } = response.data;
      
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('user', JSON.stringify(user));
      
      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      dispatch({ type: 'LOGIN_FAILURE', payload: message });
      return { success: false, error: message };
    }
  };

  const register = async (userData) => {
    dispatch({ type: 'LOGIN_START' });
    try {
      const response = await authAPI.register(userData);
      const { token, user } = response.data;
      
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('user', JSON.stringify(user));
      
      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed';
      dispatch({ type: 'LOGIN_FAILURE', payload: message });
      return { success: false, error: message };
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
  };

  const updateUser = async (userData) => {
    const updatedUser = { ...state.user, ...userData };
    await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
    dispatch({ type: 'UPDATE_USER', payload: userData });
  };

  return (
    <AuthContext.Provider value={{
      ...state,
      login,
      register,
      logout,
      updateUser,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};