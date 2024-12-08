import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import {CreateTripContext} from "./../context/CreateTripContext"
import { useState } from "react";

export default function RootLayout() {
  useFonts({
    "outfit": require("./../assets/fonts/Outfit-Regular.ttf"),
    "outfit-semibold": require("./../assets/fonts/Outfit-SemiBold.ttf"),
    "outfit-bold": require("./../assets/fonts/Outfit-Bold.ttf"),
    "outfit-medium": require("./../assets/fonts/Outfit-Medium.ttf"),
  })
  {/* // 
  {/* // <Stack>
  <Stack.Screen name="index"/> */}
  const [tripData, setTripData] = useState([])
  return (
    <CreateTripContext.Provider value={{tripData, setTripData}}>
    <Stack screenOptions={{headerShown: false}}>
    <Stack.Screen name="(tabs)"/>
    {/* <Stack.Screen name="index"/> */}
    </Stack>
    </CreateTripContext.Provider>
  );
}
