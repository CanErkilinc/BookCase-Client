import React, { useState } from 'react';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const UyeKayit = () => {
    const [userData, setUserData] = useState({
        kullaniciAdi: '',
        sifre: '',
        sifreTekrar: '',
        uyeDogumTarihi: null,
        guvenlikSoruTipi: '',
        guvenlikYanit: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value
        });
    };

    const handleSelectChange = (e) => {
        setUserData({
            ...userData,
            guvenlikSoruTipi: e.target.value
        });
    };

    const handleDateChange = (date) => {
        setUserData({
            ...userData,
            dogumTarihi: date
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/uyelikBilgileri/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
            if (response.ok) {
                console.log('Üye eklendi!');
            } else {
                console.error('Üye eklenirken bir hata oluştu.');
            }
        } catch (error) {
            console.error('İstek yapılırken bir hata oluştu:', error);
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ padding: 3 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Üye Kayıt
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField
                            id="kullaniciAdi"
                            label="Kullanıcı Adı"
                            variant="outlined"
                            value={userData.kullaniciAdi}
                            onChange={handleChange}
                            name="kullaniciAdi"
                        />
                        <TextField
                            id="sifre"
                            label="Şifre"
                            variant="filled"
                            type="password"
                            value={userData.sifre}
                            onChange={handleChange}
                            name="sifre"
                        />
                        <TextField
                            id="sifreTekrar"
                            label="Şifre Tekrar"
                            variant="outlined"
                            type="password"
                            value={userData.sifreTekrar}
                            onChange={handleChange}
                            name="sifreTekrar"
                        />
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Doğum Tarihi"
                                value={userData.uyeDogumTarihi}
                                onChange={handleDateChange}
                                renderInput={(params) => <TextField {...params} variant="filled" />}
                            />
                        </LocalizationProvider>
                        <FormControl sx={{ marginTop: 2 }} variant="outlined">
                            <InputLabel id="guvenlikSoruTipi-label">Güvenlik Soru Tipi</InputLabel>
                            <Select
                                labelId="guvenlikSoruTipi-label"
                                id="guvenlikSoruTipi"
                                value={userData.guvenlikSoruTipi}
                                onChange={handleSelectChange}
                                name="guvenlikSoruTipi"
                                label="Güvenlik Soru Tipi"
                            >
                                <MenuItem value="En Sevdiğiniz Hayvan">En sevdiğiniz hayvan</MenuItem>
                                <MenuItem value="En Sevdiğiniz Renk">En sevdiğiniz renk</MenuItem>
                                <MenuItem value="Uğurlu Rakamınız">En sevdiğiniz hayvan</MenuItem>

                            </Select>
                        </FormControl>
                        <TextField
                            id="guvenlikYanit"
                            label="Güvenlik Cevap"
                            variant="filled"
                            value={userData.guvenlikYanit}
                            onChange={handleChange}
                            name="guvenlikYanit"
                        />
                        <Button variant="contained" color="primary" type="submit">
                            Üye Ol
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Container>
    );
};

export default UyeKayit;
