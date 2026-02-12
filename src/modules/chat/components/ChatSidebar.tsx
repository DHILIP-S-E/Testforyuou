import React from 'react';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Divider,
  Box,
} from '@mui/material';
import { User } from '../types';

interface ChatSidebarProps {
  contacts: User[];
  activeChatId: string | null;
  onSelectChat: (userId: string) => void;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({ contacts, activeChatId, onSelectChat }) => {
  return (
    <Box sx={{ width: 320, borderRight: 1, borderColor: 'divider', height: '100%', overflow: 'auto' }}>
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" fontWeight="bold">
          Chats
        </Typography>
      </Box>
      <Divider />
      <List>
        {contacts.map((user) => (
          <ListItem key={user.id} disablePadding>
            <ListItemButton
              selected={activeChatId === user.id}
              onClick={() => onSelectChat(user.id)}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: 'primary.light',
                  color: 'primary.main',
                  '&:hover': {
                    backgroundColor: 'primary.light',
                  },
                },
              }}
            >
              <ListItemAvatar>
                <Avatar alt={user.name} src={user.avatar} />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant="subtitle1" fontWeight={activeChatId === user.id ? 600 : 400}>
                    {user.name}
                  </Typography>
                }
                secondary={
                  <Typography variant="caption" color="text.secondary">
                    {user.status}
                  </Typography>
                }
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ChatSidebar;
