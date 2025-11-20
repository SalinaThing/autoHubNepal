import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  Modal,
  Alert,
  TextInput,
  ActivityIndicator,
  PermissionsAndroid,
  Platform,
  Image,
} from "react-native";
import Geolocation from "react-native-geolocation-service";
import MapView, { Marker } from "react-native-maps";
import { Workshop } from "../navigations/Types";

const { width } = Dimensions.get("window");

const LIST_API_URL =
  "https://www.autohubnepal.com/wp-json/simple-jwt-login/v1/autohub_api_get_list";

interface HomeScreenProps {
  navigation: any;
}

type LocationCoords = {
  latitude: number;
  longitude: number;
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All Services");
  const [isCategoryModalVisible, setIsCategoryModalVisible] = useState(false);
  const [showAllGarages, setShowAllGarages] = useState(false);
  const [showAllPartners, setShowAllPartners] = useState(false);
  const [showAllBrands, setShowAllBrands] = useState(false);
  const [showAllServices, setShowAllServices] = useState(false);
  const [searchLocation, setSearchLocation] = useState<string>("");
  const [garages, setGarages] = useState<Workshop[]>([]);
  const [filteredGarages, setFilteredGarages] = useState<Workshop[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [location, setLocation] = useState<LocationCoords | null>(null);
  const [gettingLocation, setGettingLocation] = useState(false);

  const categories = [
    "All Services",
    "Engine Repair",
    "Brake Service",
    "Oil Change",
    "Tire Service",
    "Battery Replacement",
    "AC Service",
    "Car Wash",
    "Electrical Repair",
  ];

  // Fetch garages from API on component mount
  useEffect(() => {
    fetchGarages();
  }, []);

  const fetchGarages = async () => {
    setIsLoading(true);
    console.log("🔄 Fetching garages from API...");
    try {
      const response = await fetch(LIST_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });

      if (!response.ok) throw new Error(`API failed (Status: ${response.status})`);

      const json = await response.json();
      console.log("✅ API Response received:", json);

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

        console.log(`✅ Loaded ${mappedData.length} garages from API`);
        setGarages(mappedData);
        setFilteredGarages(mappedData);
      } else {
        console.warn("⚠️ Invalid API response format");
      }
    } catch (error) {
      console.error("❌ Fetch Error:", error);
      Alert.alert("Error", "Failed to load garages. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const requestLocationPermission = async () => {
    if (Platform.OS !== "android") return true;

    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Allow Location Access",
        message: "AutoHub uses your location to show nearby garages.",
        buttonPositive: "Allow",
        buttonNegative: "Deny",
      }
    );

    return granted === PermissionsAndroid.RESULTS.GRANTED;
  };

  const useCurrentLocation = async () => {
    const permitted = await requestLocationPermission();
    if (!permitted) {
      Alert.alert("Location Denied", "Please allow location access to use this feature.");
      return;
    }

    setGettingLocation(true);
    Geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setLocation({ latitude, longitude });
        setGettingLocation(false);
        console.log("📍 Location obtained:", latitude, longitude);
      },
      (err) => {
        Alert.alert("Location Error", err.message || "Failed to get location");
        setGettingLocation(false);
      },
      { enableHighAccuracy: false, timeout: 15000, maximumAge: 10000 }
    );
  };

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const handleSearch = () => {
    if (!searchLocation.trim()) {
      Alert.alert("Please enter a location first!");
      return;
    }

    setIsSearching(true);
    console.log("🔍 Searching for:", searchLocation);

    // Filter garages by location search term
    const filtered = garages.filter((garage) => {
      const searchLower = searchLocation.toLowerCase();
      return (
        garage.title.toLowerCase().includes(searchLower) ||
        garage.address.toLowerCase().includes(searchLower) ||
        garage.category.toLowerCase().includes(searchLower)
      );
    });

    // If we have user location, sort by distance
    if (location && filtered.length > 0) {
      const withDistance = filtered.map((garage) => ({
        ...garage,
        distance: calculateDistance(
          location.latitude,
          location.longitude,
          garage.latitude,
          garage.longitude
        ),
      }));

      withDistance.sort((a, b) => (a.distance || 0) - (b.distance || 0));
      setFilteredGarages(withDistance);
    } else {
      setFilteredGarages(filtered);
    }

    setIsSearching(false);

    if (filtered.length === 0) {
      Alert.alert("No Results", `No garages found for "${searchLocation}"`);
    } else {
      console.log(`✅ Found ${filtered.length} garage(s) for "${searchLocation}"`);
    }
  };

  // Sample data for partners
  const partners = [
    { id: 1, name: "Toyota Nepal", emoji: "🏢" },
    { id: 2, name: "Honda Service", emoji: "🔧" },
    { id: 3, name: "Hyundai Care", emoji: "🚗" },
    { id: 4, name: "Ford Experts", emoji: "🏭" },
    { id: 5, name: "Nissan Pro", emoji: "⚙️" },
    { id: 6, name: "MG Service", emoji: "🔩" },
  ];

  
  // Sample data for lubricant brands
  const lubricantBrands = [
    { id: 1, name: "Mobil 1", desc: "Premium Engine Oil", emoji: "🛢️" },
    { id: 2, name: "Castrol", desc: "Advanced Lubricants", emoji: "⚡" },
    { id: 3, name: "Shell Helix", desc: "High Performance", emoji: "🔥" },
    { id: 4, name: "Valvoline", desc: "Professional Grade", emoji: "🔄" },
    { id: 5, name: "Total", desc: "Quality Lubricants", emoji: "⭐" },
    { id: 6, name: "Motul", desc: "Racing Heritage", emoji: "🏁" },
  ];

  // Sample data for services
  const services = [
    { id: 1, name: "Oil Change", price: "Rs. 1500", emoji: "🛢️" },
    { id: 2, name: "Brake Service", price: "Rs. 2500", emoji: "🛑" },
    { id: 3, name: "AC Repair", price: "Rs. 3500", emoji: "❄️" },
    { id: 4, name: "Tire Rotation", price: "Rs. 800", emoji: "🔄" },
    { id: 5, name: "Battery Check", price: "Rs. 500", emoji: "🔋" },
    { id: 6, name: "Engine Tune", price: "Rs. 4500", emoji: "⚙️" },
  ];

  const backgroundImages = [
    "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80",
    "https://images.unsplash.com/photo-1603712610496-5362a0e6a8a8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  ];

  const randomBackground = backgroundImages[Math.floor(Math.random() * backgroundImages.length)];

  // Function to render garage cards
  const renderGarageCards = () => {
    const displayGarages = showAllGarages ? filteredGarages : filteredGarages.slice(0, 4);
    
    if (showAllGarages) {
      return (
        <View style={styles.gridContainer}>
          {displayGarages.map((garage) => (
            <View key={garage.id} style={styles.garageGridCard}>
              {garage.image && (
                <Image source={{ uri: garage.image }} style={styles.garageImage} resizeMode="cover" />
              )}
              <View style={styles.garageHeader}>
                <View style={styles.garageIcon}>
                  <Text style={styles.garageEmoji}>🔧</Text>
                </View>
                <View style={styles.garageInfo}>
                  <Text style={styles.garageName}>{garage.title}</Text>
                  {(garage as any).distance && (
                    <Text style={styles.garageDistance}>{(garage as any).distance.toFixed(1)} km away</Text>
                  )}
                </View>
              </View>
              <View style={styles.garageDivider} />
              <View style={styles.garageDetails}>
                <Text style={styles.garageDetail}>📍 {garage.address}</Text>
                <Text style={styles.garageDetail}>📞 {garage.contact_phone}</Text>
                <Text style={styles.garageDetail}>🏷️ {garage.category}</Text>
              </View>
              <TouchableOpacity
                style={styles.directionBtn}
                onPress={() => navigation.navigate("WorkshopDetail", { workshopId: String(garage.id), name: garage.title })}
              >
                <Text style={styles.directionText}>View Details</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      );
    } else {
      return (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.garageScroll}
        >
          {displayGarages.map((garage) => (
            <View key={garage.id} style={styles.garageCard}>
              {garage.image && (
                <Image source={{ uri: garage.image }} style={styles.garageImage} resizeMode="cover" />
              )}
              <View style={styles.garageHeader}>
                <View style={styles.garageIcon}>
                  <Text style={styles.garageEmoji}>🔧</Text>
                </View>
                <View style={styles.garageInfo}>
                  <Text style={styles.garageName}>{garage.title}</Text>
                  {(garage as any).distance && (
                    <Text style={styles.garageDistance}>{(garage as any).distance.toFixed(1)} km away</Text>
                  )}
                </View>
              </View>
              <View style={styles.garageDivider} />
              <View style={styles.garageDetails}>
                <Text style={styles.garageDetail}>📍 {garage.address}</Text>
                <Text style={styles.garageDetail}>📞 {garage.contact_phone}</Text>
                <Text style={styles.garageDetail}>🏷️ {garage.category}</Text>
              </View>
              <TouchableOpacity
                style={styles.directionBtn}
                onPress={() => navigation.navigate("WorkshopDetail", { workshopId: String(garage.id), name: garage.title })}
              >
                <Text style={styles.directionText}>View Details</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      );
    }
  };

  // Function to render partner cards
  const renderPartnerCards = () => {
    const displayPartners = showAllPartners ? partners : partners.slice(0, 4);
    
    if (showAllPartners) {
      return (
        <View style={styles.gridContainer}>
          {displayPartners.map((partner) => (
            <View key={partner.id} style={styles.partnerGridBox}>
              <View style={styles.partnerLogo}>
                <Text style={styles.partnerEmoji}>{partner.emoji}</Text>
              </View>
              <Text style={styles.partnerName}>{partner.name}</Text>
            </View>
          ))}
        </View>
      );
    } else {
      return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {displayPartners.map((partner) => (
            <View key={partner.id} style={styles.partnerBox}>
              <View style={styles.partnerLogo}>
                <Text style={styles.partnerEmoji}>{partner.emoji}</Text>
              </View>
              <Text style={styles.partnerName}>{partner.name}</Text>
            </View>
          ))}
        </ScrollView>
      );
    }
  };

  // Function to render lubricant brands
  const renderLubricantBrands = () => {
    const displayBrands = showAllBrands ? lubricantBrands : lubricantBrands.slice(0, 4);
    
    if (showAllBrands) {
      return (
        <View style={styles.gridContainer}>
          {displayBrands.map((brand) => (
            <View key={brand.id} style={styles.brandGridCard}>
              <View style={styles.brandIcon}>
                <Text style={styles.brandEmoji}>{brand.emoji}</Text>
              </View>
              <Text style={styles.brandName}>{brand.name}</Text>
              <Text style={styles.brandDesc}>{brand.desc}</Text>
            </View>
          ))}
        </View>
      );
    } else {
      return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {displayBrands.map((brand) => (
            <View key={brand.id} style={styles.brandCard}>
              <View style={styles.brandIcon}>
                <Text style={styles.brandEmoji}>{brand.emoji}</Text>
              </View>
              <Text style={styles.brandName}>{brand.name}</Text>
              <Text style={styles.brandDesc}>{brand.desc}</Text>
            </View>
          ))}
        </ScrollView>
      );
    }
  };

  // Function to render services
  const renderServices = () => {
    const displayServices = showAllServices ? services : services.slice(0, 4);
    
    if (showAllServices) {
      return (
        <View style={styles.gridContainer}>
          {displayServices.map((service) => (
            <View key={service.id} style={styles.serviceGridCard}>
              <View style={styles.serviceIcon}>
                <Text style={styles.serviceEmoji}>{service.emoji}</Text>
              </View>
              <Text style={styles.serviceName}>{service.name}</Text>
              <Text style={styles.servicePrice}>{service.price}</Text>
            </View>
          ))}
        </View>
      );
    } else {
      return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {displayServices.map((service) => (
            <View key={service.id} style={styles.serviceCard}>
              <View style={styles.serviceIcon}>
                <Text style={styles.serviceEmoji}>{service.emoji}</Text>
              </View>
              <Text style={styles.serviceName}>{service.name}</Text>
              <Text style={styles.servicePrice}>{service.price}</Text>
            </View>
          ))}
        </ScrollView>
      );
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* HERO SECTION */}
      <ImageBackground
        source={{ uri: randomBackground }}
        style={styles.hero}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <Text style={styles.heroTitle}>Auto Problem?</Text>
          <Text style={styles.heroSubtitle}>Find the Best Garage Near You</Text>

          {/* SEARCH BOX */}
          <View style={styles.searchContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.searchIcon}>🔍</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your location..."
                placeholderTextColor="#999"
                value={searchLocation}
                onChangeText={setSearchLocation}
              />
            </View>

            <TouchableOpacity
              style={styles.searchBtn}
              onPress={handleSearch}
              disabled={isSearching || isLoading}
            >
              {isSearching ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <Text style={styles.searchText}>Search</Text>
              )}
            </TouchableOpacity>
          </View>

          {/* ADD BUSINESS BUTTON */}
        <TouchableOpacity
          style={styles.addBusinessBtn}
          onPress={() => navigation.navigate("RegisterBusiness")} // 👈 navigate to the Register Business screen
        >
          <Text style={styles.addBusinessText}>+ ADD YOUR BUSINESS</Text>
        </TouchableOpacity>
        </View>
      </ImageBackground>

      {/* MAP SECTION - Static map like RegisterScreen */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Find Your Location</Text>
        <TouchableOpacity style={styles.locBtn} onPress={useCurrentLocation} disabled={gettingLocation}>
          {gettingLocation ? <ActivityIndicator color="#fff" /> : <Text style={{ color: "#fff" }}>📍 Use Current Location</Text>}
        </TouchableOpacity>

        <View style={{ height: 12 }} />

        {location ? (
          <View style={{ height: 180, borderRadius: 8, overflow: "hidden" }}>
            <MapView
              key={`${location.latitude}-${location.longitude}`}
              style={{ flex: 1 }}
              initialRegion={{
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
            >
              <Marker coordinate={location} />
            </MapView>
          </View>
        ) : (
          <View style={styles.mapPlaceholder}>
            <Text style={{ color: "#777" }}>Map preview will appear after selecting current location.</Text>
          </View>
        )}
      </View>

      {/* NEAREST AUTO GARAGE SECTION */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Your Nearest Auto Garage</Text>
        </View>
        <Text style={styles.sectionDescription}>
          Find the closest and most reliable auto garage services in your area
        </Text>

        {/* CATEGORY DROPDOWN */}
        <View style={styles.categorySection}>
          <Text style={styles.categoryTitle}>Select Category</Text>
          <TouchableOpacity 
            style={styles.dropdownButton}
            onPress={() => setIsCategoryModalVisible(true)}
          >
            <Text style={styles.dropdownButtonText}>{selectedCategory}</Text>
            <Text style={styles.dropdownArrow}>▼</Text>
          </TouchableOpacity>
        </View>

        {/* SHOWING NEARBY GARAGES */}
        <View style={styles.nearbyHeader}>
          <Text style={styles.nearbyTitle}>Showing nearby AutoCare garages</Text>
          <TouchableOpacity onPress={() => setShowAllGarages(!showAllGarages)}>
            <Text style={styles.seeAll}>
              {showAllGarages ? 'Show Less' : 'See all'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* GARAGE LIST - Horizontal slider or Grid */}
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#dc2626" />
            <Text style={styles.loadingText}>Loading garages from API...</Text>
          </View>
        ) : filteredGarages.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No garages found. Try searching for a location.</Text>
          </View>
        ) : (
          renderGarageCards()
        )}
      </View>

      {/* OUR TRUSTED PARTNERS */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Our Trusted Partners</Text>
          <TouchableOpacity onPress={() => setShowAllPartners(!showAllPartners)}>
            <Text style={styles.seeAll}>
              {showAllPartners ? 'Show Less' : 'View all'}
            </Text>
          </TouchableOpacity>
        </View>
        {renderPartnerCards()}
      </View>

      {/* LUBRICANT BRANDS */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Our Lubricant Brands</Text>
          <TouchableOpacity onPress={() => setShowAllBrands(!showAllBrands)}>
            <Text style={styles.seeAll}>
              {showAllBrands ? 'Show Less' : 'See all'}
            </Text>
          </TouchableOpacity>
        </View>
        {renderLubricantBrands()}
      </View>

      {/* FEATURED SERVICES */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured Services</Text>
          <TouchableOpacity onPress={() => setShowAllServices(!showAllServices)}>
            <Text style={styles.seeAll}>
              {showAllServices ? 'Show Less' : 'View all'}
            </Text>
          </TouchableOpacity>
        </View>
        {renderServices()}
      </View>

      {/* HOW IT WORKS */}
      <View style={[styles.section, styles.howItWorksSection]}>
        <Text style={styles.sectionTitle}>How It Works</Text>
        <View style={styles.stepsContainer}>
          <View style={styles.step}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>1</Text>
            </View>
            <Text style={styles.stepTitle}>Enter Location</Text>
            <Text style={styles.stepDescription}>Tell us where you are</Text>
          </View>
          <View style={styles.step}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>2</Text>
            </View>
            <Text style={styles.stepTitle}>Select Service</Text>
            <Text style={styles.stepDescription}>Choose what you need</Text>
          </View>
          <View style={styles.step}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>3</Text>
            </View>
            <Text style={styles.stepTitle}>Browse Garage</Text>
            <Text style={styles.stepDescription}>Compare options</Text>
          </View>
          <View style={styles.step}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>4</Text>
            </View>
            <Text style={styles.stepTitle}>Book & Repair</Text>
            <Text style={styles.stepDescription}>Get your car fixed</Text>
          </View>
        </View>
      </View>

      {/* CATEGORY MODAL */}
      <Modal
        visible={isCategoryModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsCategoryModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Category</Text>
              <TouchableOpacity onPress={() => setIsCategoryModalVisible(false)}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.modalScrollView}>
              {categories.map((category, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.categoryItem,
                    selectedCategory === category && styles.selectedCategoryItem
                  ]}
                  onPress={() => {
                    setSelectedCategory(category);
                    setIsCategoryModalVisible(false);
                  }}
                >
                  <Text style={[
                    styles.categoryItemText,
                    selectedCategory === category && styles.selectedCategoryItemText
                  ]}>
                    {category}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  hero: {
    height: 400,
    justifyContent: "center",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  },
  heroSubtitle: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    marginBottom: 30,
    opacity: 0.9,
  },
  searchContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 15,
    marginBottom: 20,
    overflow: "hidden",
    width: "90%",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 10,
  },
  input: {
    flex: 1,
    padding: 15,
    fontSize: 16,
    color: "#333",
  },
  searchBtn: {
    backgroundColor: "#dc2626",
    paddingHorizontal: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  searchText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  addBusinessBtn: {
    borderWidth: 2,
    borderColor: "#fff",
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 30,
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  addBusinessText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  section: {
    padding: 25,
    backgroundColor: "#fff",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1a1a1a",
  },
  sectionDescription: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
    lineHeight: 22,
  },
  categorySection: {
    marginBottom: 25,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
  },
  dropdownButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 16,
  },
  dropdownButtonText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  dropdownArrow: {
    fontSize: 12,
    color: '#666',
  },
  nearbyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  nearbyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#222",
  },
  seeAll: {
    color: "#dc2626",
    fontWeight: "600",
    fontSize: 14,
  },
  garageScroll: {
    marginHorizontal: -5,
  },
  garageCard: {
    width: 300,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 8,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  garageGridCard: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 15,
    marginBottom: 15,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  garageHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  garageIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F0F7FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  garageEmoji: {
    fontSize: 18,
  },
  garageInfo: {
    flex: 1,
  },
  garageName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1a1a1a",
  },
  garageDistance: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  garageDivider: {
    height: 1,
    backgroundColor: "#f0f0f0",
    marginVertical: 12,
  },
  garageDetails: {
    marginBottom: 15,
  },
  garageDetail: {
    fontSize: 12,
    color: "#555",
    marginBottom: 6,
    lineHeight: 16,
  },
  directionBtn: {
    backgroundColor: "#dc2626",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    elevation: 2,
  },
  directionText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },
  horizontalScroll: {
    paddingVertical: 5,
  },
  partnerBox: {
    width: 140,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginRight: 15,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  partnerGridBox: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 15,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  partnerLogo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#F0F7FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  partnerEmoji: {
    fontSize: 24,
  },
  partnerName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#222",
    textAlign: "center",
  },
  brandCard: {
    width: 160,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginRight: 15,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  brandGridCard: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 15,
    marginBottom: 15,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  brandIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#FFF0F0",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  brandEmoji: {
    fontSize: 20,
  },
  brandName: {
    fontSize: 14,
    fontWeight: "700",
    color: "#222",
    marginBottom: 4,
    textAlign: "center",
  },
  brandDesc: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
  serviceCard: {
    width: 150,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginRight: 15,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  serviceGridCard: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 15,
    marginBottom: 15,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  serviceIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#F0F7FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  serviceEmoji: {
    fontSize: 20,
  },
  serviceName: {
    fontSize: 14,
    fontWeight: "700",
    color: "#222",
    marginBottom: 6,
    textAlign: "center",
  },
  servicePrice: {
    fontSize: 14,
    color: "#dc2626",
    fontWeight: "600",
  },
  howItWorksSection: {
    backgroundColor: "#F8FAFF",
    borderBottomWidth: 0,
  },
  stepsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 10,
  },
  step: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 15,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  stepNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#dc2626",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  stepNumberText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#222",
    marginBottom: 6,
    textAlign: "center",
  },
  stepDescription: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    lineHeight: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
  },
  closeButton: {
    fontSize: 20,
    color: '#666',
    fontWeight: 'bold',
  },
  modalScrollView: {
    maxHeight: 400,
  },
  categoryItem: {
    padding: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  selectedCategoryItem: {
    backgroundColor: '#f0f7ff',
  },
  categoryItemText: {
    fontSize: 16,
    color: '#333',
  },
  selectedCategoryItemText: {
    color: '#0066CC',
    fontWeight: '500',
  },
  garageImage: {
    width: "100%",
    height: 120,
    borderRadius: 12,
    marginBottom: 10,
  },
  mapPlaceholder: {
    height: 180,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fafafa",
  },
  locBtn: {
    backgroundColor: "#dc2626",
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 10,
    width: 220,
  },
  loadingContainer: {
    padding: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
  emptyContainer: {
    padding: 40,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
    textAlign: "center",
  },
});

export default HomeScreen;
