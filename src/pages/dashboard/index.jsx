import { Box, Typography, Grid, Icon } from '@mui/material';
import Header from '../../components/Header'
import ItemCard from '../../components/ItemCard';
import useAuth from '../../utils/useAuth'
import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import getData from '../../utils/handler/data/getData'
import getAHP from '../../utils/handler/ahp/getAHP';
import getSAW from '../../utils/handler/saw/getSAW';

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
        <Grid container spacing={1} alignItems={'center'}>
            <Grid item container xs={8} direction={'column'}>
                <Grid item>
                    <Typography variant='h5' fontWeight={'bold'} mb={1} color='text.primary'>
                        Selamat Datang, {auth.user}
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography color='text.primary'>
                        Untuk mengetahui cara penggunaan <em>Recruiter Assistant</em> dapat dibaca pada halaman <a href="/tutorial">Tutorial</a>
                    </Typography>
                </Grid>
            </Grid>
            <Grid item xs={4}>
                <img src="../../assets/logo/png/logo-no-background.png" 
                    alt="Recruiter Assistant"
                    width={'100%'}
                    />
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