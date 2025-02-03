import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const HotelInfo = ({ hotelInfo }) => {
    return (
        <View style={{ marginTop: 20 }}>
            <Text style={{ fontFamily: 'outfit-bold', fontSize: 17 }}>🏨 Hotel Recommendations</Text>
            <FlatList data={hotelInfo} renderItem={(item, index) => (
                <View>
                    <Image
                        source={{ uri: item?.item?.image_url }}
                        style={{ width: "100%", height: 240, objectFit: "cover", borderRadius: 15 }}
                        resizeMode="contain"
                    />
                    <Text>{item?.item?.hotel_name}</Text>
                </View>
            )} />
        </View>
    )
}

export default HotelInfo

const styles = StyleSheet.create({})