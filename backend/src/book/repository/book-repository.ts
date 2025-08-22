import {type authors, type books, PrismaClient} from '@prisma/client';



const prisma = new PrismaClient();

export class PrismaBookRepository {

    async getAllBooks() {
        return prisma.books.findMany({
            include: {
                authors: true,
            }
        });
    }

    async getBookById(id: number) {
        return prisma.books.findUnique({
            where: {id},
            include: {
                authors: true,
            }
        })
    }

    async createBook(data: Omit<books, 'id'>): Promise<books | null> {
        try {
            return await prisma.books.create({ data });
        } catch {
            return null;
        }
    }

    async addFavoriteBook(id: number): Promise<void> {
        await prisma.books.update({
            where: {id},
            data: {isFavorite: true}
        });
    }

    async removeFavoriteBook(id: number): Promise<void> {
        await prisma.books.update({
            where: {id},
            data: {isFavorite: false}
        });
    }

    async getFavoriteBooks(): Promise<(books & { authors: authors })[]> {
        return prisma.books.findMany({
            where: { isFavorite: true },
            include: {
                authors: true,
            }
        });
    }

    async searchBooks(query: {
        title?: { contains?: string; startsWith?: string; endsWith?: string };
        sinopsis?: { contains?: string; startsWith?: string; endsWith?: string };
        genre?: { equals?: string };
        author?: { name: { contains?: string; startsWith?: string; endsWith?: string } };
    }) {
        const where: any = {};

        if (query.title) {
            where.title = query.title;
        }
        if (query.sinopsis) {
            where.sinopsis = query.sinopsis;
        }
        if (query.genre) {
            where.genre = query.genre;
        }
        if (query.author) {
            where.authors = {
                some: {
                    name: query.author.name
                }
            };
        }

        return prisma.books.findMany({
            where,
            include: {
                authors: true,
            }
        });
    }

}