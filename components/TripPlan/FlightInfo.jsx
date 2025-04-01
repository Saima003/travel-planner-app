import { StyleSheet, Text, TouchableOpacity, View, Linking } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors'

const FlightInfo = ({ flightInfo }) => {
  const bookFlight = () => {
    if (flightInfo?.approx_flight_estimation?.booking_url) {
      Linking.openURL(flightInfo?.approx_flight_estimation?.booking_url).catch((err) => console.error("Error opening URL:", err));
    }
  }
  return (
    <View style={{ marginTop: 20 }}>
      <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <Text style={{ fontFamily: "outfit-bold", fontSize: 20 }}>✈️ Flights</Text>
        <TouchableOpacity style={{ backgroundColor: Colors.PRIMARY, padding: 5, width: 100, borderRadius: 7, marginTop: 7 }} onPress={() => bookFlight()}><Text style={{ textAlign: "center", color: Colors.WHITE, fontFamily: "outfit" }}>Book Here</Text></TouchableOpacity>
      </View>
      <Text style={{ fontFamily: "outfit", fontSize: 17, marginTop: 7 }}>Airline: Delta</Text>
      <Text>Price: {flightInfo?.approx_flight_estimation?.approx_price}</Text>
    </View>
  )
}

export default FlightInfo

const styles = StyleSheet.create({})