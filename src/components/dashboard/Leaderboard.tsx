import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';

interface LeaderboardUser {
  rank: number;
  name: string;
  initials: string;
  xp: number;
  isCurrentUser?: boolean;
}

const Leaderboard: React.FC = () => {
  const users: LeaderboardUser[] = [
    { rank: 1, name: 'AutoTech Nepal', initials: 'AT', xp: 320 },
    { rank: 2, name: 'Mountain Motors', initials: 'MM', xp: 285 },
    { rank: 3, name: 'adang', initials: 'AD', xp: 250 },
    { rank: 3, name: 'QuickGuru0522', initials: 'QG', xp: 250, isCurrentUser: true },
  ];

  const renderItem = ({ item, index }: { item: LeaderboardUser; index: number }) => (
    <View>
      {/* Show tie message just once, before the 3rd item */}
      {index === 2 && (
        <Text style={styles.tiedIndicator}>
          You and adang are tied! Earn XP to get ahead.
        </Text>
      )}

      <View style={styles.item}>
        <Text style={styles.rank}>#{item.rank}</Text>

        <View style={styles.user}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{item.initials}</Text>
          </View>
          <Text style={styles.name}>
            {item.name} {item.isCurrentUser && '(You)'}
          </Text>
        </View>

        <Text style={styles.xp}>{item.xp} XP</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Garage Leaderboard</Text>
        <TouchableOpacity style={styles.actionBtn}>
          <Text style={styles.actionBtnText}>Full Ranking</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={users}
        keyExtractor={(item) => item.name}
        renderItem={renderItem}
      />
    </View>
  );
};

export default Leaderboard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    elevation: 3, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOpacity: 0.1,
    shadowRadius: 6,
    margin: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  actionBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#007bff',
    borderRadius: 8,
  },
  actionBtnText: {
    color: '#fff',
    fontWeight: '500',
  },
  tiedIndicator: {
    color: '#e67e22',
    marginBottom: 8,
    fontSize: 14,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ccc',
  },
  rank: {
    width: 40,
    fontWeight: '700',
    fontSize: 16,
  },
  user: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f1f1f1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  avatarText: {
    fontWeight: '700',
    color: '#333',
  },
  name: {
    fontSize: 15,
  },
  xp: {
    fontWeight: '600',
    fontSize: 15,
  },
});
