import React, { useState } from 'react';
import axios from '../axios.config';  // Importar la configuración de axios

const UploadExcel = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };
    let boton=document.querySelector('#Mi_Boton');
    boton.addEventListener('click', function(){
        console.log('Hola')
    });
    const handleSubmit = (event) => {
        console.log('aqui')
        event.preventDefault();

        if (!file) {
            alert('Please select a file first!');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        axios.post('upload_excel/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
            console.log('File uploaded successfully:', response.data);
        })
        .catch(error => {
            console.error('Error uploading file:', error);
        });
    };

    return (
        <div>
            <form onSubmit='mensaje()'>
                <input type="file" onChange={handleFileChange} />
                <button id='Mi_Boton'>Upload Excel S</button>
            </form>
        </div>
    );
};

export default UploadExcel;
