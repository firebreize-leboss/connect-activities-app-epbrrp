import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';
import { mockChats, mockUser } from '@/data/mockData';

// Messages adaptés selon le type de chat (groupe ou privé)
const chatMessages: Record<string, any[]> = {
  // Chat 1 - Hiking Group (GROUPE)
  '1': [
    {
      id: '1',
      senderId: '2',
      senderName: 'Mike Chen',
      senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      text: 'Hey everyone! Looking forward to the hike tomorrow!',
      timestamp: '10:30 AM',
    },
    {
      id: '2',
      senderId: mockUser.id,
      senderName: mockUser.name,
      senderAvatar: mockUser.avatar,
      text: 'Me too! What time should we meet?',
      timestamp: '10:32 AM',
    },
    {
      id: '3',
      senderId: '3',
      senderName: 'Emma Wilson',
      senderAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
      text: 'I think 8am at the trailhead',
      timestamp: '10:35 AM',
    },
    {
      id: '4',
      senderId: '2',
      senderName: 'Mike Chen',
      senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      text: 'Perfect! See you all tomorrow at 8am 👍',
      timestamp: '10:40 AM',
    },
    {
      id: '5',
      senderId: '3',
      senderName: 'Emma Wilson',
      senderAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
      text: 'Should we bring snacks?',
      timestamp: '10:45 AM',
    },
  ],
  
  // Chat 2 - Sarah Johnson (PRIVÉ - 1 à 1)
  '2': [
    {
      id: '1',
      senderId: '4',
      senderName: 'Sarah Johnson',
      senderAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
      text: 'Hi! Thanks for joining the yoga class',
      timestamp: '9:15 AM',
    },
    {
      id: '2',
      senderId: mockUser.id,
      senderName: mockUser.name,
      senderAvatar: mockUser.avatar,
      text: 'Thank you for having me! It was great',
      timestamp: '9:20 AM',
    },
    {
      id: '3',
      senderId: '4',
      senderName: 'Sarah Johnson',
      senderAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
      text: 'Would you like to join next week too?',
      timestamp: '9:25 AM',
    },
    {
      id: '4',
      senderId: mockUser.id,
      senderName: mockUser.name,
      senderAvatar: mockUser.avatar,
      text: 'Absolutely! Count me in 😊',
      timestamp: '9:30 AM',
    },
  ],
  
  // Chat 3 - Alex Thompson (PRIVÉ - 1 à 1)
  '3': [
    {
      id: '1',
      senderId: '5',
      senderName: 'Alex Thompson',
      senderAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
      text: 'Hey! Ready for the photography walk?',
      timestamp: '2:00 PM',
    },
    {
      id: '2',
      senderId: mockUser.id,
      senderName: mockUser.name,
      senderAvatar: mockUser.avatar,
      text: 'Yes! Just grabbing my camera',
      timestamp: '2:05 PM',
    },
    {
      id: '3',
      senderId: '5',
      senderName: 'Alex Thompson',
      senderAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
      text: 'Great! Meet at the bridge in 10 mins?',
      timestamp: '2:07 PM',
    },
    {
      id: '4',
      senderId: mockUser.id,
      senderName: mockUser.name,
      senderAvatar: mockUser.avatar,
      text: 'On my way! 📸',
      timestamp: '2:08 PM',
    },
  ],
  
  // Chat 4 - Book Club (GROUPE)
  '4': [
    {
      id: '1',
      senderId: '6',
      senderName: 'Chris Martinez',
      senderAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
      text: 'Book club meeting this Friday at 7pm',
      timestamp: 'Yesterday',
    },
    {
      id: '2',
      senderId: mockUser.id,
      senderName: mockUser.name,
      senderAvatar: mockUser.avatar,
      text: 'Thanks for the reminder!',
      timestamp: 'Yesterday',
    },
    {
      id: '3',
      senderId: '7',
      senderName: 'Lisa Wang',
      senderAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400',
      text: 'Looking forward to discussing the new chapter',
      timestamp: 'Yesterday',
    },
    {
      id: '4',
      senderId: '8',
      senderName: 'Tom Brown',
      senderAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400',
      text: 'I finished the book last night. So good!',
      timestamp: 'Yesterday',
    },
    {
      id: '5',
      senderId: '6',
      senderName: 'Chris Martinez',
      senderAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
      text: 'No spoilers please! 😄',
      timestamp: 'Yesterday',
    },
  ],
  
  // Chat 5 - David Kim (PRIVÉ - 1 à 1)
  '5': [
    {
      id: '1',
      senderId: '8',
      senderName: 'David Kim',
      senderAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400',
      text: 'Tennis match rescheduled to Sunday 3pm',
      timestamp: '2 days ago',
    },
    {
      id: '2',
      senderId: mockUser.id,
      senderName: mockUser.name,
      senderAvatar: mockUser.avatar,
      text: 'Works for me! See you then',
      timestamp: '2 days ago',
    },
    {
      id: '3',
      senderId: '8',
      senderName: 'David Kim',
      senderAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400',
      text: 'Great! I\'ll book the court',
      timestamp: '2 days ago',
    },
  ],
};

