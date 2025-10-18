// src/utils/mainLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/footer';
import Header from '../components/Header';

function MainLayout() {
    return (
        <>
        
            {/* <Header/> */}
            <Header/>
            <main>
                {/* The <Outlet/> renders the actual page component */}
                <Outlet />
            </main>
            <Footer/>
            {/* You can add a <Footer /> component here later */}
        </>
    );
}

export default MainLayout;