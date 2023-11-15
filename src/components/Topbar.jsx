import * as React from "react";
import { useState } from "react";
import { styled, useTheme } from '@mui/material/styles';
import { Button, Menu, MenuItem } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Outlet, redirect, useNavigate } from "react-router-dom";
import Sidemenu from "./Sidemenu";
import handleLogout from "../utils/handleLogout";
import useAuth from "../utils/useAuth";

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const TopbarComponents = () => {
    const {auth} = useAuth()
    const settings = ['Profile', 'Logout']
    const navigate = useNavigate()
    const [anchorElUser, setAnchorElUser] = useState();

    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };
    const handleUserMenu = async (setting) => {
      
      if(setting === 'Logout'){
        const { data } = await handleLogout()
        navigate('/login')
      }
      else{
        navigate('/user')
      }
    }

    return(
        <Grid container spacing={2} alignItems={'center'}>
            <Grid item xs={10}>
            <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                }}
            >
                SISTEM PENDUKUNG KEPUTUSAN
            </Typography>
            </Grid>
            <Grid item xs={2}>
              <Box textAlign={'center'}>
                  <Tooltip title="Open settings">
                    <Button onClick={handleOpenUserMenu} 
                      endIcon={<KeyboardArrowDownIcon />} 
                      color={'inherit'}
                    >
                        {auth.user}
                    </Button>
                  </Tooltip>
                  <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                  {settings.map((setting) => (
                      <MenuItem key={setting} name={setting} onClick={(event) => handleUserMenu(setting)} href="/">
                        <Typography textAlign="center">{setting}</Typography>
                      </MenuItem>
                  ))}
                  </Menu>
              </Box>
            </Grid>
        </Grid>
    );
}

const Topbar = () => {
    const theme = useTheme();
    const [open, setOpen] = useState(window.innerWidth < 850 ? false : true);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ display: 'flex' }}>
        <AppBar position="fixed" open={open}>
            <Toolbar>
              <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  edge="start"
                  sx={{ mr: 2, ...(open && { display: 'none' }) }}
              >
                  <MenuIcon />
              </IconButton>
              <TopbarComponents />
            </Toolbar>
        </AppBar>
        <Drawer
            sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
            },
            }}
            variant="persistent"
            anchor="left"
            open={open}
        >
            <DrawerHeader sx={{marginLeft: 5}}>
            <img
                src="/../../assets/logo/png/logo-name-no-background.png" 
                alt="Recruiter Assistant" 
                width={'100%'}
            />
            <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
            </DrawerHeader>
            <Divider />
            <Sidemenu />
        </Drawer>        
        <Main open={open}>
            <DrawerHeader />

            <Outlet />
        </Main>
        </Box>
    );
}

export default Topbar