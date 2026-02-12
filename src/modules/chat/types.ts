export interface User {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline' | 'busy' | 'away';
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string; // or chatId if group chat
  content: string;
  timestamp: string;
  read: boolean;
}

export interface Chat {
  id: string; // usually the userId of the other person in 1-on-1
  userId: string;
  unreadCount: number;
  lastMessage?: string;
  lastMessageTime?: string;
}

export interface ChatState {
  activeChatId: string | null;
  chats: Chat[];
  messages: Message[];
  users: User[]; // Contacts
}
