import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import Sidebar from './Sidebar';
import Header from './Header';

const drawerWidth = 270;

const FullLayout: React.FC = () => {
  const [isSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        isMobileSidebarOpen={isMobileSidebarOpen}
        onSidebarClose={() => setMobileSidebarOpen(false)}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { lg: `calc(100% - ${drawerWidth}px)` },
          padding: 3,
          backgroundColor: 'background.default',
        }}
      >
        <Header toggleMobileSidebar={() => setMobileSidebarOpen(true)} />
        <Container
          maxWidth="lg"
          sx={{
            pt: '80px',
            maxWidth: '1200px !important',
          }}
        >
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
};

export default FullLayout;
