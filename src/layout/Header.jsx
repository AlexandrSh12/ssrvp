// src/layout/Header.jsx
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Box,
    Switch,
    FormControlLabel,
    useMediaQuery
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme as useMuiTheme } from '@mui/material/styles';
import { useTheme } from '../context/ThemeContext';

const Header = ({ toggleDrawer }) => {
    const { theme, toggleTheme } = useTheme();
    const muiTheme = useMuiTheme();
    const isMobile = useMediaQuery('(max-width:600px)');

    return (
        <AppBar position="sticky" color="default" elevation={1}>
            <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={toggleDrawer}
                    sx={{ mr: 2 }}
                >
                    <MenuIcon />
                </IconButton>

                <Typography
                    variant="h6"
                    component="div"
                    sx={{ flexGrow: 1 }}
                >
                    {!isMobile && "React Лабораторные"}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Button
                        color="inherit"
                        component={RouterLink}
                        to="/"
                        sx={{ display: { xs: isMobile ? 'none' : 'block', sm: 'block' } }}
                    >
                        Главная
                    </Button>

                    <Button
                        color="inherit"
                        component={RouterLink}
                        to="/about"
                        sx={{ display: { xs: isMobile ? 'none' : 'block', sm: 'block' } }}
                    >
                        О себе
                    </Button>

                    <FormControlLabel
                        control={
                            <Switch
                                checked={theme === 'dark'}
                                onChange={toggleTheme}
                                color="default"
                            />
                        }
                        label={
                            theme === 'dark' ?
                                <Brightness4Icon fontSize="small" /> :
                                <Brightness7Icon fontSize="small" />
                        }
                        labelPlacement="start"
                    />
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;