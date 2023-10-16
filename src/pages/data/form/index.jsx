import React, { useState } from "react";
import { styled } from '@mui/material/styles';
import Header from '../../../components/Header'
import CustomInputText from "../../../components/CustomInputText";
import { Box, FormControl, Stack, Divider} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Button from '@mui/material/Button';
import { Form } from "react-router-dom";

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

const DataForm = () => {
    const [file, setFile] = useState('');
    const [fileName, setFileName] = useState('');

    const handleselectedFile = event => {
        setFile(event.target.files[0])
        setFileName(event.target.files[0].name)
    };

    return(
        <Box>
            <Header title={'Data Form'} />
            <Box
                sx={{
                    p:3,
                    flex:1,
                    borderRadius:3,
                    boxShadow:5
                }}
            >
                <form method="post" action="/data/creates" onSubmit={''}>
                    <Stack alignContent={'center'}>
                    <CustomInputText desc='Name'/>
                    <CustomInputText desc='Description'/>
                    <FormControl sx={{mb:2}}>
                        {
                            fileName == '' ? 
                            <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                                <input id='file' type="file" accept=".csv" hidden onChange={handleselectedFile}/>
                                Upload File
                            </Button>
                            : 
                            <Button component="label" variant="outlined" color="success" startIcon={<CloudUploadIcon />}>
                                <input id='file' type="file" accept=".csv" hidden onChange={handleselectedFile}/>
                                {fileName}
                            </Button>
                        }
                    </FormControl>
                    <Divider dark='true'/>
                    <Button type="submit" variant="contained" color="success" sx={{minWidth:"200px", ml:'auto', mr:'auto', mt:2}}>Submit</Button> 
                    </Stack>
                </form>
            </Box>
        </Box>
            
    );
}

export default DataForm;