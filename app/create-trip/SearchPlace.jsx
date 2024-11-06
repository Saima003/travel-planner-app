import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from 'expo-router'
import "react-native-get-random-values";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Colors } from '../../constants/Colors';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
const SearchPlace = () => {
    const navigation = useNavigation();
    useEffect(()=>{
        navigation.setOptions({
            headerShown: true,
            headerTransparent:true,
            headerTitle:"Search"
        })
    },[])
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
    <View style={{padding:25, paddingTop:75, backgroundColor:Colors.WHITE, height:"100%"}}>
    <GooglePlacesAutocomplete
      placeholder='Search here'
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log(data, details);
      }}
      query={{
        key: process.env.EXPO_PUBLIC_SEARCH_KEY,
        language: 'en',
      }}
    />
    </View>
    </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default SearchPlace

const styles = StyleSheet.create({})