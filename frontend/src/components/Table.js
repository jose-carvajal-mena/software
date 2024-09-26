import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import './Table.css';

const EntregablesTable = () => {
    const [entregables, setEntregables] = useState([]);


    useEffect(() => {
        fetchEntregables();
    }, []);

    const fetchEntregables = async () => {
        const response = await axios.get('/api/entregables/');
        setEntregables(response.data);
    };

    

    return (
        <div className="table-container">
            <h1 className="table-title">R&Q ENTREGABLES</h1>
            <Table striped bordered hover className="entregables-table">
                <thead>
                    <tr>
                        <th>Proyecto</th>
                        <th>ID Documento</th>
                        <th>Nombre Documento</th>
                        <th>HH Vendidas</th>
                        <th>Dinero Invertido</th>
                        <th>Dinero Gastado</th>
                        <th>Estado</th>
                        <th>HH Gastadas</th>
                        <th>HH Ganadas</th>
                        <th>Eficiencia HH</th>
                        <th>Eficiencia Dinero</th>
                        <th>Eficacia</th>
                    </tr>
                </thead>
                <tbody>
                    {entregables.map((entregable, index) => (
                        <tr key={index}>
                            <td>{entregable.proyecto}</td>
                            <td>{entregable.id_documento}</td>
                            <td>{entregable.nombre_documento}</td>
                            <td>{entregable.hh_vendidas}</td>
                            <td>{entregable.dinero_invertido}</td>
                            <td>{entregable.dinero_gastado}</td>
                            <td>{entregable.estado_proyecto}</td>
                            <td>{entregable.hh_gastadas}</td>
                            <td>{entregable.hh_ganadas}</td>
                            <td>{entregable.eficiencia_hh}</td>
                            <td>{entregable.eficiencia_dinero}</td>
                            <td>{entregable.eficacia}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default EntregablesTable;
