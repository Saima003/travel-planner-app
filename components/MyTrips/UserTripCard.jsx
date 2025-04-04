import { StyleSheet, Text, View,Image, TouchableOpacity  } from 'react-native'
import React from 'react'
import moment from 'moment'
import { Colors } from '../../constants/Colors'
import { useRouter } from 'expo-router'

const UserTripCard = ({trip}) => {
    const router = useRouter()
  return (
    <TouchableOpacity onPress={() => router.push({pathname:"/trip-details", params:{tripData: JSON.stringify(trip, null, 2)}})}>
    <View style={{marginTop:20, display:"flex", flexDirection:"row", gap:10, alignItems:"center"}}>
      {
        trip?.tripData?.locationInfo?.photoRef?
      <Image source={{ uri: trip?.tripData?.locationInfo?.photoRef }} style={{width:100, height:100, borderRadius:15}}/> :
      <Image source={require("./../../assets/images/WhatsApp Image 2024-10-16 at 9.11.27 PM.jpg")} style={{width:100, height:100, borderRadius:15}}/>
      }
      <View style={{ flex: 1 }}> 
    <Text style={{ fontFamily: "outfit-medium", fontSize: 18, flexShrink: 1 }}>
      {trip?.tripData?.locationInfo?.name}
    </Text>
    <Text style={{ fontFamily: "outfit", fontSize: 14, color: Colors.GRAY }}>
      {moment(trip?.tripData?.startDate).format("DD MMM YYYY")}
    </Text>
    <Text style={{ fontFamily: "outfit", fontSize: 14, color: Colors.GRAY }}>
      Travelling: {trip?.tripData?.travelerCount?.title}
    </Text>
  </View>
    </View>
    </TouchableOpacity>
  )
}

export default UserTripCard

const styles = StyleSheet.create({})