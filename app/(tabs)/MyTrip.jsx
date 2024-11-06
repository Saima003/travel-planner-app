import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../../constants/Colors'
import Ionicons from '@expo/vector-icons/Ionicons';
import StartNewTrip from '../../constants/components/MyTrips/StartNewTrip';

const MyTrip = () => {
  const [userTrips, setUserTrips] = useState([]);
  return (
    <View style={{backgroundColor: Colors.WHITE, height: "100%", padding: 20}}>
      <View style={{display:"flex", flexDirection:"row", alignContent:"center", justifyContent:"space-between"}}>
      <Text style={{fontFamily:"outfit-bold", fontSize:35}}>MyTrip</Text>
      <Ionicons name="add-circle" size={50} color="black" />
      </View>
      {
        userTrips.length === 0 ?
        <StartNewTrip/> : null
      }
    </View>
  )
}

export default MyTrip

const styles = StyleSheet.create({})