import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from './context/ThemeContext';
import store from './store/store';
import Layout from './layout/Layout';

import Lab1 from './pages/Lab1';
import Lab2 from './pages/Lab2';
import Lab3 from './pages/Lab3';
import Lab4 from './pages/Lab4';

const App = () => (
    <Provider store={store}>
        <ThemeProvider>
            <BrowserRouter>
                <Layout>
                    <Routes>
                        <Route path="/lab1" element={<Lab1 />} />
                        <Route path="/lab2" element={<Lab2 />} />
                        <Route path="/lab3" element={<Lab3 />} />
                        <Route path="/lab4" element={<Lab4 />} />
                        <Route path="*" element={<div style={{ padding: '1rem' }}>Выберите лабораторную</div>} />
                    </Routes>
                </Layout>
            </BrowserRouter>
        </ThemeProvider>
    </Provider>
);

export default App;
