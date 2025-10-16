import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  PermissionsAndroid,
  Platform,
  Image,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import Geolocation from "react-native-geolocation-service";
import { RootStackParamList, Workshop } from "../navigations/Types";

const LIST_API_URL =
  "https://www.autohubnepal.com/wp-json/simple-jwt-login/v1/autohub_api_get_list";

type AllWorkshopScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "AllWorkshop"
>;

interface WorkshopItemProps {
  workshop: Workshop;
  onPress: (workshop: Workshop) => void;
}

const WorkshopItem: React.FC<WorkshopItemProps> = ({ workshop, onPress }) => (
  <View style={styles.workshopCardWrapper}>
    <TouchableOpacity style={styles.workshopCard} onPress={() => onPress(workshop)}>
      {workshop.image && (
        <Image
          source={{ uri: workshop.image }}
          style={styles.workshopImage}
          resizeMode="cover"
        />
      )}
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{workshop.title}</Text>
      </View>

      <View style={styles.cardContent}>
        <Text style={styles.cardIcon}>📍</Text>
        <Text style={styles.cardDetail}>{workshop.address}</Text>
      </View>

      <View style={styles.cardContent}>
        <Text style={styles.cardIcon}>📞</Text>
        <Text style={styles.cardDetail}>{workshop.contact_phone}</Text>
      </View>

      <View style={styles.cardContent}>
        <Text style={styles.cardIcon}>🏷️</Text>
        <Text style={styles.cardDetail}>{workshop.category}</Text>
      </View>

      <TouchableOpacity
        style={styles.detailsButton}
        onPress={() => onPress(workshop)}
      >
        <Text style={styles.detailsButtonText}>View Details</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  </View>
);

