import { useState, useEffect, useRef } from 'react';
import { Box, Button } from '@mui/material'
import ScaleIcon from '@mui/icons-material/Scale';
import Header from '../../../components/Header'
import Datalist from '../../../components/Datalist'
import getSAW from '../../../utils/handler/saw/getSAW';
import getData from '../../../utils/handler/data/getData';

const SAW = () => {
    const [saw, setSAW] = useState()
    const [loading, setLoading] = useState(true)
    const counter = useRef(0)

    useEffect(() => {
      Promise.all([getSAW(), getData()])
        .then(function([saw, data]){
            console.log(saw.data)
            console.log(data.data)
            counter.current = data.data.length ? data.data.length : 0
            setSAW(saw.data)
            setLoading(false)
        })
    }, [])
    
    return (
        loading ? '' :

<Box>
    <Header title={'Simple Additive Weight'}/>
    <Box mb="20px">
        <Button 
            variant="contained" 
            startIcon={<ScaleIcon />} 
            href='/saw/form' sx={{mb:"10px"}}
            disabled={counter.current === 0 ? true : false}
        >
            Tambah SAW
        </Button>
        <Datalist data={saw} type={'saw'}/>
    </Box>
</Box>

    );
}

export default SAW;