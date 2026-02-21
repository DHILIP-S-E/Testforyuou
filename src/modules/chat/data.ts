import type { User, Chat } from './types';

export const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'James Johnson',
    avatar: 'https://i.pravatar.cc/150?u=1',
    status: 'online',
  },
  {
    id: '2',
    name: 'Maria Hernandez',
    avatar: 'https://i.pravatar.cc/150?u=2',
    status: 'offline',
  },
  {
    id: '3',
    name: 'David Smith',
    avatar: 'https://i.pravatar.cc/150?u=3',
    status: 'busy',
  },
  {
    id: 'current-user',
    name: 'Me',
    avatar: 'https://i.pravatar.cc/150?u=me',
    status: 'online',
  },
];

export const MOCK_CHATS: Chat[] = [
  {
    id: 'chat-1',
    participants: [MOCK_USERS[0], MOCK_USERS[3]],
    messages: [
      {
        id: 'msg-1',
        chatId: 'chat-1',
        senderId: '1',
        content: 'Hey, how are you?',
        type: 'text',
        createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
      },
      {
        id: 'msg-2',
        chatId: 'chat-1',
        senderId: 'current-user',
        content: 'I am good, thanks! How about you?',
        type: 'text',
        createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      },
    ],
    unreadCount: 0,
    updatedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: 'chat-2',
    participants: [MOCK_USERS[1], MOCK_USERS[3]],
    messages: [
      {
        id: 'msg-3',
        chatId: 'chat-2',
        senderId: '2',
        content: 'Can we meet tomorrow?',
        type: 'text',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      },
    ],
    unreadCount: 1,
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
];
