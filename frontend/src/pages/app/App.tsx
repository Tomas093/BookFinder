// File: frontend/src/pages/app/App.tsx
import {useState, useEffect} from 'react';
import BookCards from '@/components/book_cards/BookCards';
import type {Book} from '@/types/book';
import SinopsisCard from '@components/sinopsis_card/SinopsisCard';
import {getAllBooks, addFavoriteBook, removeFavoriteBook, searchBooks} from '@/api/book-api';
import SearchBar, {type MatchType, type SearchField} from '@/components/searchbar/SearchBar';
import appStyles from './app.module.css';
import NavBar from '@/components/navbar/navBar';

function App() {
    const [isSinopsisVisible, setIsSinopsisVisible] = useState(false);
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);
    const [books, setBooks] = useState<Book[]>([]);

    useEffect(() => {
        loadAll();
    }, []);

    const loadAll = async () => {
        try {
            setBooks(await getAllBooks());
        } catch (e) {
            console.error('Error fetching books:', e);
        }
    };

    const handleToggleFavorite = async (book: Book) => {
        try {
            if (book.isFavorite) await removeFavoriteBook(book.id);
            else await addFavoriteBook(book.id);
            await loadAll();
        } catch (e) {
            console.error('Error toggling favorite:', e);
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

    const handleSearch = async (query: string, field: SearchField, match: MatchType) => {
        if (!query) {
            await loadAll();
            return;
        }
        try {
            const backendField = field === 'synopsis' ? 'synopsis' : field;
            const results = await searchBooks(query, match, backendField as any);
            setBooks(results);
        } catch (e) {
            console.error('Error searching books:', e);
        }
    };

    return (
        <div className={appStyles.appLayout}>
            <NavBar />
            <header className={appStyles.header}>
                <div className={appStyles.searchBarWrapper}>
                    <SearchBar onSearch={handleSearch}/>
                </div>
            </header>

            <section className={appStyles.content}>
                <div className={appStyles.booksGrid}>
                    {books.map((book) => (
                        <div key={book.id} className={appStyles.bookItem}>
                            <BookCards
                                title={book.title}
                                author={book.author.name}
                                genre={book.genre}
                                synopsis={book.synopsis}
                                isFavorite={book.isFavorite}
                                onToggleFavorite={() => handleToggleFavorite(book)}
                                onViewDetails={() => handleViewDetails(book)}
                            />
                        </div>
                    ))}
                </div>
            </section>

            {isSinopsisVisible && selectedBook && (
                <div className={appStyles.sinopsisOverlay}>
                    <SinopsisCard
                        title={selectedBook.title}
                        author={selectedBook.author.name}
                        synopsis={selectedBook.synopsis}
                        onClose={handleCloseSinopsis}
                    />
                </div>
            )}
        </div>
    );
}

export default App;

