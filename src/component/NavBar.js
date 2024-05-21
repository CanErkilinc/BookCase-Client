import React from 'react';
import { NavLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';

const NavContainer = styled(AppBar)(({ theme }) => ({
    marginBottom: '20px',
    backgroundColor: '#333',
}));

const NavToolbar = styled(Toolbar)({
    display: 'flex',
    justifyContent: 'space-between',
});

const NavButton = styled(Button)(({ theme }) => ({
    margin: theme.spacing(1),
    color: 'white',
}));

const NavLinkStyled = styled(NavLink)({
    textDecoration: 'none',
    color: 'inherit',
    '&.active': {
        textDecoration: 'underline',
    },
});

const NavBar = () => {
    return (
        <NavContainer position="static">
            <NavToolbar>
                <Typography variant="h6" sx={{ color: 'white' }}>
                    BookCase
                </Typography>
                <div>
                    <NavLinkStyled to="/anasayfa" exact>
                        <NavButton color="inherit">Ana Sayfa</NavButton>
                    </NavLinkStyled>
                    <NavLinkStyled to="/yazar">
                        <NavButton color="inherit">Yazar</NavButton>
                    </NavLinkStyled>
                    <NavLinkStyled to="/kitap">
                        <NavButton color="inherit">Kitap</NavButton>
                    </NavLinkStyled>
                    <NavLinkStyled to="/uyelikbilgileri">
                        <NavButton color="inherit">Üye Ol</NavButton>
                    </NavLinkStyled>
                </div>
            </NavToolbar>
        </NavContainer>
    );
};

export default NavBar;

