import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const HotelInfo = ({hotelInfo}) => {
  return (
    <View style={{marginTop:20}}>
      <Text style={{fontFamily:'outfit-bold', fontSize:17}}>🏨 Hotel Recommendations</Text>
      <FlatList data={hotelInfo} renderItem={(item, index)=>(
        <View> 
            {console.log(item,"item")}
            <Text>{item?.item?.geo_coordinates?.hotel_name}</Text>
        </View>
      )}/>
    </View>
  )
}

export default HotelInfo

const styles = StyleSheet.create({})