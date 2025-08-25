import {type authors, type books, genre_enum, PrismaClient} from '@prisma/client';

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
            return await prisma.books.create({data});
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
            where: {isFavorite: true},
            include: {
                authors: true,
            }
        });
    }

    // Separate search methods for each field type
    async searchBooksByTitle(searchString: string, matchType: 'contains' | 'startsWith' | 'endsWith'): Promise<(books & {
        authors: authors
    })[]> {
        try {
            console.log(`Searching by title: ${searchString} with ${matchType}`);

            return await prisma.books.findMany({
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
            console.error('Error in searchBooksByTitle:', error);
            throw error;
        }
    }

    async searchBooksByAuthor(searchString: string, matchType: 'contains' | 'startsWith' | 'endsWith'): Promise<(books & {
        authors: authors
    })[]> {
        try {
            console.log(`Searching by author: ${searchString} with ${matchType}`);

            return await prisma.books.findMany({
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
            console.error('Error in searchBooksByAuthor:', error);
            throw error;
        }
    }

    async searchBooksBySinopsis(searchString: string, matchType: 'contains' | 'startsWith' | 'endsWith'): Promise<(books & {
        authors: authors
    })[]> {
        try {
            console.log(`Searching by synopsis: ${searchString} with ${matchType}`);

            return await prisma.books.findMany({
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
            console.error('Error in searchBooksBySinopsis:', error);
            throw error;
        }
    }

    async searchBooksByGenre(
        searchString: string,
        matchType: 'contains' | 'startsWith' | 'endsWith' = 'contains'
    ): Promise<(books & { authors: authors })[]> {
        try {
            // Get all possible genre_enum values
            const genreEnumValues = Object.values(genre_enum);

            // Filter enum values based on matchType
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

            return await prisma.books.findMany({
                where: {
                    genre: { in: filteredGenres as any }
                },
                include: {
                    authors: true,
                }
            });
        } catch (error) {
            console.error('Error in searchBooksByGenre:', error);
            throw error;
        }
    }
}