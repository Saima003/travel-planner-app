import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useContext, useEffect } from 'react';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';
import { CreateTripContext } from '../../context/CreateTripContext';
import moment from "moment";

const ReviewTrip = () => {
  const navigation = useNavigation();
  const router = useRouter();
  const { tripData } = useContext(CreateTripContext);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: "",
    });
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.WHITE }}>
        <View style={styles.container}>
          <View>
            <Text style={styles.header}>Review Your Trip</Text>

            <View style={styles.subHeaderContainer}>
              <Text style={styles.subHeader}>
                Before Generating Your Trip, Please Review Your Selections
              </Text>
            </View>

            {/* Destination */}
            <View style={styles.row}>
              <Text style={styles.emoji}>📍</Text>
              <View style={styles.textBlock}>
                <Text style={styles.label}>Destination</Text>
                <Text style={styles.value} numberOfLines={2}>
                  {tripData?.locationInfo?.name}
                </Text>
              </View>
            </View>

            {/* Travel Dates */}
            <View style={styles.row}>
              <Text style={styles.emoji}>🗓️</Text>
              <View style={styles.textBlock}>
                <Text style={styles.label}>Travel Date</Text>
                <View style={styles.dateRow}>
                  <Text style={styles.value}>
                    {moment(tripData?.startDate).format("DD MMM YYYY")}
                  </Text>
                  <Text style={styles.value}> - </Text>
                  <Text style={styles.value}>
                    {moment(tripData?.endDate).format("DD MMM YYYY")}
                  </Text>
                  <Text style={styles.value}>
                    ({tripData?.totalNoofDays} Days)
                  </Text>
                </View>
              </View>
            </View>

            {/* Traveler */}
            <View style={styles.row}>
              <Text style={styles.emoji}>😄</Text>
              <View style={styles.textBlock}>
                <Text style={styles.label}>Who is Travelling</Text>
                <Text style={styles.value}>{tripData?.travelerCount?.title}</Text>
              </View>
            </View>

            {/* Budget */}
            <View style={styles.row}>
              <Text style={styles.emoji}>💵</Text>
              <View style={styles.textBlock}>
                <Text style={styles.label}>Budget</Text>
                <Text style={styles.value}>{tripData?.budget}</Text>
              </View>
            </View>
          </View>

          {/* Button at bottom */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => router.push("./GenerateTrip")}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Create My Trip</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default ReviewTrip;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    paddingTop: 50,
    justifyContent: 'space-between',
  },
  header: {
    fontFamily: "outfit-bold",
    fontSize: 35,
  },
  subHeaderContainer: {
    marginTop: 20,
  },
  subHeader: {
    fontFamily: "outfit-medium",
    fontSize: 20,
  },
  row: {
    marginTop: 30,
    flexDirection: "row",
    gap: 20,
    alignItems: "flex-start",
  },
  emoji: {
    fontSize: 28,
  },
  textBlock: {
    flex: 1,
  },
  label: {
    fontFamily: "outfit",
    fontSize: 18,
    color: Colors.GRAY,
  },
  value: {
    fontFamily: "outfit-medium",
    fontSize: 18,
    flexShrink: 1,
    flexWrap: "wrap",
  },
  dateRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
    flexShrink: 1,
  },
  buttonContainer: {
    marginBottom: 10,
  },
  button: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 15,
  },
  buttonText: {
    textAlign: "center",
    color: Colors.WHITE,
    fontFamily: "outfit-medium",
    fontSize: 20,
  },
});
