import { StyleSheet, Text, View } from 'react-native'
import 'react-native-gesture-handler';
import React from 'react'
import { Tabs } from 'expo-router'
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from '../../constants/Colors';
const TabLayout = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: Colors.PRIMARY }}>
          <Tabs.Screen options={{ tabBarLabel: "My Trip", tabBarIcon: ({ color }) => <Ionicons name="location-sharp" size={24} color={color} /> }} name="MyTrip" />
          <Tabs.Screen options={{ tabBarLabel: "My Trip", tabBarIcon: ({ color }) => <Ionicons name="globe-sharp" size={24} color={color} /> }} name="Discover" />
          <Tabs.Screen options={{ tabBarLabel: "My Trip", tabBarIcon: ({ color }) => <Ionicons name="people-circle" size={24} color={color} /> }} name="Profile" />
        </Tabs>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default TabLayout

const styles = StyleSheet.create({})