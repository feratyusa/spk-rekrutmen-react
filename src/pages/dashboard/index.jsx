import { Box, Typography, Grid } from '@mui/material';
import Header from '../../components/Header'
import ItemCard from '../../components/ItemCard';

const Dashboard = () => {
    return (

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
                    <Typography variant='h5' fontWeight={'bold'} mb={1}>
                        Selamat datang, Pengguna
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography>
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
            <ItemCard title={'Jumlah Data'} subtitle={'3'}/>
        </Grid>
        <Grid item xs={4}>
            <ItemCard title={'Jumlah SAW'} subtitle={'5'}/>
        </Grid>
        <Grid item xs={4}>
            <ItemCard title={'Jumlah AHP'} subtitle={'7'}/>
        </Grid>
    </Grid>
    </Box>
</Box>

    );
}

export default Dashboard;