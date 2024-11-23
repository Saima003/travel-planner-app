import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from 'expo-router'
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Colors } from '../../constants/Colors';
import { SelectTravellersList } from '../../constants/Options';
const SelectTraveler = () => {
    const navigation = useNavigation();
    useEffect(()=>{
        navigation.setOptions({
            headerShown: true,
            headerTransparent:true,
            headerTitle: ""
        })
    },[])
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
    <View style={{padding:25, paddingTop:50, backgroundColor:Colors.WHITE, height:"100%"}}>
      <Text style={{fontSize:35, fontFamily:"outfit-bold", marginTop:20}}>Who's Travelling</Text>
      <View style={{marginTop:20}}>
        <Text style={{fontFamily:"outfit-bold", fontSize:20}}>Choose your travelers</Text>
      </View>
      <FlatList data={{SelectTravellersList}} renderItem={(item, index) => {
        <View>
            
        </View>
      }}/>
    </View>
    </SafeAreaView>
    </SafeAreaProvider>
    
  )
}

export default SelectTraveler

const styles = StyleSheet.create({})