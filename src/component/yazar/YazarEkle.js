import React, { useState } from "react";
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

const YazarEkle = () => {
    const [authorData, setAuthorData] = useState({
        adi: '',
        yasi: '',
        cinsiyeti: '',
        dogumYeri: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAuthorData({
            ...authorData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/yazar/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(authorData)
            });
            if (response.ok) {
                console.log('Yazar eklendi!');
            } else {
                console.error('Yazar eklenirken bir hata oluştu.');
            }
        } catch (error) {
            console.error('İstek yapılırken bir hata oluştu:', error);
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ padding: 3 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Yazar Ekle
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
                            id="outlined-basic"
                            label="Adı"
                            variant="outlined"
                            value={authorData.adi}
                            onChange={handleChange}
                            name="adi"
                        />
                        <TextField
                            id="filled-basic"
                            label="Yaşı"
                            variant="filled"
                            value={authorData.yasi}
                            onChange={handleChange}
                            name="yasi"
                        />
                        <FormControl variant="outlined">
                            <InputLabel id="cinsiyet-label">Cinsiyeti</InputLabel>
                            <Select
                                labelId="cinsiyet-label"
                                id="cinsiyet"
                                value={authorData.cinsiyeti}
                                onChange={handleChange}
                                label="Cinsiyeti"
                                name="cinsiyeti"
                            >
                                <MenuItem value="Erkek">Erkek</MenuItem>
                                <MenuItem value="Kadın">Kadın</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            id="outlined-basic"
                            label="Doğum Yeri"
                            variant="outlined"
                            value={authorData.dogumYeri}
                            onChange={handleChange}
                            name="dogumYeri"
                        />
                        <Button variant="contained" color="primary" type="submit">
                            + YAZAR EKLE
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Container>
    );
};

export default YazarEkle;

