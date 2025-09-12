// src/components/NavBar.tsx
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

type NavBarProps = {
  isAuth: boolean;
  logoutHandler: () => void;
};

const NavBar: React.FC<NavBarProps> = ({ isAuth, logoutHandler }) => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      {/* Always visible */}
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Text style={styles.link}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("About")}>
        <Text style={styles.link}>About Us</Text>
      </TouchableOpacity>

      {isAuth ? (
        <>
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <Text style={styles.link}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={logoutHandler}>
            <Text style={[styles.link, styles.logout]}>Logout</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TouchableOpacity onPress={() => navigation.navigate("RegisterBusiness")}>
            <Text style={styles.link}>Register</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.link}>Login</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default NavBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: "#f1f1f1",
  },
  link: {
    fontSize: 16,
    color: "#007bff",
  },
  logout: {
    color: "#ff4d4d",
  },
});
