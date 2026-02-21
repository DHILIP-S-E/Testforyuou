import React from 'react';
import { Box, List, ListItem, ListItemButton, ListItemAvatar, ListItemText, Avatar, Typography, Divider, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import type { Chat } from '../types';

interface ChatSidebarProps {
  chats: Chat[];
  selectedChatId?: string;
  onSelectChat: (id: string) => void;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({ chats, selectedChatId, onSelectChat }) => {
  return (
    <Box sx={{ width: 320, borderRight: '1px solid #e0e0e0', display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" fontWeight="bold">Chats</Typography>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search contacts"
          size="small"
          sx={{ mt: 2 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Divider />
      <List sx={{ flexGrow: 1, overflow: 'auto', p: 0 }}>
        {chats.map((chat) => {
          const otherParticipant = chat.participants.find((p) => p.id !== 'current-user') || chat.participants[0];
          const lastMessage = chat.messages[chat.messages.length - 1];

          return (
            <ListItem key={chat.id} disablePadding>
              <ListItemButton
                selected={selectedChatId === chat.id}
                onClick={() => onSelectChat(chat.id)}
              >
                <ListItemAvatar>
                  <Avatar src={otherParticipant.avatar} alt={otherParticipant.name} />
                </ListItemAvatar>
                <ListItemText
                  primary={otherParticipant.name}
                  secondary={
                    <Typography
                      component="span"
                      variant="body2"
                      color="text.secondary"
                      noWrap
                      sx={{ display: 'block' }}
                    >
                      {lastMessage ? lastMessage.content : 'No messages yet'}
                    </Typography>
                  }
                />
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', ml: 1 }}>
                  <Typography variant="caption" color="text.secondary">
                    {lastMessage ? new Date(lastMessage.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                  </Typography>
                </Box>
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

export default ChatSidebar;