export default function AllWorkshopScreen() {
  const navigation = useNavigation<AllWorkshopScreenNavigationProp>();
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [filteredWorkshops, setFilteredWorkshops] = useState<Workshop[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  const categories = [
    "All Categories",
    "AC Repair",
    "Auto Engineering",
    "Auto Garage",
    "Auto Parts",
    "Auto Recondition",
    "Auto Rental",
    "Bike Garage",
    "Denting and Painting",
    "Electric Vehicle",
    "Heavy Vehicle Garage",
    "Others",
    "Washing Center",
    "Wiring / Electrical",
  ];

  useEffect(() => {
    const fetchWorkshops = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(LIST_API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({}),
        });

        if (!response.ok) throw new Error(`List API failed (Status: ${response.status})`);

        const json = await response.json();

        if (json && Array.isArray(json.data)) {
          const mappedData: Workshop[] = json.data.map((item: any) => ({
            id: item.id,
            title: item.title?.replace("&#038;", "&") || "Untitled",
            address:
              item._autogarage_Localaddress ||
              item._autogarage_google_address ||
              item.content?.match(/located at ([^.,]+)/i)?.[1]?.trim() ||
              "Address not available",
            contact_phone: item._autogarage_phone || "N/A",
            category:
              Array.isArray(item.categories) && item.categories.length > 0
                ? item.categories[0]
                : "General",
            latitude: parseFloat(item._autogarage_latitude) || 27.7,
            longitude: parseFloat(item._autogarage_longitude) || 85.3,
            image: item.featured_image || null,
            permalink: item.permalink || "",
            whatsapp: item._autogarage_whatsapp || "",
            email: item._autogarage_email || "",
            amenities: item._autogarage_amenities || [],
            services: {
              mechanical: item._autogarage_mechanical_services || [],
              electrical: item._autogarage_electrical_services || [],
              painting: item._autogarage_painting_services || [],
              washing: item._autogarage_washing_services || [],
              tyre: item._autogarage_tyre_services || [],
              emergency: item._autogarage_emergency_services || [],
            },
          }));

          setWorkshops(mappedData);
          setFilteredWorkshops(mappedData);
        } else {
          setError("Invalid API response format.");
        }
      } catch (e) {
        console.error("Fetch Error:", e);
        setError("Failed to load workshops.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchWorkshops();
  }, []);

  useEffect(() => {
    const filtered = workshops.filter(
      (w) =>
        w.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (selectedCategory === "All Categories" || w.category === selectedCategory)
    );
    setFilteredWorkshops(filtered);
  }, [searchQuery, selectedCategory, workshops]);

  const handleSearch = () => {
    const filtered = workshops.filter(
      (w) =>
        w.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (selectedCategory === "All Categories" || w.category === selectedCategory)
    );
    setFilteredWorkshops(filtered);
  };

  const handleReset = () => {
    setSearchQuery("");
    setSelectedCategory("All Categories");
    setFilteredWorkshops(workshops);
  };

  const handleNearMe = async () => {
    try {
      if (Platform.OS === "android") {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert("Permission Denied", "Please enable location access.");
          return;
        }
      }

      Geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          const RADIUS_KM = 50;
          const toRad = (v: number) => (v * Math.PI) / 180;

          const nearby = workshops.filter((w) => {
            if (!w.latitude || !w.longitude) return false;
            const dLat = toRad(w.latitude - latitude);
            const dLon = toRad(w.longitude - longitude);
            const a =
              Math.sin(dLat / 2) ** 2 +
              Math.cos(toRad(latitude)) *
                Math.cos(toRad(w.latitude)) *
                Math.sin(dLon / 2) ** 2;
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            const distance = 6371 * c; // km
            return distance <= RADIUS_KM;
          });

          setFilteredWorkshops(nearby);
          if (nearby.length === 0) {
            Alert.alert("No Nearby Workshops", "No workshops found within 50 km.");
          }
        },
        (error) => {
          console.error(error);
          Alert.alert("Error", "Could not fetch your location.");
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleWorkshopPress = (workshop: Workshop) => {
    navigation.navigate("WorkshopDetail", {
      workshopId: String(workshop.id),
      name: workshop.title,
    });
  };

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#e63946" />
        <Text style={styles.loadingText}>Fetching workshop list...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.searchTitle}>Search Listing</Text>

        <View style={styles.searchControls}>
          <View style={styles.dropdownWrapper}>
            <Picker
              selectedValue={selectedCategory}
              onValueChange={(itemValue) => setSelectedCategory(itemValue)}
              style={styles.picker}
            >
              {categories.map((cat) => (
                <Picker.Item label={cat} value={cat} key={cat} />
              ))}
            </Picker>
          </View>

          <TextInput
            style={styles.searchInput}
            placeholder="Search AutoCare..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.searchButton, { backgroundColor: "#e63946" }]}
            onPress={handleNearMe}
          >
            <Text style={styles.buttonText}>📍 Near Me</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.searchButton, styles.searchAction]}
            onPress={handleSearch}
          >
            <Text style={styles.buttonText}>Search</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.searchButton, styles.resetButton]}
            onPress={handleReset}
          >
            <Text style={styles.buttonText}>Reset</Text>
          </TouchableOpacity>
        </View>

        {error && <Text style={styles.errorText}>{error}</Text>}

        {filteredWorkshops.map((item) => (
          <WorkshopItem key={item.id} workshop={item} onPress={handleWorkshopPress} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f0f0f0" },
  scrollContent: { paddingBottom: 20 },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  loadingText: { marginTop: 10, fontSize: 16, color: "#555" },
  errorText: { color: "red", textAlign: "center", margin: 10 },
  searchTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
    color: "#333",
  },
  searchControls: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 15,
    marginBottom: 10,
  },
  dropdownWrapper: {
    flex: 1,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginRight: 5,
  },
  picker: { height: 40, width: "100%" },
  searchInput: {
    flex: 2,
    height: 40,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  searchButton: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    alignItems: "center",
  },
  searchAction: { backgroundColor: "#007bff" },
  resetButton: { backgroundColor: "#555" },
  buttonText: { color: "#fff", fontWeight: "bold" },
  workshopCardWrapper: {
    marginHorizontal: 15,
    marginBottom: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  workshopCard: { backgroundColor: "#fff", borderRadius: 8, padding: 10 },
  workshopImage: {
    width: "100%",
    height: 160,
    borderRadius: 8,
    marginBottom: 10,
  },
  cardHeader: { marginBottom: 5 },
  cardTitle: { fontSize: 18, fontWeight: "bold", color: "#e63946", marginBottom: 5 },
  cardContent: { flexDirection: "row", marginBottom: 3 },
  cardIcon: { fontSize: 14, marginRight: 8, color: "#e63946", fontWeight: "bold" },
  cardDetail: { fontSize: 14, color: "#333" },
  detailsButton: { alignSelf: "flex-end", marginTop: 5 },
  detailsButtonText: { fontSize: 14, color: "#007bff", fontWeight: "600" },
});