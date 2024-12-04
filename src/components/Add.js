import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Add = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [cover, setCover] = useState(null);

    const handleImgChange = (e) => {
        setCover(e.target.files[0]);
    }

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('cover', cover);
        try {
            await axios.post("http://localhost:8000/addbooks", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('Book added successfully!');
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className='form'>
            <h1>Add New Book</h1>
            <input
                type="text"
                placeholder="Book Name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
            />
            <input
                type="file"
                onChange={handleImgChange}
                required
            />
            <button type="submit" className='formbtn'>Add Book</button>
        </form>
    );
};

export default Add;