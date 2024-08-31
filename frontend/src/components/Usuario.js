import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TuComponente = () => {
    const [csrfToken, setCsrfToken] = useState('');

    useEffect(() => {
        const storedCsrfToken = localStorage.getItem('csrfToken');
        if (storedCsrfToken) {
            setCsrfToken(storedCsrfToken);
        } else {
            const fetchCsrfToken = async () => {
                try {
                    const response = await axios.get('http://localhost:8000/api/get_csrf_token/');
                    const newCsrfToken = response.data.csrf_token;
                    setCsrfToken(newCsrfToken);
                    localStorage.setItem('csrfToken', newCsrfToken);
                } catch (error) {
                    console.error('Error al obtener el CSRF token:', error);
                }
            };

            fetchCsrfToken();
        }
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);

        try {
            const response = await axios.post('http://localhost:8000/api/upload_excel/', formData, {
                headers: {
                    
                    'X-CSRFToken': csrfToken,
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log(response.data);
        } catch (error) {
            console.error('Error al enviar el formulario:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            

            <label htmlFor="campo2">usuario:</label>
            <input type="text" id="campo2" name="usuario" />
           
            <button type="submit">Enviar Formulario</button>
        </form>
    );
};

export default TuComponente;