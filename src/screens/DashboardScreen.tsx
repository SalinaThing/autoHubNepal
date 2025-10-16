// DashboardScreen.tsx
import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';

// Replace these with your own RN components
import Sidebar from '../components/dashboard/Sidebar';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import GarageListings from '../components/dashboard/GarageListings';
import StatsCard from '../components/dashboard/StatsCard';
import ProgressBars from '../components/dashboard/ProgressBars';
import Leaderboard from '../components/dashboard/Leaderboard';

const DashboardScreen: React.FC = () => {
  return (
    <View style={styles.dashboardContainer}>
      {/* Sidebar can be a Drawer or a fixed View depending on your design */}
      <Sidebar />

      <ScrollView style={styles.mainContent} contentContainerStyle={styles.scrollContent}>
        <DashboardHeader />

        <View style={styles.dashboardCards}>
          <GarageListings />
          <StatsCard />
        </View>

        <View style={styles.statsSection}>
          <ProgressBars />
          <Leaderboard />
        </View>
      </ScrollView>
    </View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  dashboardContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',        // clean hex code
  },
  mainContent: {
    flex: 1,
    marginLeft: 250,                // adjust or remove if Sidebar behaves differently
    padding: 20,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  dashboardCards: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  // Responsive tweaks for smaller screens
  // You can use Dimensions or hooks to adapt at runtime
});
