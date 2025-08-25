import {useState, useEffect} from 'react';
import {getFavoriteBooks} from '@/api/book-api';
import BookCard from '@/components/book_cards/BookCards';
import SinopsisCard from '@components/sinopsis_card/SinopsisCard';
import {getGenreDisplay} from "@/types/genreMap";
import {type Book} from '@/types/book';
import styles from "@/pages/library/library.module.css";
import NavBar from "@/components/navbar/navBar";

const LibraryApp = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);
    const [isSinopsisVisible, setIsSinopsisVisible] = useState(false);
    const [selectedGenre, setSelectedGenre] = useState<string>('all');
    const [sortOption, setSortOption] = useState<string>('title');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const [searchTerm, setSearchTerm] = useState<string>('');

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const favoriteBooks = await getFavoriteBooks();
                setBooks(favoriteBooks);
                setFilteredBooks(favoriteBooks);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        fetchBooks();
    }, []);

    useEffect(() => {
        let result = [...books];

        if (selectedGenre !== 'all') {
            result = result.filter(book => book.genre === selectedGenre);
        }

        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            result = result.filter(book =>
                book.title.toLowerCase().includes(term) ||
                book.author.name.toLowerCase().includes(term) ||
                book.genre.toLowerCase().includes(term)
            );
        }

        result.sort((a, b) => {
            let valueA, valueB;

            switch (sortOption) {
                case 'title':
                    valueA = a.title.toLowerCase();
                    valueB = b.title.toLowerCase();
                    break;
                case 'author':
                    valueA = a.author.name.toLowerCase();
                    valueB = b.author.name.toLowerCase();
                    break;
                case 'publishedAt':
                    valueA = new Date(a.publishedAt);
                    valueB = new Date(b.publishedAt);
                    break;
                default:
                    valueA = a.title.toLowerCase();
                    valueB = b.title.toLowerCase();
            }

            if (valueA < valueB) return sortDirection === 'asc' ? -1 : 1;
            if (valueA > valueB) return sortDirection === 'asc' ? 1 : -1;
            return 0;
        });

        setFilteredBooks(result);
    }, [books, selectedGenre, sortOption, sortDirection, searchTerm]);

    const handleToggleFavorite = (book: Book) => {
        console.log('Toggle favorite for:', book.title);
    };

    const handleViewDetails = (book: Book) => {
        setSelectedBook(book);
        setIsSinopsisVisible(true);
    };

    const handleCloseSinopsis = () => {
        setIsSinopsisVisible(false);
        setSelectedBook(null);
    };

    const handleSortDirectionToggle = () => {
        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    };

    const genres = ['all', ...new Set(books.map(book => book.genre))];

    return (
        <div className={styles.appContainer}>
            <header className={styles.header}>
                <NavBar/>
            </header>

            <div className={styles.mainContainer}>
                <div className={styles.filtersContainer}>
                    <div className={styles.filtersGrid}>
                        <div className={styles.filterGroup}>
                            <label className={styles.filterLabel}>
                                Buscar libros
                            </label>
                            <div className={styles.searchContainer}>
                                <input
                                    type="text"
                                    placeholder="Título, autor o género..."
                                    className={styles.searchInput}
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <div className={styles.searchIcon}>
                                    <svg className={styles.searchIconSvg} fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd"
                                              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                              clipRule="evenodd"/>
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className={styles.filterGroup}>
                            <label className={styles.filterLabel}>
                                Filtrar por género
                            </label>
                            <select
                                className={styles.selectInput}
                                value={selectedGenre}
                                onChange={(e) => setSelectedGenre(e.target.value)}
                            >
                                {genres.map(genre => (
                                    <option key={genre} value={genre}>
                                        {genre === 'all' ? 'Todos los géneros' : getGenreDisplay(genre)}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className={styles.filterGroup}>
                            <label className={styles.filterLabel}>
                                Ordenar por
                            </label>
                            <div className={styles.sortContainer}>
                                <select
                                    className={styles.sortSelect}
                                    value={sortOption}
                                    onChange={(e) => setSortOption(e.target.value)}
                                >
                                    <option value="title">Título</option>
                                    <option value="author">Autor</option>
                                    <option value="publishedAt">Fecha de publicación</option>
                                </select>
                                <button
                                    onClick={handleSortDirectionToggle}
                                    className={styles.sortDirectionButton}
                                    title={sortDirection === 'asc' ? 'Orden ascendente' : 'Orden descendente'}
                                >
                                    {sortDirection === 'asc' ? '↑' : '↓'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.resultsCount}>
                    <p className={styles.resultsText}>
                        Mostrando <span className={styles.resultsNumber}>{filteredBooks.length}</span> libros
                    </p>
                </div>

                {filteredBooks.length > 0 ? (
                    <div className={styles.booksGrid}>
                        {filteredBooks.map(book => (
                            <BookCard
                                key={book.id}
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
                ) : (
                    <div className={styles.emptyState}>
                        <svg className={styles.emptyStateIcon} fill="none" viewBox="0 0 24 24"
                             stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                        </svg>
                        <h3 className={styles.emptyStateTitle}>No se encontraron libros</h3>
                        <p className={styles.emptyStateText}>
                            Intenta ajustar tus filtros o busca con otros términos
                        </p>
                    </div>
                )}
            </div>

            {isSinopsisVisible && selectedBook && (
                <div className={styles.modalOverlay}>
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
};

export default LibraryApp;