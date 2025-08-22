import {PrismaBookRepository} from "../repository/book-repository.js"
import type {authors, books} from "@prisma/client";

type MatchType = "contains" | "startsWith" | "endsWith";
type SearchField = "title" | "author" | "genre" | "sinopsis";

export class BookService {

    private bookRepository: PrismaBookRepository;

    constructor() {
        this.bookRepository = new PrismaBookRepository();
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
      const query: any = {};

      if (searchField === "author") {
        query.author = { name: { [matchType]: searchString } };
      } else if (searchField === "genre") {
        query.genre = { equals: searchString };
      } else if (searchField === "sinopsis") {
        query.sinopsis = { [matchType]: searchString };
      } else {
        query.title = { [matchType]: searchString };
      }

      return this.bookRepository.searchBooks(query);
    }




}