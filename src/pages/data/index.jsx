import { Box, Button} from '@mui/material';
import Header from '../../components/Header'
import Datalist from '../../components/Datalist';
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';
import DataExample from '../../global/DataExample';

const data = DataExample

const Data = () => {
    return (

<Box>
    <Header title={'Data'}/>
    <Box mb="20px">
        <Button variant="contained" startIcon={<CreateNewFolderOutlinedIcon />} href='/data/form' sx={{mb:"10px"}}>
            Tambah Data
        </Button>
        <Datalist data={data}/>
    </Box>
</Box>

    );
}

export default Data;