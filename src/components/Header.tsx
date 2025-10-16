import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
  useWindowDimensions,
  StatusBar,
} from "react-native";
import type { RootStackParamList } from "../navigations/Types";

// -------------------------------------------------------------
//  HEADER PROPS
// -------------------------------------------------------------
interface HeaderProps {
  onNavigate: (screen: string) => void;
  active?: string;
}

// -------------------------------------------------------------
//  MENU CONFIGURATION
// -------------------------------------------------------------
type MenuItem = { name: keyof RootStackParamList; label: string };

const MENU_ITEMS: MenuItem[] = [
  { name: "Home", label: "Home" },
  { name: "AboutUs", label: "About Us" },
  { name: "AllWorkshop", label: "All Workshops" },
  { name: "RegisterBusiness", label: "Register Business" },
  { name: "AddListing", label: "Add Listing" },
  { name: "Login", label: "Login" },
];

// -------------------------------------------------------------
//  HEADER COMPONENT
// -------------------------------------------------------------
const Header: React.FC<HeaderProps> = ({ onNavigate, active }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const { width, height } = useWindowDimensions();
  
  // Show horizontal menu when:
  // - Portrait orientation (height > width) AND width is large enough (>= 600)
  // - OR width is very large (>= 900) regardless of orientation
  // Show dropdown menu when:
  // - Landscape orientation (width > height) 
  // - OR width is too small (< 600) even in portrait
  const isHorizontal = (height > width && width >= 600) || width >= 900;

  const handleNavigate = (route: keyof RootStackParamList) => {
    setMenuVisible(false);
    if (active !== route) {
      onNavigate(route);
    }
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <View style={styles.navbar}>
        {/* === LOGO === */}
        <TouchableOpacity 
          style={styles.logoContainer}
          onPress={() => handleNavigate("Home")}
        >
          <Text style={styles.logoText}>
            AutoHub<Text style={styles.logoNepal}>Nepal</Text>
          </Text>
        </TouchableOpacity>

        {/* === HORIZONTAL MENU (Portrait/Large Screens) === */}
        {isHorizontal ? (
          <View style={styles.menuContainer}>
            {MENU_ITEMS.map((item) => (
              <TouchableOpacity
                key={item.name}
                onPress={() => handleNavigate(item.name)}
              >
                <Text
                  style={[
                    styles.link,
                    active === item.name && styles.activeLink,
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <>
            {/* === DROPDOWN MENU BUTTON (Horizontal/Small Screens) === */}
            <TouchableOpacity onPress={() => setMenuVisible(true)}>
              <Text style={styles.menuButton}>☰</Text>
            </TouchableOpacity>

            {/* === DROPDOWN MENU (Horizontal/Small Screens) === */}
            <Modal
              transparent
              visible={menuVisible}
              animationType="fade"
              onRequestClose={() => setMenuVisible(false)}
            >
              <View style={styles.overlay}>
                <Pressable
                  style={styles.overlayPress}
                  onPress={() => setMenuVisible(false)}
                />
                <View style={styles.dropdown}>
                  {MENU_ITEMS.map((item) => (
                    <TouchableOpacity
                      key={item.name}
                      style={styles.menuItem}
                      onPress={() => handleNavigate(item.name)}
                    >
                      <Text
                        style={[
                          styles.link,
                          active === item.name && styles.activeLink,
                        ]}
                      >
                        {item.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </Modal>
          </>
        )}
      </View>
    </>
  );
};

// -------------------------------------------------------------
//  STYLES
// -------------------------------------------------------------
const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  logoContainer: { flex: 1 },
  logoText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#007bff",
  },
  logoNepal: { color: "#dc2626" },
  menuButton: { fontSize: 28, fontWeight: "700", color: "#333" },
  menuContainer: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 16,
    maxWidth: "100%",
  },
  link: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  activeLink: {
    color: "#007bff",
    fontWeight: "700",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  overlayPress: { flex: 1 },
  dropdown: {
    position: "absolute",
    top: 60,
    right: 10,
    backgroundColor: "#fff",
    width: 220,
    borderRadius: 10,
    paddingVertical: 8,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },
  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});

export default Header;
