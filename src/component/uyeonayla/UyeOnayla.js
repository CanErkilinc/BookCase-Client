import * as React from 'react';
import {DataGrid, GridToolbar} from '@mui/x-data-grid';
import {useEffect, useState} from "react";
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";

const UyeOnayla = () => {

    const [uyeler, setUyeler] = useState([]);
    const [selectionUye, setSelectionUye] = useState({})
    const [buttonDisabled , setOnaylaButtonDisabled] = useState();

    useEffect(() => {
        fetchUyeler("YENI");
    }, []);



    const uyeSec = (data) =>{
        if (data.length ===0){
            setOnaylaButtonDisabled(true);
        }else{
            setOnaylaButtonDisabled(false);
        }
        debugger;
        setSelectionUye(data[0]);
    }


    const columns = [
        {field: 'id', headerName: 'ID', width: 90},
        {
            field: 'tckn',
            headerName: 'TCKN',
            width: 150,
            editable: false,
        },
        {
            field: 'ad',
            headerName: 'AD',
            width: 150,
            editable: false,
        },
        {
            field: 'soyad',
            headerName: 'SOYAD',
            width: 150,
            editable: true,
        },
        {
            field: 'cinsiyet',
            headerName: 'CİNSİYET',
            type: 'string',
            width: 110,
            editable: true,
        },
        {
            field: 'uyelikTarih',
            headerName: 'ÜYELİK TARİHİ',
            width: 150,
            editable: false,
        },
        {
            field: 'dogumTarih',
            headerName: 'DOGUM TARIH',
            width: 150,
            editable: false,
        },

    ];
    const fetchUyeler = async (durum) => {
        try {
            let url = 'http://localhost:8080/kullanici/getirTumListe?durum=YENI';
            const response = await fetch(url);
            const data = await response.json();
            setUyeler(data);
        } catch (error) {
            console.error('Veri çekilirken bir hata oluştu:', error);
        }
    };

    const handleSubmit = async (data) => {
        try {
            debugger;
            let url = 'http://localhost:8080/kullanici/onayla?id='+selectionUye;
            const response = await fetch(url);
            const data = await response.json();
        } catch (error) {
            console.error('Veri çekilirken bir hata oluştu:', error);
        }
    };



    const handleQuery = () => {
        fetchUyeler();
    };

    console.log(selectionUye);
    return (
        <div style={{height: 300, width: '100%'}}>
            <form onSubmit={handleSubmit}>

                <Box sx={{height: 500, width: '100%'}}>
                    <DataGrid
                        rows={uyeler}
                        columns={columns}
                        disableMultipleRowSelection={true}
                        onRowSelectionModelChange={(rowSelectionModel) => uyeSec(rowSelectionModel)}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 5,
                                },
                            },
                        }}
                        pageSizeOptions={[5]}
                        checkboxSelection
                        disableRowSelectionOnClick
                    />
                    <Button variant="contained" disabled={buttonDisabled} color="primary" type="submit"  >
                        + ÜYE ONAYLA
                    </Button>
                </Box>
            </form>
        </div>
    );
};


export default UyeOnayla;