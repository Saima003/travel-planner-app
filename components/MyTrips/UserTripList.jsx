import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const UserTripList = ({userTrips}) => {
  return (
    <View>
      <View style={{marginTop:20}}>
        <Image source={require("./../../assets/images/mytripsimage.jpg")} style={{width:"100%", height:240, objectFit:"cover", borderRadius:15}}/>
      </View>
      <View>
        {/* <Text>{userTrips[0]?.tripData}</Text> */}
      </View>
    </View>
  )
}

export default UserTripList

const styles = StyleSheet.create({})