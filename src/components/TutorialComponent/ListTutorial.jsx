import { Box, Typography, Divider, Link } from "@mui/material"

const ListTutorial = () => {
    return(
        <Box width={"100%"} mb={3} p={2}>
            <Divider />
            <Typography mt={2} variant="h5" fontWeight={'bold'}>Daftar Isi</Typography>
            <ol>
                <li>
                    <Link href="/tutorial#perkenalan">
                        <Typography>
                            Perkenalan
                        </Typography>
                    </Link>
                    <ul>
                        <li>
                            <Link href="/tutorial#sistem-pendukung-keputusan">
                                <Typography>
                                    Sistem Pendukung Keputusan
                                </Typography>
                            </Link>
                        </li>
                        <li>
                            <Link href="/tutorial#perkenalan-saw">
                                <Typography>
                                    Simple Additive Weight (SAW)
                                </Typography>    
                            </Link>
                            
                        </li>
                        <li>
                            <Link href="/tutorial#perkenalan-ahp">
                                <Typography>
                                    Analytical Hierarchy Process (AHP)
                                </Typography>
                            </Link>
                        </li>
                    </ul>
                </li>
                <li>
                    <Link href="/tutorial/cara-penggunaan#cara-penggunaan">
                        <Typography>
                            Cara Penggunaan
                        </Typography>
                    </Link>    
                    <ul>
                        <li>
                            <Link href="/tutorial/cara-penggunaan#penggunaan-data">
                                <Typography>
                                    Data
                                </Typography>
                            </Link>
                        </li>
                        <li>
                            <Link href="/tutorial/cara-penggunaan#metode-saw">
                                <Typography>
                                    Metode Simple Additive Weight (SAW)
                                </Typography>    
                            </Link>
                            
                        </li>
                        <li>
                            <Link href="/tutorial/cara-penggunaan#metode-ahp">
                                <Typography>
                                    Metode Analytical Hierarchy Process (AHP)
                                </Typography>
                            </Link>
                        </li>
                    </ul>
                </li>
                <li>
                    <Link href="/tutorial/hasil-metode#hasil-metode">
                        <Typography>
                            Hasil Metode
                        </Typography>
                    </Link>
                </li>
            </ol>
            <Divider variant="middle"/>
        </Box>
    )
}

export default ListTutorial