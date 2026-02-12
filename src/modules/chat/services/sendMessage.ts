import { chatStore } from '../data';
import { Message } from '../types';

export const sendMessage = async (receiverId: string, content: string): Promise<Message> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  const newMessage: Message = {
    id: `m-${Date.now()}`,
    senderId: 'me',
    receiverId: receiverId,
    content: content,
    timestamp: new Date().toISOString(),
    read: false,
  };

  chatStore.messages.push(newMessage);
  console.log('Message sent:', newMessage);

  return newMessage;
};
