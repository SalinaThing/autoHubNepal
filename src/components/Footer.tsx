// components/Footer.tsx
import React from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Dimensions, 
  Linking, 
  Alert,
  ScrollView 
} from "react-native";

const { width } = Dimensions.get("window");

const Footer = () => {
  // Function to open social media links
  const openSocialLink = async (url: string, platform: string) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert(
          `Open ${platform}`,
          `Would you like to visit our ${platform} page in your browser?`,
          [
            { text: "Cancel", style: "cancel" },
            { 
              text: "Open Browser", 
              onPress: () => Linking.openURL(url) 
            }
          ]
        );
      }
    } catch (error) {
      Alert.alert("Error", "Unable to open the link. Please try again.");
    }
  };

  // Open email
  const openEmail = () => {
    Linking.openURL('mailto:info@autohubnepal.com?subject=AutoHub Nepal Inquiry');
  };

  // Open phone
  const openPhone = () => {
    Linking.openURL('tel:+9779800000000');
  };

  // Social media data with platform-specific colors
  const socialLinks = [
    {
      name: "Facebook",
      url: "https://www.facebook.com/AutoHubNepal",
      icon: "📘",
      color: "#1877F2",
      handle: "@AutoHubNepal"
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/AutoHubNepal",
      icon: "📷",
      color: "#E4405F",
      handle: "@AutoHubNepal"
    },
    {
      name: "Twitter",
      url: "https://twitter.com/AutoHubNepal",
      icon: "🐦",
      color: "#1DA1F2",
      handle: "@AutoHubNepal"
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/company/autohubnepal",
      icon: "💼",
      color: "#0A66C2",
      handle: "autohubnepal"
    },
    {
      name: "YouTube",
      url: "https://www.youtube.com/@AutoHubNepal",
      icon: "📺",
      color: "#FF0000",
      handle: "@AutoHubNepal"
    }
  ];

  return (
    <View style={styles.footer}>
      <ScrollView 
        style={styles.footerContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Brand Section */}
        <View style={styles.brandSection}>
          <View style={styles.logoContainer}>
            <Text style={styles.footerLogo}>AutoHub</Text>
            <Text style={styles.footerLogoSuffix}>Nepal</Text>
          </View>
          
          <Text style={styles.footerSubtitle}>
            Your trusted partner for all automotive needs in Nepal
          </Text>

          {/* Social Media Section */}
          <View style={styles.socialSection}>
            <Text style={styles.socialTitle}>Follow Us</Text>
            <View style={styles.socialRow}>
              {socialLinks.map((social, index) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.socialButton, { backgroundColor: social.color }]}
                  onPress={() => openSocialLink(social.url, social.name)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.socialIcon}>{social.icon}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <Text style={styles.socialHandle}>Stay connected for updates</Text>
          </View>
        </View>

        {/* Links Grid - Responsive for mobile */}
        <View style={styles.linksGrid}>
          {/* Quick Links */}
          <View style={styles.linkColumn}>
            <Text style={styles.columnTitle}>Quick Links</Text>
            <TouchableOpacity style={styles.linkItem}>
              <Text style={styles.linkText}>🏠 Home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.linkItem}>
              <Text style={styles.linkText}>👥 About Us</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.linkItem}>
              <Text style={styles.linkText}>📝 Register Business</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.linkItem}>
              <Text style={styles.linkText}>🔐 Login</Text>
            </TouchableOpacity>
          </View>

          {/* Services */}
          <View style={styles.linkColumn}>
            <Text style={styles.columnTitle}>Our Services</Text>
            <View style={styles.linkItem}>
              <Text style={styles.linkText}>🔧 Vehicle Maintenance</Text>
            </View>
            <View style={styles.linkItem}>
              <Text style={styles.linkText}>🚨 Emergency Assistance</Text>
            </View>
            <View style={styles.linkItem}>
              <Text style={styles.linkText}>⚙️ Spare Parts</Text>
            </View>
            <View style={styles.linkItem}>
              <Text style={styles.linkText}>🛡️ Insurance Help</Text>
            </View>
          </View>
        </View>

        {/* Contact Information */}
        <View style={styles.contactSection}>
          <Text style={styles.contactTitle}>Contact Information</Text>
          <View style={styles.contactItem}>
            <Text style={styles.contactIcon}>📍</Text>
            <Text style={styles.contactText}>Kathmandu, Nepal</Text>
          </View>
          
          <TouchableOpacity 
            style={styles.contactItem}
            onPress={openPhone}
          >
            <Text style={styles.contactIcon}>📞</Text>
            <Text style={[styles.contactText, styles.clickableText]}>+977 9800000000</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.contactItem}
            onPress={openEmail}
          >
            <Text style={styles.contactIcon}>✉️</Text>
            <Text style={[styles.contactText, styles.clickableText]}>info@autohubnepal.com</Text>
          </TouchableOpacity>
          
          <View style={styles.contactItem}>
            <Text style={styles.contactIcon}>🕐</Text>
            <Text style={styles.contactText}>Sun-Fri: 7AM - 7PM</Text>
          </View>
        </View>

        {/* App Download CTA */}
        <View style={styles.downloadSection}>
          <Text style={styles.downloadTitle}>Get Our Mobile App</Text>
          <Text style={styles.downloadSubtitle}>
            Experience faster booking and exclusive offers
          </Text>
          <View style={styles.downloadButtons}>
            <TouchableOpacity style={styles.downloadButton}>
              <Text style={styles.downloadButtonText}>📱 Download Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Copyright */}
      <View style={styles.footerBottom}>
        <Text style={styles.copyright}>
          © 2025 AutoHub Nepal. All rights reserved.
        </Text>
        <View style={styles.legalLinks}>
          <TouchableOpacity>
            <Text style={styles.legalLink}>Privacy Policy</Text>
          </TouchableOpacity>
          <Text style={styles.legalSeparator}>•</Text>
          <TouchableOpacity>
            <Text style={styles.legalLink}>Terms of Service</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    backgroundColor: "#1a1a1a",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: 10,
  },
  footerContent: {
    paddingHorizontal: 20,
    paddingTop: 30,
    maxHeight: 500,
  },
  brandSection: {
    marginBottom: 30,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 8,
  },
  footerLogo: {
    fontSize: 28,
    fontWeight: "900",
    color: "#fff",
    letterSpacing: 0.5,
  },
  footerLogoSuffix: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FF6B00",
    marginLeft: 4,
  },
  footerSubtitle: {
    color: "#ccc",
    fontSize: 15,
    lineHeight: 20,
    marginBottom: 20,
  },
  socialSection: {
    marginBottom: 10,
  },
  socialTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  socialRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 8,
  },
  socialButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  socialIcon: {
    fontSize: 20,
  },
  socialHandle: {
    color: "#888",
    fontSize: 12,
    fontStyle: "italic",
  },
  linksGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
  },
  linkColumn: {
    width: width / 2 - 30,
  },
  columnTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 15,
  },
  linkItem: {
    marginBottom: 12,
    paddingVertical: 2,
  },
  linkText: {
    color: "#ccc",
    fontSize: 14,
    fontWeight: "500",
  },
  contactSection: {
    marginBottom: 25,
    backgroundColor: "#252525",
    padding: 20,
    borderRadius: 12,
  },
  contactTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 15,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  contactIcon: {
    fontSize: 16,
    marginRight: 12,
    width: 20,
  },
  contactText: {
    color: "#ccc",
    fontSize: 14,
    flex: 1,
  },
  clickableText: {
    color: "#FF6B00",
    textDecorationLine: "underline",
  },
  downloadSection: {
    backgroundColor: "#252525",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 20,
  },
  downloadTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
    textAlign: "center",
  },
  downloadSubtitle: {
    color: "#ccc",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 16,
    lineHeight: 20,
  },
  downloadButtons: {
    flexDirection: "row",
    justifyContent: "center",
  },
  downloadButton: {
    backgroundColor: "#FF6B00",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    shadowColor: "#FF6B00",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  downloadButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },
  footerBottom: {
    borderTopWidth: 1,
    borderTopColor: "#333",
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  copyright: {
    color: "#888",
    fontSize: 12,
    marginBottom: 8,
    textAlign: "center",
  },
  legalLinks: {
    flexDirection: "row",
    alignItems: "center",
  },
  legalLink: {
    color: "#888",
    fontSize: 12,
    textDecorationLine: "underline",
  },
  legalSeparator: {
    color: "#888",
    fontSize: 12,
    marginHorizontal: 8,
  },
});

export default Footer;