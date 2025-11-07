import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

// Screens
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import WorkoutsScreen from './src/screens/WorkoutsScreen';
import NutritionScreen from './src/screens/NutritionScreen';
import ProfileScreen from './src/screens/ProfileScreen';

// Context
import { AuthProvider, useAuth } from './src/context/AuthContext';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
  </Stack.Navigator>
);

const MainTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        
        if (route.name === 'Dashboard') {
          iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'Workouts') {
          iconName = focused ? 'fitness' : 'fitness-outline';
        } else if (route.name === 'Nutrition') {
          iconName = focused ? 'restaurant' : 'restaurant-outline';
        } else if (route.name === 'Profile') {
          iconName = focused ? 'person' : 'person-outline';
        }
        
        return <Icon name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#16a34a',
      tabBarInactiveTintColor: 'gray',
      headerShown: false,
    })}
  >
    <Tab.Screen name="Dashboard" component={DashboardScreen} />
    <Tab.Screen name="Workouts" component={WorkoutsScreen} />
    <Tab.Screen name="Nutrition" component={NutritionScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

const AppNavigator = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <NavigationContainer>
      {isAuthenticated ? <MainTabs /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <StatusBar style="auto" />
      <AppNavigator />
    </AuthProvider>
  );
}