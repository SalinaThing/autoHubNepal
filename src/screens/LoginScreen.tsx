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

  const openSocialLink = (URL) => {
    Linking.openURL(URL).catch(err => console.error("Failed to open URL:", err));
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* ✅ MODERN NAVBAR */}
      <View style={styles.navbar}>
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>AutoHub<Text style={styles.logoAccent}>Nepal</Text></Text>
        </View>
        <View style={styles.navLinks}>
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <Text style={styles.navLink}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("About")}>
            <Text style={styles.navLink}>About Us</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={styles.navLink}>Register</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={[styles.navLink, styles.activeNavLink]}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>

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
              <Text style={[styles.socialButtonText, styles.googleButtonText]}>Google</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.socialButton, styles.facebookButton]}
              onPress={() => openSocialLink('https://facebook.com')}
            >
              <Text style={[styles.socialButtonText, styles.facebookButtonText]}>Facebook</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text style={styles.registerLink}>Register now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* ✅ MODERN FOOTER */}
      <View style={styles.footer}>
        <View style={styles.footerContent}>
          <View style={styles.footerBrand}>
            <Text style={styles.footerTitle}>AutoHub<Text style={styles.footerTitleAccent}>Nepal</Text></Text>
            <Text style={styles.footerSubtitle}>
              Experience automotive excellence in Nepal
            </Text>
            
            <View style={styles.socialLinks}>
              <TouchableOpacity 
                style={styles.socialIcon}
                onPress={() => openSocialLink('https://autohubnepal.com')}
              >
                <Text style={styles.socialIconText}>🌐</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.socialIcon}
                onPress={() => openSocialLink('https://facebook.com/autohubnepal')}
              >
                <Text style={styles.socialIconText}>📘</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.socialIcon}
                onPress={() => openSocialLink('https://instagram.com/autohubnepal')}
              >
                <Text style={styles.socialIconText}>📸</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.socialIcon}
                onPress={() => openSocialLink('https://linkedin.com/company/autohubnepal')}
              >
                <Text style={styles.socialIconText}>🔗</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.footerSections}>
            <View style={styles.footerSection}>
              <Text style={styles.footerSectionTitle}>Quick Links</Text>
              <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                <Text style={styles.footerLink}>Home</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("About")}>
                <Text style={styles.footerLink}>About Us</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <Text style={styles.footerLink}>Register Business</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={styles.footerLink}>Login</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.footerSection}>
              <Text style={styles.footerSectionTitle}>Contact Us</Text>
              <Text style={styles.contactText}>Kathmandu, Nepal</Text>
              <Text style={styles.contactText}>+977 9888888888</Text>
              <Text style={styles.contactText}>info@autohubnepal.com</Text>
              <Text style={styles.contactText}>Sun-Fri: 10AM - 6PM</Text>
            </View>
          </View>
        </View>

        <View style={styles.footerBottom}>
          <Text style={styles.copyright}>© 2023 AutoHub Nepal. All rights reserved.</Text>
        </View>
      </View>
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
  navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: { 
    fontSize: 22, 
    fontWeight: "800", 
    color: "#1F2937" 
  },
  logoAccent: {
    color: "#2563EB"
  },
  navLinks: { 
    flexDirection: "row" 
  },
  navLink: { 
    marginHorizontal: 12, 
    color: "#6B7280", 
    fontWeight: "500",
    fontSize: 14
  },
  activeNavLink: {
    color: "#2563EB",
    fontWeight: "600"
  },
  
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
  },
  socialButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24
  },
  socialButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    marginHorizontal: 6,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#FFFFFF"
  },
  socialButtonText: {
    fontSize: 14,
    fontWeight: "500",
  },
  googleButtonText: {
    color: "#DB4437",
  },
  facebookButtonText: {
    color: "#4267B2",
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
  footer: {
    backgroundColor: "#1F2937",
    paddingTop: 40,
  },
  footerContent: {
    paddingHorizontal: 24,
    paddingBottom: 32
  },
  footerBrand: {
    marginBottom: 32
  },
  footerTitle: {
    fontWeight: "700",
    fontSize: 24,
    color: "#F9FAFB",
    marginBottom: 8
  },
  footerTitleAccent: {
    color: "#3B82F6"
  },
  footerSubtitle: {
    color: "#9CA3AF",
    fontSize: 14,
    marginBottom: 20
  },
  socialLinks: {
    flexDirection: "row"
  },
  socialIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#374151",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12
  },
  socialIconText: {
    fontSize: 18,
  },
  footerSections: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  footerSection: {
    flex: 1
  },
  footerSectionTitle: {
    color: "#F9FAFB",
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 16
  },
  footerLink: {
    color: "#D1D5DB",
    fontSize: 14,
    marginBottom: 12
  },
  contactText: {
    color: "#D1D5DB",
    fontSize: 14,
    marginBottom: 12
  },
  footerBottom: {
    borderTopWidth: 1,
    borderTopColor: "#374151",
    paddingVertical: 20,
    paddingHorizontal: 24,
    alignItems: "center"
  },
  copyright: {
    color: "#9CA3AF",
    fontSize: 12
  }
});