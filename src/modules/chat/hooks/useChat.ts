import useSWR, { mutate } from 'swr';
import { getContacts } from '../services/getContacts';
import { getMessages } from '../services/getMessages';
import { sendMessage } from '../services/sendMessage';
import { Message, User } from '../types';

export const useChat = (activeChatId: string | null) => {
  const { data: contacts, error: contactsError, isLoading: loadingContacts } = useSWR<User[]>(
    '/api/chat/contacts',
    getContacts
  );

  const { data: messages, error: messagesError, isLoading: loadingMessages } = useSWR<Message[]>(
    activeChatId ? `/api/chat/messages/${activeChatId}` : null,
    () => (activeChatId ? getMessages(activeChatId) : Promise.resolve([]))
  );

  const send = async (content: string) => {
    if (!activeChatId) return;

    const tempId = `temp-${Date.now()}`;
    const optimisticMessage: Message = {
      id: tempId,
      senderId: 'me',
      receiverId: activeChatId,
      content,
      timestamp: new Date().toISOString(),
      read: false,
    };

    try {
      // Optimistic update
      await mutate(
        `/api/chat/messages/${activeChatId}`,
        (currentMessages: Message[] = []) => [...currentMessages, optimisticMessage],
        false
      );

      await sendMessage(activeChatId, content);

      // Revalidate to get the real message with ID from server (simulated)
      mutate(`/api/chat/messages/${activeChatId}`);
    } catch (err) {
      console.error('Failed to send message:', err);
      // Rollback
      mutate(`/api/chat/messages/${activeChatId}`);
    }
  };

  return {
    contacts,
    messages,
    loadingContacts,
    loadingMessages,
    contactsError,
    messagesError,
    sendMessage: send,
  };
};
