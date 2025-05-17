import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {Startseite} from './pages/Startseite';
import {Produktionsplanung} from './pages/Produktionsplanung';
import {MinutenPlanung} from './pages/MinutenPlanung';
import {Kaufteildisposition} from './pages/Kaufteildisposition';
import {GeneralStoreProvider} from './helper/GeneralStoreContext'; // Import the provider
import Navbar from './components/navbar';
import './i18n.tsx';
import {TeileProduktion} from "./pages/TeileProduktion.tsx";
import {ReihenfolgeLosgroessenPlanung} from "./pages/ReihenfolgeLosgroessenPlanung.tsx";


ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <GeneralStoreProvider>
            <Router>
                <Navbar></Navbar>
                <Routes>
                    <Route path="/IBSYS2ProduktionsPlanung/" element={<Startseite/>}></Route>
                    <Route path="/IBSYS2ProduktionsPlanung/Produktionsplanung" element={<Produktionsplanung/>}></Route>
                    <Route path="/IBSYS2ProduktionsPlanung/TeileProduktion" element={<TeileProduktion/>}></Route>
                    <Route path="/IBSYS2ProduktionsPlanung/ReihenfolgeLosgroessenPlanung"
                           element={<ReihenfolgeLosgroessenPlanung/>}></Route>
                    <Route path="/IBSYS2ProduktionsPlanung/Minutenplanung" element={<MinutenPlanung/>}></Route>
                    <Route path="/IBSYS2ProduktionsPlanung/Kaufteildisposition"
                           element={<Kaufteildisposition/>}></Route>
                </Routes>
            </Router>
        </GeneralStoreProvider>
    </React.StrictMode>
);
