import { ListItemText, ListItemButton, Avatar, ListItemAvatar, IconButton, ListItem } from "@mui/material";
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

const Datalist = ({data}) => {
    return(
        <ListItemButton sx={{
            borderBottom:2,
            borderColor:'primary.main'
        }}>
            <ListItem
                secondaryAction={
                    <IconButton edge="end" aria-label="delete">
                        <DeleteOutlinedIcon />
                    </IconButton>
                }
            >
                
                <ListItemAvatar>
                    <Avatar>
                        <FolderOutlinedIcon />
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