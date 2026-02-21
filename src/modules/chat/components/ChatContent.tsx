import React from 'react';
import { Box, Typography, Avatar, Paper } from '@mui/material';
import type { Chat, Message, User } from '../types';
import ChatInput from './ChatInput';

interface ChatContentProps {
  chat: Chat | null;
  messages: Message[];
  currentUser: User;
  onSendMessage: (content: string) => void;
}

const ChatContent: React.FC<ChatContentProps> = ({ chat, messages, currentUser, onSendMessage }) => {
  if (!chat) {
    return (
      <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
        <Typography variant="h6" color="text.secondary">Select a chat to start messaging</Typography>
      </Box>
    );
  }

  const otherParticipant = chat.participants.find((p) => p.id !== currentUser.id) || chat.participants[0];

  return (
    <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <Box sx={{ p: 2, borderBottom: '1px solid #e0e0e0', display: 'flex', alignItems: 'center' }}>
        <Avatar src={otherParticipant.avatar} alt={otherParticipant.name} sx={{ mr: 2 }} />
        <Typography variant="h6">{otherParticipant.name}</Typography>
      </Box>

      {/* Messages */}
      <Box sx={{ flexGrow: 1, p: 2, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
        {messages.map((message) => {
          const isMe = message.senderId === currentUser.id;
          return (
            <Box
              key={message.id}
              sx={{
                display: 'flex',
                justifyContent: isMe ? 'flex-end' : 'flex-start',
                mb: 2,
              }}
            >
              <Paper
                elevation={1}
                sx={{
                  p: 1.5,
                  maxWidth: '70%',
                  bgcolor: isMe ? 'primary.main' : 'background.paper',
                  color: isMe ? 'primary.contrastText' : 'text.primary',
                  borderRadius: 2,
                }}
              >
                <Typography variant="body1">{message.content}</Typography>
                <Typography variant="caption" sx={{ display: 'block', mt: 0.5, opacity: 0.7, textAlign: 'right' }}>
                  {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Typography>
              </Paper>
            </Box>
          );
        })}
      </Box>

      {/* Input */}
      <ChatInput onSendMessage={onSendMessage} />
    </Box>
  );
};

export default ChatContent;
