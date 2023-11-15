import { Box, Typography, Divider, Stack, Table, 
    TableContainer, TableHead, TableRow, TableCell, TableBody, Button, Link, Icon } from "@mui/material"
import { useEffect } from "react"

const ImportanceTable = () => {
    const tablecontent = [
        [1, 'Sama ukuran kepentingannya', 'Dua kriteria memiliki kepentingan yang sama'],
        [3, 'Sedang ukuran kepentingannya', 'Penilaian mendukung satu kriteria dengan yang lainnya'],
        [5, 'Kuat ukuran kepentingannya', 'Penilaian sangat mendukung satu kriteria dengan yang lainnya'],
        [7, 'Sangat kuat ukuran kepentingannya', 'Penilaian sangat mendukung dan dominan satu kriteria dengan yang lainnya'],
        [9, 'Sangat ekstrim ukuran kepentingannya', 'Satu kriteria memiliki tingkatan yang sangat tinggi dibanding dengan kriteria lainnya'],
        ['2,4,6,8', 'Nilai tengah antara dua penilaian yang berdekatan', 'Digunakan saat diperlukannya titik tengah dalam penilaian'],
        ['1/3, 1/5, 1/7, dst.', 'Ukuran kepentingannya dibalik', 'Digunakan untuk membalik pengukuran kepentingan antar 2 kriteria']
    ]
    return(
        <TableContainer sx={{border: 1, borderColor:'primary.main'}}>
            <Table>
                <TableHead>
                    <TableRow sx={{backgroundColor:'primary.light'}}>
                        <TableCell>
                            <Typography fontWeight={'bold'}>Skala</Typography>
                        </TableCell>
                        <TableCell>
                        <Typography fontWeight={'bold'}>Definisi</Typography>
                        </TableCell>
                        <TableCell>
                        <Typography fontWeight={'bold'}>Keterangan</Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody >
                    {tablecontent.map((content, index) => (
                        <TableRow key={index}>
                            <TableCell>
                                {content[0]}
                            </TableCell>
                            <TableCell>
                                {content[1]}
                            </TableCell>
                            <TableCell>
                                {content[2]}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

const PerkenalanContent = () => {
    const saw_equation = "\\[ R_{ij} = \\begin{Bmatrix}\\frac{x_{ij}}{max\\:x_{ij}}\\;,jika\\;jenis\\;atribut\\;\\textbf{benefit} \\\\ \\frac{min\\;x_{ij}}{x_{ij}},jika\\;jenis\\;atribut\\;\\textbf{cost}\\end{Bmatrix} \\]"
    const rij = "\\( R_{ij} \\;= \\) rating kinerja ternormalisasi"
    const max_xij = "\\( max\\:x_{ij} \\;= \\) nilai maksimum dari kolom kriteria"
    const min_xij = "\\( min\\:x_{ij} \\;= \\) nilai minimum dari kolom kriteria"
    const xij = "\\( x_{ij} \\;= \\) nilai baris i dan kolom j"
    const saw_vi = "\\[ V_i \\: = \\: \\sum_{j=1}^{n} W_j \, R_{ij} \\]" 
    const vi = "\\( V_i \; = \\) nilai akhir alternatif"
    const wj = "\\( W_j \; = \\) bobot"
    const ahp_ci = "\\[ CI=\\frac{\\lambda_{total} - n}{n-1} \\]"
    const n = "\\( n =\\) jumlah kriteria"
    const ahp_cr = "\\[ CR = \\frac{CI}{RI} \\]"
    const ci = "\\( CI =\\) indeks konsistensi"
    const cr = "\\( CR = \\) indeks random konsistensi"

    useEffect(() => {
        if(typeof window?.MathJax !== "undefined"){
            window.MathJax.typeset()
        }
    }, [])
    
    return(
        <Box width={"100%"} sx={{p:2}}>
            <Stack spacing={4} mb={3}>
                <div id="perkenalan">
                    <Stack spacing={2}>
                        <Typography variant="h4" fontWeight={'bold'}>1. Perkenalan</Typography>
                        <Typography>
                            <b><span style={{color:"#009688"}}>Recruiter Assistant</span></b> adalah aplikasi yang membantu rekrutmen calon karyawan 
                            berdasarkan data dan kriteria yang diberikan. Aplikasi akan melakukan peranking berdasarkan 
                            nilai bobot yang diberikan pada setiap kriteria calon karyawan dimana akan menjadi rekomendasi 
                            kualitas calon karyawan. <em>Rekruiter</em> dapat menjadikan hasil rekomendasi tersebut sebagai 
                            pertimbangan penyaringan calon karyawan. Aplikasi <b><span style={{color:"#009688"}}>Recruiter Assistant</span></b> menggunakan 
                            metode <b><em>Simple Additive Weight</em> (SAW)</b> dan <b><em>Analytical Hierarchy Process</em> 
                            (AHP)</b> dalam menentukan hasil ranking dari calon-calon karyawan. <em>Rekruiter</em> dapat memilih 
                            di antara kedua metode tersebut dalam perankingan calon karyawan.
                        </Typography>
                    </Stack>
                </div>
                <div id="sistem-pendukung-keputusan">
                    <Stack spacing={2} sx={{paddingLeft:2}}>
                        <Typography variant="h5" fontWeight={'bold'}>1.1 Sistem Pendukung Keputusan</Typography>
                        <Typography>
                            Sistem pendukung keputusan adalah sistem informasi yang dibangun untuk membantu mengambil alternatif 
                            keputusan terhadap masalah yang terstruktur maupun tidak terstruktur dengan menggunakan data dan model. 
                            Sistem Pendukung Keputusan ini berfokus pada penglohan data rekrutmen untuk mendapatkan rekomendasi atau 
                            ranking dari setiap calon karyawan berdasarkan kriteria yang disediakan. Pengolahan data menggunakan 2 
                            metode pengambilan keputusan Simple Additive Weight (SAW) dan Analytical Hierarchy Process. Perbedaan 
                            signifikan di antara kedua metode adalah bagaimana mengidentifikasi bobot dari setiap kriteria dan subkriteria 
                            yang didefinisikan
                        </Typography>
                    </Stack>
                </div>
                <div id="perkenalan-saw">
                    <Stack spacing={2} sx={{paddingLeft:2}}>
                        <Typography variant="h5" fontWeight={'bold'}>1.2 Simple Additive Weight (SAW)</Typography>
                        <Typography>
                            Simple Additive Weighting (SAW) adalah metode pengambilan keputusan dari masalah multikriteria 
                            dan biasa disebut juga metode penjumlahan terbobot. Konsep dasar dari metode SAW adalah mencari 
                            jumlah dari bobot rating kinerja dari setiap alternatif pada semua atribut. Secara garis besar 
                            metode SAW adalah sebagai berikut.
                        </Typography>
                        <ol type="a">
                            <li>
                                <Typography>
                                    Menentukan kriteria-kriteria yang akan dijadikan acuan dalam pengambilan keputusan, yang 
                                    selanjutnya disebut sebagai kriteria.
                                </Typography>
                            </li>
                            <li>
                                <Typography>
                                    Menentukan jenis kriteria dari masing-masing kriteria yang sudah ditentukan.
                                </Typography>
                            </li>
                            <li>
                                <Typography>
                                    Menentukan rating kecocokan setiap alternatif dengan kriteria, dilihat dari 
                                    subkriteria dari setiap kriteria yang dibuat.
                                </Typography>
                            </li>
                            <li>
                                <Typography>
                                    Membuat matriks keputusan ternormalisasi R berdasarkan hasil rating kecocokan dengan 
                                    menggunakan rumus sebagai berikut.
                                </Typography>
                                {saw_equation}
                                <ul>
                                    <li>
                                        {rij}
                                    </li>
                                    <li>
                                        {max_xij}
                                    </li>
                                    <li>
                                        {min_xij}
                                    </li>
                                    <li>
                                        {xij}
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <Typography>
                                    Nilai preferensi untuk setiap alternatif (Vi) dapat dihitung sebagai berikut.
                                </Typography>
                                {saw_vi}
                                <ul>
                                    <li>
                                        {vi}
                                    </li>
                                    <li>
                                        {wj}
                                    </li>
                                    <li>
                                        {rij}
                                    </li>
                                </ul>
                            </li>
                        </ol>
                    </Stack>
                </div>
                <div id="perkenalan-ahp">
                    <Stack spacing={2} sx={{paddingLeft:2}}>
                        <Typography variant="h5" fontWeight={'bold'}>1.3 Analytical Hierarchy Process (AHP)</Typography>
                        <Typography>
                        Analyticial Hierarchy Process adalah model pengambilan keputusan yang membantu 
                        dalam pengambilan keputusan terhadap masalah kompleks. Metode ini dikembangkan oleh 
                        Prof. Lorie Saaty dari Wharton Business School di tahun 1971 sampai 1975. Metode AHP 
                        digunakan dalam mengidentifikasi adanya relevansi terhdap fakta dan hubungan antar kriteria 
                        penentu pengambilan suatu keputusan. Metode ini memiliki tiga tahap proses yang di antara 
                        lain adalah sebagai berikut.
                        </Typography>
                        <ol type="a">
                            <li>
                                <Typography>
                                    Mengidentifikasi dan mengumpulkan tujuan, kriteria, konstrain, dan alternatif 
                                    keputusan pada sebuah hierarki.
                                </Typography>
                            </li>
                            <li>
                                <Typography>
                                    Melakukai evaluasi perbandingan berpasangan (pairwise comparasion) antara satu 
                                    elemen dengan elemen lain pada setiap level hierarki.
                                </Typography>
                            </li>
                            <li>
                            <Typography>
                                Melakukan perpaduan dengan menggunakan algoritma solusi terhadap hasil 
                                perbandingan berpasangan pada setiap level hierarki.
                            </Typography>
                            </li>
                        </ol>
                        <Typography>
                            Dalam melakukan perbandingan berpasangan digunakan skala 1 sampai 9 dimana 
                            mengindikasikan kuatnya preferensi antar dua kriteria yang dibandingkan.
                        </Typography>
                        <ImportanceTable />
                        <Typography>
                            Hasil perbandingan berpasangan memiliki potensi untuk menimbulkan inkonsistensi. Oleh karena itu, diperlukan perhitungan konsistensi sebagai berikut.
                        </Typography>
                        <ol type="a">
                            <li>
                                <Typography>
                                    Menghitung jumlah setiap baris hasil perbandingan setelah dinormalisasi
                                </Typography>
                            </li>
                            <li>
                                <Typography>
                                    Menghitung eigenvalue dengan membagi setipa baris hasil dari nomor 1 dengan banyaknya kriteria.
                                </Typography>
                            </li>
                            <li>
                                <Typography>
                                    Mencari lamda(λ) dengan mengkalikan hasil dari nomor 2 dengan jumlah per kolom dari hasil perbandingan sebelum dinormalisasi dan mendapatkan total lamda(λ).
                                </Typography>
                            </li>
                            <li>
                                <Typography>
                                    Menentukan nilai indeks konsistensi (CI)
                                </Typography>
                                {ahp_ci}
                                <ul>
                                    <li>{n}</li>
                                </ul>
                            </li>
                            <li>
                                <Typography>
                                    Menentukan rasio kriteria (CR) dimana rasio diterima jika CR {'<'} 0.1, jika tidak diterima maka perlu membuat ulang perbandingan berpasangan kriteria
                                </Typography>
                                {ahp_cr}
                                <ul>
                                    <li>{ci}</li>
                                    <li>{cr}</li>
                                </ul>
                            </li>
                        </ol>
                        <Typography>
                            Jika ditemukan perbandingan berpasangan konsisten, maka dapat dihitung nilai prioritas setiap kriteria dan dapat dihitung nilai preferensi setiap calon karyawan
                        </Typography>
                    </Stack>
                </div>
            </Stack>
            <Divider variant="middle"/>
            <Stack direction={'row'} justifyContent={'space-between'} mt={3}>
                <Link></Link>
                <Link href="/tutorial/cara-penggunaan">
                    <Typography variant="h6">2. Cara Penggunaan</Typography>
                </Link>
            </Stack>
        </Box>  
    )
}

export default PerkenalanContent