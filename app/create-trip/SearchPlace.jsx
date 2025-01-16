import { StyleSheet, View, TextInput, FlatList, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigation, useRouter } from 'expo-router';
import "react-native-get-random-values";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Colors } from '../../constants/Colors';
import axios from 'axios';
import {CreateTripContext} from "./../../context/CreateTripContext"
const SearchPlace = () => {
    const navigation = useNavigation();
    const [searchTerm, setSearchTerm] = useState('');
    const [locationResults, setLocationResults] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [loading, setLoading] = useState(false);
    const {tripData, setTripData}= useContext(CreateTripContext)
    const router = useRouter()
    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTransparent: true,
            headerTitle: "Search"
        });
    }, []);

    const getLocation = (e) => {
        setSearchTerm(e);
        if (e.length >= 3) {
            setLoading(true);
            axios.get(`${process.env.EXPO_PUBLIC_AUTOCOMPLETE_API}=${e}&maxRows=20&username=${process.env.EXPO_PUBLIC_GEONAMES_USER_NAME}`)
                .then((res) => {
                    setLocationResults(res.data.geonames || []);
                    setShowDropdown(true);
                })
                .catch((err) => {
                    console.error(err, "error");
                    setShowDropdown(false);
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setShowDropdown(false);
        }
    };

    const handleSelectLocation = (location) => {
        router.push("/create-trip/SelectTraveler")
        axios.get(`https://api.openverse.engineering/v1/images?q=${location.name}`)
        .then((res) => {
            let searchedItem = `${location.name}, ${location.adminName1}, ${location.countryName}`
            setSearchTerm(searchedItem);
            setTripData({
                ...tripData,
                locationInfo:{
                    name: searchedItem,
                    coordinates: {latitude: location.lat, longitude: location.lng},
                    photoRef: res.data?.results?.[0]?.url,
                }
            })
            setShowDropdown(false);
        })
        .catch((err)=>{
            console.log(err,"error")
        })
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ padding: 25, paddingTop: 75, backgroundColor: Colors.WHITE, height: "100%" }}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder='Search Place'
                            style={styles.input}
                            value={searchTerm}
                            onChangeText={(e) => getLocation(e)}
                        />
                        {loading && (
                            <ActivityIndicator
                                size="small"
                                color={Colors.GRAY}
                                style={styles.loader}
                            />
                        )}
                    </View>
                    {showDropdown && (
                        <FlatList
                            data={locationResults}
                            keyExtractor={(item) => item.geonameId.toString()}
                            style={styles.dropdown}
                            renderItem={({ item }) => (
                                <TouchableOpacity 
                                    style={styles.dropdownItem} 
                                    onPress={() => handleSelectLocation(item)}
                                >
                                    <Text>{`${item.name}, ${item.adminName1}, ${item.countryName}`}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    )}
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

export default SearchPlace;

const styles = StyleSheet.create({
    inputContainer: {
        position: 'relative',
        width: '100%',
    },
    input: {
        borderWidth: 1,
        borderColor: Colors.GRAY,
        padding: 10,
        borderRadius: 5,
        paddingRight: 40, // Add space for the loader
    },
    loader: {
        position: 'absolute',
        right: 10,
        top: '50%',
        transform: [{ translateY: -10 }], // Center vertically
    },
    dropdown: {
        marginTop: 10,
        borderWidth: 1,
        borderColor: Colors.GRAY,
        maxHeight: 200,
        backgroundColor: Colors.WHITE,
        borderRadius: 5,
    },
    dropdownItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: Colors.LIGHT_GRAY,
    },
});
