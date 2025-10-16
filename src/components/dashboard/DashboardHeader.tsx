import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DashboardHeader: React.FC = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>My Garage Dashboard</Text>
      <View style={styles.userInfo}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>QG</Text>
        </View>
        <Text style={styles.username}>QuickGuru0522</Text>
      </View>
    </View>
  );
};

export default DashboardHeader;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ddd',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    backgroundColor: '#007bff',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  avatarText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  username: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
});
