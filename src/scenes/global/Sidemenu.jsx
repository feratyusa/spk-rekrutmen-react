
import * as React from 'react';
import { Sidebar, Menu, MenuItem, SubMenu, sidebarClasses} from 'react-pro-sidebar';
import { Avatar, Typography, menuItemClasses, Box} from '@mui/material';
import { useState } from 'react';

const Sidemenu = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const theme = 'light'

  const themes = {
    light: {
      sidebar: {
        backgroundColor: '#3f51b5',
        color: '#8c97d3',
      },
      menu: { 
        menuContent: '#fbfcfd',
        icon: '#0098e5',
        hover: {
          backgroundColor: '#c5e4ff',
          color: '#44596e',
        },
        disabled: {
          color: '#9fb6cf',
        },
      },
    }
  };

  return (

<Sidebar rootStyles={{
    [`.${sidebarClasses.container}`]:{
      backgroundColor: themes[theme].sidebar.color
    },
}}>
  <Menu>
    <Box 
      textAlign='center'
      sx={{
        marginTop:3,
        marginBottom:3
      }}
    >
      <img 
        src="../../assets/logo/svg/logo-white-no-background.svg" 
        alt="AutoRecruiter"
        width='200px'
      />
    </Box>
    <MenuItem> Dashboard </MenuItem>
    <MenuItem> Data </MenuItem>
    <SubMenu label="Aplikasi">
      <MenuItem> SAW </MenuItem>
      <MenuItem> AHP </MenuItem>
    </SubMenu>
    <MenuItem> Tutorial </MenuItem>
  </Menu>
</Sidebar>

    );
}

export default Sidemenu;
