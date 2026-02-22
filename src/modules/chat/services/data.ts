import type { Chat, User } from '../types';

export const MOCK_USERS: User[] = [
  { id: '1', name: 'Alice', status: 'online' },
  { id: '2', name: 'Bob', status: 'offline' },
  { id: '3', name: 'Charlie', status: 'busy' },
];

export const MOCK_CHATS: Chat[] = [
  {
    id: '1',
    name: 'Alice',
    type: 'direct',
    participants: [MOCK_USERS[0]],
    unreadCount: 1,
    messages: [
      { id: 'm1', content: 'Hello!', senderId: '1', createdAt: new Date().toISOString() },
    ],
  },
  {
    id: '2',
    name: 'Team Project',
    type: 'group',
    participants: [MOCK_USERS[0], MOCK_USERS[1]],
    unreadCount: 0,
    messages: [
      { id: 'm2', content: 'Meeting at 3PM', senderId: '2', createdAt: new Date().toISOString() },
    ],
  },
];
