//footer

import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const Footer = () => {
  return (
    <View style={styles.footerContainer}>
      <Text style={styles.title}>
        AutoHub<Text style={styles.highlight}>Nepal</Text>
      </Text>
      <Text style={styles.tagline}>Experience automotive excellence in Nepal</Text>

      <View style={styles.linksContacts}>
        <View style={styles.links}>
          <Text style={styles.sectionTitle}>Quick Links</Text>
          {["Home", "About Us", "Register Business", "Login"].map((item) => (
            <TouchableOpacity key={item} style={styles.linkButton}>
              <Text style={styles.linkText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.contacts}>
          <Text style={styles.sectionTitle}>Contact Us</Text>
          <Text style={styles.contactText}>Kathmandu, Nepal</Text>
          <Text style={styles.contactText}>+977 9888888888</Text>
          <Text style={styles.contactText}>info@autohubnepal.com</Text>
          <Text style={styles.contactText}>Sun-Fri: 10AM - 6PM</Text>
        </View>
      </View>

      <Text style={styles.copyright}>
        © 2025 AutoHub Nepal. All rights reserved.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    backgroundColor: "#1f2937", // dark navy
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: "#374151",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  highlight: {
    color: "#dc2626", // bright red
  },
  tagline: {
    color: "#9ca3af",
    fontSize: 12,
    marginVertical: 5,
  },
  linksContacts: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  links: {
    flex: 1,
  },
  contacts: {
    flex: 1,
  },
  sectionTitle: {
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
    fontSize: 14,
  },
  linkButton: {
    marginVertical: 2,
  },
  linkText: {
    color: "#9ca3af",
    fontSize: 12,
  },
  contactText: {
    color: "#9ca3af",
    fontSize: 12,
    marginVertical: 1,
  },
  copyright: {
    color: "#6b7280",
    fontSize: 10,
    textAlign: "center",
    marginTop: 10,
  },
});

export default Footer;