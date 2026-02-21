import React, { useState } from 'react';
import { Box, TextField, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

interface ChatInputProps {
  onSendMessage: (content: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Box sx={{ p: 2, borderTop: '1px solid #e0e0e0', display: 'flex', alignItems: 'center' }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        size="small"
        sx={{ mr: 1 }}
      />
      <IconButton color="primary" onClick={handleSend} disabled={!message.trim()} aria-label="send">
        <SendIcon />
      </IconButton>
    </Box>
  );
};

export default ChatInput;
