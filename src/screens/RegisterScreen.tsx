import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = () => {
    if (!name || !email || !phone || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill all fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Enter a valid email address.");
      return;
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      Alert.alert("Error", "Enter a valid 10-digit phone number.");
      return;
    }

    if (password.trim() !== confirmPassword.trim()) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    Alert.alert(
      "Success",
      `Welcome ${name}! Your account has been created for AutoHubNepal.`
    );

    // Reset form fields
    setName("");
    setEmail("");
    setPhone("");
    setPassword("");
    setConfirmPassword("");

    // Navigate to Home after successful registration
    navigation.navigate("Home");
  };

  return (
    <ScrollView style={styles.container}>
      {/* Navbar */}
      <View style={styles.navbar}>
        <Text style={styles.logo}>AutoHubNepal</Text>
        <View style={styles.navLinks}>
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <Text style={styles.link}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("About")}>
            <Text style={styles.link}>About Us</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={styles.link}>Register Business</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.link}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Register Form */}
      <View style={styles.formWrapper}>
        <Text style={styles.title}>Register - AutoHubNepal</Text>

        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerTitle}>AutoHub Nepal</Text>
        <Text style={styles.footerSubtitle}>
          Experience in automotive excellence
        </Text>

        <View style={styles.socialRow}>
          <Text style={styles.socialIcon}>🌐</Text>
          <Text style={styles.socialIcon}>📘</Text>
          <Text style={styles.socialIcon}>📸</Text>
          <Text style={styles.socialIcon}>🔗</Text>
        </View>

        <View style={styles.footerRow}>
          <View style={styles.footerCol}>
            <Text style={styles.footerHeader}>Quick Links</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
              <Text style={styles.footerText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("About")}>
              <Text style={styles.footerText}>About Us</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text style={styles.footerText}>Register Business</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.footerText}>Login</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footerCol}>
            <Text style={styles.footerHeader}>Contact Us</Text>
            <Text style={styles.footerText}>Kathmandu, Nepal</Text>
            <Text style={styles.footerText}>+977 9888888888</Text>
            <Text style={styles.footerText}>info@autohubnepal.com</Text>
            <Text style={styles.footerText}>Sun-Fri: 10AM - 6PM</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#f8f9fa",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  logo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#007bff",
  },
  navLinks: {
    flexDirection: "row",
  },
  link: {
    marginLeft: 15,
    fontSize: 16,
    color: "#007bff",
    fontWeight: "500",
  },
  formWrapper: {
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    marginBottom: 25,
    fontWeight: "bold",
    textAlign: "center",
    color: "#007bff",
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#28a745",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#f8f9fa",
    marginTop: 20,
  },
  footerTitle: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 5,
    color: "#007bff",
  },
  footerSubtitle: {
    textAlign: "center",
    color: "#555",
    marginBottom: 10,
    fontSize: 14,
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  socialIcon: {
    fontSize: 20,
    marginHorizontal: 8,
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginTop: 10,
  },
  footerCol: { flex: 1, minWidth: "45%", marginBottom: 15 },
  footerHeader: { fontWeight: "bold", marginBottom: 8, fontSize: 16 },
  footerText: { fontSize: 14, color: "#555", marginBottom: 4 },
});
