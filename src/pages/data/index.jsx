import { Box, Button, Stack} from '@mui/material';
import Header from '../../components/Header'
import Datalist from '../../components/Datalist';
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';
import FilePresentOutlinedIcon from '@mui/icons-material/FilePresentOutlined';
import getData from '../../utils/handler/data/getData';
import { useState } from 'react';
import { useEffect } from 'react';

const Data = () => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])

    useEffect(() => {
      Promise.all([getData()])
        .then(function([data]){
          setData(data.data)
          setLoading(false)
        })
    }, [loading])
    
    return (
        loading ? '' :

<Box>
    <Header title={'Data'}/>
    <Box mb="20px">
        <Stack direction={'row'} spacing={3}>
            <Button variant="contained" startIcon={<CreateNewFolderOutlinedIcon />} href='/data/form' sx={{mb:"10px"}}>
                Tambah Data
            </Button>
            <Button 
                variant="contained" 
                startIcon={<FilePresentOutlinedIcon />} 
                color='info'
                href='../../assets/template/Template_Data_RecruiterAssistant.xlsx' 
                sx={{mb:"10px"}}
            >
                Template Data
            </Button>
        </Stack>
        <Datalist data={data} type={'data'}/>
    </Box>
</Box>

    );
}

export default Data;