import { Box, Stack, Typography, Link, Divider } from "@mui/material"

const HasilMetode = () => {
    return(
        <Box width={'100%'} p={2}>
            <Stack spacing={4} mb={3}>
                <div id="hasil-metode">
                    <Stack spacing={2}>
                        <Typography variant="h4" fontWeight={'bold'}>3. Hasil Metode</Typography>
                        <Typography>
                            Hasil proses SAW ataupun AHP akan berupa file <b>.csv</b> yang dapat diunduh 
                            melalui aplikasi. Hasil proses akan memiliki kolom yang sama 
                            dengan <b><span style={{color:"#009688"}}>Data</span></b> ditambah dengan <b>kolom
                            Total</b> dan <b>kolom Ranking</b>.
                        </Typography>
                        <ul>
                            <li>
                                <b>Total</b>: Total nilai preferensi berdasarkan kriteria dan sub-kriteria yang telah 
                                didefinisikan.
                            </li>
                            <li>
                                <b>Ranking</b>: Ranking berdasarkan nilai total dari terbesar ke terkecil.
                            </li>
                        </ul>
                        <Typography>
                            Hasil proses dapat diulang dengan menggunakan sub-kriteria baru sehingga <em>rekruiter</em> dapat 
                            mencoba-coba dengan definisi yang berbeda untuk hasil yang juga dapat berbeda.
                        </Typography>
                    </Stack>

                </div>

            </Stack>
            <Divider variant="middle"/>
            <Stack direction={'row'} justifyContent={'space-between'} mt={3}>
                <Link href="/tutorial/cara-penggunaan">
                    <Typography variant="h6">2. Cara Penggunaan</Typography>
                </Link>
                <Link>
                </Link>
            </Stack>

        </Box>
    )
}

export default HasilMetode