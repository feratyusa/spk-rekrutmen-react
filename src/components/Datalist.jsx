import { useState } from "react";
import { ListItemText, ListItemButton, Avatar, ListItemAvatar, IconButton, ListItem } from "@mui/material";
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AccountTreeIcon from '@mui/icons-material/AccountTree';

const Datalist = ({data, type='data'}) => {
    return(
        <ListItemButton
            href={'/'+type+'/'+ data.id}
            sx={{
                borderBottom:2,
                borderColor:'primary.main'
            }}
        >
            <ListItem
                secondaryAction={
                    [
                    <IconButton edge="end" aria-label="delete" sx={{m:1, p:1}} color='error'>
                        <DeleteIcon />
                    </IconButton>, 
                    <IconButton edge="end" aria-label="delete" sx={{m:1, p:1}} color="warning">
                        <EditIcon />
                    </IconButton>
                    ]
                }
            >   
                <ListItemAvatar>
                    <Avatar>
                        {
                            type==='ahp'
                            ? <AccountTreeIcon />
                            : <FolderIcon />
                        }
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={data.name}
                    secondary={data.description}
                />
                
            </ListItem>
        </ListItemButton>
    );
}

export default Datalist;