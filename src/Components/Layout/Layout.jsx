import React from 'react'
import Navbar from './../Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from './../Footer/Footer';
import NavPages from '../NavPages/NavPages';
import { ToastContainer } from 'react-toastify';

export default function Layout() {
  return (
    <>
      <Navbar />
      <NavPages />
        <Outlet />
        <ToastContainer/>
      <Footer />

    </>
  )
}
