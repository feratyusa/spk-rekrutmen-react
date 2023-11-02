import { Box, Button} from '@mui/material';
import Header from '../../components/Header'
import Datalist from '../../components/Datalist';
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';
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
        <Button variant="contained" startIcon={<CreateNewFolderOutlinedIcon />} href='/data/form' sx={{mb:"10px"}}>
            Tambah Data
        </Button>
        <Datalist data={data} type={'data'}/>
    </Box>
</Box>

    );
}

export default Data;