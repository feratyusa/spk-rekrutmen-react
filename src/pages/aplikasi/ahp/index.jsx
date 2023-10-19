import { Box, Button } from '@mui/material'
import Header from '../../../components/Header'
import Datalist from '../../../components/Datalist'
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import AHPDataExample from '../../../global/AHPDataExample';

const data = AHPDataExample

const AHP = () => {
    return (

<Box>
    <Header title={'Analyticial Hierarchy Process'}/>
    <Box mb="20px">
        <Button variant="contained" startIcon={<AccountTreeIcon />} href='/ahp/form' sx={{mb:"10px"}}>
            Tambah AHP
        </Button>
        <Datalist data={data} type='ahp'/>
    </Box>
</Box>

    );
}

export default AHP;