import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ItinaryCard from './ItinaryCard'

const ItinaryInfo = ({tripDaywisePlan}) => {
  return (
    <View style={styles.container}>
            <Text style={styles.header}>Day wise plan 😄</Text>
            <ItinaryCard tripDetail={tripDaywisePlan}/>
        </View>
  )
}

export default ItinaryInfo

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