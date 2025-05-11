// src/layout/Content.jsx
import React from 'react';
import { Box, Paper, Typography } from '@mui/material';

const Content = ({ children }) => {
    return (
        <Box
            component="main"
            className="content"
            sx={{
                flexGrow: 1,
                px: { xs: 1, sm: 15, md: 20, lg: 30 }, // Адаптивные горизонтальные отступы
                py: 3, // вертикальные отступы
                width: '100%',
                overflow: 'auto'
            }}
        >
            <Paper
                elevation={2}
                sx={{
                    p: { xs: 1, sm: 3 }, // Адаптивные отступы внутри Paper
                    minHeight: 'calc(100vh - 180px)',
                    backgroundColor: theme => theme.palette.background.paper
                }}
            >
                {children}
            </Paper>
        </Box>
    );
};

export default Content;