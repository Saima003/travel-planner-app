import { StyleSheet, Text, View, FlatList } from 'react-native';
import React from 'react';
import { Card } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

const Notes = ({ notes }) => {
  if (!notes || notes.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Things to Remember 📌</Text>

      <Card style={styles.card}>
        <Card.Content>
          <FlatList
            data={notes}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.noteItem}>
                <Ionicons name="checkmark-circle-outline" size={18} color="#2ecc71" />
                <Text style={styles.noteText}>{item}</Text>
              </View>
            )}
          />
        </Card.Content>
      </Card>
    </View>
  );
};

export default Notes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 15,
    marginBottom:20
  },
  header: {
    fontFamily: 'outfit-bold',
    fontSize: 20,
    marginBottom: 10,
    color: '#2c3e50',
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    elevation: 4,
    padding: 15,
  },
  noteItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  noteText: {
    fontSize: 14,
    color: '#34495e',
    marginLeft: 8,
    flex: 1,
  },
});