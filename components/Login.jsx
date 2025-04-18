import 'react-native-gesture-handler';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import React, { useEffect, useRef, useState } from 'react';
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Colors } from '../constants/Colors';
import { useRouter } from 'expo-router';

const Login = () => {
  const sheetRef = useRef(null);
  const [isExtended, setIsExtended] = useState(false); // State to track if the sheet is extended
  const router = useRouter();
  const snapPoints = ["40%", "70%"];

  useEffect(() => {
    sheetRef.current?.snapToIndex(0);
  }, []);
  return (    
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Image
          source={require("../assets/images/WhatsApp Image 2024-10-16 at 9.08.47 PM.jpg")}
          style={{ width: "100%", height: "100%" }}
        />
        <BottomSheet
          ref={sheetRef}
          index={0}
          snapPoints={snapPoints}
          enablePanDownToClose={false} // Allow closing by dragging down
          onChange={(index) => {
            if (index > 0) {
              setIsExtended(true);
            } else {
              setIsExtended(false);
            }
          }}
        >
          <BottomSheetView>
            <Text style={styles.title}>Travel Planner</Text>
            <Text style={styles.description}>
              Discover your next adventure effortlessly. Personalized itineraries at your fingertips. Travel smarter with AI-driven insights.
            </Text>

            {/* Login and Signup Buttons */}
            <TouchableOpacity
              style={styles.loginbutton}
              onPress={() => router.push("/auth/sign-in")}
            >
              <Text style={{ color: Colors.WHITE, textAlign: "center", fontFamily: "outfit", fontSize: 17 }}>Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.signupbutton}
              onPress={() => router.push("/auth/sign-up")}
            >
              <Text style={{ color: Colors.PRIMARY, textAlign: "center", fontFamily: "outfit", fontSize: 17 }}>Sign Up</Text>
            </TouchableOpacity>

            {/* Additional Info - Show only if the bottom sheet is extended */}
            {isExtended && (
              <>
                <Text style={styles.additionalInfoTitle}>More About Our App</Text>
                <Text style={styles.additionalInfo}>
                With our Travel Planner app, you can create personalized travel plans tailored to your interests and budget. Easily explore top destinations.
                </Text>
              </>
            )}
          </BottomSheetView>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
}

export default Login;

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontFamily: "outfit-bold",
    fontSize: 28,
    marginTop: 20,
  },
  description: {
    textAlign: "center",
    fontFamily: "outfit",
    fontSize: 18,
    color: Colors.GRAY,
    paddingHorizontal: 10,
  },
  loginbutton: {
    padding: 12,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 99,
    marginVertical: "5%",
    marginHorizontal: "5%"
  },
  signupbutton: {
    padding: 10,
    backgroundColor: Colors.WHITE,
    color: Colors.PRIMARY,
    borderColor: Colors.PRIMARY,
    borderWidth: 2,
    borderRadius: 99,
    marginBottom: "10%",
    marginHorizontal: "5%"
  },
  additionalInfoTitle: {
    marginTop: 20,
    fontSize: 22,
    fontFamily: "outfit-bold",
    textAlign: "center",
  },
  additionalInfo: {
    marginVertical: 10,
    fontSize: 16,
    fontFamily: "outfit",
    color: Colors.GRAY,
    textAlign: "center",
    paddingHorizontal: 10,
  },
});
