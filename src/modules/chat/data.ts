import { User, Message, Chat } from './types';

export const mockUsers: User[] = [
  {
    id: 'u1',
    name: 'James Johnson',
    avatar: 'https://i.pravatar.cc/150?u=u1',
    status: 'online',
  },
  {
    id: 'u2',
    name: 'Maria Hernandez',
    avatar: 'https://i.pravatar.cc/150?u=u2',
    status: 'busy',
  },
  {
    id: 'u3',
    name: 'David Smith',
    avatar: 'https://i.pravatar.cc/150?u=u3',
    status: 'offline',
  },
];

export const mockMessages: Message[] = [
  {
    id: 'm1',
    senderId: 'u1',
    receiverId: 'me', // 'me' is the current user
    content: 'Hi there! How are you doing?',
    timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    read: true,
  },
  {
    id: 'm2',
    senderId: 'me',
    receiverId: 'u1',
    content: 'I am doing great, thanks for asking!',
    timestamp: new Date(Date.now() - 1000 * 60 * 55).toISOString(),
    read: true,
  },
  {
    id: 'm3',
    senderId: 'u2',
    receiverId: 'me',
    content: 'Can we meet later today?',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    read: false,
  },
];

// Simple state container to simulate database
export const chatStore = {
  users: [...mockUsers],
  messages: [...mockMessages],
  // Helper to get chat summaries
  getChats: (): Chat[] => {
    return chatStore.users.map(user => {
      const lastMsg = chatStore.messages
        .filter(m => m.senderId === user.id || m.receiverId === user.id)
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())[0];

      const unread = chatStore.messages.filter(m => m.senderId === user.id && !m.read).length;

      return {
        id: user.id,
        userId: user.id,
        unreadCount: unread,
        lastMessage: lastMsg?.content || '',
        lastMessageTime: lastMsg?.timestamp || '',
      };
    });
  }
};
