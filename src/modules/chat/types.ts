export interface User {
  id: string;
  name: string;
  avatar?: string;
  status: 'online' | 'offline' | 'busy';
}

export interface Message {
  id: string;
  content: string;
  senderId: string;
  createdAt: string;
}

export interface Chat {
  id: string;
  name: string;
  type: 'direct' | 'group';
  participants: User[];
  lastMessage?: Message;
  unreadCount: number;
  messages: Message[];
}
