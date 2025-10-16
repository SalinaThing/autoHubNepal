import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
} from "react-native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface HeaderProps {
  navigation: NativeStackNavigationProp<any>; // adjust `any` to your root stack param type if available
  activeRoute?: string;
}

const Header: React.FC<HeaderProps> = ({ navigation, activeRoute }) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const handleNavigate = (route: string) => {
    setMenuVisible(false);
    navigation.navigate(route as never); // TS fix for type safety
  };

  return (
    <View style={styles.navbar}>
      {/* === LOGO === */}
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>AutoHub</Text>
        <Text style={styles.logoSuffix}>Nepal</Text>
      </View>

      {/* === MENU BUTTON === */}
      <TouchableOpacity onPress={() => setMenuVisible(true)}>
        <Text style={styles.menuButton}>☰</Text>
      </TouchableOpacity>

      {/* === DROPDOWN MENU === */}
      <Modal
        transparent
        visible={menuVisible}
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        <Pressable style={styles.overlay} onPress={() => setMenuVisible(false)}>
          <View style={styles.dropdown}>
            {[
              { name: "Home", label: "Home" },
              { name: "About", label: "About Us" },
              { name: "AllWorkshop", label: "All Workshop" },
              { name: "RegisterBusiness", label: "Register Your Business" },
              { name: "Login", label: "Login" },
              { name: "AddListing", label: "+Add Listing" },
            ].map((item) => (
              <TouchableOpacity
                key={item.name}
                style={styles.menuItem}
                onPress={() => handleNavigate(item.name)}
              >
                <Text
                  style={[
                    styles.link,
                    activeRoute === item.name && styles.activeLink,
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
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
  menuButton: {
    fontSize: 28,
    fontWeight: "700",
    color: "#333",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.2)",
    justifyContent: "flex-start",
    alignItems: "flex-end",
  },
  dropdown: {
    backgroundColor: "#fff",
    width: 200,
    marginTop: 70,
    marginRight: 10,
    borderRadius: 8,
    paddingVertical: 10,
    elevation: 5,
  },
  menuItem: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  link: {
    fontSize: 16,
    color: "#444",
    fontWeight: "500",
  },
  activeLink: {
    color: "#0066FF",
    fontWeight: "700",
  },
});

export default Header;
