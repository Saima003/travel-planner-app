import { StyleSheet, Text, View, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Colors } from '../../constants/Colors';
import moment from "moment";
import FlightInfo from '../../components/TripPlan/FlightInfo';
import HotelInfo from '../../components/TripPlan/HotelInfo';
import ItinaryInfo from '../../components/TripPlan/ItinaryInfo';
import Notes from '../../components/TripPlan/Notes';

const TripDetails = () => {
    const navigation = useNavigation();
    const { tripData } = useLocalSearchParams();
    const [trip, setTrip] = useState();

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTransparent: true,
            headerTitle: ""
        });
        setTrip(JSON.parse(tripData));
    }, [tripData]);

    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1 }}>
                <View>
                    <View style={styles.headerContainer}>
                        <Text style={styles.title}>{trip?.tripData?.locationInfo?.name}</Text>
                        <View style={styles.dateContainer}>
                            <Text style={styles.dateText}>
                                {moment(trip?.tripData?.startDate).format("DD MMM YYYY")}
                            </Text>
                            <Text style={styles.dateText}>
                                - {moment(trip?.tripData?.endDate).format("DD MMM YYYY")}
                            </Text>
                        </View>
                        <Text style={styles.travelerText}>
                            😉 {trip?.tripData?.travelerCount?.title}
                        </Text>
                    </View>
                </View>
                <FlatList
                    data={[{ key: 'content' }]} // Placeholder for rendering all sections
                    keyExtractor={(item) => item.key}
                    renderItem={() => (
                        <View style={styles.contentContainer}>
                            <FlightInfo flightInfo={trip?.tripPlan?.trip_details} />
                            <HotelInfo hotelInfo={trip?.tripPlan?.hotel_options} />
                            <ItinaryInfo tripDaywisePlan={trip?.tripPlan?.itinerary} />
                            <Notes notes={trip?.tripPlan?.notes} />
                        </View>
                    )}
                    showsVerticalScrollIndicator={false}
                />
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

export default TripDetails;

const styles = StyleSheet.create({
    headerContainer: {
        padding: 30,
        paddingTop: 50,
        backgroundColor: Colors.WHITE,
        position: "sticky",
        top: 0
    },
    title: {
        fontSize: 23,
        fontFamily: "outfit-bold",
    },
    dateContainer: {
        flexDirection: "row",
        gap: 5,
    },
    dateText: {
        fontFamily: "outfit-medium",
        fontSize: 17,
        color: Colors.GRAY,
    },
    travelerText: {
        fontFamily: "outfit-medium",
        fontSize: 17,
        color: Colors.GRAY,
    },
    contentContainer: {
        flex: 1,
        backgroundColor: Colors.WHITE,
        paddingHorizontal: 30,
    },
});
