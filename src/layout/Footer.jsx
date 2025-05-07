import React, { useState } from 'react';
import {
    Box,
    Typography,
    BottomNavigation,
    BottomNavigationAction,
    Paper,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    TextField
} from '@mui/material';
import FeedbackIcon from '@mui/icons-material/Feedback';
import InfoIcon from '@mui/icons-material/Info';
import ContactMailIcon from '@mui/icons-material/ContactMail';

const Footer = () => {
    const [value, setValue] = useState(0);
    const [feedbackOpen, setFeedbackOpen] = useState(false);
    const [infoOpen, setInfoOpen] = useState(false);
    const [contactOpen, setContactOpen] = useState(false);

    const handleFeedbackOpen = () => {
        setFeedbackOpen(true);
    };

    const handleFeedbackClose = () => {
        setFeedbackOpen(false);
    };

    const handleInfoOpen = () => {
        setInfoOpen(true);
    };

    const handleInfoClose = () => {
        setInfoOpen(false);
    };

    const handleContactOpen = () => {
        setContactOpen(true);
    };

    const handleContactClose = () => {
        setContactOpen(false);
    };

    return (
        <>
            <Box component="footer" sx={{ mt: 'auto', py: 2, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                    © 2025 React Учебный Проект
                </Typography>
            </Box>

            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                <BottomNavigation
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                >
                    <BottomNavigationAction label="Обратная связь" icon={<FeedbackIcon />} onClick={handleFeedbackOpen} />
                    <BottomNavigationAction label="О проекте" icon={<InfoIcon />} onClick={handleInfoOpen} />
                    <BottomNavigationAction label="Контакты" icon={<ContactMailIcon />} onClick={handleContactOpen} />
                </BottomNavigation>
            </Paper>

            {/* Диалог обратной связи */}
            <Dialog open={feedbackOpen} onClose={handleFeedbackClose}>
                <DialogTitle>Обратная связь</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Оставьте ваши комментарии или предложения по улучшению проекта.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="feedback"
                        label="Ваш отзыв"
                        type="text"
                        fullWidth
                        variant="outlined"
                        multiline
                        rows={4}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleFeedbackClose}>Отмена</Button>
                    <Button onClick={handleFeedbackClose} variant="contained">Отправить</Button>
                </DialogActions>
            </Dialog>

            {/* Диалог о проекте */}
            <Dialog open={infoOpen} onClose={handleInfoClose}>
                <DialogTitle>О проекте</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Учебный проект по лабораторным работам с использованием React и Material-UI.
                        Данный проект разработан для изучения принципов создания современных веб-приложений
                        с адаптивным интерфейсом.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleInfoClose} autoFocus>
                        Закрыть
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Диалог контактов */}
            <Dialog open={contactOpen} onClose={handleContactClose}>
                <DialogTitle>Контакты</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Email: example@example.com<br />
                        Телефон: +7 (123) 456-78-90
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleContactClose} autoFocus>
                        Закрыть
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default Footer;