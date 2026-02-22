import React, { useRef, useEffect } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Avatar } from '@mui/material';
import type { Chat } from '../types';
import MessageItem from './MessageItem';
import ChatInput from './ChatInput';

interface ChatWindowProps {
  currentChat: Chat | null;
  onSendMessage: (message: string) => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ currentChat, onSendMessage }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentChat?.messages]);

  if (!currentChat) {
    return (
      <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
        <Typography variant="h6" color="text.secondary">
          Select a chat to start messaging
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', borderBottom: '1px solid', borderColor: 'divider' }}>
        <Avatar src="/static/images/avatar/1.jpg" alt={currentChat.name} sx={{ mr: 2 }} />
        <Typography variant="h6">{currentChat.name}</Typography>
      </Box>

      {/* Messages */}
      <Box sx={{ flex: 1, overflowY: 'auto', p: 2, bgcolor: 'background.default' }}>
        <List>
          {currentChat.messages.map((msg) => (
            <ListItem key={msg.id} disablePadding>
              <ListItemText primary={<MessageItem message={msg} isMe={msg.senderId === 'me'} />} />
            </ListItem>
          ))}
          <div ref={messagesEndRef} />
        </List>
      </Box>

      {/* Input */}
      <ChatInput onSend={onSendMessage} />
    </Box>
  );
};

export default ChatWindow;
