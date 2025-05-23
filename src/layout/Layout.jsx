// src/layout/Layout.jsx
import React, { useState } from 'react';
import { Box, CssBaseline, useMediaQuery } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useTheme as useAppTheme } from '../context/ThemeContext';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import Content from './Content';

const Layout = ({ children }) => {
    const { theme } = useAppTheme();
    const isMobile = useMediaQuery('(max-width:900px)');
    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    // Material-UI тема на основе текущей темы приложения
    const muiTheme = createTheme({
        palette: {
            mode: theme === 'dark' ? 'dark' : 'light',
            primary: {
                main: theme === 'dark' ? '#6ea8fe' : '#0d6efd',
            },
            background: {
                default: theme === 'dark' ? '#121212' : '#ffffff',
                paper: theme === 'dark' ? '#1e1e1e' : '#f8f9fa',
            },
        },
    });

    return (
        <ThemeProvider theme={muiTheme}>
            <CssBaseline />
            <Box className={`layout ${theme}`} sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <Header toggleDrawer={toggleDrawer} />
                <Box sx={{ display: 'flex', flex: 1 }}>
                    <Sidebar open={drawerOpen} toggleDrawer={toggleDrawer} />
                    <Box
                        component="main"
                        className="content"
                        sx={{
                            flexGrow: 1,
                            p: 3,
                            width: '100%',
                        }}
                    >   <Content>
                        {children}
                        </Content>
                    </Box>
                </Box>
                <Footer />
            </Box>
        </ThemeProvider>
    );
};

export default Layout;