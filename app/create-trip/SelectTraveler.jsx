import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigation, useRouter } from 'expo-router'
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Colors } from '../../constants/Colors';
import { SelectTravellersList } from '../../constants/Options';
import OptionCard from '../../components/CreateTrip/OptionCard';
import { TouchableOpacity } from 'react-native';
import { CreateTripContext } from '../../context/CreateTripContext';
const SelectTraveler = () => {
  const navigation = useNavigation();
  const router = useRouter()
  const [SelectedTraveler, setSelectedTraveler] = useState();
  const {tripData, setTripData} = useContext(CreateTripContext)
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: ""
    })
  }, [])
  useEffect(()=>{
    setTripData({...tripData,
      travelerCount : SelectedTraveler
    })
  },[SelectedTraveler])
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ padding: 25, paddingTop: 50, backgroundColor: Colors.WHITE, height: "100%" }}>
          <Text style={{ fontSize: 35, fontFamily: "outfit-bold", marginTop: 20 }}>Who's Travelling</Text>
          <View style={{ marginTop: 20 }}>
            <Text style={{ fontFamily: "outfit-bold", fontSize: 20 }}>Choose your travelers</Text>
          </View>
          <FlatList
            data={SelectTravellersList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <TouchableOpacity style={{marginVertical: 10}} 
              // onPress={()=> {setSelectedTraveler(item);
              //   setTripData((prevData) => ({
              //     ...prevData,
              //     travelerCount: item
              //   }))}}
              onPress={() => {
                setSelectedTraveler(item);
                setTripData((prev) => ({
                  ...prev,
                  travelerCount: item
                }));
              }}
              >
                <OptionCard option={item}  selectedOption={SelectedTraveler}/>
              </TouchableOpacity>
            )}
          />
          {/* <Link href={"/create-trip/SelectDates.jsx"} style={{width:"100%", textAlign:"center"}}> */}
          <TouchableOpacity onPress={() => router.push("./SelectDates")} style={{padding:15, backgroundColor:Colors.PRIMARY, borderRadius:15,}}>
            <Text style={{textAlign:"center", color: Colors.WHITE, fontFamily:"outfit-medium", fontSize:20 }}>Continue</Text>
          </TouchableOpacity>
          {/* </Link> */}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>

  )
}

export default SelectTraveler

const styles = StyleSheet.create({})