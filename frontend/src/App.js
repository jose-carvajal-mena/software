import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Table from './components/Table';
import UploadExcel from './components/UploadExcel.js';
import Usuario from './components/Usuario.js';
const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Table />} />
                <Route path="/upload" element={<UploadExcel />} />

                <Route path="/usuario" element={<Usuario />} />
            </Routes>
        </Router>
    );
};

export default App;