export default function ChatDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const chat = mockChats.find(c => c.id === id);
  const [message, setMessage] = useState('');

  if (!chat) {
    return (
      <SafeAreaView style={commonStyles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Chat not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Récupérer les messages pour ce chat spécifique
  const messages = chatMessages[id as string] || [];

  const handleSend = () => {
    if (message.trim()) {
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  return (
    <SafeAreaView style={commonStyles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <IconSymbol name="chevron.left" size={24} color={colors.text} />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Image source={{ uri: chat.image }} style={styles.headerAvatar} />
          <View>
            <Text style={styles.headerTitle}>{chat.name}</Text>
            {chat.isGroup && (
              <Text style={styles.headerSubtitle}>Group Chat</Text>
            )}
          </View>
        </View>
        <TouchableOpacity style={styles.headerButton}>
          <IconSymbol name="info.circle" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <ScrollView
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
        >
          {messages.length > 0 ? (
            messages.map(msg => {
              const isOwnMessage = msg.senderId === mockUser.id;
              return (
                <View
                  key={msg.id}
                  style={[
                    styles.messageWrapper,
                    isOwnMessage && styles.messageWrapperOwn,
                  ]}
                >
                  {!isOwnMessage && chat.isGroup && (
                    <Image
                      source={{ uri: msg.senderAvatar }}
                      style={styles.messageAvatar}
                    />
                  )}
                  <View
                    style={[
                      styles.messageBubble,
                      isOwnMessage && styles.messageBubbleOwn,
                    ]}
                  >
                    {!isOwnMessage && chat.isGroup && (
                      <Text style={styles.senderName}>{msg.senderName}</Text>
                    )}
                    <Text
                      style={[
                        styles.messageText,
                        isOwnMessage && styles.messageTextOwn,
                      ]}
                    >
                      {msg.text}
                    </Text>
                    <Text
                      style={[
                        styles.messageTime,
                        isOwnMessage && styles.messageTimeOwn,
                      ]}
                    >
                      {msg.timestamp}
                    </Text>
                  </View>
                </View>
              );
            })
          ) : (
            <View style={styles.emptyMessages}>
              <Text style={styles.emptyMessagesText}>No messages yet</Text>
              <Text style={styles.emptyMessagesSubtext}>
                Start the conversation!
              </Text>
            </View>
          )}
        </ScrollView>

        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.attachButton}>
            <IconSymbol name="plus.circle.fill" size={28} color={colors.primary} />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            placeholderTextColor={colors.textSecondary}
            value={message}
            onChangeText={setMessage}
            multiline
          />
          <TouchableOpacity
            style={[styles.sendButton, !message.trim() && styles.sendButtonDisabled]}
            onPress={handleSend}
            disabled={!message.trim()}
          >
            <IconSymbol
              name="arrow.up.circle.fill"
              size={32}
              color={message.trim() ? colors.primary : colors.textSecondary}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.card,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.border,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  headerSubtitle: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  headerButton: {
    padding: 8,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
  },
  messageWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
    marginBottom: 8,
  },
  messageWrapperOwn: {
    flexDirection: 'row-reverse',
  },
  messageAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.border,
  },
  messageBubble: {
    maxWidth: '70%',
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 12,
    gap: 4,
  },
  messageBubbleOwn: {
    backgroundColor: colors.primary,
  },
  senderName: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary,
    marginBottom: 2,
  },
  messageText: {
    fontSize: 15,
    color: colors.text,
    lineHeight: 20,
  },
  messageTextOwn: {
    color: colors.background,
  },
  messageTime: {
    fontSize: 11,
    color: colors.textSecondary,
    alignSelf: 'flex-end',
  },
  messageTimeOwn: {
    color: colors.background + 'CC',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    gap: 8,
  },
  attachButton: {
    padding: 4,
  },
  input: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    color: colors.text,
    maxHeight: 100,
  },
  sendButton: {
    padding: 4,
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: colors.text,
  },
  emptyMessages: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyMessagesText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  emptyMessagesSubtext: {
    fontSize: 14,
    color: colors.textSecondary,
  },
});