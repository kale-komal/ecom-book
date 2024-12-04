import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';


const Books = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fecthAllBooks = async () => {
            try {
                const res = await axios.get("http://localhost:8000/books");
                setBooks(res.data);
            } catch (err) {
                console.log(err)
            }
        }
        fecthAllBooks()
    }, []);


    const handleDelete = async (id) => {
        try {
            const confirmDelete = window.confirm("Are you sure you want to delete this book?");
            if (confirmDelete) {
                await axios.delete(`http://localhost:8000/books/${id}`);
                window.location.reload();
            }
        } catch (err) {
            console.log(err);
        }
    };


    return (
        <div>
            <h1>Book Shop</h1>
            <div className='books'>
                {books.map((book) => (
                    <div className='book' key={book.id}>
                        <img className='img' src={`http://localhost:8000/images/${book.cover}`} alt={book.title} />
                        <h2>{book.title}</h2>
                        <p>{book.description}</p>
                        <span>$ {book.price} /-</span>
                        <button className='delete' onClick={() => handleDelete(book.id)}>Delete</button>
                        <button className='update'><Link to={`/update/${book.id}`}>Update</Link></button>
                    </div>
                ))}
            </div>
            <button><Link to='/add'>Add new book</Link></button>
        </div>
    )
};

export default Books;