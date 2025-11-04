import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StatusBar,
} from 'react-native';

// Colors
const colors = {
  background: '#121212',
  text: '#FFFFFF',
  textSecondary: '#A0A0A0',
  primary: '#2ECC71',
  secondary: '#3498DB',
  accent: '#F39C12',
  card: '#1E1E1E',
  highlight: '#27AE60',
  border: '#2A2A2A',
  error: '#E74C3C',
};

// Mock Data
const mockActivities = [
  {
    id: '1',
    title: 'Morning Hike at Twin Peaks',
    description: 'Join us for a refreshing morning hike with stunning views of the city. Perfect for all fitness levels!',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800',
    host: {
      id: '2',
      name: 'Mike Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    },
    date: '2024-02-15',
    time: '08:00 AM',
    location: 'Twin Peaks Trailhead',
    capacity: 8,
    participants: [
      { id: '2', name: 'Mike Chen', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400' },
      { id: '3', name: 'Emma Wilson', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400' },
      { id: '4', name: 'James Lee', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400' },
    ],
    category: 'Hiking',
    distance: '2.3 km away',
  },
  {
    id: '2',
    title: 'Weekend Brunch Club',
    description: 'Discover the best brunch spots in the city! This week we\'re trying a new French bistro.',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800',
    host: {
      id: '5',
      name: 'Lisa Park',
      avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400',
    },
    date: '2024-02-17',
    time: '11:00 AM',
    location: 'Le Petit Café',
    capacity: 6,
    participants: [
      { id: '5', name: 'Lisa Park', avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400' },
      { id: '6', name: 'Tom Harris', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400' },
    ],
    category: 'Brunch',
    distance: '1.5 km away',
  },
  {
    id: '3',
    title: 'Live Jazz Night',
    description: 'Experience amazing live jazz music at one of the city\'s best venues. Great vibes guaranteed!',
    image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800',
    host: {
      id: '7',
      name: 'David Martinez',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    },
    date: '2024-02-16',
    time: '08:00 PM',
    location: 'Blue Note Jazz Club',
    capacity: 10,
    participants: [
      { id: '7', name: 'David Martinez', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400' },
      { id: '8', name: 'Sophie Turner', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400' },
      { id: '9', name: 'Alex Kim', avatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=400' },
      { id: '10', name: 'Rachel Green', avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400' },
    ],
    category: 'Music',
    distance: '3.1 km away',
  },
];

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredActivities = mockActivities.filter(activity =>
    activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    activity.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderActivityCard = (activity) => {
    const spotsLeft = activity.capacity - activity.participants.length;
    const isFull = spotsLeft === 0;

    return (
      <View key={activity.id} style={styles.activityCard}>
        <Image source={{ uri: activity.image }} style={styles.activityImage} />
        <View style={styles.activityContent}>
          <View style={styles.activityHeader}>
            <Text style={styles.activityTitle} numberOfLines={2}>
              {activity.title}
            </Text>
            <View style={[styles.categoryBadge, { backgroundColor: colors.primary + '20' }]}>
              <Text style={styles.categoryText}>{activity.category}</Text>
            </View>
          </View>

          <View style={styles.hostRow}>
            <Image source={{ uri: activity.host.avatar }} style={styles.hostAvatar} />
            <Text style={styles.hostName}>{activity.host.name}</Text>
          </View>

          <View style={styles.detailsRow}>
            <Text style={styles.detailText}>📅 {activity.date}</Text>
            <Text style={styles.detailText}>🕐 {activity.time}</Text>
          </View>

          <View style={styles.detailsRow}>
            <Text style={styles.detailText} numberOfLines={1}>
              📍 {activity.location}
            </Text>
          </View>

          <View style={styles.footer}>
            <View style={styles.participantsRow}>
              {activity.participants.slice(0, 3).map((participant, idx) => (
                <Image
                  key={participant.id}
                  source={{ uri: participant.avatar }}
                  style={[styles.participantAvatar, { marginLeft: idx > 0 ? -8 : 0 }]}
                />
              ))}
              {activity.participants.length > 3 && (
                <View style={[styles.participantAvatar, styles.moreParticipants]}>
                  <Text style={styles.moreText}>+{activity.participants.length - 3}</Text>
                </View>
              )}
            </View>
            <View style={[styles.spotsIndicator, isFull && styles.spotsIndicatorFull]}>
              <Text style={[styles.spotsText, isFull && styles.spotsTextFull]}>
                {isFull ? 'Full' : `${spotsLeft} spots left`}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Discover Activities</Text>
        <TouchableOpacity style={styles.createButton}>
          <Text style={styles.createButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search activities..."
          placeholderTextColor={colors.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Activities List */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {filteredActivities.map((activity) => renderActivityCard(activity))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
  },
  createButton: {
    backgroundColor: colors.primary,
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createButtonText: {
    fontSize: 28,
    fontWeight: '600',
    color: colors.background,
    marginTop: -2,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    marginHorizontal: 20,
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
  },
  searchIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  activityCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
  },
  activityImage: {
    width: '100%',
    height: 200,
    backgroundColor: colors.border,
  },
  activityContent: {
    padding: 16,
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  activityTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    lineHeight: 26,
    marginRight: 12,
  },
  categoryBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary,
  },
  hostRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  hostAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.border,
    marginRight: 8,
  },
  hostName: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  detailsRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginRight: 16,
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  participantsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  participantAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.border,
    borderWidth: 2,
    borderColor: colors.card,
  },
  moreParticipants: {
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.background,
  },
  spotsIndicator: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: colors.primary + '20',
  },
  spotsIndicatorFull: {
    backgroundColor: colors.textSecondary + '20',
  },
  spotsText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary,
  },
  spotsTextFull: {
    color: colors.textSecondary,
  },
});
