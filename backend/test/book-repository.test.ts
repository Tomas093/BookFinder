import {jest} from "@jest/globals";
import {PrismaClient} from '@prisma/client';
import {PrismaBookRepository} from '../src/book/repository/book-repository.js';
import {genre_enum} from '@prisma/client';

type BookWithAuthor = {
    id: number;
    title: string;
    synopsis: string;
    genre: genre_enum;
    isFavorite: boolean;
    author_id: number;
    published_at: Date;
    authors: {
        id: number;
        name: string;
    };
};

// Mock PrismaClient with properly typed Jest mocks
const mockPrisma = {
    books: {
        findMany: jest.fn<() => Promise<BookWithAuthor[]>>(),
        findUnique: jest.fn<(args: any) => Promise<BookWithAuthor | null>>(),
        create: jest.fn<(args: any) => Promise<BookWithAuthor>>(),
        update: jest.fn<(args: any) => Promise<any>>(),
    },
} as unknown as PrismaClient;

describe('PrismaBookRepository', () => {
    let repository: PrismaBookRepository;

    beforeEach(() => {
        repository = new PrismaBookRepository(mockPrisma);
        jest.clearAllMocks();
    });

    beforeAll(() => {
        global.Object.values = jest.fn().mockReturnValue([
            'Realismo_m_gico', 'Romance', 'Ficci_n', 'Fantas_a', 'Fantas_a__pica',
            'Ficci_n_contempor_nea', 'Terror', 'Distop_a', 'B_lico', 'Misterio',
            'Ciencia_ficci_n', 'Ficci_n_hist_rica', 'Misterio_hist_rico', 'Finanzas_personales'
        ]) as typeof Object.values;
    });

    describe('getAllBooks', () => {
        it('should return all books with authors', async () => {
            const mockBooks = [
                {
                    id: 1,
                    title: 'Test Book 1',
                    synopsis: 'Test synopsis 1',
                    genre: genre_enum.Ficci_n,
                    isFavorite: false,
                    author_id: 1,
                    published_at: new Date(),
                    authors: {id: 1, name: 'Test Author 1'}
                },
                {
                    id: 2,
                    title: 'Test Book 2',
                    synopsis: 'Test synopsis 2',
                    genre: genre_enum.Ciencia_ficci_n,
                    isFavorite: true,
                    author_id: 2,
                    published_at: new Date(),
                    authors: {id: 2, name: 'Test Author 2'}
                }
            ];

            (mockPrisma.books.findMany as jest.MockedFunction<any>).mockResolvedValue(mockBooks);

            const result = await repository.getAllBooks();

            expect(mockPrisma.books.findMany).toHaveBeenCalledWith({
                include: {
                    authors: true,
                }
            });
            expect(result).toEqual(mockBooks);
        });

        it('should return empty array when no books exist', async () => {
            (mockPrisma.books.findMany as jest.MockedFunction<any>).mockResolvedValue([]);

            const result = await repository.getAllBooks();

            expect(result).toEqual([]);
        });
    });

    describe('getBookById', () => {
        it('should return book with author when found', async () => {
            const mockBook = {
                id: 1,
                title: 'Test Book',
                synopsis: 'Test synopsis',
                genre: genre_enum.Ficci_n,
                isFavorite: false,
                author_id: 1,
                published_at: new Date(),
                authors: {id: 1, name: 'Test Author'}
            };

            (mockPrisma.books.findUnique as jest.MockedFunction<any>).mockResolvedValue(mockBook);

            const result = await repository.getBookById(1);

            expect(mockPrisma.books.findUnique).toHaveBeenCalledWith({
                where: {id: 1},
                include: {
                    authors: true,
                }
            });
            expect(result).toEqual(mockBook);
        });

        it('should return null when book not found', async () => {
            (mockPrisma.books.findUnique as jest.MockedFunction<any>).mockResolvedValue(null);

            const result = await repository.getBookById(999);

            expect(result).toBeNull();
        });
    });

    describe('createBook', () => {
        it('should create and return new book', async () => {
            const bookData = {
                title: 'New Book',
                synopsis: 'New synopsis',
                genre: genre_enum.Ficci_n,
                isFavorite: false,
                author_id: 1,
                published_at: new Date()
            };

            const createdBook = {id: 1, ...bookData};
            (mockPrisma.books.create as jest.MockedFunction<any>).mockResolvedValue(createdBook);

            const result = await repository.createBook(bookData);

            expect(mockPrisma.books.create).toHaveBeenCalledWith({data: bookData});
            expect(result).toEqual(createdBook);
        });

        it('should return null when creation fails', async () => {
            const bookData = {
                title: 'New Book',
                synopsis: 'New synopsis',
                genre: genre_enum.Ficci_n,
                isFavorite: false,
                author_id: 1,
                published_at: new Date()
            };

            (mockPrisma.books.create as jest.MockedFunction<any>).mockRejectedValue(new Error('Database error'));

            const result = await repository.createBook(bookData);

            expect(result).toBeNull();
        });
    });

    describe('addFavoriteBook', () => {
        it('should mark book as favorite', async () => {
            (mockPrisma.books.update as jest.MockedFunction<any>).mockResolvedValue({});

            await repository.addFavoriteBook(1);

            expect(mockPrisma.books.update).toHaveBeenCalledWith({
                where: {id: 1},
                data: {isFavorite: true}
            });
        });
    });

    describe('removeFavoriteBook', () => {
        it('should remove book from favorites', async () => {
            (mockPrisma.books.update as jest.MockedFunction<any>).mockResolvedValue({});

            await repository.removeFavoriteBook(1);

            expect(mockPrisma.books.update).toHaveBeenCalledWith({
                where: {id: 1},
                data: {isFavorite: false}
            });
        });
    });

    describe('getFavoriteBooks', () => {
        it('should return only favorite books', async () => {
            const mockFavoriteBooks = [
                {
                    id: 1,
                    title: 'Favorite Book 1',
                    synopsis: 'Synopsis 1',
                    genre: genre_enum.Ficci_n,
                    isFavorite: true,
                    author_id: 1,
                    published_at: new Date(),
                    authors: {id: 1, name: 'Author 1'}
                },
                {
                    id: 3,
                    title: 'Favorite Book 2',
                    synopsis: 'Synopsis 2',
                    genre: genre_enum.Terror,
                    isFavorite: true,
                    author_id: 2,
                    published_at: new Date(),
                    authors: {id: 2, name: 'Author 2'}
                }
            ];

            (mockPrisma.books.findMany as jest.MockedFunction<any>).mockResolvedValue(mockFavoriteBooks);

            const result = await repository.getFavoriteBooks();

            expect(mockPrisma.books.findMany).toHaveBeenCalledWith({
                where: {isFavorite: true},
                include: {
                    authors: true,
                }
            });
            expect(result).toEqual(mockFavoriteBooks);
        });

        it('should return empty array when no favorites exist', async () => {
            (mockPrisma.books.findMany as jest.MockedFunction<any>).mockResolvedValue([]);

            const result = await repository.getFavoriteBooks();

            expect(result).toEqual([]);
        });
    });

    describe('searchBooksByTitle', () => {
        const mockBooks = [
            {
                id: 1,
                title: 'The Great Gatsby',
                synopsis: 'Classic novel',
                genre: genre_enum.Ficci_n,
                isFavorite: false,
                author_id: 1,
                published_at: new Date(),
                authors: {id: 1, name: 'F. Scott Fitzgerald'}
            }
        ];

        it('should search by title with contains match', async () => {
            (mockPrisma.books.findMany as jest.MockedFunction<any>).mockResolvedValue(mockBooks);

            const result = await repository.searchBooksByTitle('Great', 'contains');

            expect(mockPrisma.books.findMany).toHaveBeenCalledWith({
                where: {
                    title: {
                        contains: 'Great',
                        mode: 'insensitive'
                    }
                },
                include: {
                    authors: true,
                }
            });
            expect(result).toEqual(mockBooks);
        });

        it('should search by title with startsWith match', async () => {
            (mockPrisma.books.findMany as jest.MockedFunction<any>).mockResolvedValue(mockBooks);

            await repository.searchBooksByTitle('The', 'startsWith');

            expect(mockPrisma.books.findMany).toHaveBeenCalledWith({
                where: {
                    title: {
                        startsWith: 'The',
                        mode: 'insensitive'
                    }
                },
                include: {
                    authors: true,
                }
            });
        });

        it('should search by title with endsWith match', async () => {
            (mockPrisma.books.findMany as jest.MockedFunction<any>).mockResolvedValue(mockBooks);

            await repository.searchBooksByTitle('Gatsby', 'endsWith');

            expect(mockPrisma.books.findMany).toHaveBeenCalledWith({
                where: {
                    title: {
                        endsWith: 'Gatsby',
                        mode: 'insensitive'
                    }
                },
                include: {
                    authors: true,
                }
            });
        });

        it('should throw error when database query fails', async () => {
            (mockPrisma.books.findMany as jest.MockedFunction<any>).mockRejectedValue(new Error('Database error'));

            await expect(repository.searchBooksByTitle('Test', 'contains'))
                .rejects.toThrow('Database error');
        });
    });

    describe('searchBooksByAuthor', () => {
        const mockBooks = [
            {
                id: 1,
                title: 'Test Book',
                synopsis: 'Test synopsis',
                genre: genre_enum.Ficci_n,
                isFavorite: false,
                author_id: 1,
                published_at: new Date(),
                authors: {id: 1, name: 'Stephen King'}
            }
        ];

        it('should search by author name with contains match', async () => {
            (mockPrisma.books.findMany as jest.MockedFunction<any>).mockResolvedValue(mockBooks);

            const result = await repository.searchBooksByAuthor('King', 'contains');

            expect(mockPrisma.books.findMany).toHaveBeenCalledWith({
                where: {
                    authors: {
                        name: {
                            contains: 'King',
                            mode: 'insensitive'
                        }
                    }
                },
                include: {
                    authors: true,
                }
            });
            expect(result).toEqual(mockBooks);
        });

        it('should throw error when database query fails', async () => {
            (mockPrisma.books.findMany as jest.MockedFunction<any>).mockRejectedValue(new Error('Database error'));

            await expect(repository.searchBooksByAuthor('Test', 'contains'))
                .rejects.toThrow('Database error');
        });
    });

    describe('searchBooksBySinopsis', () => {
        const mockBooks = [
            {
                id: 1,
                title: 'Test Book',
                synopsis: 'A thrilling adventure story',
                genre: genre_enum.Terror,
                isFavorite: false,
                author_id: 1,
                published_at: new Date(),
                authors: {id: 1, name: 'Test Author'}
            }
        ];

        it('should search by synopsis with contains match', async () => {
            (mockPrisma.books.findMany as jest.MockedFunction<any>).mockResolvedValue(mockBooks);

            const result = await repository.searchBooksBySinopsis('adventure', 'contains');

            expect(mockPrisma.books.findMany).toHaveBeenCalledWith({
                where: {
                    synopsis: {
                        contains: 'adventure',
                        mode: 'insensitive'
                    }
                },
                include: {
                    authors: true,
                }
            });
            expect(result).toEqual(mockBooks);
        });

        it('should throw error when database query fails', async () => {
            (mockPrisma.books.findMany as jest.MockedFunction<any>).mockRejectedValue(new Error('Database error'));

            await expect(repository.searchBooksBySinopsis('Test', 'contains'))
                .rejects.toThrow('Database error');
        });
    });

    describe('searchBooksByGenre', () => {
        const mockBooks = [
            {
                id: 1,
                title: 'Fiction Book',
                synopsis: 'A fictional story',
                genre: genre_enum.Ficci_n,
                isFavorite: false,
                author_id: 1,
                published_at: new Date(),
                authors: {id: 1, name: 'Fiction Author'}
            }
        ];

        it('should search by genre with contains match (default)', async () => {
            (mockPrisma.books.findMany as jest.MockedFunction<any>).mockResolvedValue(mockBooks);

            const result = await repository.searchBooksByGenre('ficci');

            expect(mockPrisma.books.findMany).toHaveBeenCalledWith({
                where: {
                    genre: {in: expect.arrayContaining(['Ficci_n', 'Ficci_n_contempor_nea', 'Ficci_n_hist_rica', 'Ciencia_ficci_n'])}
                },
                include: {
                    authors: true,
                }
            });
            expect(result).toEqual(mockBooks);
        });

        it('should search by genre with startsWith match', async () => {
            (mockPrisma.books.findMany as jest.MockedFunction<any>).mockResolvedValue(mockBooks);

            await repository.searchBooksByGenre('fic', 'startsWith');

            expect(mockPrisma.books.findMany).toHaveBeenCalledWith({
                where: {
                    genre: {in: ['Ficci_n', 'Ficci_n_contempor_nea', 'Ficci_n_hist_rica']}
                },
                include: {
                    authors: true,
                }
            });
        });

        it('should search by genre with endsWith match', async () => {
            (mockPrisma.books.findMany as jest.MockedFunction<any>).mockResolvedValue(mockBooks);

            await repository.searchBooksByGenre('n', 'endsWith');

            expect(mockPrisma.books.findMany).toHaveBeenCalledWith({
                where: {
                    genre: {in: ['Ficci_n', 'Ciencia_ficci_n']}
                },
                include: {
                    authors: true,
                }
            });
        });

        it('should return empty array when no genres match', async () => {
            const result = await repository.searchBooksByGenre('NONEXISTENT');

            expect(result).toEqual([]);
            expect(mockPrisma.books.findMany).not.toHaveBeenCalled();
        });

        it('should be case insensitive', async () => {
            (mockPrisma.books.findMany as jest.MockedFunction<any>).mockResolvedValue(mockBooks);

            await repository.searchBooksByGenre('FICCI');

            expect(mockPrisma.books.findMany).toHaveBeenCalledWith({
                where: {
                    genre: {in: expect.arrayContaining(['Ficci_n', 'Ficci_n_contempor_nea', 'Ficci_n_hist_rica', 'Ciencia_ficci_n'])}
                },
                include: {
                    authors: true,
                }
            });
        });

        it('should throw error when database query fails', async () => {
            (mockPrisma.books.findMany as jest.MockedFunction<any>).mockRejectedValue(new Error('Database error'));

            await expect(repository.searchBooksByGenre('ficci'))
                .rejects.toThrow('Database error');
        });
    });
});