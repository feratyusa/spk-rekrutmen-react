import * as React from "react";
import { useState } from "react";
import { Box, MenuItem, Menu, Tooltip, Avatar, IconButton, Typography, Grid } from "@mui/material";

const Topbar = () => {
    const settings = ['Profile', 'Logout']
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };

    return(
        <Grid container spacing={2} alignItems={'center'}>
            <Grid item xs={11}>
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
            <Grid item xs={1}>
            <Box textAlign={'center'}>
                <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu}>
                    <Avatar />
                </IconButton>
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
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                ))}
                </Menu>
            </Box>
            </Grid>
        </Grid>
    );

}

export default Topbar;