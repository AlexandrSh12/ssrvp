// src/layout/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    Drawer,
    List,
    ListItem,
    ListItemText,
    ListItemButton,
    Divider,
    Box,
    IconButton,
    useMediaQuery
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const Sidebar = ({ open, toggleDrawer }) => {
    const isMobile = useMediaQuery('(max-width:900px)');

    const labLinks = [
        { path: '/lab1', name: 'Лабораторная 1' },
        { path: '/lab2', name: 'Лабораторная 2' },
        { path: '/lab3', name: 'Лабораторная 3' },
        { path: '/lab4', name: 'Лабораторная 4' },
        { path: '/lab5', name: 'Лабораторная 5' },
        { path: '/lab6', name: 'Лабораторная 6' },
        { path: '/lab7', name: 'Лабораторная 7' },
        { path: '/lab8', name: 'Лабораторная 8' },
        { path: '/lab9', name: 'Лабораторная 9' }
    ];

    const drawer = (
        <>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', p: 1 }}>
                <IconButton onClick={toggleDrawer}>
                    <ChevronLeftIcon />
                </IconButton>
            </Box>
            <Divider />
            <List>
                {labLinks.map((link) => (
                    <ListItem key={link.path} disablePadding>
                        <ListItemButton
                            component={NavLink}
                            to={link.path}
                            sx={{
                                '&.active': {
                                    backgroundColor: (theme) =>
                                        theme.palette.mode === 'dark' ? 'rgba(110, 168, 254, 0.1)' : 'rgba(13, 110, 253, 0.1)',
                                    color: (theme) =>
                                        theme.palette.mode === 'dark' ? '#6ea8fe' : '#0d6efd',
                                    fontWeight: 'bold',
                                },
                            }}
                        >
                            <ListItemText primary={link.name} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </>
    );

    return (
        <Drawer
            variant={isMobile ? "temporary" : "persistent"}
            open={open}
            onClose={toggleDrawer}
            sx={{
                width: 250,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: 250,
                    boxSizing: 'border-box',
                },
            }}
        >
            {drawer}
        </Drawer>
    );
};

export default Sidebar;