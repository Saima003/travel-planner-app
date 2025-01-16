import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react';
import { Colors } from '../../constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import StartNewTrip from '../../components/MyTrips/StartNewTrip';
import { auth, db } from "./../../assets/configs/FirebaseConfig"
import { query, collection, where, getDocs } from "firebase/firestore";
import UserTripList from '../../components/MyTrips/UserTripList';
const MyTrip = () => {
  const [userTrips, setUserTrips] = useState([]);
  const [loading, setLoading] = useState(false)
  const user = auth.currentUser

  useEffect(() => {
    user && getMyTrips()
  }, [user])
  
const getMyTrips = async () => {
  setLoading(true);
  try {
    const q = query(
      collection(db, "SZAK-AITravel"),
      where("userEmail", "==", user?.email) // Replace user?.email with the exact value if needed
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
    const structuredData = JSON.stringify(allTrips, null, 2)
    setUserTrips(structuredData)
    setLoading(false);
  } catch (error) {
    console.error("Error fetching documents:", error);
    setLoading(false);
  }
};

  return (
    <View style={{ backgroundColor: Colors.WHITE, height: "100%", padding: 20 }}>
      <View style={{ display: "flex", flexDirection: "row", alignContent: "center", justifyContent: "space-between" }}>
        <Text style={{ fontFamily: "outfit-bold", fontSize: 35 }}>MyTrip</Text>
        <Ionicons name="add-circle" size={50} color="black" />
      </View>
      {loading  ? <ActivityIndicator height="100%" size={"large"} color={Colors.PRIMARY} /> :
        loading === false && userTrips.length === 0 ?
          <StartNewTrip /> : <UserTripList userTrips={userTrips}/>
      }
    </View>
  )
}

export default MyTrip

const styles = StyleSheet.create({})