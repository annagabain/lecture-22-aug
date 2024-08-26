import { useState } from 'react';
import './Book.css';

interface BookInterface {
    title: string;
    author: string;
    isbn: number;
    genres?: Array<string>;
    rating: number;
    cover?: string;
}


function Book({ book, removeBookFromList, updateBook }: { book: BookInterface, removeBookFromList: (book: BookInterface) => void, updateBook: (updatedBook: BookInterface) => void }) {

    // State-hook för att hantera redigeringsláge
    const [edit, setEdit] = useState<boolean>(false);

    // State-hooks för att hantera redigering av bokens information.
    const [title, setTitle] = useState<string>(book.title);
    const [author, setAuthor] = useState<string>(book.author);
    const [isbn] = useState<number>(book.isbn);
    const [rating, setRating] = useState<number>(book.rating);


    // ny array for att representera stjärnorna
    let stars = [];
    for (let i = 0; i < book.rating; i++) {
        stars.push(<span key={i}>⭐</span>)
    }


    // hantera sparning av redigerade bokuppgifter
    const handleEdit = () => {
        const updatedBook: BookInterface = {
            title: title,
            author: author,
            isbn: isbn,
            genres: book.genres,
            rating: rating,
            cover: book.cover
        }
        updateBook(updatedBook);
        setEdit(false);
    };


    // hanterar borttagning av boken
    const handleDelete = (book: BookInterface) => {
        console.log('deleted');
        removeBookFromList(book);
        setEdit(false);
    }

    return (
        <article className="book-container">{edit ?
            <>
                <section className='book-info'>
                    <figure style={{ backgroundImage: `url(${book.cover})` }}></figure>
                    <input defaultValue={title} onChange={(e) => setTitle(e.target.value)} id='newTitle' />
                    <input defaultValue={author} onChange={(e) => setAuthor(e.target.value)} id='newAuthor' />
                    <p>{book.isbn}</p>
                    <p>Genres: {book.genres ? book.genres.join(", ") : "Not defined"}</p>
                    <input max="5" min="1" type='number' defaultValue={rating} onChange={(e) => setRating(parseInt(e.target.value))} id='newRating' />
                    <button onClick={() => handleDelete(book)}>Delete</button>

                </section>
                <button onClick={handleEdit}>Confirm</button>

            </>
            : // Om inte i redigeringsläge, visa bokens information
            <>
                <section className='book-info'>
                    <figure style={{ backgroundImage: `url(${book.cover})` }}></figure>
                    <h2>{book.title}</h2>
                    <p>{book.author}</p>
                    <p>{book.isbn}</p>
                    <p>Genres: {book.genres ? book.genres.join(", ") : "Not defined"}</p>
                    <p>{stars}</p>
                </section>
                <button onClick={() => { setEdit(true) }}>Edit</button>
            </>
        }
        </article>

    )
};
export default Book;