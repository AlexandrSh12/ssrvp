import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import Sidebar from './Sidebar'
import Content from './Content'
import Lab1 from '../pages/Lab1'
import Lab2 from '../pages/Lab2'
import Lab3 from '../pages/Lab3'
import Lab4 from '../pages/Lab4'
import { useTheme } from '../context/ThemeContext';


const Layout = ({ children }) => {
    const { theme } = useTheme();

    return (
        <div className={`layout ${theme}`}>
            <Header />
            <div className="main">
                <Sidebar />
                <div className="content">{children}</div>
            </div>
            <Footer />
        </div>
    );
};


export default Layout
