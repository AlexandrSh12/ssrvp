import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';

import Lab1 from './pages/Lab1';
import Lab2 from './pages/Lab2';
import Lab3 from './pages/Lab3';
import Lab4 from './pages/Lab4';
import Lab5 from './pages/Lab5';
import Lab6 from './pages/Lab6';
import Lab7 from './pages/Lab7';
import Lab8 from './pages/Lab8';
import Lab9 from './pages/Lab9';

const App = () => (
    <Layout>
        <Routes>
            <Route path="/lab1" element={<Lab1 />} />
            <Route path="/lab2" element={<Lab2 />} />
            <Route path="/lab3" element={<Lab3 />} />
            <Route path="/lab4" element={<Lab4 />} />
            <Route path="/lab5" element={<Lab5 />} />
            <Route path="/lab6" element={<Lab6 />} />
            <Route path="/lab7" element={<Lab7 />} />
            <Route path="/lab8" element={<Lab8 />} />
            <Route path="/lab9" element={<Lab9 />} />
            <Route path="*" element={<div>Выберите лабораторную</div>} />
        </Routes>
    </Layout>
);

export default App;