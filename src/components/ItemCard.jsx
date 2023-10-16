import React from "react";
import { Box, Typography } from "@mui/material";

const ItemCard = ({title, subtitle}) => {
    return (
        <Box
        sx={{
            m:2,
            p:3,
            boxShadow:5,
            borderRadius:5,
            borderLeft:5,
            borderColor:'primary.main'
        }}
    >
        <Typography variant='h6'>
            {title}
        </Typography>
        <Typography>
            {subtitle}
        </Typography>
    </Box>
    );
}

export default ItemCard;