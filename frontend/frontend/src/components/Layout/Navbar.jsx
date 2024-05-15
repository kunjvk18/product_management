import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createUser, getAllUsers, logout } from '../../store/slices/authSlice';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@material-ui/core';
import { Menu as MenuIcon } from "@mui/icons-material";
import CreateUser from '../User/CreateUser';
import { useNavigate } from 'react-router-dom';
import UserTable from '../User/User';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  menu: {
    zIndex: 1000, // Add a high z-index value
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user,users, isLoading, error } = useSelector((state) => state.auth);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openNewUserDialog, setOpenNewUserDialog] = useState(false);
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);

  useEffect(() => {
    if (user && user.role === 'admin') {
        dispatch(getAllUsers())
    }
}, [user])

  const handleOpenUserDialog = () => {
    setIsUserDialogOpen(true);
  };

  const handleCloseUserDialog = () => {
    setIsUserDialogOpen(false);
  };


  const isMenuOpen = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login')
  };

  const handleOpenNewUserDialog = () => {
    setOpenNewUserDialog(true);
  };

  const handleCloseNewUserDialog = () => {
    setOpenNewUserDialog(false);
  };

  const renderMenu = (
    <>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={handleMenuClose}
        classes={{ paper: classes.menu }} // Apply the menu styles
      >
        {user && user.role === 'admin' &&
          <>
            <MenuItem onClick={handleOpenNewUserDialog}>Create New User</MenuItem>
            <MenuItem onClick={handleOpenUserDialog}>Users</MenuItem>
          </>}
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
      <Dialog open={isUserDialogOpen} onClose={handleCloseUserDialog}>
        <DialogTitle>Users</DialogTitle>
        <DialogContent>
          <UserTable users={users} />
        </DialogContent>
      </Dialog>
    </>
  );

  return <>
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Product Management
          </Typography>

          {!!isAuthenticated && <div>
            <IconButton
              edge="end"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={handleMenuOpen}
            >
              <MenuIcon />
            </IconButton>
            {renderMenu}
          </div>}

        </Toolbar>
      </AppBar>
      <CreateUser
        open={openNewUserDialog}
        onClose={handleCloseNewUserDialog}
      />
      {error && <Typography color="error">{error}</Typography>}
    </div>
    {!!isLoading && <CircularProgress />}
  </>
};

export default Navbar;