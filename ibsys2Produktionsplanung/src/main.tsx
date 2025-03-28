import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Startseite } from './pages/Startseite';
import { Produktionsplanung } from './pages/Produktionsplanung';
import { Minutenplanung } from './pages/Minutenplanung';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Startseite />}></Route>
        <Route path="/Produktionsplanung" element={<Produktionsplanung />}></Route>
        <Route path="/Minutenplanung" element={<Minutenplanung />}></Route>
      </Routes>
    </Router>
  </React.StrictMode>
);