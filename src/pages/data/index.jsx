import { Box, Button} from '@mui/material';
import Header from '../../components/Header'
import Datalist from '../../components/Datalist';
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';

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
]

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