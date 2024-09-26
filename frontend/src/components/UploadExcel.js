import React, { useState , useEffect} from 'react';
import axios from 'axios';  // Importar la configuración de axios

const UploadExcel = () => {
    const [file, setFile] = useState(null);
    const [csrfToken, setCsrfToken] = useState('');
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

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

        if (!file) {
            alert('Please select a file first!');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

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
        <div>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} />
                <button type='submit'>Upload Excel </button>
            </form>
        </div>
    );
};

export default UploadExcel;