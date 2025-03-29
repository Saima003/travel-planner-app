import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

const Discover = () => {
  const [countries, setCountries] = useState([]);
  const [loadingCountries, setLoadingCountries] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [locations, setLocations] = useState([]);
  const [loadingLocations, setLoadingLocations] = useState(false);

  const fetchCountries = async () => {
    try {
      const response = await fetch(`https:/secure.geonames.org/countryInfoJSON?username=${process.env.EXPO_PUBLIC_GEONAMES_USER_NAME}`);
      const data = await response.json();
      if (data.geonames) {
        setCountries(data.geonames);
      }
    } catch (error) {
      console.error('Error fetching countries:', error);
    } finally {
      setLoadingCountries(false);
    }
  };

  const fetchLocations = async (country) => {
    setLoadingLocations(true);
    try {
      const response = await fetch(
        `https:/secure.geonames.org/wikipediaSearchJSON?q=${country.countryName}&maxRows=10&username=${process.env.EXPO_PUBLIC_GEONAMES_USER_NAME}`
      ); // Replace 'demo' with your GeoNames username
      const data = await response.json();
      setLocations(data.geonames || []);
    } catch (error) {
      console.error('Error fetching locations:', error);
    } finally {
      setLoadingLocations(false);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Discover</Text>
      {loadingCountries ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <FlatList
          data={countries}
          keyExtractor={(item) => item.geonameId.toString()}
          horizontal
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => {
                setSelectedCountry(item);
                fetchLocations(item);
              }}
            >
              <Image source={{ uri: `https://flagcdn.com/w320/${item.countryCode.toLowerCase()}.png` }} style={styles.image} />
              <Text style={styles.cardTitle}>{item.countryName}</Text>
            </TouchableOpacity>
          )}
        />
      )}
      {selectedCountry && (
        <>
          <Text style={styles.subHeading}>Famous Locations in {selectedCountry.countryName}</Text>
          {loadingLocations ? (
            <ActivityIndicator size="large" color="#000" />
          ) : (
            <FlatList
              data={locations}
              keyExtractor={(item) => item.title}
              numColumns={2}
              renderItem={({ item }) => (
                <View style={styles.card}>
                  <Image source={{ uri: item.thumbnailImg || 'https://via.placeholder.com/400x200?text=No+Image' }} style={styles.image} />
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <View style={styles.ratingContainer}>
                    <Ionicons name="star" size={18} color="gold" />
                    <Text style={styles.ratingText}>{(Math.random() * (5 - 3) + 3).toFixed(1)}/5</Text>
                  </View>
                </View>
              )}
            />
          )}
        </>
      )}
    </View>
  );
};

export default Discover;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
    width: 160,
    alignItems: 'center',
    marginHorizontal: 8,
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 10,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 14,
    fontWeight: '600',
  },
});