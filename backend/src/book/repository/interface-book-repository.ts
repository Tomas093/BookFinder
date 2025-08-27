// backend/src/book/repository/prisma-book-repository.ts

import {authors, books, genre_enum} from '@prisma/client';

export interface IBookRepository {
    getAllBooks(): Promise<(books & { authors: authors })[]>;

    getBookById(id: number): Promise<books & { authors: authors } | null>;

    createBook(data: Omit<books, 'id'>): Promise<books | null>;

    addFavoriteBook(id: number): Promise<void>;

    removeFavoriteBook(id: number): Promise<void>;

    getFavoriteBooks(): Promise<(books & { authors: authors })[]>;

    searchBooksByTitle(
        searchString: string,
        matchType: 'contains' | 'startsWith' | 'endsWith'
    ): Promise<(books & { authors: authors })[]>;

    searchBooksByAuthor(
        searchString: string,
        matchType: 'contains' | 'startsWith' | 'endsWith'
    ): Promise<(books & { authors: authors })[]>;

    searchBooksBySinopsis(
        searchString: string,
        matchType: 'contains' | 'startsWith' | 'endsWith'
    ): Promise<(books & { authors: authors })[]>;

    searchBooksByGenre(
        searchString: string,
        matchType?: 'contains' | 'startsWith' | 'endsWith'
    ): Promise<(books & { authors: authors })[]>;
}