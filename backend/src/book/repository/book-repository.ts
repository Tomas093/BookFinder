import {type authors, type books, genre_enum, PrismaClient} from '@prisma/client';
import {IBookRepository} from "./interface-book-repository.js";

export class PrismaBookRepository implements IBookRepository {

    private prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    async getAllBooks() {
        return this.prisma.books.findMany({
            include: {
                authors: true,
            }
        });
    }

    async getBookById(id: number) {
        return this.prisma.books.findUnique({
            where: {id},
            include: {
                authors: true,
            }
        })
    }

    async createBook(data: Omit<books, 'id'>): Promise<books | null> {
        try {
            return await this.prisma.books.create({data});
        } catch {
            return null;
        }
    }

    async addFavoriteBook(id: number): Promise<void> {
        await this.prisma.books.update({
            where: {id},
            data: {isFavorite: true}
        });
    }

    async removeFavoriteBook(id: number): Promise<void> {
        await this.prisma.books.update({
            where: {id},
            data: {isFavorite: false}
        });
    }

    async getFavoriteBooks(): Promise<(books & { authors: authors })[]> {
        return this.prisma.books.findMany({
            where: {isFavorite: true},
            include: {
                authors: true,
            }
        });
    }

    async searchBooksByTitle(searchString: string, matchType: 'contains' | 'startsWith' | 'endsWith'): Promise<(books & {
        authors: authors
    })[]> {
        try {
            return await this.prisma.books.findMany({
                where: {
                    title: {
                        [matchType]: searchString,
                        mode: 'insensitive'
                    }
                },
                include: {
                    authors: true,
                }
            });
        } catch (error) {
            throw error;
        }
    }

    async searchBooksByAuthor(searchString: string, matchType: 'contains' | 'startsWith' | 'endsWith'): Promise<(books & {
        authors: authors
    })[]> {
        try {
            return await this.prisma.books.findMany({
                where: {
                    authors: {
                        name: {
                            [matchType]: searchString,
                            mode: 'insensitive'
                        }
                    }
                },
                include: {
                    authors: true,
                }
            });
        } catch (error) {
            throw error;
        }
    }

    async searchBooksBySinopsis(searchString: string, matchType: 'contains' | 'startsWith' | 'endsWith'): Promise<(books & {
        authors: authors
    })[]> {
        try {
            return await this.prisma.books.findMany({
                where: {
                    synopsis: {
                        [matchType]: searchString,
                        mode: 'insensitive'
                    }
                },
                include: {
                    authors: true,
                }
            });
        } catch (error) {
            throw error;
        }
    }

    async searchBooksByGenre(
        searchString: string,
        matchType: 'contains' | 'startsWith' | 'endsWith' = 'contains'
    ): Promise<(books & { authors: authors })[]> {
        try {
            const genreEnumValues = Object.values(genre_enum);
            let filteredGenres: string[] = [];
            const lowerSearch = searchString.toLowerCase();
            for (const genre of genreEnumValues) {
                const genreLower = genre.toLowerCase();
                if (
                    (matchType === 'contains' && genreLower.includes(lowerSearch)) ||
                    (matchType === 'startsWith' && genreLower.startsWith(lowerSearch)) ||
                    (matchType === 'endsWith' && genreLower.endsWith(lowerSearch))
                ) {
                    filteredGenres.push(genre);
                }
            }

            if (filteredGenres.length === 0) return [];

            return await this.prisma.books.findMany({
                where: {
                    genre: {in: filteredGenres as any}
                },
                include: {
                    authors: true,
                }
            });
        } catch (error) {
            throw error;
        }
    }
}