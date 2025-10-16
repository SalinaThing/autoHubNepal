//layout

import React from "react";
import { View, StyleSheet } from "react-native";
import Header from "./Header";
import Footer from "./Footer";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigations/Types";

interface LayoutProps {
  children: React.ReactNode;
  active: string;
  onNavigate: (screen: string) => void;
  navigation?: NativeStackNavigationProp<RootStackParamList>;
}

const Layout: React.FC<LayoutProps> = ({ children, active, onNavigate, navigation }) => {
  return (
    <View style={styles.wrapper}>
      <Header active={active} onNavigate={onNavigate} />
      <View style={styles.content}>{children}</View>
      {navigation ? <Footer navigation={navigation} /> : <Footer navigation={{} as any} />}
    </View>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
  },
});

export default Layout;