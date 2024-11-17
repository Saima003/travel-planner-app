import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { auth } from './../assets/configs/FirebaseConfig'; // Firebase config import
import Login from "../constants/components/Login"; // Your login component
import { Redirect } from "expo-router"; // Import Redirect for navigation
import { User } from 'firebase/auth'; // Import User type from Firebase

const Index = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user); // Correctly update state with User or null
    });

    return () => unsubscribe();
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
    <View style={{ flex: 1 }}>
      {!user ? (
        <Login />
      ) : (
        <Redirect href="/MyTrip" />
      )}
    </View>
    </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Index;
