import {BookService} from '../src/book/service/book-service.js';
import type {authors, books} from '@prisma/client';
import {IBookRepository} from '../src/book/repository/interface-book-repository.js';
import {genre_enum} from '@prisma/client';
import { jest } from '@jest/globals';

const mockBook: books & { authors: authors } = {
    id: 1,
    title: 'Test Book',
    genre: genre_enum.Ficci_n,
    synopsis: 'A test synopsis',
    author_id: 1,
    isFavorite: false,
    published_at: new Date('2020-01-01'),
    authors: {
        id: 1, name: 'Test Author',
        birth_date: new Date('1970-01-01'),
    }
};

const mockBookRepository: jest.Mocked<IBookRepository> = {
    getAllBooks: jest.fn(),
    getBookById: jest.fn(),
    addFavoriteBook: jest.fn(),
    removeFavoriteBook: jest.fn(),
    getFavoriteBooks: jest.fn(),
    searchBooksByAuthor: jest.fn(),
    searchBooksByGenre: jest.fn(),
    searchBooksBySinopsis: jest.fn(),
    searchBooksByTitle: jest.fn(),
    createBook: jest.fn(),
};

beforeEach(() => {
    jest.clearAllMocks();
});

describe('BookService', () => {
    const service = new BookService(mockBookRepository);

    it('returns all books from repository', async () => {
        mockBookRepository.getAllBooks.mockResolvedValue([mockBook]);
        const result = await service.getAllBooks();
        expect(result).toEqual([mockBook]);
        expect(mockBookRepository.getAllBooks).toHaveBeenCalled();
    });

    it('returns book by id when found', async () => {
        mockBookRepository.getBookById.mockResolvedValue(mockBook);
        const result = await service.getBookById(1);
        expect(result).toEqual(mockBook);
        expect(mockBookRepository.getBookById).toHaveBeenCalledWith(1);
    });

    it('returns null when book by id not found', async () => {
        mockBookRepository.getBookById.mockResolvedValue(null);
        const result = await service.getBookById(999);
        expect(result).toBeNull();
        expect(mockBookRepository.getBookById).toHaveBeenCalledWith(999);
    });

    it('adds a book to favorites', async () => {
        mockBookRepository.addFavoriteBook.mockResolvedValue();
        await service.addFavoriteBook(1);
        expect(mockBookRepository.addFavoriteBook).toHaveBeenCalledWith(1);
    });

    it('removes a book from favorites', async () => {
        mockBookRepository.removeFavoriteBook.mockResolvedValue();
        await service.removeFavoriteBook(1);
        expect(mockBookRepository.removeFavoriteBook).toHaveBeenCalledWith(1);
    });

    it('returns favorite books', async () => {
        mockBookRepository.getFavoriteBooks.mockResolvedValue([mockBook]);
        const result = await service.getFavoriteBooks();
        expect(result).toEqual([mockBook]);
        expect(mockBookRepository.getFavoriteBooks).toHaveBeenCalled();
    });

    it('searches books by author', async () => {
        mockBookRepository.searchBooksByAuthor.mockResolvedValue([mockBook]);
        const result = await service.searchBooks('Test Author', 'contains', 'author');
        expect(result).toEqual([mockBook]);
        expect(mockBookRepository.searchBooksByAuthor).toHaveBeenCalledWith('Test Author', 'contains');
    });

    it('searches books by genre', async () => {
        mockBookRepository.searchBooksByGenre.mockResolvedValue([mockBook]);
        const result = await service.searchBooks('Fiction', 'contains', 'genre');
        expect(result).toEqual([mockBook]);
        expect(mockBookRepository.searchBooksByGenre).toHaveBeenCalledWith('Fiction');
    });

    it('searches books by synopsis', async () => {
        mockBookRepository.searchBooksBySinopsis.mockResolvedValue([mockBook]);
        const result = await service.searchBooks('test', 'startsWith', 'synopsis');
        expect(result).toEqual([mockBook]);
        expect(mockBookRepository.searchBooksBySinopsis).toHaveBeenCalledWith('test', 'startsWith');
    });

    it('searches books by title', async () => {
        mockBookRepository.searchBooksByTitle.mockResolvedValue([mockBook]);
        const result = await service.searchBooks('Test Book', 'endsWith', 'title');
        expect(result).toEqual([mockBook]);
        expect(mockBookRepository.searchBooksByTitle).toHaveBeenCalledWith('Test Book', 'endsWith');
    });

    it('throws error when repository throws in searchBooks', async () => {
        mockBookRepository.searchBooksByTitle.mockRejectedValue(new Error('Repository error'));
        await expect(service.searchBooks('Test Book', 'contains', 'title')).rejects.toThrow('Repository error');
    });
});