import React, { useEffect, useRef, useState } from "react"
import getUser from "../../utils/handler/getUser"
import { Paper, Table, TableBody, TableContainer, TableRow, TableCell, Box, Typography, Stack, IconButton, Button } from "@mui/material"
import Header from "../../components/Header"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
    const user = useRef(null)
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        Promise.all([getUser()])
            .then(function([response]){
                console.log(response)
                user.current = response.data
                setLoading(false)
            }).catch(function([error]){
                console.log(error.config)
            })
    }, [])

    function navigateBack(){
        navigate('/dashboard')
    }
    
    return(
        loading ? '' :
        <Box>
            <Stack direction={'row'} spacing={2} sx={{mb:2}}>
                <IconButton aria-label="back" size="medium" onClick={navigateBack}>
                    <ArrowBackIcon fontSize="inherit"/>
                </IconButton>
                <Header title={'User Details'}/>
            </Stack>
            <Paper>  
                <TableContainer>
                    <Table sx={{width:'100%', mb:3}}>
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    <Typography fontWeight={'bold'}>
                                        Nama
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    {user.current?.name}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <Typography fontWeight={'bold'}>
                                        Username
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    {user.current.username}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <Typography fontWeight={'bold'}>
                                        Email
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    {user.current.email}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <Typography fontWeight={'bold'}>
                                        Password
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Button variant="contained" href="/user/change-password">
                                        Ubah Password
                                    </Button>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    )

}

export default UserProfile