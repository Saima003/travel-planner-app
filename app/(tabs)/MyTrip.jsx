import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react';
import { Colors } from '../../constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import StartNewTrip from '../../components/MyTrips/StartNewTrip';
import { auth, db } from "./../../assets/configs/FirebaseConfig"
import { query, collection, where, getDocs } from "firebase/firestore";
import UserTripList from '../../components/MyTrips/UserTripList';
import { useRouter } from 'expo-router';
const MyTrip = () => {
  const [userTrips, setUserTrips] = useState([]);
  const [loading, setLoading] = useState(false)
  const user = auth.currentUser
  const route = useRouter()
  useEffect(() => {
    user && getMyTrips()
  }, [user])
  
const getMyTrips = async () => {
  setLoading(true);
  try {
    const q = query(
      collection(db, "SZAK-AITravel"),
      where("userEmail", "==", user?.email)
    );

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      setLoading(false);
      return;
    }

    let allTrips = [];
    querySnapshot.forEach((doc) => {
      const docData = doc.data();
      allTrips.push(docData);
    });
    setUserTrips(allTrips)
    setLoading(false);
  } catch (error) {
    console.error("Error fetching documents:", error);
    setLoading(false);
  }
};

  return (
    <View>
      <View style={{ display: "flex", flexDirection: "row", alignContent: "center", justifyContent: "space-between", padding: 10 }}>
        <Text style={{ fontFamily: "outfit-bold", fontSize: 35 }}>My Trips</Text>
        <TouchableOpacity onPress={() => route.push("/create-trip/SearchPlace")}>
        <Ionicons name="add-circle" size={50} color="black" />
        </TouchableOpacity>
      </View>
    <ScrollView style={{ backgroundColor: Colors.WHITE, height: "100%", padding: 20 }}>
      {loading  ? <ActivityIndicator height="100%" size={"large"} color={Colors.PRIMARY} /> :
        loading === false && userTrips.length === 0 ?
          <StartNewTrip /> : <UserTripList userTrips={userTrips}/>
      }
    </ScrollView>
    </View>
  )
}

export default MyTrip

const styles = StyleSheet.create({})