import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from '../../constants/Colors';
import { TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
const StartNewTrip = () => {
    const route = useRouter()
    return (
        <View style={{ padding: 20, marginTop: 50, display: "flex", alignItems: "center", gap: 20 }}>
            <Ionicons name="location-sharp" size={24} color="black" />
            <Text style={{ fontSize: 25, fontFamily: "outfit-medium" }}>No Trips Planned Yet</Text>
            <Text style={{ fontSize: 20, fontFamily: "outfit", textAlign: "center", color: Colors.GRAY }}>Looks like its time to plan a new travel experience! Get started below.</Text>
            <TouchableOpacity style={{ padding: 10, backgroundColor: Colors.PRIMARY, borderRadius: 15, paddingHorizontal: 30, paddingVertical: 15 }} onPress={() => route.push("/create-trip/SearchPlace")}>
                <Text style={{ color: Colors.WHITE, fontFamily: "outfit-medium", fontSize: 17 }}>Start a new trip</Text>
            </TouchableOpacity>
        </View>
    )
}

export default StartNewTrip

const styles = StyleSheet.create({})