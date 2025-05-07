import React from 'react';
import {
    Container,
    Typography,
    Card,
    CardContent,
    Grid,
    Button,
    Box
} from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <Container>
            <Box sx={{ mt: 4, mb: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Главная страница
                </Typography>
                <Typography variant="body1" paragraph>
                    Добро пожаловать в учебный проект по React! Этот проект содержит серию лабораторных работ,
                    демонстрирующих различные возможности React и связанных технологий.
                </Typography>
            </Box>

            <Grid container spacing={3}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((labNumber) => (
                    <Grid item xs={12} sm={6} md={4} key={labNumber}>
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography variant="h6" component="h2" gutterBottom>
                                    Лабораторная работа {labNumber}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Описание лабораторной работы {labNumber}. Кликните для просмотра деталей.
                                </Typography>
                            </CardContent>
                            <Box sx={{ p: 2 }}>
                                <Button
                                    variant="outlined"
                                    component={Link}
                                    to={`/lab${labNumber}`}
                                    fullWidth
                                >
                                    Перейти
                                </Button>
                            </Box>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Home;