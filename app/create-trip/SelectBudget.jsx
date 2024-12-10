import { FlatList, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';
import { SelectBudgetOptions } from '../../constants/Options';
import OptionCard from "./../../components/CreateTrip/OptionCard"
import { CreateTripContext } from '../../context/CreateTripContext';
const SelectBudget = () => {
    const navigation = useNavigation()
    const router = useRouter()
    const [selectedOption, setSelectedOption] = useState();
  const {tripData, setTripData}= useContext(CreateTripContext)

    useEffect(()=>{
        navigation.setOptions({
            headerShown:true,
            headerTransparent:true,
            headerTitle:""
        })
    },[])

    useEffect(()=>{
      selectedOption && setTripData({
        ...tripData,
        budget:selectedOption?.title
      })
    },[selectedOption])

    const onContinueClick = () =>{
      if(!selectedOption){
        ToastAndroid.show("Please Select Your Budget!", ToastAndroid.LONG)
        return;
      }
      router.push("./ReviewTrip")
    }
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
    <View style={{padding: 30 ,paddingTop:50, height:"100%", backgroundColor:Colors.WHITE}}>
      <Text style={{fontFamily:"outfit-bold", fontSize:35, marginTop:20}}>Budget</Text>
      <View style={{marginTop:20}}>
        <Text style={{fontFamily:"outfit-bold", fontSize:20}}>Choose Spending Habits for your Trip</Text>
      </View>
      <FlatList data={SelectBudgetOptions} renderItem={({item, index})=> (
        <TouchableOpacity onPress={() => setSelectedOption(item)} style={{marginVertical:10}}>
            <OptionCard option={item} selectedOption={selectedOption}/>
            </TouchableOpacity>
      )}/>
      <TouchableOpacity onPress={() => onContinueClick()} style={{padding:15, backgroundColor:Colors.PRIMARY, borderRadius:15,}}>
            <Text style={{textAlign:"center", color: Colors.WHITE, fontFamily:"outfit-medium", fontSize:20 }}>Continue</Text>
          </TouchableOpacity>
    </View>
    </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default SelectBudget

const styles = StyleSheet.create({})