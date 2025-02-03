import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Colors } from '../../constants/Colors';
import moment from "moment"
import FlightInfo from '../../components/TripPlan/FlightInfo';
import HotelInfo from '../../components/TripPlan/HotelInfo';

const TripDetails = () => {
    const navigation = useNavigation()
    const { tripData } = useLocalSearchParams()
    const [trip, setTrip] = useState()

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTransparent: true,
            headerTitle: ""
        })
        setTrip(JSON.parse(tripData))
    }, [tripData])

    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ padding: 30, paddingTop: 50, height: "100%", backgroundColor: Colors.WHITE }}>
                    <Image
                        source={{ uri: trip?.tripData?.locationInfo?.photoRef }}
                        style={{ width: "100%", height: 240, objectFit: "cover", borderRadius: 15 }}
                        resizeMode="contain"
                    />
                    <View style={{ padding: 15, backgroundColor: Colors.WHITE, height: "100%" }}>
                        <Text style={{ fontSize: 20, fontFamily: "outfit-bold" }}>{trip?.tripData?.locationInfo?.name}</Text>
                        <View style={{ display: "flex", flexDirection: "row", gap: 5 }}>
                            <Text style={{ fontFamily: "outfit-medium", fontSize: 17, color: Colors.GRAY }}>{moment(trip?.tripData?.startDate).format("DD MMM YYYY")}</Text>
                            <Text style={{ fontFamily: "outfit-medium", fontSize: 17, color: Colors.GRAY }}> - {moment(trip?.tripData?.endDate).format("DD MMM YYYY")}</Text>
                        </View>
                        <Text style={{ fontFamily: "outfit-medium", fontSize: 17, color: Colors.GRAY }}>😉 {trip?.tripData?.travelerCount?.title}</Text>
                        <FlightInfo flightInfo={trip?.tripPlan?.trip_details}/>
                        <HotelInfo hotelInfo={trip?.tripPlan?.hotel_options}/>
                    </View>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

export default TripDetails

const styles = StyleSheet.create({})