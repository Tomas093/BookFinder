import type {authors, books} from "@prisma/client";
import {IBookRepository} from "../repository/interface-book-repository.js";

type MatchType = "contains" | "startsWith" | "endsWith";
type SearchField = "title" | "author" | "genre" | "synopsis";

export class BookService {

    private bookRepository: IBookRepository;

    constructor(bookRepository: IBookRepository) {
        this.bookRepository = bookRepository;
    }

    async getAllBooks(): Promise<(books & { authors: authors })[]> {
        return this.bookRepository.getAllBooks();
    }

    async getBookById(id: number): Promise<(books & { authors: authors }) | null> {
        return this.bookRepository.getBookById(id);
    }

    async addFavoriteBook(id: number): Promise<void> {
        await this.bookRepository.addFavoriteBook(id);
    }

    async removeFavoriteBook(id: number): Promise<void> {
        await this.bookRepository.removeFavoriteBook(id);
    }

    async getFavoriteBooks() : Promise<(books & { authors: authors })[]> {
        return this.bookRepository.getFavoriteBooks();
    }

    async searchBooks(searchString: string, matchType: MatchType, searchField: SearchField): Promise<(books & { authors: authors })[]>  {
        try {
            console.log('BookService.searchBooks called with:', { searchString, matchType, searchField });

            if (searchField === "author") {
                return await this.bookRepository.searchBooksByAuthor(searchString, matchType);
            } else if (searchField === "genre") {
                return await this.bookRepository.searchBooksByGenre(searchString);
            } else if (searchField === "synopsis") {
                return await this.bookRepository.searchBooksBySinopsis(searchString, matchType);
            } else {
                return await this.bookRepository.searchBooksByTitle(searchString, matchType);
            }
        } catch (error) {
            console.error('Error in BookService.searchBooks:', error);
            throw error;
        }
    }
}