import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { Message } from '../types';

interface MessageItemProps {
  message: Message;
}

const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
  const isMe = message.senderId === 'me';

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: isMe ? 'flex-end' : 'flex-start',
        mb: 2,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 2,
          maxWidth: '70%',
          backgroundColor: isMe ? 'primary.main' : 'background.paper',
          color: isMe ? 'common.white' : 'text.primary',
          borderRadius: 2,
          borderBottomRightRadius: isMe ? 0 : 2,
          borderBottomLeftRadius: isMe ? 2 : 0,
        }}
      >
        <Typography variant="body1">{message.content}</Typography>
        <Typography
          variant="caption"
          sx={{ display: 'block', mt: 1, opacity: 0.8 }}
        >
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Typography>
      </Paper>
    </Box>
  );
};

export default MessageItem;
