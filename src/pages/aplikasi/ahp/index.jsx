import { Box, Button, List } from '@mui/material'
import Header from '../../../components/Header'
import Datalist from '../../../components/Datalist'
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined'

const ahp = [
    {
        "id": 1,
        "name": "Example AHP",
        "description": "Example Data"
    },
    {
        "id": 2,
        "name": "AHP Perusahaan Kecantikan",
        "description": "400 Calon Karyawan"
    }
]

const AHP = () => {
    return (

<Box>
    <Header title={'Analyticial Hierarchy Process'}/>
    <Box mb="20px">
        <Button variant="contained" startIcon={<CreateNewFolderOutlinedIcon />} href='/ahp/form'>
            Tambah AHP
        </Button>
        <List>
            <Datalist data={ahp[0]} type='ahp'/>
            <Datalist data={ahp[1]} type='ahp'/>
        </List>
    </Box>
</Box>

    );
}

export default AHP;