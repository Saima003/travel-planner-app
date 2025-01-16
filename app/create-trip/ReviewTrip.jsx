import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';
import Entypo from '@expo/vector-icons/Entypo';
import { CreateTripContext } from '../../context/CreateTripContext';
import moment from "moment"

const ReviewTrip = () => {
    const navigation = useNavigation()
    const router = useRouter()
  const {tripData, setTripData}= useContext(CreateTripContext)
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
      <Text style={{fontFamily:"outfit-bold", fontSize:35}}>Review Your Trip</Text>
    <View style={{marginTop:20}}>
        <Text style={{fontFamily:"outfit-medium", fontSize:20}}>Before Generating Your Trip, Please Review Your Selections</Text>
    </View>

    <View style={{marginTop:30, display:"flex", flexDirection:"row", gap:20}}>
    {/* <Entypo name="location-pin" size={34} color="black" /> */}
    <Text style={{fontSize:28}}>📍</Text>
    <View>
    <Text style={{fontFamily:"outfit", fontSize:18, color:Colors.GRAY}}>Destination</Text>
    <Text style={{fontFamily:"outfit-medium", fontSize:18}}>{tripData?.locationInfo?.name}</Text>
    </View>
    </View>

    <View style={{marginTop:30, display:"flex", flexDirection:"row", gap:20}}>
    {/* <Entypo name="location-pin" size={34} color="black" /> */}
    <Text style={{fontSize:28}}>🗓️</Text>
    <View>
    <Text style={{fontFamily:"outfit", fontSize:18, color:Colors.GRAY}}>Travel Date</Text>
    <View style={{display:"flex", flexDirection:"row", gap:5}}>
    <Text style={{fontFamily:"outfit-medium", fontSize:18}}>{moment(tripData?.startDate).format("DD MMM YYYY")}</Text>
    <Text>-</Text>
    <Text style={{fontFamily:"outfit-medium", fontSize:18}}>{moment(tripData?.endDate).format("DD MMM YYYY")}</Text>
    <Text style={{fontFamily:"outfit-medium", fontSize:18}}>({tripData?.totalNoofDays} Days)</Text>
    </View>
    </View>

    </View>

    <View style={{marginTop:30, display:"flex", flexDirection:"row", gap:20}}>
    <Text style={{fontSize:28}}>😄</Text>
    <View>
    <Text style={{fontFamily:"outfit", fontSize:18, color:Colors.GRAY}}>Who is Travelling</Text>
    <Text style={{fontFamily:"outfit-medium", fontSize:18}}>{tripData?.travelerCount?.title}</Text>
    </View>
    </View>

    <View style={{marginTop:30, display:"flex", flexDirection:"row", gap:20}}>
    <Text style={{fontSize:28}}>💵</Text>
    <View>
    <Text style={{fontFamily:"outfit", fontSize:18, color:Colors.GRAY}}>Budget</Text>
    <Text style={{fontFamily:"outfit-medium", fontSize:18}}>{tripData?.budget}</Text>
    </View>
    </View>
    <TouchableOpacity onPress={()=> router.push("./GenerateTrip")} style={{padding:15, backgroundColor:Colors.PRIMARY, borderRadius:15, marginTop:130}}>
            <Text style={{textAlign:"center", color: Colors.WHITE, fontFamily:"outfit-medium", fontSize:20 }}>Create My Trip</Text>
          </TouchableOpacity>
    </View>
    </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default ReviewTrip

const styles = StyleSheet.create({})