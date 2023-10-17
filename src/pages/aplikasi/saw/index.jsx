import { Box, Button } from '@mui/material'
import Header from '../../../components/Header'
import Datalist from '../../../components/Datalist'
import ScaleIcon from '@mui/icons-material/Scale';

const saw = [
    {
        "id": 1,
        "name": "Example SAW",
        "description": "Example Data",
        "created_at": "2023-08-05"
    },
    {
        "id": 2,
        "name": "SAW Perusahaan Kecantikan",
        "description": "400 Calon Karyawan",
        "created_at": "2023-09-01"
    },
    {
        "id": 3,
        "name": "SAW Perusahaan Bangunan",
        "description": "200 Calon Karyawan",
        "created_at": "2023-10-06"
    },
]

const SAW = () => {
    return (

<Box>
    <Header title={'Simple Additive Weight'}/>
    <Box mb="20px">
        <Button variant="contained" startIcon={<ScaleIcon />} href='/saw/form' sx={{mb:"10px"}}>
            Tambah SAW
        </Button>
        <Datalist data={saw} type={'saw'}/>
    </Box>
</Box>

    );
}

export default SAW;