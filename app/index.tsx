import { Text, View } from "react-native";
import Login from "../constants/components/Login"
import { auth } from "./../assets/configs/FirebaseConfig"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
export default function Index() {
  const user = auth.currentUser;
  console.log(user, "user")
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <View>

          {/* {
            user === null ?
            <Login />
            : */}
            <Redirect href={"/MyTrip"} />
          {/* } */}

        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
