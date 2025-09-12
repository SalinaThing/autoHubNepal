import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* MODERN NAVBAR */}
      <View style={styles.navbar}>
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>AutoHub</Text>
          <Text style={styles.logoSuffix}>Nepal</Text>
        </View>
        <View style={styles.navLinks}>
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <Text style={[styles.link, styles.activeLink]}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("About")}>
            <Text style={styles.link}>About Us</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("RegisterBusiness")}>
            <Text style={styles.link}>Register Business</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.link}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* HERO SECTION WITH MODERN DESIGN */}
      <View style={styles.hero}>
        <View style={styles.heroContent}>
          <Text style={styles.heroTitle}>Find Your Nearest Auto Garage</Text>
          <Text style={styles.heroDesc}>
            Discover the closest and most reliable auto garage services wherever
            you are in Nepal
          </Text>

          <View style={styles.searchContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputIcon}>📍</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your location"
                placeholderTextColor="#999"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputIcon}>🛠️</Text>
              <TextInput
                style={styles.input}
                placeholder="Select Service Type"
                placeholderTextColor="#999"
              />
            </View>
            <TouchableOpacity style={styles.searchBtn}>
              <Text style={styles.searchText}>Search</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.heroVisual}>
          <Text style={styles.heroEmoji}>🚗</Text>
        </View>
      </View>

      {/* NEARBY GARAGES */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Nearby Auto Garages</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {[1, 2, 3, 4].map((i) => (
            <View key={i} style={styles.card}>
              <View style={styles.cardHeader}>
                <View style={styles.cardIcon}>
                  <Text style={styles.cardEmoji}>🔧</Text>
                </View>
                <View>
                  <Text style={styles.cardTitle}>Autofocus Garage</Text>
                  <Text style={styles.cardDistance}>5.3 km away</Text>
                </View>
              </View>
              <View style={styles.cardDivider} />
              <View style={styles.cardDetails}>
                <Text style={styles.cardDetailItem}>📍 17km by driving</Text>
                <Text style={styles.cardDetailItem}>🏢 Location: Bane</Text>
                <Text style={styles.cardDetailItem}>⭐ 4.8 (120 reviews)</Text>
              </View>
              <TouchableOpacity style={styles.cardButton}>
                <Text style={styles.cardButtonText}>Get Directions</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* OUR TRUSTED PARTNERS */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Our Trusted Partners</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>View all</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.partnerGrid}>
          {[1, 2, 3, 4].map((i) => (
            <View key={i} style={styles.partnerBox}>
              <View style={styles.partnerLogo}>
                <Text style={styles.partnerEmoji}>🏢</Text>
              </View>
              <Text style={styles.partnerName}>Partner {i}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* OUR LUBRICANT BRANDS */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Lubricant Brands</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {[1, 2, 3, 4].map((i) => (
            <View key={i} style={styles.brandCard}>
              <View style={styles.brandIcon}>
                <Text style={styles.brandEmoji}>🛢️</Text>
              </View>
              <Text style={styles.brandName}>Brand {i}</Text>
              <Text style={styles.brandDesc}>Premium lubricants</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* FEATURED SERVICES */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured Services</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>View all</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {[1, 2, 3, 4].map((i) => (
            <View key={i} style={styles.serviceCard}>
              <View style={styles.serviceIcon}>
                <Text style={styles.serviceEmoji}>⚙️</Text>
              </View>
              <Text style={styles.serviceName}>Service {i}</Text>
              <Text style={styles.servicePrice}>From Rs. 1500</Text>
            </View>
          ))}
        </ScrollView>
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

      {/* MODERN FOOTER */}
      <View style={styles.footer}>
        <View style={styles.footerContent}>
          <View style={styles.footerBrand}>
            <View style={styles.logoContainer}>
              <Text style={styles.footerLogo}>AutoHub</Text>
              <Text style={styles.footerLogoSuffix}>Nepal</Text>
            </View>
            <Text style={styles.footerSubtitle}>
              Experience in automotive excellence
            </Text>
            <View style={styles.socialRow}>
              <TouchableOpacity style={styles.socialButton}>
                <Text style={styles.socialIcon}>🌐</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <Text style={styles.socialIcon}>📘</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <Text style={styles.socialIcon}>📸</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <Text style={styles.socialIcon}>🔗</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.footerGrid}>
            <View style={styles.footerColumn}>
              <Text style={styles.footerHeader}>Quick Links</Text>
              <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                <Text style={styles.footerLink}>Home</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("About")}>
                <Text style={styles.footerLink}>About Us</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("RegisterBusiness")}>
                <Text style={styles.footerLink}>Register Business</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={styles.footerLink}>Login</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.footerColumn}>
              <Text style={styles.footerHeader}>Contact Us</Text>
              <Text style={styles.footerText}>Kathmandu, Nepal</Text>
              <Text style={styles.footerText}>+977 9888888888</Text>
              <Text style={styles.footerText}>info@autohubnepal.com</Text>
              <Text style={styles.footerText}>Sun-Fri: 10AM - 6PM</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.footerBottom}>
          <Text style={styles.copyright}>© 2023 AutoHubNepal. All rights reserved.</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  // MODERN NAVBAR
  navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  logo: {
    fontSize: 22,
    fontWeight: "800",
    color: "#0066FF",
  },
  logoSuffix: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FF6B00",
  },
  navLinks: {
    flexDirection: "row",
  },
  link: {
    marginHorizontal: 12,
    color: "#555",
    fontWeight: "500",
    fontSize: 15,
  },
  activeLink: {
    color: "#0066FF",
    fontWeight: "700",
  },
  // HERO SECTION
  hero: {
    flexDirection: "row",
    padding: 20,
    backgroundColor: "#F0F7FF",
  },
  heroContent: {
    flex: 2,
  },
  heroVisual: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heroEmoji: {
    fontSize: 64,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#222",
    marginBottom: 10,
  },
  heroDesc: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
    lineHeight: 22,
  },
  searchContainer: {
    gap: 12,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 50,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  inputIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  searchBtn: {
    backgroundColor: "#0066FF",
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  searchText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  // SECTIONS
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#222",
  },
  seeAll: {
    color: "#0066FF",
    fontWeight: "500",
  },
  horizontalScroll: {
    paddingVertical: 5,
  },
  // CARDS
  card: {
    width: 280,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginRight: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  cardIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F0F7FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  cardEmoji: {
    fontSize: 20,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
  },
  cardDistance: {
    fontSize: 14,
    color: "#666",
  },
  cardDivider: {
    height: 1,
    backgroundColor: "#f0f0f0",
    marginVertical: 10,
  },
  cardDetails: {
    marginBottom: 15,
  },
  cardDetailItem: {
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
  },
  cardButton: {
    backgroundColor: "#0066FF",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  cardButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  // PARTNER GRID
  partnerGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  partnerBox: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  partnerLogo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#F0F7FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  partnerEmoji: {
    fontSize: 24,
  },
  partnerName: {
    fontSize: 14,
    fontWeight: "500",
    color: "#222",
  },
  // BRAND CARDS
  brandCard: {
    width: 150,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginRight: 15,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
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
    fontSize: 24,
  },
  brandName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
    marginBottom: 5,
  },
  brandDesc: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
  // SERVICE CARDS
  serviceCard: {
    width: 140,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginRight: 15,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
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
    fontSize: 24,
  },
  serviceName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#222",
    marginBottom: 5,
    textAlign: "center",
  },
  servicePrice: {
    fontSize: 12,
    color: "#0066FF",
    fontWeight: "500",
  },
  // HOW IT WORKS
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
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  stepNumber: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#0066FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  stepNumberText: {
    color: "#fff",
    fontWeight: "600",
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
    marginBottom: 5,
    textAlign: "center",
  },
  stepDescription: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
  // MODERN FOOTER
  footer: {
    backgroundColor: "#1a1a1a",
    paddingTop: 30,
  },
  footerContent: {
    paddingHorizontal: 20,
  },
  footerBrand: {
    marginBottom: 25,
  },
  footerLogo: {
    fontSize: 22,
    fontWeight: "800",
    color: "#fff",
  },
  footerLogoSuffix: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FF6B00",
  },
  footerSubtitle: {
    color: "#aaa",
    marginTop: 8,
    marginBottom: 15,
    fontSize: 14,
  },
  socialRow: {
    flexDirection: "row",
  },
  socialButton: {
    backgroundColor: "#333",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  socialIcon: {
    fontSize: 18,
  },
  footerGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 25,
  },
  footerColumn: {
    width: width / 2 - 25,
    marginBottom: 20,
  },
  footerHeader: {
    color: "#fff",
    fontWeight: "700",
    marginBottom: 15,
    fontSize: 16,
  },
  footerLink: {
    color: "#aaa",
    marginBottom: 10,
    fontSize: 14,
  },
  footerText: {
    color: "#aaa",
    marginBottom: 10,
    fontSize: 14,
  },
  footerBottom: {
    borderTopWidth: 1,
    borderTopColor: "#333",
    padding: 15,
    alignItems: "center",
  },
  copyright: {
    color: "#888",
    fontSize: 13,
  },
});