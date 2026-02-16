import React from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useMediaQuery,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const drawerWidth = 270;

interface SidebarProps {
  isMobileSidebarOpen: boolean;
  onSidebarClose: () => void;
  isSidebarOpen: boolean;
}

const SidebarItems = [
  {
    navlabel: true,
    subheader: 'Home',
  },
  {
    id: '1',
    title: 'Dashboard',
    icon: DashboardIcon,
    href: '/dashboard',
  },
  {
    navlabel: true,
    subheader: 'Apps',
  },
  {
    id: '2',
    title: 'Users',
    icon: PeopleIcon,
    href: '/users',
  },
  {
    id: '3',
    title: 'eCommerce',
    icon: ShoppingCartIcon,
    href: '/ecommerce/products',
  },
];

const Sidebar: React.FC<SidebarProps> = ({ isMobileSidebarOpen, onSidebarClose, isSidebarOpen }) => {
  const { pathname } = useLocation();
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up('lg'));

  const SidebarContent = (
    <Box sx={{ height: '100%', px: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', py: 2 }}>
        <Typography variant="h4" fontWeight="bold" color="primary">
          Modernize
        </Typography>
      </Box>
      <List sx={{ pt: 0 }} component="div">
        {SidebarItems.map((item) => {
          if (item.navlabel) {
            return (
              <Typography
                key={item.subheader}
                variant="subtitle2"
                color="textSecondary"
                sx={{
                  mt: 3,
                  mb: 1,
                  ml: 2,
                  textTransform: 'uppercase',
                  fontWeight: 'bold',
                }}
              >
                {item.subheader}
              </Typography>
            );
          }

          const Icon = item.icon;
          const isSelected = item.href ? pathname.startsWith(item.href) : false;

          return (
            <ListItem key={item.id} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                component={NavLink}
                to={item.href || '#'}
                selected={isSelected}
                onClick={!lgUp ? onSidebarClose : undefined}
                sx={{
                  mb: 1,
                  borderRadius: '8px',
                  backgroundColor: isSelected ? 'primary.light' : 'transparent',
                  color: isSelected ? 'primary.main' : 'inherit',
                  '&:hover': {
                    backgroundColor: isSelected ? 'primary.light' : 'action.hover',
                    color: isSelected ? 'primary.main' : 'inherit',
                  },
                  '&.active': {
                    backgroundColor: 'primary.light',
                    color: 'primary.main',
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: '36px',
                    p: '3px 0',
                    color: isSelected ? 'primary.main' : 'inherit',
                  }}
                >
                  {Icon && <Icon />}
                </ListItemIcon>
                <ListItemText
                  primary={item.title}
                  primaryTypographyProps={{
                    fontWeight: isSelected ? '600' : '400',
                    fontSize: '0.875rem',
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open={isSidebarOpen}
        variant="permanent"
        PaperProps={{
          sx: {
            width: drawerWidth,
            boxSizing: 'border-box',
            border: '0',
            boxShadow: '0px 7px 30px 0px rgba(90, 114, 123, 0.11)',
          },
        }}
      >
        {SidebarContent}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      open={isMobileSidebarOpen}
      onClose={onSidebarClose}
      variant="temporary"
      PaperProps={{
        sx: {
          width: drawerWidth,
          boxShadow: (theme) => theme.shadows[8],
        },
      }}
    >
      {SidebarContent}
    </Drawer>
  );
};

export default Sidebar;
