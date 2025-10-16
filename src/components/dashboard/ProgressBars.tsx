// ProgressBars.tsx
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList
} from 'react-native';

interface ProgressItem {
  label: string;
  value: number;
}

const ProgressBars: React.FC = () => {
  const progressItems: ProgressItem[] = [
    { label: 'Garage Setup', value: 85 },
    { label: 'Profile Completeness', value: 70 },
    { label: 'Customer Reviews', value: 60 },
    { label: 'Service Catalog', value: 45 },
  ];

  const renderItem = ({ item }: { item: ProgressItem }) => (
    <View style={styles.progressItem}>
      <Text style={styles.progressLabel}>{item.label}</Text>

      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${item.value}%` }]} />
      </View>

      <Text style={styles.progressValue}>{item.value}%</Text>
    </View>
  );

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Progress</Text>
        <TouchableOpacity>
          <Text style={styles.actionBtn}>See All</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={progressItems}
        keyExtractor={(item) => item.label}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

export default ProgressBars;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    elevation: 2,               // shadow for Android
    shadowColor: '#000',        // shadow for iOS
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  actionBtn: {
    color: '#007bff',
    fontSize: 14,
    fontWeight: '500',
  },
  listContent: {
    paddingBottom: 8,
  },
  progressItem: {
    marginBottom: 16,
  },
  progressLabel: {
    fontSize: 14,
    marginBottom: 4,
    color: '#555',
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#e0e0e0',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4caf50',
    borderRadius: 4,
  },
  progressValue: {
    fontSize: 12,
    color: '#333',
    marginTop: 4,
    textAlign: 'right',
  },
});
