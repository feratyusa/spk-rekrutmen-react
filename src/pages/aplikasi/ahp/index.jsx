import { Box, Button, List, Divider } from '@mui/material'
import Header from '../../../components/Header'
import Datalist from '../../../components/Datalist'
import AccountTreeIcon from '@mui/icons-material/AccountTree';

const ahp = [
    {
        "id": 1,
        "name": "Example AHP",
        "description": "Example Data",
        "created_at": "2023-04-01"
    },
    {
        "id": 2,
        "name": "AHP Perusahaan Kecantikan",
        "description": "400 Calon Karyawan",
        "created_at": "2023-04-01"
    },
    {
        "id": 3,
        "name": "AHP Perusahaan Bangunan",
        "description": "200 Calon Karyawan",
        "created_at": "2023-05-06"
    },
    {
        "id": 4,
        "name": "AHP Perusahaan Listrik",
        "description": "Pengabdian Semesta",
        "created_at": "2023-10-08"
    }
]

const AHP = () => {
    return (

<Box>
    <Header title={'Analyticial Hierarchy Process'}/>
    <Box mb="20px">
        <Button variant="contained" startIcon={<AccountTreeIcon />} href='/ahp/form' sx={{mb:"10px"}}>
            Tambah AHP
        </Button>
        <Datalist data={ahp} />
    </Box>
</Box>

    );
}

export default AHP;