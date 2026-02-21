import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { useChat } from '../hooks/useChat';
import ChatSidebar from '../components/ChatSidebar';
import ChatContent from '../components/ChatContent';

const ChatPage: React.FC = () => {
  const { chats, selectedChat, messages, currentUser, isLoading, error, handleSelectChat, handleSendMessage } = useChat();

  if (isLoading && chats.length === 0) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, height: '100%', boxSizing: 'border-box' }}>
      <Paper sx={{ display: 'flex', height: '100%', overflow: 'hidden', borderRadius: 2 }}>
        <ChatSidebar
          chats={chats}
          selectedChatId={selectedChat?.id}
          onSelectChat={handleSelectChat}
        />
        <ChatContent
          chat={selectedChat}
          messages={messages}
          currentUser={currentUser}
          onSendMessage={handleSendMessage}
        />
      </Paper>
    </Box>
  );
};

export default ChatPage;
