// src/utils/mainLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
// import Footer from '../components/Footer';
import Header from '../components/Header';
import Footer from '../components/Footer';

function MainLayout() {
    return (
        <>
        
            <Header/>
            <main>
                <Outlet />
            </main>
            <Footer/>
        </>
    );
}

export default MainLayout;