import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Colors } from '../../constants/Colors';
import { CreateTripContext } from '../../context/CreateTripContext';
import { AI_PROMPT } from '../../constants/Options';
import { chatSession } from '../../assets/configs/AiModal';
import {auth, db} from "./../../assets/configs/FirebaseConfig"
import { collection, doc, setDoc } from "firebase/firestore"; 
import { useRouter } from 'expo-router';
const GenerateTrip = () => {
  const {tripData, setTripData}= useContext(CreateTripContext)
  const [loader, setLoader] = useState(false)
  const user = auth.currentUser;
  const router = useRouter()
  useEffect(()=>{
    GenerateAiTrip()
  },[tripData, user, db])
  

const GenerateAiTrip = async () => {
    setLoader(true)
    const FINAL_PROMPT = AI_PROMPT
    .replace('{location}', tripData?.locationInfo?.name)
    .replace('{totalDays}', tripData?.totalNoofDays)
    .replace('{totalNights}', tripData?.totalNoofDays-1)
    .replace('{travellers}', tripData?.travelerCount?.title)
    .replace('{budget}', tripData?.budget)
    .replace('{totalDays}', tripData?.totalNoofDays)
    .replace('{totalNights}', tripData?.totalNoofDays-1)
  try {
    const result = await chatSession.sendMessage(FINAL_PROMPT);
    const responseText = result.response.text();
    const docID = Date.now().toString();
    const formattedTripData = {
      ...tripData,
      startDate: tripData.startDate.toISOString(),
      endDate: tripData.endDate.toISOString(),
    };

    await setDoc(doc(db, "SZAK-AITravel", docID), {
      userEmail: user.email,
      tripPlan: JSON.parse(responseText),
      tripData: formattedTripData,
      docID:docID
    });
    console.log("Document successfully written!");
         router.push("(tabs)/MyTrip");
  } catch (error) {
    console.error("Error writing document:", error);
  }
};

return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
      <View style={{padding: 30 ,paddingTop:50, height:"100%", backgroundColor:Colors.WHITE}}>
      <Text style={{fontFamily:"outfit-bold", fontSize:35, textAlign:"center"}}>Please Wait...</Text>
      <Text style={{fontFamily:"outfit-bold", fontSize:20, textAlign:"center", marginTop:40}}>We are creating your trip!</Text>
    <Image source={require("./../../assets/images/plane.gif")} style={{height:"50%", width:"100%", marginTop:60, objectFit:"contain"}}/>
    <Text style={{fontFamily:"outfit", color:Colors.GRAY, fontSize:20, textAlign:"center"}}>Do Not Go Back!</Text>
    </View>
    </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default GenerateTrip

const styles = StyleSheet.create({})