import { useFonts } from "expo-font";
import { Stack } from "expo-router";

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
  return (
    <Stack screenOptions={{headerShown: false}}>
    <Stack.Screen name="(tabs)"/>
    {/* <Stack.Screen name="index"/> */}
    </Stack>
  );
}
