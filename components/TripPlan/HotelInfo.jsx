import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HotelCard from './HotelCard'

const HotelInfo = ({ hotelInfo }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>🏨 Hotel Recommendations</Text>
            <FlatList
                data={hotelInfo}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => <HotelCard hotelDetail={item} />}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}

export default HotelInfo

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
    },
    header: {
        fontFamily: 'outfit-bold',
        fontSize: 20,
        marginBottom: 10,
    },
    listContent: {
        paddingBottom: 20,
    },
})
