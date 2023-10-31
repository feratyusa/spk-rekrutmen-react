import { Box, Typography, Grid } from '@mui/material';
import Header from '../../components/Header'
import ItemCard from '../../components/ItemCard';
import useAuth from '../../utils/useAuth'
import getData from '../../utils/handler/getData'
import getAHP from '../../utils/handler/getAHP';
import getSAW from '../../utils/handler/getSAW';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';

const Dashboard = () => {
    const {auth} = useAuth()
    const [loading, setLoading] = useState(true)
    const jumlahData = useRef(0)
    const jumlahSAW = useRef(0)
    const jumlahAHP = useRef(0)
    
    useEffect(() => {
        Promise.all([getData(), getSAW(), getAHP()])
            .then(function([data, saw, ahp]){
                jumlahData.current = data.data.length ? data.data.length : 0
                jumlahSAW.current = saw.data.length ? saw.data.length : 0
                jumlahAHP.current = ahp.data.length ? ahp.data.length : 0
                setLoading(false)
            })
    }, [loading])
    
    return (
        loading ? '' :

<Box>
    <Header title={'Dashboard'}/>
    <Box sx={{
        p:3,
        mb:'20px',
        boxShadow:10,
        borderRadius:3,
        borderTop:3,
        borderBottom:3,
        borderColor:'primary.main'
    }}>
        <Grid container spacing={1}>
            <Grid item container xs={8} direction={'column'} justifyContent={'center'}>
                <Grid item>
                    <Typography variant='h5' fontWeight={'bold'} mb={1} color='text.primary'>
                        Selamat datang, {auth.user}
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography color='text.primary'>
                        Untuk mengetahui cara penggunaan Auto Recruiter dapat dibaca pada halaman <a href="/tutorial">Tutorial</a>
                    </Typography>
                </Grid>
            </Grid>
            <Grid item xs={4}>
                <img src="../../assets/logo/png/logo-no-background.png" alt="" width={'300px'}/>
            </Grid>
        </Grid>
    </Box>
    <Box>
    <Grid container>
        <Grid item xs={4}>
            <ItemCard title={'Jumlah Data'} subtitle={jumlahData.current}/>
        </Grid>
        <Grid item xs={4}>
            <ItemCard title={'Jumlah SAW'} subtitle={jumlahSAW.current}/>
        </Grid>
        <Grid item xs={4}>
            <ItemCard title={'Jumlah AHP'} subtitle={jumlahAHP.current}/>
        </Grid>
    </Grid>
    </Box>
</Box>

    );
}

export default Dashboard;