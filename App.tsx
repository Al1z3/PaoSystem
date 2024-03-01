import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/view/Home'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import myCard from './src/view/myCard';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';
import store from './src/store/configureStore'
import Cours from './src/view/Cours'
import Profile from './src/view/Profile'
import React, { useState, useEffect } from 'react';
import Auth from './src/components/Auth';
import Account from './src/components/Account';
import { supabase } from './src/lib/supabase';
import { Session } from '@supabase/supabase-js';

export default function App() {

  const renderProfileComponent = () => {
    return session && session.user ? () => <Account key={session.user.id} session={session} /> : () => <Auth />;
};

  const [session, setSession] = useState<Session | null>(null);
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])
  const Tab= createBottomTabNavigator();
  let persistor = persistStore(store);


  
  return (
    <>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
     <NavigationContainer>
     <Tab.Navigator
     screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: ({color, size }) => {

        if (route.name === 'Home') {
          return <FontAwesome name="home" size={size} color={color} />
           
        } else if (route.name === 'myCard') {
          return <MaterialCommunityIcons name="cards-playing" size={size} color={color} />
        }else if (route.name === 'Cours') {
          return <FontAwesome name="book" size={size} color={color} /> }
       
        else if (route.name === 'Profile') {
        return <FontAwesome name="user" size={size} color={color} /> }
     
    },
      tabBarActiveTintColor: 'tomato',
      tabBarInactiveTintColor: '#553159',
      tabBarStyle: {
        backgroundColor: '#BDB0D9',
        
      },
    })}>
      <Tab.Screen name="Home" component={Home}/>
      <Tab.Screen name="myCard" component={myCard}/>
      <Tab.Screen name="Cours" component={Cours}/>
      <Tab.Screen name="Profile" component={renderProfileComponent()} />
     </Tab.Navigator>
    </NavigationContainer>
    </PersistGate>
    </Provider>
    </>
)}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

