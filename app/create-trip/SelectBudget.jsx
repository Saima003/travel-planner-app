import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from 'expo-router';
import { Colors } from '../../constants/Colors';
import { SelectBudgetOptions } from '../../constants/Options';
import OptionCard from "./../../components/CreateTrip/OptionCard"
const SelectBudget = () => {
    const navigation = useNavigation()
    const [selectedOption, setSelectedOption] = useState();
    useEffect(()=>{
        navigation.setOptions({
            headerShown:true,
            headerTransparent:true,
            headerTitle:""
        })
    },[])
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
    <View style={{padding: 30 ,paddingTop:50, height:"100%", backgroundColor:Colors.WHITE}}>
      <Text style={{fontFamily:"outfit-bold", fontSize:35, marginTop:20}}>Budget</Text>
      <View style={{marginTop:20}}>
        <Text style={{fontFamily:"outfit-bold", fontSize:20}}>Choose Spending Habits for your Trip</Text>
      </View>
      <FlatList data={SelectBudgetOptions} renderItem={({item, index})=> (
        <View>
            <OptionCard option={item} selectedOption={selectedOption}/>
            </View>
      )}/>
    </View>
    </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default SelectBudget

const styles = StyleSheet.create({})