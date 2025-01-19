import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'

const UserTripList = ({userTrips}) => {
  const [allTrips, setAllTrips] = useState([])

  useEffect(()=>{
    userTrips && setAllTrips([...userTrips])
  },[userTrips])
  return (
    <View>
      <View style={{marginTop:20}}>
        <Image source={require("./../../assets/images/mytripsimage.jpg")} style={{width:"100%", height:240, objectFit:"cover", borderRadius:15}}/>
      </View>
      <View>
        <Text>{allTrips[0]?.tripData?.locationInfo?.name}</Text>
      </View>
    </View>
  )
}

export default UserTripList

const styles = StyleSheet.create({})