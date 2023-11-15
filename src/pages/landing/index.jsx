import { Box, Button, Fade, Grid, Slide, Stack, Typography } from "@mui/material"
import { useEffect } from "react"
import useAuth from "../../utils/useAuth"
import { useNavigate } from "react-router-dom"
import axios from "../../utils/axios"

const LandingPage = () => {
    const { auth } = useAuth()    
    const navigate = useNavigate()

    useEffect(() => {
        if(auth?.login === true){
            navigate('/dashboard')
        }
        else{
            axios.get('/api/user/details', {
                withCredentials: true
            }).then(function(response){
                navigate('/dashboard')
            }).catch(function(error){
                // Do nothing
            })
        }
    }, [])

    return(
        <Box
            height={'100vh'}
            width={'100%'}
            sx={{
                backgroundColor: 'primary.main'
            }}
            overflow={'hidden'}
        >
            <Slide direction="down" in>
                <svg style={{position:'absolute', }} xmlns="http://www.w3.org/2000/svg" viewBox="0 50 1440 320">
                    <path fill="#FFFFFF" fill-opacity="1" d="M0,64L40,74.7C80,85,160,107,240,96C320,85,400,43,480,53.3C560,64,640,128,720,138.7C800,149,880,107,960,101.3C1040,96,1120,128,1200,138.7C1280,149,1360,139,1400,133.3L1440,128L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"></path>
                </svg>
            </Slide>
            
            
            <Fade in={true} timeout={2000}>
            <Box
                maxHeight={'100%'}
                width={'100%'}
                paddingTop={5}
                paddingLeft={5}
                paddingRight={5}
            >
                <Grid container spacing={1} alignItems={'center'}>
                    <Grid item xs={6}>
                        <img src="../../assets/logo/png/logo-white.png" 
                            alt="Recruiter Assistant"
                            width={'100%'}
                            />
                    </Grid>
                    <Grid item container xs={6} direction={'column'}>
                        <Grid item>
                            <Stack spacing={3} mb={3}>
                                <Typography variant="h3" color={'#ffffff'} fontWeight={'bold'}>RECRUITER ASSISTANT</Typography>
                                <Typography variant="h5" color={'#ffffff'}>
                                    Sistem Pendukung Keputusan untuk Rekrutmen Calon Karyawan menggunakan 
                                    Metode <b>Simple Additive Weight</b> dan <b>Analytical Hierarchy Process</b>
                                </Typography>
                            </Stack>
                        </Grid>
                        <Grid item>
                            <Stack direction={'row'} spacing={5}>
                                <Button variant="contained" color="secondary" sx={{boxShadow: 10}} href="/login">
                                    Login
                                </Button>
                                <Button variant="outlined" color="secondary" sx={{boxShadow: 10}} href="/register">
                                    Register
                                </Button>

                            </Stack>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
            </Fade>
        </Box>
                        
    )
}

export default LandingPage