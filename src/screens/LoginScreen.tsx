import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  Linking,
} from "react-native";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Icon from 'react-native-vector-icons/FontAwesome';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }

    if (email === "test@example.com" && password === "123456") {
      Alert.alert("Success", "Login successful!");
      navigation.navigate("Home");
    } else {
      Alert.alert("Error", "Invalid email or password");
    }
  };

  const openSocialLink = (URL: string) => {
    Linking.openURL(URL).catch(err => console.error("Failed to open URL:", err));
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* ✅ MODERN NAVBAR */}
     {/* Use the separated Header component */}
      <Header navigation={navigation} activeRoute="Login" />

      {/* ✅ MODERN HEADER SECTION */}
      <View style={styles.pageHeader}>
        <Text style={styles.pageTitle}>Welcome Back!</Text>
        <Text style={styles.pageSubtitle}>
          Login to manage your business with AutoHubNepal
        </Text>
      </View>

      {/* ✅ MODERN LOGIN FORM */}
      <View style={styles.formWrapper}>
        <View style={styles.formCard}>
          <View style={styles.formHeader}>
            <Text style={styles.formTitle}>Log Into Your Account</Text>
            <Text style={styles.formSubtitle}>Access your AutoHub Nepal dashboard</Text>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Email Address</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor="#9CA3AF"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Enter your password"
                placeholderTextColor="#9CA3AF"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!isPasswordVisible}
              />
              <TouchableOpacity 
                style={styles.visibilityToggle}
                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              >
                <Text style={styles.visibilityText}>
                  {isPasswordVisible ? "Hide" : "Show"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.rememberRow}>
            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={() => setRemember(!remember)}
            >
              <View style={[styles.checkbox, remember && styles.checkedBox]}>
                {remember && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <Text style={styles.rememberText}>Remember Me</Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Login to Account</Text>
          </TouchableOpacity>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or continue with</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Social login buttons */}
          <View style={styles.socialButtonsContainer}>
            <TouchableOpacity
              style={[styles.socialButton, styles.googleButton]}
              onPress={() => openSocialLink('https://google.com')}
            >
              <Icon name="google" size={22} color="#DB4437" />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.socialButton, styles.facebookButton]}
              onPress={() => openSocialLink('https://facebook.com')}
            >
              <Icon name="facebook" size={22} color="#4267B2" />
            </TouchableOpacity>

          </View>
        </View>
      </View>

      {/* ✅ MODERN FOOTER */}
    <Footer />
    </ScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#F9FAFB" 
  },
  
  // Navbar
  // Page Header
  pageHeader: {
    padding: 32,
    alignItems: "center",
    backgroundColor: "#2563EB",
    marginBottom: 24,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 8
  },
  pageSubtitle: {
    fontSize: 16,
    color: "#E0F2FE",
    textAlign: "center"
  },
  
  // Form
  formWrapper: { 
    padding: 24,
    paddingBottom: 0
  },
  formCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    marginBottom: 24,
  },
  formHeader: {
    marginBottom: 24,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1F2937",
    textAlign: "center",
    marginBottom: 8
  },
  formSubtitle: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    backgroundColor: "#F9FAFB",
    color: "#1F2937",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 12,
    backgroundColor: "#F9FAFB",
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: "#1F2937",
  },
  visibilityToggle: {
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  visibilityText: {
    color: "#6B7280",
    fontWeight: "500",
  },
  rememberRow: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center", 
    marginBottom: 24 
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 4,
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF"
  },
  checkedBox: {
    backgroundColor: "#2563EB",
    borderColor: "#2563EB"
  },
  checkmark: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold"
  },
  rememberText: { 
    fontSize: 14, 
    color: "#4B5563" 
  },
  forgotPassword: {
    fontSize: 14,
    color: "#2563EB",
    fontWeight: "500"
  },
  loginButton: {
    backgroundColor: "#2563EB",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 24
  },
  loginButtonText: { 
    color: "#FFFFFF", 
    fontSize: 16, 
    fontWeight: "600" 
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#E5E7EB"
  },
  dividerText: {
    marginHorizontal: 12,
    color: "#6B7280",
    fontSize: 14,
    fontWeight: "500"
  },socialButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 24,
  },

  socialButton: {
    width: 60,
    height: 50,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },

  facebookButton: {
  borderColor: "#4267B2", // Facebook blue border
  },
  googleButton: {
    borderColor: "#DB4437", // Google red border
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center"
  },
  registerText: {
    fontSize: 14,
    color: "#6B7280"
  },
  registerLink: {
    fontSize: 14,
    color: "#2563EB",
    fontWeight: "600"
  },
  
  // Footer
});
