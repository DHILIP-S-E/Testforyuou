import { useState, useEffect } from 'react';
import type { Chat, Message, User } from '../types';
import { getChats } from '../services/getChats';
import { getChatById } from '../services/getChatById';
import { sendMessage as sendMessageService } from '../services/sendMessage';
import { getContacts } from '../services/getContacts';

export const useChat = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [contacts, setContacts] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const currentUser: User = { id: 'current-user', name: 'Me', avatar: 'https://i.pravatar.cc/150?u=me', status: 'online' };

  useEffect(() => {
    const fetchChats = async () => {
      setIsLoading(true);
      try {
        const data = await getChats();
        setChats(data);
        if (data.length > 0 && !selectedChat) {
          handleSelectChat(data[0].id);
        }
      } catch (err) {
        setError('Failed to load chats');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    const fetchContacts = async () => {
      try {
        const data = await getContacts();
        setContacts(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchChats();
    fetchContacts();
  }, []);

  const handleSelectChat = async (chatId: string) => {
    setIsLoading(true);
    try {
      const chat = await getChatById(chatId);
      if (chat) {
        setSelectedChat(chat);
        setMessages(chat.messages);
      }
    } catch (err) {
      setError('Failed to load chat');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (content: string) => {
    if (!selectedChat) return;
    try {
      const newMessage = await sendMessageService(selectedChat.id, content, currentUser.id);
      setMessages((prev) => [...prev, newMessage]);
      // Update chat list last message/timestamp optimistically or re-fetch
      setChats((prev) =>
        prev.map((c) =>
          c.id === selectedChat.id
            ? { ...c, messages: [...c.messages, newMessage], updatedAt: newMessage.createdAt }
            : c
        )
      );
    } catch (err) {
      setError('Failed to send message');
      console.error(err);
    }
  };

  return {
    chats,
    selectedChat,
    messages,
    contacts,
    isLoading,
    error,
    currentUser,
    handleSelectChat,
    handleSendMessage,
  };
};
