import { StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "./../../constants/Colors"
import CalendarPicker from "react-native-calendar-picker";
import moment from "moment"
import { CreateTripContext } from '../../context/CreateTripContext';
const SelectDates = () => {
  const navigation = useNavigation();
  const [startDate , setStartDate] = useState();
  const [endDate, setEndDate] = useState()
  const {tripData, setTripData}= useContext(CreateTripContext)
  const router = useRouter()
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: ""
    })
  }, [])

  const onDateChange = (date, type) =>{
    if(type == "START_DATE"){
      setStartDate(moment(date))
    }else{
      setEndDate(moment(date))
    }
  }

  const onDateSelect = () =>{
    if(!startDate || !endDate){
      ToastAndroid.show("Please select start and end days", ToastAndroid.LONG);
      return;
    }
    const totalNoofDays = endDate.diff(startDate, "days");
    setTripData({
      ...tripData,
      startDate:startDate,
      endDate:endDate,
      totalNoofDays:totalNoofDays+1
    })
    router.push("/create-trip/SelectBudget")
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ padding: 25, backgroundColor: Colors.WHITE, height: "100%", paddingTop: 60 }}>
          <Text style={{ fontFamily: "outfit-bold", fontSize: 35 }}>Travel Dates</Text>
          <View style={{ marginTop: 30 }}>
            <CalendarPicker onDateChange={onDateChange} allowRangeSelection={true} minDate={new Date()} maxRangeDuration={5} selectedRangeStyle={{ backgroundColor: Colors.PRIMARY }} selectedDayTextStyle={{ color: Colors.WHITE, fontWeight: "bold", fontSize: 17 }} />
          </View>
          <TouchableOpacity onPress={() => onDateSelect()} style={{ padding: 15, backgroundColor: Colors.PRIMARY, borderRadius: 15, marginTop: 90 }}>
            <Text style={{ color: Colors.WHITE, fontFamily: "outfit-medium", textAlign: "center", fontSize: 20 }}>Continue</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default SelectDates

const styles = StyleSheet.create({})