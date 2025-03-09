import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const HotelInfo = ({ hotelInfo }) => {
    return (
        <View style={{ marginTop: 20 }}>
            <Text style={{ fontFamily: 'outfit-bold', fontSize: 17 }}>🏨 Hotel Recommendations</Text>
            <FlatList
                data={hotelInfo}
                keyExtractor={(item, index) => index.toString()} // Ensure unique keys
                renderItem={({ item, index }) => ( // Destructure `item` properly
                    <View key={index}>
                        {console.log(item, "item")}
                        {/* {item?.image_url && ( // Ensure valid condition
                            <Image
                                source={{ uri: item.image_url }}
                                style={{ width: "100%", height: 240, borderRadius: 15 }}
                                resizeMode="cover" // Use "cover" instead of "contain" for better fit
                            />
                        )} */}

                        <Text>{item?.hotel_name}</Text>
                    </View>
                )}
            />

        </View>
    )
}

export default HotelInfo

const styles = StyleSheet.create({})