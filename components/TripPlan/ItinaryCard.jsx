import React from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import { Card } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

const ItineraryCard = ({ tripDetail }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {tripDetail && Object.keys(tripDetail).map((dayKey, index) => {
        const dayDetail = tripDetail[dayKey];

        return (
          <View key={dayKey} style={styles.dayContainer}>
            <Text style={styles.dayTitle}>Day {index + 1}: {dayDetail.theme}</Text>
            <Text style={styles.subText}>Best time to visit: {dayDetail.best_time_to_visit}</Text>

            <FlatList
              data={dayDetail.plan}
              keyExtractor={(item, idx) => idx.toString()}
              renderItem={({ item }) => (
                <Card style={styles.planCard}>
                  <Card.Content>
                    <Text style={styles.placeName}>{item?.place_name}</Text>
                    <Text style={styles.details}>{item?.place_details}</Text>

                    <View style={styles.infoRow}>
                      <Ionicons name="time-outline" size={16} color="#2980b9" />
                      <Text style={styles.infoText}>{item?.best_time_to_visit_here}</Text>
                    </View>

                    <View style={styles.infoRow}>
                      <Ionicons name="location-outline" size={16} color="#c0392b" />
                      <Text style={styles.infoText}>{item?.ticket_pricing}</Text>
                    </View>

                    <View style={styles.infoRow}>
                      <Ionicons name="walk-outline" size={16} color="#27ae60" />
                      <Text style={styles.infoText}>
                        {item?.travel_time_from_hotel || item?.travel_time_from_lappeenranta_fortress || item?.travel_time_from_saimaa_cruise || item?.travel_time_from_imatrankoski_rapids || 'N/A'}
                      </Text>
                    </View>
                  </Card.Content>
                </Card>
              )}
              contentContainerStyle={styles.planContainer}
            />
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#f4f4f4',
  },
  dayContainer: {
    marginBottom: 20,
  },
  dayTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  subText: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 10,
  },
  planContainer: {
    marginTop: 10,
  },
  planCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 8,
    padding: 10,
    elevation: 3,
  },
  placeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#34495e',
    marginBottom: 3,
  },
  details: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  infoText: {
    fontSize: 13,
    color: '#2c3e50',
    marginLeft: 5,
  },
});

export default ItineraryCard;
