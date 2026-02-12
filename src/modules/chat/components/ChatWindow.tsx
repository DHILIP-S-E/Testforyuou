import React, { useRef, useEffect } from 'react';
import { Box, TextField, Typography, CircularProgress, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { Message, User } from '../types';
import MessageItem from './MessageItem';

interface ChatWindowProps {
  user: User | undefined;
  messages: Message[];
  loading: boolean;
  onSend: (content: string) => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ user, messages, loading, onSend }) => {
  const [content, setContent] = React.useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (content.trim()) {
      onSend(content.trim());
      setContent('');
    }
  };

  if (!user) {
    return (
      <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h6" color="text.secondary">
          Select a contact to start chatting
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider', display: 'flex', alignItems: 'center' }}>
        <Typography variant="h6">{user.name}</Typography>
      </Box>

      {/* Messages */}
      <Box sx={{ flex: 1, p: 2, overflow: 'auto', bgcolor: 'grey.50' }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          messages.map((msg) => (
            <MessageItem key={msg.id} message={msg} />
          ))
        )}
        <div ref={messagesEndRef} />
      </Box>

      {/* Input */}
      <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider', bgcolor: 'background.paper', display: 'flex', gap: 1 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type a message..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleSend();
            }
          }}
          size="small"
        />
        <IconButton
          color="primary"
          onClick={handleSend}
          disabled={!content.trim()}
          aria-label="send message"
        >
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ChatWindow;
