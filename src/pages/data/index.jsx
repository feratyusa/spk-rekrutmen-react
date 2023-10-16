import { Box, List, Button, Typography} from '@mui/material';
import Header from '../../components/Header'
import Datalist from '../../components/Datalist';
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';

const data = [
    {
        "name": "Mini Dummy",
        "description": "Example Data"
    },
    {
        "name": "Data Perusahaan Kecantikan",
        "description": "400 Calon Karyawan"
    }
]

const Data = () => {
    return (

<Box>
    <Header title={'Data'}/>
    <Box
        
    >
        <Button variant="contained" startIcon={<CreateNewFolderOutlinedIcon />} href='/data/form'>
            Tambah Data
        </Button>
        <List>
            <Datalist data={data[0]}/>
            <Datalist data={data[1]}/>
        </List>
    </Box>
</Box>

    );
}

export default Data;