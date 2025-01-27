import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Colors } from '../../constants/Colors';

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
    console.log(trip?.tripData?.locationInfo?.photoRef)
    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ padding: 30, paddingTop: 50, height: "100%", backgroundColor: Colors.WHITE }}>
                    <Image
                        source={{ uri: trip?.tripData?.locationInfo?.photoRef }}
                        style={{ width: "100%", height: 240, objectFit: "cover", borderRadius: 15 }}
                        resizeMode="contain"
                    />
                    <View style={{ padding: 15, backgroundColor: Colors.WHITE, height: "100%", borderTopLeftRadius: 40, marginTop: -40, borderTopRightRadius: 40 }}>
                        <Text>{trip?.tripData?.locationInfo?.name}</Text>
                    </View>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

export default TripDetails

const styles = StyleSheet.create({})