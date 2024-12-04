import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const Update = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [cover, setCover] = useState(null);
    const [existingCover, setExistingCover] = useState(""); 
    const [preview, setPreview] = useState(""); 

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setCover(file);
        setPreview(URL.createObjectURL(file)); 
    }

    const navigate = useNavigate();
    const location = useLocation();

    const bookID = location.pathname.split("/")[2];

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('price', price);
       if(cover){
        formData.append('cover', cover);
       }

        try {
            await axios.put("http://localhost:8000/books/" + bookID, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('Book updated successfully!');
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const fetchBookData = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/books/${bookID}`);
                // if (res.data && res.data.length > 0) { // Check if data is available
                const bookData = res.data;
                setTitle(bookData.title);
                setDescription(bookData.description);
                setPrice(bookData.price);
                setExistingCover(bookData.cover);
              
            } catch (err) {
                console.error(err);
            }
        };
        fetchBookData();
    }, [bookID]); // Include bookID in the dependency array


    return (
        <form onSubmit={handleSubmit} className='form'>
            <h1>Update New Book</h1>
            <input
                type="text"
                placeholder="Book Name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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
            />
            {existingCover && !preview && (
         <div>
          <img
            src={`http://localhost:8000/images/${existingCover}`}
            alt="Current Book Cover"
            width="100"
          />
        </div>
      )}

      {preview && (
        <div>
          <img src={preview} alt="New Book Cover Preview" width="100" />
        </div>
      )}

      <div>
        <input
          type="file"
          onChange={handleImageChange}
        />
      </div>

            <button type="submit" className='formbtn'>Update Book</button>
        </form>
    );
};

export default Update;
