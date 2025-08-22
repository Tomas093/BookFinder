import {useState, useEffect} from 'react';
import BookCards from "@/components/book_cards/BookCards";
import type {Book} from "@/types/book.ts";
import SinopsisCard from "@components/sinopsis_card/SinopsisCard.tsx";
import styles from '@components/book_cards/bookcards.module.css';
import { getAllBooks, addFavoriteBook, removeFavoriteBook } from "@/api/book-api";


function App() {
    const [isSinopsisVisible, setIsSinopsisVisible] = useState(false);
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);
    const [books, setBooks] = useState<Book[]>([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const data = await getAllBooks();
                setBooks(data);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        fetchBooks();
    }, []);

    const handleToggleFavorite = async (book: Book) => {
        try {
            if (book.isFavorite) {
                await removeFavoriteBook(book.id);
            } else {
                await addFavoriteBook(book.id);
            }

            const updatedBooks = await getAllBooks();
            setBooks(updatedBooks);
        } catch (error) {
            console.error('Error toggling favorite:', error);
        }
    };


    const handleViewDetails = (book: Book) => {
        setSelectedBook(book);
        setIsSinopsisVisible(true);
    };

    const handleCloseSinopsis = () => {
        setIsSinopsisVisible(false);
        setSelectedBook(null);
    };



    return (
        <>
            <div className={styles.booksContainer}>
                {books.map((book: Book) => (
                    <BookCards
                        key={book.title}
                        title={book.title}
                        author={book.author.name}
                        genre={book.genre}
                        synopsis={book.synopsis}
                        isFavorite={book.isFavorite}
                        onToggleFavorite={() => handleToggleFavorite(book)}
                        onViewDetails={() => handleViewDetails(book)}
                    />
                ))}
            </div>

            {isSinopsisVisible && selectedBook && (
                <SinopsisCard
                    title={selectedBook.title}
                    author={selectedBook.author.name}
                    synopsis={selectedBook.synopsis}
                    onClose={handleCloseSinopsis}
                />
            )}
        </>
    );
}

export default App;