import { useRef, useEffect, useState } from 'react';
import { Box, Button } from '@mui/material'
import Header from '../../../components/Header'
import Datalist from '../../../components/Datalist'
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import getAHP from '../../../utils/handler/ahp/getAHP';
import getData from '../../../utils/handler/data/getData';

const AHP = () => {
    const [ahp, setAHP] = useState()
    const counter = useRef(0)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        Promise.all([getAHP(), getData()])
            .then(function([response, data]){                
                setAHP(response.data)
                counter.current = data.data.length ? data.data.length : 0
            }).catch(function([error]){
                console.log(error.config)
            }).finally(function(){
                setLoading(false)
            })
    }, [])
    
    return (
        loading ? '' :
        <Box>
            <Header title={'Analyticial Hierarchy Process'}/>
            <Box mb="20px">
                <Button 
                    variant="contained" 
                    startIcon={<AccountTreeIcon />} 
                    href='/ahp/form' 
                    sx={{mb:"10px"}}
                    disabled={counter.current === 0 ? true : false}
                >
                    Tambah AHP
                </Button>
                <Datalist data={ahp} type='ahp'/>
            </Box>
        </Box>
    );
}

export default AHP;