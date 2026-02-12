import React, { useState } from 'react';
import { Box, Card, useMediaQuery, useTheme, IconButton, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ChatSidebar from '../components/ChatSidebar';
import ChatWindow from '../components/ChatWindow';
import { useChat } from '../hooks/useChat';
import { User } from '../types';

const ChatApp: React.FC = () => {
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const { contacts, messages, loadingMessages, sendMessage } = useChat(activeChatId);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const safeContacts: User[] = contacts || [];
  const safeMessages = messages || [];

  const handleSelectChat = (id: string) => {
    setActiveChatId(id);
  };

  const activeUser = safeContacts.find((u) => u.id === activeChatId);

  return (
    <Card sx={{ display: 'flex', height: 'calc(100vh - 120px)', overflow: 'hidden' }}>
      {/* Sidebar */}
      {(!isMobile || !activeChatId) && (
        <ChatSidebar
          contacts={safeContacts}
          activeChatId={activeChatId}
          onSelectChat={handleSelectChat}
        />
      )}

      {/* Chat Window */}
      {(!isMobile || activeChatId) && (
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
          {isMobile && activeChatId && (
            <Box sx={{ p: 1, borderBottom: 1, borderColor: 'divider', display: 'flex', alignItems: 'center' }}>
               <IconButton onClick={() => setActiveChatId(null)} edge="start">
                 <ArrowBackIcon />
               </IconButton>
               <Typography variant="subtitle1" sx={{ ml: 1 }}>
                 Back
               </Typography>
            </Box>
          )}
          <ChatWindow
            user={activeUser}
            messages={safeMessages}
            loading={loadingMessages}
            onSend={sendMessage}
          />
        </Box>
      )}
    </Card>
  );
};

export default ChatApp;
