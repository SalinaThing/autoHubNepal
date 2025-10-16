import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  Modal,
} from "react-native";
import Header from "../components/Header";
import Footer from "../components/Footer";

const { width } = Dimensions.get("window");

interface HomeScreenProps {
  navigation: any;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All Services");
  const [isCategoryModalVisible, setIsCategoryModalVisible] = useState(false);
  const [showAllGarages, setShowAllGarages] = useState(false);
  const [showAllPartners, setShowAllPartners] = useState(false);
  const [showAllBrands, setShowAllBrands] = useState(false);
  const [showAllServices, setShowAllServices] = useState(false);

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

  // Sample data for garages
  const garages = [
    { id: 1, name: "Autofocus Garage", distance: "5.3 km", driving: "17km", location: "Baneshwor", rating: "4.8", reviews: "120" },
    { id: 2, name: "City Auto Care", distance: "2.1 km", driving: "8km", location: "Putalisadak", rating: "4.5", reviews: "89" },
    { id: 3, name: "Premium Motors", distance: "7.8 km", driving: "22km", location: "New Baneshwor", rating: "4.9", reviews: "156" },
    { id: 4, name: "Quick Fix Garage", distance: "3.5 km", driving: "12km", location: "Koteshwor", rating: "4.3", reviews: "67" },
    { id: 5, name: "Pro Auto Works", distance: "6.2 km", driving: "19km", location: "Kalanki", rating: "4.7", reviews: "203" },
    { id: 6, name: "Elite Car Service", distance: "4.7 km", driving: "15km", location: "Sorhakhutte", rating: "4.6", reviews: "98" },
    { id: 7, name: "Master Mechanics", distance: "8.3 km", driving: "25km", location: "Boudha", rating: "4.4", reviews: "112" },
    { id: 8, name: "Auto Experts Nepal", distance: "1.8 km", driving: "6km", location: "Thamel", rating: "4.8", reviews: "145" },
  ];

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
    const displayGarages = showAllGarages ? garages : garages.slice(0, 4);
    
    if (showAllGarages) {
      return (
        <View style={styles.gridContainer}>
          {displayGarages.map((garage) => (
            <View key={garage.id} style={styles.garageGridCard}>
              <View style={styles.garageHeader}>
                <View style={styles.garageIcon}>
                  <Text style={styles.garageEmoji}>🔧</Text>
                </View>
                <View style={styles.garageInfo}>
                  <Text style={styles.garageName}>{garage.name}</Text>
                  <Text style={styles.garageDistance}>{garage.distance} away</Text>
                </View>
              </View>
              <View style={styles.garageDivider} />
              <View style={styles.garageDetails}>
                <Text style={styles.garageDetail}>📍 {garage.driving} by driving</Text>
                <Text style={styles.garageDetail}>🏢 {garage.location}</Text>
                <Text style={styles.garageDetail}>⭐ {garage.rating} ({garage.reviews} reviews)</Text>
              </View>
              <TouchableOpacity style={styles.directionBtn}>
                <Text style={styles.directionText}>Get Directions</Text>
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
              <View style={styles.garageHeader}>
                <View style={styles.garageIcon}>
                  <Text style={styles.garageEmoji}>🔧</Text>
                </View>
                <View style={styles.garageInfo}>
                  <Text style={styles.garageName}>{garage.name}</Text>
                  <Text style={styles.garageDistance}>{garage.distance} away</Text>
                </View>
              </View>
              <View style={styles.garageDivider} />
              <View style={styles.garageDetails}>
                <Text style={styles.garageDetail}>📍 {garage.driving} by driving</Text>
                <Text style={styles.garageDetail}>🏢 {garage.location}</Text>
                <Text style={styles.garageDetail}>⭐ {garage.rating} ({garage.reviews} reviews)</Text>
              </View>
              <TouchableOpacity style={styles.directionBtn}>
                <Text style={styles.directionText}>Get Directions</Text>
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
      {/* HEADER */}
      <Header navigation={navigation} activeRoute="Home" />

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
              <Text style={styles.searchIcon}>📍</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your location..."
                placeholderTextColor="#999"
              />
            </View>
            <TouchableOpacity style={styles.searchBtn}>
              <Text style={styles.searchText}>Search</Text>
            </TouchableOpacity>
          </View>

          {/* ADD BUSINESS BUTTON */}
          <TouchableOpacity style={styles.addBusinessBtn}>
            <Text style={styles.addBusinessText}>+ ADD YOUR BUSINESS</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>

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
        {renderGarageCards()}
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
          <Text style={styles.sectionTitle}>Lubricant Brands</Text>
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

      <Footer />
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
    backgroundColor: "#0066CC",
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
    color: "#0066CC",
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
    backgroundColor: "#0066CC",
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
    color: "#0066CC",
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
    backgroundColor: "#0066CC",
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
});

export default HomeScreen;
