import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import moment from 'moment/moment'
import { Colors } from '../../constants/Colors'
import UserTripCard from './UserTripCard'

const UserTripList = ({userTrips}) => {
  const [allTrips, setAllTrips] = useState([])
// console.log(allTrips,"all trips")
  useEffect(()=>{
    userTrips && setAllTrips([...userTrips])
  },[userTrips])
  return (
    <View>
      <View style={{marginTop:20}}>
        <Image source={require("./../../assets/images/mytripsimage.jpg")} style={{width:"100%", height:240, objectFit:"cover", borderRadius:15}}/>
      </View>
      <View style={{marginTop:10}}>
        <Text style={{fontFamily:"outfit-medium", fontSize:20}}>{allTrips?.[0]?.tripData?.locationInfo?.name}</Text>
        <View style={{display:"flex", flexDirection:"row", justifyContent:"space-between", marginTop:5}}>
        <Text style={{fontFamily:"outfit", fontSize:18, color:Colors.GRAY}}>{moment(allTrips?.[0]?.tripData?.startDate).format("DD MMM YYYY")}</Text>
        <Text style={{fontFamily:"outfit", fontSize:18, color:Colors.GRAY}}>🚌  {allTrips?.[0]?.tripData?.travelerCount?.title}</Text>
        </View>
        <TouchableOpacity style={{backgroundColor:Colors.PRIMARY, padding:15, borderRadius:15, marginTop:10}}><Text style={{color:Colors.WHITE, textAlign:"center", fontFamily:"outfit-medium", fontSize:15}}>See your plan</Text></TouchableOpacity>
      </View>

      {
        allTrips && allTrips.length > 0 && allTrips.map((trip, index) =>(
          <UserTripCard trip={trip} key={index}/>
        ))
      }
    </View>
  )
}

export default UserTripList

const styles = StyleSheet.create({})