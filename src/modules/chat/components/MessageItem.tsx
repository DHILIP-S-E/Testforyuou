import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import type { Message } from '../types';

interface MessageItemProps {
  message: Message;
  isMe: boolean;
}

const MessageItem: React.FC<MessageItemProps> = ({ message, isMe }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: isMe ? 'flex-end' : 'flex-start',
        mb: 2,
      }}
    >
      <Paper
        variant="outlined"
        sx={{
          p: 2,
          backgroundColor: isMe ? 'primary.light' : 'grey.100',
          color: isMe ? 'primary.contrastText' : 'text.primary',
          maxWidth: '70%',
          borderRadius: 2,
        }}
      >
        <Typography variant="body1">{message.content}</Typography>
        <Typography variant="caption" sx={{ display: 'block', textAlign: 'right', mt: 1 }}>
          {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Typography>
      </Paper>
    </Box>
  );
};

export default MessageItem;
