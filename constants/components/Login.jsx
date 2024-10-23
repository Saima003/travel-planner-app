import { Image, StyleSheet, Text, View } from 'react-native';
import React, { useRef, useState } from 'react';
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Login = () => {
  const sheetRef = useRef(null);
  // const [isOpen, setIsOpen] = useState(true);
  const snapPoints = ["40%","60%"];

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
          <Text style={{textAlign:"center"}}>Login Gaizzz</Text>
          </BottomSheetView>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
}

export default Login;

const styles = StyleSheet.create({});
