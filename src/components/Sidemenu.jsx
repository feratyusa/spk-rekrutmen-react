import * as React from 'react';
import { List, ListItemIcon, ListItemButton, ListItemText, Collapse } from "@mui/material";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import StorageOutlinedIcon from '@mui/icons-material/StorageOutlined';
import PhoneAndroidOutlinedIcon from '@mui/icons-material/PhoneAndroidOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const Sidemenu = () => {
    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
      setOpen(!open);
    };

    return(
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <ListItemButton href="/dashboard">
        <ListItemIcon>
          <HomeOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
      <ListItemButton href="/data">
        <ListItemIcon>
          <StorageOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Data"/>
      </ListItemButton>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <PhoneAndroidOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Aplikasi" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton href='/saw' sx={{ pl: 4 }}>
            <ListItemText primary="SAW" />
          </ListItemButton>
          <ListItemButton href='/ahp' sx={{ pl: 4 }}>
            <ListItemText primary="AHP" />
          </ListItemButton>
        </List>
      </Collapse>
      <ListItemButton href='/tutorial'>
        <ListItemIcon>
          <HelpOutlineOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Tutorial" />
      </ListItemButton>
    </List>
    );
}

export default Sidemenu;