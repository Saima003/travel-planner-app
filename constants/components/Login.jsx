import { Image, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Colors } from '../Colors';

const Login = () => {
  const sheetRef = useRef(null);
  // const [isOpen, setIsOpen] = useState(true);
  const snapPoints = ["40%","50%"];
  useEffect(() => {
    // Open the bottom sheet when the component mounts
    sheetRef.current?.snapToIndex(0);
  }, []);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Image 
          source={require("../../assets/images/WhatsApp Image 2024-10-16 at 9.08.47 PM.jpg")} 
          style={{ width: "100%", height: "100%" }} 
        />
        <BottomSheet
          ref={sheetRef}
          snapPoints={snapPoints}
          enablePanDownToClose={false}
        >
          <BottomSheetView>
          <Text style={{textAlign:"center", fontFamily:"outfit-bold", fontSize:28}}>AI Travel Planner</Text>
          <Text style={{textAlign:"center", fontFamily:"outfit", fontSize:18, color:Colors.GRAY}}>Discover your next adventure effortlessly.Personalized itineraries at your fingertips.Travel smarter with AI-driven insights.</Text>
          <View style={styles.loginbutton}>
            <Text style={{color:Colors.WHITE, textAlign:"center", fontFamily:"outfit", fontSize:17}}>Login</Text>
          </View>
          <View style={styles.signupbutton}>
            <Text style={{color:Colors.PRIMARY, textAlign:"center", fontFamily:"outfit", fontSize:17}}>Sign up</Text>
          </View>
          </BottomSheetView>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
}

export default Login;

const styles = StyleSheet.create({
  loginbutton:{
    padding:12,
    backgroundColor: Colors.PRIMARY,
    borderRadius:99,
    marginVertical:"5%",
    marginHorizontal:"5%"
  },
  signupbutton:{
    padding:10,
    backgroundColor: Colors.WHITE,
    color: Colors.PRIMARY,
    borderColor:Colors.PRIMARY,
    borderWidth: 2,
    borderRadius:99,
    marginBottom:"10%",
    marginHorizontal:"5%"
  }
});
