import React from 'react';
import Button from '@mui/material/Button';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { styled } from '@mui/system';

const StyledButton = styled(Button)(({ theme }) => ({
    backgroundColor: '#125c6c',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '20px',
    boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .2)',
    '&:hover': {
        backgroundColor: '#1565c0',
    },
}));

const KitapEkleButton = () => {
    return (
        <StyledButton
            variant="contained"
            href="kitapEkle"
            startIcon={<PersonAddIcon />}
        >
            Kitap Ekle
        </StyledButton>
    );
};

export default KitapEkleButton;