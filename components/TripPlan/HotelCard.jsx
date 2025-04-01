import { Image, StyleSheet, Text, View, TouchableOpacity, Linking, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

const HotelCard = ({ hotelDetail }) => {
  const [hotelImage, setHotelImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDetails, setShowDetails] = useState(false);

  const fetchSceneryImage = async () => {
    const url = `https://api.unsplash.com/photos/random?query=scenery&client_id=${process.env.EXPO_PUBLIC_UNSPLASH_ACCESS_KEY}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.urls && data.urls.regular) {
        setHotelImage(data.urls.regular);
      } else {
        setHotelImage("https://via.placeholder.com/400x200?text=No+Image+Available");
      }
    } catch (error) {
      console.error("Error fetching scenery image:", error);
      setHotelImage("https://via.placeholder.com/400x200?text=No+Image+Available");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSceneryImage();
  }, []);

  if (!hotelDetail) {
    return <Text>Error: No hotel data available</Text>;
  }

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${hotelDetail.geo_coordinates?.latitude},${hotelDetail.geo_coordinates?.longitude}`;

  return (
    <TouchableOpacity onPress={() => setShowDetails(!showDetails)} style={styles.cardContainer}>
      <View style={styles.imageContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#888" style={styles.loader} />
        ) : (
          <Image source={{ uri: hotelImage }} style={styles.image} />
        )}
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.rowSpaceBetween}>
          <View style={styles.row}>
            <Text style={styles.hotelName}>{hotelDetail.hotel_name || "Unknown Hotel"}</Text>
            <TouchableOpacity onPress={() => Linking.openURL(mapsUrl)}>
              <Text style={styles.viewOnMap}>(View on Map)</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <Ionicons name="star" size={18} color="gold" />
            <Text style={styles.ratingText}>{hotelDetail.rating || "N/A"}</Text>
          </View>
        </View>

        <Text style={styles.price}>{hotelDetail.price_per_night ? `${hotelDetail.price_per_night} per night` : "Price not available"}</Text>

        {showDetails && (
          <>
            <Text style={styles.description}>{hotelDetail.description || "No description available"}</Text>
            <Text style={styles.amenitiesTitle}>Amenities:</Text>
            <Text style={styles.amenities}>
              {hotelDetail.amenities?.length > 0 ? hotelDetail.amenities.join(" • ") : "No amenities listed"}
            </Text>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default HotelCard;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "white",
    borderRadius: 15,
    overflow: "hidden",
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  imageContainer: {
    position: "relative",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderBottomLeftRadius:10,
    borderBottomRightRadius:10,
  },
  loader: {
    position: "absolute",
  },
  detailsContainer: {
    padding: 15,
  },
  rowSpaceBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap:"wrap"
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  hotelName: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 5,
  },
  viewOnMap: {
    fontSize: 14,
    color: "blue",
    textDecorationLine: "underline",
  },
  ratingText: {
    marginLeft: 1,
    fontSize: 14,
    fontWeight: "600",
  },
  description: {
    fontSize: 14,
    color: "#555",
    marginVertical: 5,
  },
  price: {
    fontSize: 14,
    // fontWeight: "bold",
    marginVertical: 5,
  },
  amenitiesTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 10,
  },
  amenities: {
    fontSize: 12,
    color: "gray",
  },
});
