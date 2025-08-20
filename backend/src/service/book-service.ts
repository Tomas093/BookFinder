import {PrismaBookRepository} from "../repository/book-repository.js"
import type {Book} from "../domain/book.js";


export class BookService {

    private bookRepository: PrismaBookRepository;

    constructor() {
        this.bookRepository = new PrismaBookRepository();
    }

    async getAllBooks(): Promise<Book[]> {
        return this.bookRepository.getAllBooks();
    }

    async getBookById(id: number): Promise<Book | null> {
        return this.bookRepository.getBookById(id);
    }

    async addFavoriteBook(id: number): Promise<void> {
        await this.bookRepository.addFavoriteBook(id);
    }

    async removeFavoriteBook(id: number): Promise<void> {
        await this.bookRepository.removeFavoriteBook(id);
    }

    async getFavoriteBooks(): Promise<Book[]> {
        return this.bookRepository.getFavoriteBooks();
    }
}