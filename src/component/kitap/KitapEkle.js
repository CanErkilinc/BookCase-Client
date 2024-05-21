import React, { useState } from 'react';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const KitapEkle = () => {
    const [authorData, setAuthorData] = useState({
        adi: '',
        yayinYili: null,
        yayinYapanKurulus: '',
        kod: '',
        tur: '',
        sayfaSayisi: '',
        baskiSayisi: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAuthorData({
            ...authorData,
            [name]: value
        });
    };

    const handleDateChange = (date) => {
        setAuthorData({
            ...authorData,
            yayinYili: date
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/kitapBilgileri/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(authorData)
            });
            if (response.ok) {
                console.log('Kitap eklendi!');
            } else {
                console.error('Kitap eklenirken bir hata oluştu.');
            }
        } catch (error) {
            console.error('İstek yapılırken bir hata oluştu:', error);
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ padding: 3 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Kitap Ekle
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
                            id="adi"
                            label="Adı"
                            variant="outlined"
                            value={authorData.adi}
                            onChange={handleChange}
                            name="adi"
                        />
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Yayın Yılı"
                                value={authorData.yayinYili}
                                onChange={handleDateChange}
                                renderInput={(params) => <TextField {...params} variant="filled" />}
                            />
                        </LocalizationProvider>
                        <TextField
                            id="yayinYapanKurulus"
                            label="Yayın Yapan Kuruluş"
                            variant="outlined"
                            value={authorData.yayinYapanKurulus}
                            onChange={handleChange}
                            name="yayinYapanKurulus"
                        />
                        <TextField
                            id="kod"
                            label="Kitap Kodu"
                            variant="filled"
                            value={authorData.kod}
                            onChange={handleChange}
                            name="kod"
                        />
                        <TextField
                            id="tur"
                            label="Kitap Türü"
                            variant="outlined"
                            value={authorData.tur}
                            onChange={handleChange}
                            name="tur"
                        />
                        <TextField
                            id="sayfaSayisi"
                            label="Sayfa Sayısı"
                            variant="filled"
                            value={authorData.sayfaSayisi}
                            onChange={handleChange}
                            name="sayfaSayisi"
                        />
                        <TextField
                            id="baskiSayisi"
                            label="Baskı Sayısı"
                            variant="outlined"
                            value={authorData.baskiSayisi}
                            onChange={handleChange}
                            name="baskiSayisi"
                        />
                        <Button variant="contained" color="primary" type="submit">
                            + KİTAP EKLE
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Container>
    );
};

export default KitapEkle;
