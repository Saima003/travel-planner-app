import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from '../../constants/Colors';

const HotelCard = ({ hotelDetail }) => {
  // console.log(hotelDetail?.image_url)
  return (
    <View style={{ marginVertical: 10 }}>
      <View style={{ borderColor: "black", borderWidth: 1, height: "auto", borderRadius: 20 }}>
        {/* <Image source={{ uri: hotelDetail?.image_url }} style={{ width: 200, height: 200, resizeMode: 'cover' }}/> */}
        <Image source={require("./../../assets/images/WhatsApp Image 2024-10-16 at 9.08.47 PM.jpg")} style={{ width: "auto", height: 200, resizeMode: 'cover', borderRadius: 20 }} />
        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
          <Text style={{ fontFamily: "outfit-bold", fontSize: 15 }}>{hotelDetail?.hotel_name}</Text>
          <View style={{ flexDirection: "row" }}>
            <Ionicons name="star" size={20} color="black" />
            <Text style={{ fontFamily: "outfit-bold" }}>{hotelDetail?.rating}</Text>
          </View>
        </View>
        <View>
          <Text style={{ color: Colors.GRAY, fontFamily: "outfit", fontSize: 15 }}>{hotelDetail?.address}</Text>
        </View>
      </View>
    </View>
  )
}

export default HotelCard

const styles = StyleSheet.create({})