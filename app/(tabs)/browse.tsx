
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Platform,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';
import { mockActivities } from '@/data/mockData';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function BrowseScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredActivities = mockActivities.filter(activity =>
    activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    activity.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderActivityCard = (activity: typeof mockActivities[0], index: number) => {
    const spotsLeft = activity.capacity - activity.participants.length;
    const isFull = spotsLeft === 0;

    return (
      <Animated.View
        key={activity.id}
        entering={FadeInDown.delay(index * 100).springify()}
      >
        <TouchableOpacity
          style={styles.activityCard}
          onPress={() => router.push(`/activity-detail?id=${activity.id}`)}
          activeOpacity={0.8}
        >
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
              <View style={styles.detailItem}>
                <IconSymbol name="calendar" size={16} color={colors.textSecondary} />
                <Text style={styles.detailText}>{activity.date}</Text>
              </View>
              <View style={styles.detailItem}>
                <IconSymbol name="clock.fill" size={16} color={colors.textSecondary} />
                <Text style={styles.detailText}>{activity.time}</Text>
              </View>
            </View>

            <View style={styles.detailsRow}>
              <View style={styles.detailItem}>
                <IconSymbol name="location.fill" size={16} color={colors.textSecondary} />
                <Text style={styles.detailText} numberOfLines={1}>
                  {activity.location}
                </Text>
              </View>
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
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={commonStyles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Discover Activities</Text>
        <TouchableOpacity
          onPress={() => router.push('/create-activity')}
          style={styles.createButton}
        >
          <IconSymbol name="plus" size={24} color={colors.background} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <IconSymbol name="magnifyingglass" size={20} color={colors.textSecondary} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search activities..."
          placeholderTextColor={colors.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.contentContainer,
          Platform.OS !== 'ios' && styles.contentContainerWithTabBar,
        ]}
        showsVerticalScrollIndicator={false}
      >
        {filteredActivities.map((activity, index) => renderActivityCard(activity, index))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    marginHorizontal: 20,
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 12,
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
  contentContainerWithTabBar: {
    paddingBottom: 100,
  },
  activityCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.3)',
    elevation: 4,
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
    gap: 12,
  },
  activityTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    lineHeight: 26,
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
    gap: 8,
  },
  hostAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.border,
  },
  hostName: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
  },
  detailText: {
    fontSize: 14,
    color: colors.textSecondary,
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
