// import React from 'react'
import { Container } from "react-bootstrap";
import Header from './components/Header'
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


export default function App() {
  return (
    <>
      <Header />
      <main className='py-3'>
        <Container>
          {/* <h1>welcome to coffee shop</h1> */}
          {/* <HomeScreen /> */}
          <Outlet />
        </Container>
      </main>
      <Footer />
      <ToastContainer />
    </>
  )
}

//to remove unused variables error: install npm install --save-dev eslint-plugin-react
//and extends 'plugin:react/recommended', in eslintrc.cjs