import { useRef, useEffect, useState } from 'react';
import { Box, Button } from '@mui/material'
import Header from '../../../components/Header'
import Datalist from '../../../components/Datalist'
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import getAHP from '../../../utils/handler/ahp/getAHP';

const AHP = () => {
    const data = useRef(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        Promise.all([getAHP()])
            .then(function([response]){
                console.log(response.data)
                data.current = response.data
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
                <Button variant="contained" startIcon={<AccountTreeIcon />} href='/ahp/form' sx={{mb:"10px"}}>
                    Tambah AHP
                </Button>
                <Datalist data={data.current} type='ahp'/>
            </Box>
        </Box>
    );
}

export default AHP;