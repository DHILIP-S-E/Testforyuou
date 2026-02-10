import React from 'react';
import { AppBar, Toolbar, IconButton, Box, Badge, Avatar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';

interface HeaderProps {
  toggleMobileSidebar: () => void;
  sx?: any;
}

const Header: React.FC<HeaderProps> = ({ toggleMobileSidebar, sx }) => {
  return (
    <AppBar position="fixed" elevation={0} color="default" sx={sx}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleMobileSidebar}
          sx={{
            display: {
              lg: 'none',
              xs: 'inline',
            },
          }}
        >
          <MenuIcon />
        </IconButton>

        <Box flexGrow={1} />

        <IconButton size="large" aria-label="show 4 new notifications" color="inherit">
          <Badge badgeContent={4} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <IconButton
          size="large"
          edge="end"
          aria-label="account of current user"
          aria-haspopup="true"
          color="inherit"
        >
          <Avatar sx={{ width: 35, height: 35 }}>
            <PersonIcon />
          </Avatar>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
