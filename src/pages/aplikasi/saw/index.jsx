import { Box, Button } from '@mui/material'
import Header from '../../../components/Header'
import Datalist from '../../../components/Datalist'
import ScaleIcon from '@mui/icons-material/Scale';
import SAWDataExample from '../../../global/SAWDataExample';

const saw = SAWDataExample

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