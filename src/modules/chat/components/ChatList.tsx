import React from 'react';
import {
  List,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  Box,
  Divider,
} from '@mui/material';
import type { Chat } from '../types';

interface ChatListProps {
  chats: Chat[];
  currentChat: Chat | null;
  onSelectChat: (id: string) => void;
}

const ChatList: React.FC<ChatListProps> = ({ chats, currentChat, onSelectChat }) => {
  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', height: '100%', overflowY: 'auto' }}>
      <Box p={2}>
        <Typography variant="h6">Chats</Typography>
      </Box>
      <Divider />
      {chats.map((chat) => (
        <ListItemButton
          key={chat.id}
          selected={currentChat?.id === chat.id}
          onClick={() => onSelectChat(chat.id)}
          alignItems="flex-start"
        >
          <ListItemAvatar>
            <Avatar alt={chat.name} src="/static/images/avatar/1.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary={chat.name}
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {chat.lastMessage ? chat.lastMessage.content : 'Start a conversation'}
                </Typography>
              </React.Fragment>
            }
          />
        </ListItemButton>
      ))}
    </List>
  );
};

export default ChatList;
