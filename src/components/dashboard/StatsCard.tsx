// StatsCard.tsx
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

interface Stat {
  label: string;
  value: string;
}

const StatsCard: React.FC = () => {
  const stats: Stat[] = [
    { label: 'Total Listings', value: '12' },
    { label: 'Featured', value: '3' },
    { label: 'Pending Approval', value: '2' },
    { label: 'This Month Views', value: '1,240' },
  ];

  const renderItem = ({ item }: { item: Stat }) => (
    <View style={styles.statItem}>
      <Text style={styles.statLabel}>{item.label}</Text>
      <Text style={styles.statValue}>{item.value}</Text>
    </View>
  );

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>Quick Stats</Text>
      </View>

      <FlatList
        data={stats}
        keyExtractor={(item) => item.label}
        renderItem={renderItem}
        contentContainerStyle={styles.statsContent}
      />
    </View>
  );
};

export default StatsCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    elevation: 2, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  cardHeader: {
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  statsContent: {
    paddingTop: 4,
  },
  statItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e0e0e0',
  },
  statLabel: {
    fontSize: 14,
    color: '#555',
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },
});
