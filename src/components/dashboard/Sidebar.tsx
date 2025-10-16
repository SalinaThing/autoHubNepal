// Sidebar.tsx
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';

const Sidebar: React.FC = () => {
  return (
    <View style={styles.sidebar}>
      {/* Logo Section */}
      <View style={styles.logo}>
        <Text style={styles.logoText}>
          AutoHub
          <Text style={styles.logoHighlight}>Nepal</Text>
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Overview Section */}
        <View style={styles.navSection}>
          <Text style={styles.sectionTitle}>Overview</Text>
          <TouchableOpacity style={[styles.navItem, styles.activeItem]}>
            <Text style={styles.navIcon}>📊</Text>
            <Text style={styles.navText}>Dashboard</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Text style={styles.navIcon}>🏆</Text>
            <Text style={styles.navText}>Leaderboard</Text>
          </TouchableOpacity>
        </View>

        {/* Garage Management */}
        <View style={styles.navSection}>
          <Text style={styles.sectionTitle}>Garage Management</Text>
          <TouchableOpacity style={styles.navItem}>
            <Text style={styles.navIcon}>📋</Text>
            <Text style={styles.navText}>My Listings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Text style={styles.navIcon}>⭐</Text>
            <Text style={styles.navText}>Featured</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Text style={styles.navIcon}>⚙️</Text>
            <Text style={styles.navText}>Settings</Text>
          </TouchableOpacity>
        </View>

        {/* Resources */}
        <View style={styles.navSection}>
          <Text style={styles.sectionTitle}>Resources</Text>
          <TouchableOpacity style={styles.navItem}>
            <Text style={styles.navIcon}>📚</Text>
            <Text style={styles.navText}>Tutorials</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Text style={styles.navIcon}>🔖</Text>
            <Text style={styles.navText}>Bookmarks</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Text style={styles.navIcon}>🎯</Text>
            <Text style={styles.navText}>Learning Paths</Text>
          </TouchableOpacity>
        </View>

        {/* Advertisement / Upgrade */}
        <View style={styles.adSection}>
          <Text style={styles.adTitle}>Unlock every paid feature</Text>
          <Text style={styles.adDescription}>
            Upgrade to Premium for advanced garage management tools
          </Text>
          <TouchableOpacity style={styles.btn}>
            <Text style={styles.btnText}>Explore now</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btn, styles.btnOutline]}>
            <Text style={[styles.btnText, styles.btnOutlineText]}>REMOVE ADS</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Sidebar;

const styles = StyleSheet.create({
  sidebar: {
    width: 250,
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRightWidth: 1,
    borderRightColor: '#e0e0e0',
  },
  logo: {
    marginBottom: 30,
  },
  logoText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#222',
  },
  logoHighlight: {
    color: '#007bff',
  },
  navSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#888',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 8,
    paddingHorizontal: 6,
  },
  navIcon: {
    fontSize: 18,
    marginRight: 10,
  },
  navText: {
    fontSize: 16,
    color: '#333',
  },
  activeItem: {
    backgroundColor: '#f0f4ff',
  },
  adSection: {
    marginTop: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  adTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
    color: '#333',
  },
  adDescription: {
    fontSize: 14,
    color: '#555',
    marginBottom: 12,
  },
  btn: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    borderRadius: 6,
    marginBottom: 10,
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  btnOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#007bff',
  },
  btnOutlineText: {
    color: '#007bff',
  },
});
