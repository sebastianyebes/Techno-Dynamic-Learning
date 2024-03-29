import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from 'hooks/useAuth';
import lionLogo from 'assets/lionlogo.png';

import { AppBar as MuiAppBar } from '@mui/material';
import { Box } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { Button, ListItemIcon, useTheme } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';

const Appbar = () => {
  const { user, logout } = useAuth();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();
  const theme = useTheme();

  const open = Boolean(anchorElUser);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleNavigateToDashboard = () => {
    navigate('/');
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleProfile = () => {
    navigate('/profile');
    handleCloseUserMenu();
  };

  const handleLogout = () => {
    logout();
    handleCloseUserMenu();
  };

  return (
    // TODO: change color to palette color
    <MuiAppBar
      variant='outlined'
      elevation={0}
      position='static'
      sx={{
        background: theme.palette.white.main,
        borderBottom: '1px dashed #e0e0e0'
      }}>
      <Toolbar>
        <Box display='flex' alignItems='center' flexGrow={1}>
          <Box
            onClick={handleNavigateToDashboard}
            display='flex'
            alignItems='center'
            sx={{
              cursor: 'pointer'
            }}>
            <img src={lionLogo} alt='lion logo' width='40' height='40' />
            <Typography
              display={{ xs: 'none', sm: 'flex' }}
              variant='h6'
              component='div'
              sx={{
                ml: 2,
                color: theme.palette.getContrastText(theme.palette.white.main)
              }}>
              Technopreneurship
            </Typography>
          </Box>
        </Box>
        <Box flexGrow={0}>
          <Tooltip title='Open Settings'>
            <Button
              onClick={handleOpenUserMenu}
              size='large'
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup='true'
              aria-expanded={open ? 'true' : undefined}>
              <Typography sx={{ mr: 1 }}>{user?.first_name}</Typography>
              <Avatar>{user?.first_name?.charAt(0).toUpperCase()}</Avatar>
            </Button>
          </Tooltip>
          <Menu
            sx={{
              mt: 4.5
            }}
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            keepMounted
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}>
            {/* TODO: Add Profile Navigation Handling  */}
            <MenuItem onClick={handleProfile}>
              <ListItemIcon>
                <PersonIcon fontSize='small' />
              </ListItemIcon>
              Profile
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon fontSize='small' />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </MuiAppBar>
  );
};

export default Appbar;
