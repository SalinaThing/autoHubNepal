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
      {/* ✅ MODERN NAVBAR */}
      <View style={styles.navbar}>
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>AutoHub</Text>
          <Text style={styles.logoSuffix}>Nepal</Text>
        </View>
        <View style={styles.navLinks}>
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <Text style={styles.link}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("About")}>
            <Text style={[styles.link, styles.activeLink]}>About Us</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={styles.link}>Register</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.link}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>

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
          <TouchableOpacity style={styles.ctaButton} onPress={() => navigation.navigate("Register")}>
            <Text style={styles.ctaButtonText}>Get Started Today</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* ✅ MODERN FOOTER */}
      <View style={styles.footer}>
        <View style={styles.footerContent}>
          <View style={styles.footerBrand}>
            <View style={styles.logoContainer}>
              <Text style={styles.footerLogo}>AutoHub</Text>
              <Text style={styles.footerLogoSuffix}>Nepal</Text>
            </View>
            <Text style={styles.footerSubtitle}>
              Transforming automotive services through technology and trust
            </Text>
            <View style={styles.socialRow}>
              <TouchableOpacity style={styles.socialButton}>
                <Text style={styles.socialIcon}>📘</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <Text style={styles.socialIcon}>📸</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <Text style={styles.socialIcon}>🐦</Text>
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
              <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <Text style={styles.footerLink}>Register</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={styles.footerLink}>Login</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.footerColumn}>
              <Text style={styles.footerHeader}>Our Services</Text>
              <Text style={styles.footerText}>Car Maintenance</Text>
              <Text style={styles.footerText}>Emergency Assistance</Text>
              <Text style={styles.footerText}>Spare Parts</Text>
              <Text style={styles.footerText}>Insurance Help</Text>
            </View>

            <View style={styles.footerColumn}>
              <Text style={styles.footerHeader}>Contact Info</Text>
              <Text style={styles.footerText}>Kathmandu, Nepal</Text>
              <Text style={styles.footerText}>+977 9800000000</Text>
              <Text style={styles.footerText}>info@autohubnepal.com</Text>
              <Text style={styles.footerText}>Sun-Fri: 7AM - 7PM</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.footerBottom}>
          <Text style={styles.copyright}>© 2023 AutoHubNepal. All rights reserved.</Text>
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
  // ✅ MODERN NAVBAR
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
  // ✅ HERO SECTION
  heroSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 25,
    backgroundColor: "#0066FF",
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
    color: "rgba(255,255,255,0.8)",
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
    color: "#222",
    marginBottom: 15,
    textAlign: "center",
    lineHeight: 34,
  },
  subTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginTop: 25,
    marginBottom: 12,
    color: "#0066FF",
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 26,
    color: "#444",
    textAlign: "left",
  },
  bold: {
    fontWeight: "600",
    color: "#222",
  },
  // ✅ STATS CONTAINER
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 25,
    paddingVertical: 20,
    backgroundColor: "#f8f9ff",
    borderRadius: 12,
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "800",
    color: "#0066FF",
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
  },
  featureIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 5,
    color: "#222",
  },
  featureDesc: {
    fontSize: 13,
    color: "#666",
    lineHeight: 18,
  },
  // ✅ CARD STYLE
  card: {
    backgroundColor: "#f0f7ff",
    padding: 20,
    borderRadius: 12,
    marginVertical: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  // ✅ CTA SECTION
  ctaSection: {
    backgroundColor: "#0066FF",
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
    color: "#0066FF",
    fontWeight: "700",
    fontSize: 16,
  },
  // ✅ MODERN FOOTER
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
    width: width / 3 - 20,
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