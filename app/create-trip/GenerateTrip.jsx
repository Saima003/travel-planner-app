import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Colors } from '../../constants/Colors';
import { CreateTripContext } from '../../context/CreateTripContext';

const GenerateTrip = () => {
  const {tripData, setTripData}= useContext(CreateTripContext)
    
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
      <View style={{padding: 30 ,paddingTop:50, height:"100%", backgroundColor:Colors.WHITE}}>
      <Text style={{fontFamily:"outfit-bold", fontSize:35, textAlign:"center"}}>Please Wait...</Text>
      <Text style={{fontFamily:"outfit-bold", fontSize:20, textAlign:"center", marginTop:40}}>We are creating your trip!</Text>
    <Image source={require("./../../assets/images/plane.gif")} style={{height:"50%", width:"100%", marginTop:60, objectFit:"contain"}}/>
    <Text style={{fontFamily:"outfit", color:Colors.GRAY, fontSize:20, textAlign:"center"}}>Do Not Go Back!</Text>
    </View>
    </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default GenerateTrip

const styles = StyleSheet.create({})