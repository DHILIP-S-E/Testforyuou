import React from 'react';
import { Box, Paper, Typography, CircularProgress, Grid } from '@mui/material';
import { useChat } from '../hooks/useChat';
import ChatList from '../components/ChatList';
import ChatWindow from '../components/ChatWindow';

const ChatPage: React.FC = () => {
  const { chats, currentChat, isLoading, error, selectChat, sendMessage } = useChat();

  if (isLoading && !chats.length) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, p: 3, height: 'calc(100vh - 100px)' }}>
      <Paper sx={{ height: '100%', display: 'flex', overflow: 'hidden' }}>
        <Grid container sx={{ width: '100%', height: '100%' }}>
          <Grid size={{ xs: 12, md: 4 }} sx={{ borderRight: '1px solid', borderColor: 'divider', height: '100%' }}>
            <ChatList chats={chats} currentChat={currentChat} onSelectChat={selectChat} />
          </Grid>
          <Grid size={{ xs: 12, md: 8 }} sx={{ height: '100%' }}>
            <ChatWindow currentChat={currentChat} onSendMessage={(content) => sendMessage(content, 'me')} />
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default ChatPage;
