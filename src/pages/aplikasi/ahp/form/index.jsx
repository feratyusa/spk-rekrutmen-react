import React from "react";
import Header from '../../../../components/Header'
import CustomInputText from "../../../../components/CustomInputText";
import { Box, Stack, Divider, Autocomplete, TextField} from '@mui/material';
import Button from '@mui/material/Button';

const data = [
    {
        "id": 1,
        "name": "Mini Dummy",
        "description": "Example Data",
        "created_at": "2023-04-01"
    },
    {
        "id": 2,
        "name": "Data Perusahaan Kecantikan",
        "description": "400 Calon Karyawan",
        "created_at": "2023-04-10"
    }
];

const AHPForm = () => {
    return(
        <Box>
            <Header title={'AHP Form'} />
            <Box
                sx={{
                    p:3,
                    flex:1,
                    borderRadius:3,
                    boxShadow:5
                }}
            >
                <form method="post" action="/ahp/create" onSubmit={''}>
                    <Stack alignContent={'center'}>
                    <CustomInputText desc='Name'/>
                    <CustomInputText desc='Description'/>
                    <Autocomplete
                        id="data"
                        options={data}
                        getOptionLabel={(option) => `${option.name} (${option.created_at})`}
                        renderInput={(params) => <TextField {...params} label="Data" />}
                    />
                    <Divider dark='true'/>
                    <Button type="submit" variant="contained" color="success" sx={{minWidth:"200px", ml:'auto', mr:'auto', mt:2}}>Submit</Button> 
                    </Stack>
                </form>
            </Box>
        </Box>
            
    );
}

export default AHPForm;