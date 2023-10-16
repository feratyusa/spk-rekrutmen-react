import { FormControl, FormLabel, OutlinedInput } from "@mui/material";

const CustomInputText = ({desc}) => {
    return(
        <FormControl fullWidth sx={{mb:2}}>
            <FormLabel id={desc.toLowerCase()+'-label'}>{desc}</FormLabel>
            <OutlinedInput
                id={desc.toLowerCase()}
                type="text"
                aria-describedby={'outlined-'+ desc.toLowerCase()}
                inputProps={{
                    'aria-label': {desc},
                }}
            />
        </FormControl>
    );
}

export default CustomInputText;