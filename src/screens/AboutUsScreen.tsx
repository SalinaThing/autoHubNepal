import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");

const AboutScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      {/* ✅ HERO SECTION */}
      <View style={styles.heroSection}>
        <View style={styles.heroContent}>
          <Text style={styles.heroTitle}>Driving Automotive Excellence in Nepal</Text>
          <Text style={styles.heroSubtitle}>
            Connecting vehicle owners with trusted service providers nationwide
          </Text>
        </View>
        <View style={styles.heroDecoration}>
          <Text style={styles.heroIcon}>🚗</Text>
        </View>
      </View>

      {/* ✅ ABOUT CONTENT */}
      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.title}>Revolutionizing Automotive Care in Nepal</Text>
          <Text style={styles.paragraph}>
            AutoHubNepal is Nepal's premier digital automotive platform, transforming how vehicle owners maintain and service their cars. We've created an ecosystem that brings transparency, convenience, and reliability to automotive services across the nation.
          </Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>500+</Text>
            <Text style={styles.statLabel}>Verified Garages</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>25,000+</Text>
            <Text style={styles.statLabel}>Happy Customers</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>40+</Text>
            <Text style={styles.statLabel}>Cities Covered</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.subTitle}>Our Mission 🎯</Text>
          <Text style={styles.paragraph}>
            To democratize automotive services in Nepal by creating a transparent, efficient, and trustworthy platform that empowers both vehicle owners and service providers. We're building digital infrastructure that elevates the entire automotive ecosystem.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subTitle}>Our Vision 🌍</Text>
          <Text style={styles.paragraph}>
            We envision a future where every vehicle owner in Nepal has instant access to quality automotive services at fair prices, where maintenance is predictable rather than stressful, and where the automotive industry thrives through technological innovation.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subTitle}>Why AutoHubNepal Stands Out ⭐</Text>
          <View style={styles.featureGrid}>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>🔍</Text>
              <Text style={styles.featureTitle}>Verified Partners</Text>
              <Text style={styles.featureDesc}>Every garage and service provider undergoes rigorous verification and quality checks</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>💳</Text>
              <Text style={styles.featureTitle}>Transparent Pricing</Text>
              <Text style={styles.featureDesc}>No hidden costs with upfront pricing for all services</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>🛡️</Text>
              <Text style={styles.featureTitle}>Quality Assurance</Text>
              <Text style={styles.featureDesc}>Service guarantee with follow-up support for complete satisfaction</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>📱</Text>
              <Text style={styles.featureTitle}>Digital Convenience</Text>
              <Text style={styles.featureDesc}>Book, track, and manage all your vehicle services from one app</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.subTitle}>Our Comprehensive Services 🔧</Text>
          <View style={styles.card}>
            <Text style={styles.paragraph}>
              • <Text style={styles.bold}>Routine Maintenance:</Text> Oil changes, filter replacements, and fluid checks{"\n"}
              • <Text style={styles.bold}>Advanced Repairs:</Text> Engine diagnostics, transmission services, and electrical repairs{"\n"}
              • <Text style={styles.bold}>Specialized Services:</Text> AC repair, brake services, and wheel alignment{"\n"}
              • <Text style={styles.bold}>Emergency Support:</Text> 24/7 roadside assistance and towing services{"\n"}
              • <Text style={styles.bold}>Value-Added Services:</Text> Car detailing, insurance assistance, and genuine spare parts
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.subTitle}>Technology Powering Innovation 💻</Text>
          <Text style={styles.paragraph}>
            Our platform leverages cutting-edge technology including AI-powered service recommendations, real-time tracking of service progress, digital vehicle health records, and predictive maintenance alerts to deliver a superior customer experience.
          </Text>
        </View>

        <View style={styles.ctaSection}>
          <Text style={styles.ctaTitle}>Experience the Future of Automotive Care</Text>
          <Text style={styles.ctaText}>Join thousands of satisfied vehicle owners across Nepal</Text>
          <TouchableOpacity style={styles.ctaButton} onPress={() => navigation?.navigate("RegisterBusiness")}>
            <Text style={styles.ctaButtonText}>Get Started Today</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default AboutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  // ✅ HERO SECTION (Red)
  heroSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 25,
    backgroundColor: "#dc2626", // 🔴 changed to red
  },
  heroContent: {
    flex: 2,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 15,
    color: "rgba(255,255,255,0.9)",
    lineHeight: 22,
  },
  heroDecoration: {
    flex: 1,
    alignItems: "center",
  },
  heroIcon: {
    fontSize: 50,
  },

  // ✅ CONTENT
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#111",
    marginBottom: 15,
    textAlign: "center",
    lineHeight: 34,
  },
  subTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginTop: 25,
    marginBottom: 12,
    color: "#dc2626", // 🔴 red
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 26,
    color: "#444",
    textAlign: "left",
  },
  bold: {
    fontWeight: "600",
    color: "#111",
  },

  // ✅ STATS
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 25,
    paddingVertical: 20,
    backgroundColor: "#fef2f2", // 🔴 soft red tone
    borderRadius: 12,
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "800",
    color: "#dc2626", // 🔴
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },

  // ✅ FEATURE GRID
  featureGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 15,
  },
  featureItem: {
    width: width / 2 - 30,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: "#fca5a5", // 🔴 subtle red border
  },
  featureIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 5,
    color: "#111",
  },
  featureDesc: {
    fontSize: 13,
    color: "#666",
    lineHeight: 18,
  },

  // ✅ CARD STYLE
  card: {
    backgroundColor: "#fff1f2", // 🔴 light red
    padding: 20,
    borderRadius: 12,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#fecaca", // light red border
  },

  // ✅ CTA SECTION
  ctaSection: {
    backgroundColor: "#dc2626", // 🔴 red
    padding: 25,
    borderRadius: 12,
    alignItems: "center",
    marginVertical: 20,
  },
  ctaTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 10,
    textAlign: "center",
  },
  ctaText: {
    fontSize: 15,
    color: "rgba(255,255,255,0.9)",
    marginBottom: 20,
    textAlign: "center",
  },
  ctaButton: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  ctaButtonText: {
    color: "#dc2626",
    fontWeight: "700",
    fontSize: 16,
  },
});
