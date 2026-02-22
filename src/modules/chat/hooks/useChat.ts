import { useState, useEffect, useCallback } from 'react';
import type { Chat } from '../types';
import { getChats } from '../services/getChats';
import { getChatById } from '../services/getChatById';
import { sendMessage as sendMessageService } from '../services/sendMessage';
import { createChat as createChatService } from '../services/createChat';
import { deleteChat as deleteChatService } from '../services/deleteChat';

export const useChat = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChat, setCurrentChat] = useState<Chat | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchChats = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getChats();
      setChats(data);
    } catch (err) {
      setError('Failed to load chats');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchChats();
  }, [fetchChats]);

  const selectChat = useCallback(async (chatId: string) => {
    setIsLoading(true);
    try {
      const chat = await getChatById(chatId);
      if (chat) {
        setCurrentChat(chat);
      }
    } catch (err) {
      setError('Failed to load chat');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const sendMessage = useCallback(async (content: string, senderId: string) => {
    if (!currentChat) return;
    try {
      const newMessage = await sendMessageService(currentChat.id, content, senderId);

      // Update current chat
      setCurrentChat((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          messages: [...prev.messages, newMessage],
          lastMessage: newMessage,
        };
      });

      // Update chat list
      setChats((prev) =>
        prev.map((c) =>
          c.id === currentChat.id
            ? { ...c, lastMessage: newMessage, messages: [...c.messages, newMessage] }
            : c
        )
      );
    } catch (err) {
      setError('Failed to send message');
      console.error(err);
    }
  }, [currentChat]);

  const createChat = useCallback(async (newChatData: Partial<Chat>) => {
    try {
      const newChat = await createChatService(newChatData);
      setChats((prev) => [...prev, newChat]);
      return newChat;
    } catch (err) {
      setError('Failed to create chat');
      console.error(err);
      throw err;
    }
  }, []);

  const deleteChat = useCallback(async (chatId: string) => {
    try {
      const success = await deleteChatService(chatId);
      if (success) {
        setChats((prev) => prev.filter((c) => c.id !== chatId));
        if (currentChat?.id === chatId) {
          setCurrentChat(null);
        }
      }
    } catch (err) {
      setError('Failed to delete chat');
      console.error(err);
    }
  }, [currentChat]);

  return {
    chats,
    currentChat,
    isLoading,
    error,
    selectChat,
    sendMessage,
    createChat,
    deleteChat
  };
};
