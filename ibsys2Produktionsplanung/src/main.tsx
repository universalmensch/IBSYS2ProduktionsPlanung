import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Startseite } from './pages/Startseite';
import { Produktionsplanung } from './pages/Produktionsplanung';
import { Minutenplanung } from './pages/MinutenPlanung';
import { Kaufteildisposition } from './pages/Kaufteildisposition';
import { GeneralStoreProvider } from './helper/GeneralStoreContext'; // Import the provider
import Navbar from './components/navbar';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
    <GeneralStoreProvider>
    <Router>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Startseite />}></Route>
        <Route path="/Produktionsplanung" element={<Produktionsplanung />}></Route>
        <Route path="/Minutenplanung" element={<Minutenplanung />}></Route>
        <Route path="/Kaufteildisposition" element={<Kaufteildisposition />}></Route>
      </Routes>
    </Router>
    </GeneralStoreProvider>
  </React.StrictMode>
);