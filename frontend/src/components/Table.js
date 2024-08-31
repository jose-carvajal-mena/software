import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import './Table.css';

const EntregablesTable = () => {
    const [entregables, setEntregables] = useState([]);
    const [show, setShow] = useState(false);
    const [file, setFile] = useState(null);

    useEffect(() => {
        fetchEntregables();
    }, []);

    const fetchEntregables = async () => {
        const response = await axios.get('/api/entregables/');
        setEntregables(response.data);
    };

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        try {
            await axios.post('/api/upload_excel/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            handleClose();
            fetchEntregables(); // Actualiza la tabla después de subir el archivo
        } catch (error) {
            console.error('Error uploading file:', error);
        }
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
            <Button variant="primary" onClick={handleShow} className="upload-button">
                Upload Excel
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Upload Excel</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleUpload}>
                        <Form.Group controlId="formFile">
                            <Form.Label>Seleccione un Archivo Excel</Form.Label>
                            <Form.Control type="file" onChange={handleFileChange} />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="submit-button">
                            Upload
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default EntregablesTable;
