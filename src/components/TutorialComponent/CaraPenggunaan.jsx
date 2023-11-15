import { Box, Stack, Typography, Link, TableContainer, 
    Table, TableBody, TableRow, TableCell, Divider } from "@mui/material"

const ExampleTable = () => {
    return(
        <TableContainer>
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell><b>Kriteria A</b></TableCell>
                        <TableCell><b>Kriteria B</b></TableCell>
                        <TableCell><b>Kriteria C</b></TableCell>
                        <TableCell><b>Kriteria D</b></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell><b>Kriteria A</b></TableCell>
                        <TableCell>X</TableCell>
                        <TableCell><b>1</b></TableCell>
                        <TableCell><b>2</b></TableCell>
                        <TableCell><b>3</b></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell><b>Kriteria B</b></TableCell>
                        <TableCell>X</TableCell>
                        <TableCell>X</TableCell>
                        <TableCell><b>4</b></TableCell>
                        <TableCell><b>5</b></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell><b>Kriteria C</b></TableCell>
                        <TableCell>X</TableCell>
                        <TableCell>X</TableCell>
                        <TableCell>X</TableCell>
                        <TableCell><b>6</b></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell><b>Kriteria D</b></TableCell>
                        <TableCell>X</TableCell>
                        <TableCell>X</TableCell>
                        <TableCell>X</TableCell>
                        <TableCell>X</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}

const CaraPenggunaan = () => {
    return(
        <Box width={"100%"} p={2}>
            <Stack spacing={4} mb={3}>
                <div id="cara-penggunaan">
                    <Stack spacing={2}>
                        <Typography variant="h4" fontWeight={'bold'}>2. Cara Penggunaan</Typography>
                        <Typography>
                            Pada bagian ini akan dijelaskan bagaimana kriteria data yang dapat diolah aplikasi serta 
                            langkah-langkah menggunakan aplikasi <b><span style={{color:"#009688"}}>Recruiter 
                            Assistant</span></b> dengan metode SAW maupun AHP.
                        </Typography>
                    </Stack>
                </div>
                <div id="penggunaan-data">
                    <Stack spacing={2} paddingLeft={2}>
                        <Typography variant="h5" fontWeight={'bold'}>2.1 Data</Typography>
                        <Typography>
                            Ada beberapa kriteria bentuk data yang perlu dipenuhi sebelum dimasukkan ke dalam aplikasi. 
                            Hal ini karena data tidak bisa diproses secara mentah oleh aplikasi dan perlu mengikuti beberapa 
                            <em>preset</em> yang perlu didefiniskan oleh pengguna. Kriteria tersebut adalah sebagai berikut.
                        </Typography>
                        <ol type="a">
                            <li>
                                Harus memiliki 2 kolom pertama berikut (nama kolom tidak perlu sesuai dengan yang disebutkan di bawah):
                                <ul>
                                    <li><b>ID</b>: kolom ini berupa index/identitas unik setiap baris dimana bisa berupa <b>Nomor Induk Siswa atau lainnya yang sejenis</b></li>
                                    <li><b>Nama</b>: kolom ini berupa keterangan index/identitas dimana bisa berupa <b>nama atau lainnya yang sejenis</b></li>
                                </ul>
                            </li>
                            <li>
                                Minimal memiliki 2 kriteria
                            </li>
                            <li>
                                Isi kolom kriteria berisi berikut:
                                <ul>
                                    <li><b>Nilai</b>: bilangan non-negatif dapat berupa bulat ataupun desimal. Namun, dalam mengidentifikasi subkriteria hanya dapat membandingkan dengan bilangan bulat.</li>
                                    <li><b>Kata</b></li>
                                    <li><b>Kumpulan Kata</b>: setiap kata harus dipisah dengan <em>delimiter</em> koma (,) atau semicolon (;)</li>
                                </ul>
                            </li>
                            <li>
                                Ekstensi file data berupa <b>CSV (.csv)</b>
                            </li>
                        </ol>
                    </Stack>
                </div>
                <div id="metode-saw">
                    <Stack spacing={2} paddingLeft={2}>
                        <Typography variant="h5" fontWeight={'bold'}>2.2 Metode Simple Additive Weight (SAW)</Typography>
                        <Typography variant="h6" fontWeight={'bold'}>a. Membuat SAW Baru</Typography>
                        <Typography>
                            SAW hanya dapat dibuat <b>jika</b> terdapat data. Setelah itu, anda dapat memberikan 
                            nama, deskripsi, dan data yang akan digunakan pada proses SAW. Anda juga  
                            dapat <b>mengganti</b> data yang digunakan dengan menekan tombol edit pada halaman SAW
                        </Typography>
                        <Typography variant="h6" fontWeight={'bold'}>b. Mengidentifikasi Kriteria SAW</Typography>
                        <Typography>
                            Anda dapat menekan tombol <b><span style={{color:"#009688"}}>Buat +</span></b> pada 
                            bagian kriteria untuk mulai mengidentifikasi kriteria. Urutan  dari kriteria yang 
                            ditambahkan <b>harus</b> sesuai dengan kriteria pada <b><span style={{color:"#009688"}}>Data</span></b> berserta 
                            jumlah dari kriterianya. 
                            <ul>
                                <li><b>Nama</b>: nama kriteria (tidak perlu sama dengan di <b><span style={{color:"#009688"}}>Data</span></b>)</li>
                                <li><b>Atribut</b>: Benefit atau Cost</li>
                                <li>
                                    <b>Tipe Subkriteria</b>
                                    <ul>
                                        <li><b>Number</b>: jika isi pada kolom kriteria berupa nilai (bilangan)</li>
                                        <li><b>String</b>: jika isi pada kolom kriteria berupa kata</li>
                                        <li><b>Substring</b>: jika isi pada kolom kriteria berupa kumpulan kata</li>
                                    </ul>
                                </li>
                                <li><b>Bobot</b>: bobot kriteria</li>
                            </ul>
                        </Typography>
                        <Typography variant="h6" fontWeight={'bold'}>b. Mengidentifikasi Sub-kriteria SAW</Typography>
                        <Typography>
                            Sub-kriteria hanya dapat dibuat jika sudah mengidentifikasi kriteria. 
                            Anda dapat menekan tombol <b><span style={{color:"#009688"}}>Buat Crisps +</span></b> pada 
                            bagian kriteria untuk mulai mengidentifikasi sub-kriteria. Maksimal sub-kriteria yang dapat dibuat 
                            adalah <b>9</b>. Tergantukan pada tipe sub-kriteria yang perlu diidentifikasi juga berbeda.
                            <ul>
                                <li>
                                    <b>Tipe Number</b>
                                    <ul>
                                        <li><b>Komparator</b>: komparator yang akan digunakan untuk membandingkan nilai pada setiap baris <b><span style={{color:"#009688"}}>Data</span></b></li>
                                        <li>
                                            <b>Angka</b>: bilangan bulat positif yang digunakan sebagai pembanding. Tergantung pada komparator 
                                            yang dipilih, Angka yang perlu diisi dapat berbeda. Angka 1 harus lebih kecil daripada Angka 2
                                        </li>
                                        <li><b>Bobot</b>: bobot sub-kriteria</li>
                                    </ul>
                                </li>
                                <li>
                                    <b>Tipe String</b>
                                    <ul>
                                        <li><b>Detail</b>: kata yang akan dibandingkan dengan kata setiap baris pada <b><span style={{color:"#009688"}}>Data</span></b></li>
                                        <li><b>Bobot</b>: bobot sub-kriteria</li>
                                    </ul>
                                </li>
                                <li>
                                    <b>Tipe Substring</b>
                                    <ul>
                                        <li>
                                            <b>Detail</b>: kata yang akan dicari pada kumpulan kata setiap baris pada <b><span style={{color:"#009688"}}>Data</span></b>. 
                                            Jika kata terdapat pada kumpulan kata tersebut maka termasuk pada sub-kriteria tersebut.
                                        </li>
                                        <li><b>Bobot</b>: bobot sub-kriteria</li>
                                    </ul>
                                </li>
                            </ul>
                        </Typography>
                        <Typography variant="h6" fontWeight={'bold'}>c. Menjalankan Proses SAW</Typography>
                        <Typography>
                            Setelah semuanya teridentifikasi, proses SAW dapat dijalankan. Hasil proses dapat dijalankan berulang kali. 
                            Hasil proses dapat diunduh pada bagian <b>Result</b>.
                        </Typography>
                    </Stack>
                </div>
                <div id="metode-ahp">
                    <Stack spacing={2} paddingLeft={2}>
                        <Typography variant="h5" fontWeight={'bold'}>2.3 Metode Analytical Hierarchy Process (AHP)</Typography>
                        <Typography variant="h6" fontWeight={'bold'}>a. Membuat AHP Baru</Typography>
                        <Typography>
                            AHP hanya dapat dibuat <b>jika</b> terdapat <b><span style={{color:"#009688"}}>Data</span></b>. 
                            Setelah itu, anda dapat memberikan nama, deskripsi, dan data yang akan digunakan pada proses AHP. 
                            Anda juga dapat <b>mengganti</b> data yang digunakan dengan menekan tombol edit pada halaman AHP
                        </Typography>
                        <Typography variant="h6" fontWeight={'bold'}>b. Mengidentifikasi Kriteria AHP</Typography>
                        <Typography>
                            Anda dapat menekan tombol <b><span style={{color:"#009688"}}>Buat +</span></b> pada 
                            bagian kriteria untuk mulai mengidentifikasi kriteria. Urutan  dari kriteria yang 
                            ditambahkan <b>harus</b> sesuai dengan kriteria pada <b><span style={{color:"#009688"}}>Data</span></b> berserta 
                            jumlah dari kriterianya. 
                            <ul>
                                <li><b>Nama</b>: nama kriteria (tidak perlu sama dengan di <b><span style={{color:"#009688"}}>Data</span></b>)</li>
                                <li>
                                    <b>Tipe Subkriteria</b>
                                    <ul>
                                        <li><b>Number</b>: jika isi pada kolom kriteria berupa nilai (bilangan)</li>
                                        <li><b>String</b>: jika isi pada kolom kriteria berupa kata atau kumpulan kata</li>
                                    </ul>
                                </li>
                            </ul>
                        </Typography>
                        <Typography variant="h6" fontWeight={'bold'}>b. Mengidentifikasi Sub-kriteria AHP</Typography>
                        <Typography>
                            Sub-kriteria hanya dapat dibuat jika sudah mengidentifikasi kriteria. 
                            Anda dapat menekan tombol <b><span style={{color:"#009688"}}>Buat Crisps +</span></b> pada 
                            bagian kriteria untuk mulai mengidentifikasi sub-kriteria. Maksimal sub-kriteria yang dapat dibuat 
                            adalah <b>9</b>. Tergantukan pada tipe sub-kriteria yang perlu diidentifikasi juga berbeda.
                            <ul>
                                <li>
                                    <b>Tipe Number</b>
                                    <ul>
                                        <li><b>Komparator</b>: komparator yang akan digunakan untuk membandingkan nilai pada setiap baris <b><span style={{color:"#009688"}}>Data</span></b></li>
                                        <li>
                                            <b>Angka</b>: bilangan bulat positif yang digunakan sebagai pembanding. Tergantung pada komparator 
                                            yang dipilih, Angka yang perlu diisi dapat berbeda. Angka 1 harus lebih kecil daripada Angka 2
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <b>Tipe String</b>
                                    <ul>
                                        <li>
                                            <b>Detail</b>: kata yang akan dicari pada kumpulan kata setiap baris pada <b><span style={{color:"#009688"}}>Data</span></b>. 
                                            Jika kata terdapat pada kumpulan kata tersebut maka termasuk pada sub-kriteria tersebut.
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </Typography>
                        <Typography variant="h6" fontWeight={'bold'}>c. Mengidentifikasi Skala Kepentingan Kriteria dan Sub-kriteria</Typography>
                        <Typography>
                            Skala kepentingan dapat dibuat setelah mengidentifikasi kriteria ataupun sub-kriteria. 
                            Perbandingan berpasangan dilakukan dengan mengidentifikasi skala kepentingan antara satu kriteria dengan kriteria lain. 
                            Penjelasan skala kepentingan dapat dilihat pada penjelasan <Link href="/tutorial#perkenalan-ahp">Analytical Hierarchy Process</Link>. 
                            Pengisian skala kepentingan tidak perlu dilakukan untuk setiap antar kriteria, hanya perlu beberapa yang diisi dan 
                            sisanya akan dilakukan oleh aplikasi. Sebagai contoh untuk 4 kriteria yang perlu diisi tertera pada tabel berikut.
                        </Typography>
                        <ExampleTable />
                        <Typography>
                            Dari contoh di atas anda hanya perlu mengisi nomor 1 - 6. Untuk membantu pengisian, aplikasi akan memberitahu 
                            posisi kriteria apa dibandingkan dengan kriteria apa. Untuk menambhkan skala kepentingan, anda dapat menekan 
                            tombol <b><span style={{color:"#009688"}}>Buat Skala Kriteria +</span></b> pada bagian skala kriteria 
                            atau <b><span style={{color:"#009688"}}>Buat Skala Sub-kriteria +</span></b> pada baigan skala sub-kriteria
                        </Typography>
                        <Typography variant="h6" fontWeight={'bold'}>d. Menjalankan Proses AHP</Typography>
                        <Typography>
                            Setelah semuanya teridentifikasi, proses AHP dapat dijalankan. Hasil proses dapat dijalankan berulang kali. 
                            Hasil proses dapat diunduh pada bagian <b>Result</b>.
                        </Typography>
                    </Stack>
                </div>
            </Stack>
            <Divider variant="middle"/>
            <Stack direction={'row'} justifyContent={'space-between'} mt={3}>
                <Link href="/tutorial">
                    <Typography variant="h6">1. Perkenalan</Typography>
                </Link>
                <Link href="/tutorial/hasil-metode">
                    <Typography variant="h6">3. Hasil Metode</Typography>
                </Link>
            </Stack>

        </Box>
    )
}

export default CaraPenggunaan