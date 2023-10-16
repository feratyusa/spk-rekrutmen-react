import { Box, Typography } from "@mui/material";

const Header = ({title}) => {
    return (
        <Box mb='30px'>
            <Typography
                variant="h5"
                color={"text.primary"}
                fontWeight='bold'
                sx={{ m:'10px'}}
            >
                {title}
            </Typography>
        </Box>
    );
}

export default Header;