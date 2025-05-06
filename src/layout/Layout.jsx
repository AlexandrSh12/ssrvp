import React from 'react'
import Header from './Header'
import Footer from './Footer'
import Sidebar from './Sidebar'
import { useTheme } from '../context/ThemeContext';

const Layout = ({ children }) => {
    const { theme } = useTheme();

    return (
        <div className={`layout ${theme}`}>
            <Header />
            <div className="main">
                <Sidebar />
                <main className="content">{children}</main>
            </div>
            <Footer />
        </div>
    );
};

export default Layout