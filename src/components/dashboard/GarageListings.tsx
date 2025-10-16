import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';

interface Garage {
  id: number;
  name: string;
  status: 'pending' | 'featured' | 'active';
  featured: 'standard' | 'featured';
}

const GarageListings: React.FC = () => {
  const garages: Garage[] = [
    { id: 1, name: 'Himalayan Auto Works', status: 'pending', featured: 'standard' },
    { id: 2, name: 'Kathmandu Car Care', status: 'featured', featured: 'featured' },
    { id: 3, name: 'Pokhara Motors', status: 'active', featured: 'standard' },
  ];

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'pending':
        return styles.statusPending;
      case 'featured':
        return styles.statusFeatured;
      case 'active':
      case 'standard':
        return styles.statusStandard;
      default:
        return styles.statusStandard;
    }
  };

  const renderItem = ({ item }: { item: Garage }) => (
    <View style={styles.row}>
      <View style={styles.cellName}>
        <Text style={styles.name}>{item.name}</Text>
      </View>

      <View style={styles.cell}>
        <Text style={[styles.badge, getStatusStyle(item.status)]}>
          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
        </Text>
      </View>

      <View style={styles.cell}>
        <Text style={[styles.badge, getStatusStyle(item.featured)]}>
          {item.featured.charAt(0).toUpperCase() + item.featured.slice(1)}
        </Text>
      </View>

      <View style={styles.cellActions}>
        <TouchableOpacity style={styles.actionBtn}>
          <Text style={styles.actionText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn}>
          <Text style={styles.actionText}>View</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>My Garage Listings</Text>
        <TouchableOpacity style={styles.addBtn}>
          <Text style={styles.addBtnText}>+ Add New</Text>
        </TouchableOpacity>
      </View>

      {/* Table header */}
      <View style={[styles.row, styles.headerRow]}>
        <Text style={[styles.headerCell, styles.cellName]}>Garage Name</Text>
        <Text style={styles.headerCell}>Status</Text>
        <Text style={styles.headerCell}>Featured</Text>
        <Text style={styles.headerCell}>Actions</Text>
      </View>

      {/* Table data */}
      <FlatList
        data={garages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

export default GarageListings;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  addBtn: {
    backgroundColor: '#007bff',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  addBtnText: {
    color: '#fff',
    fontWeight: '500',
  },
  headerRow: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ccc',
    paddingBottom: 6,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#eee',
  },
  headerCell: {
    flex: 1,
    fontWeight: '600',
  },
  cell: {
    flex: 1,
  },
  cellName: {
    flex: 2,
  },
  cellActions: {
    flex: 1,
    flexDirection: 'row',
  },
  name: {
    fontSize: 15,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    textAlign: 'center',
    overflow: 'hidden',
    fontSize: 13,
    fontWeight: '500',
    color: '#fff',
  },
  statusPending: {
    backgroundColor: '#f0ad4e',
  },
  statusFeatured: {
    backgroundColor: '#5bc0de',
  },
  statusStandard: {
    backgroundColor: '#5cb85c',
  },
  actionBtn: {
    backgroundColor: '#007bff',
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginLeft: 6,
  },
  actionText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 13,
  },
});
