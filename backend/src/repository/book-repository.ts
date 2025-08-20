import {PrismaClient, genre_enum} from '@prisma/client';
import type {Book} from "../domain/book.js";
import {BookGenere} from "../domain/book-genere.js";

const prisma = new PrismaClient();

const genreMap: Record<genre_enum, BookGenere> = {
    [genre_enum.Realismo_m_gico]: BookGenere.REALISMO_MAGICO,
    [genre_enum.Romance]: BookGenere.ROMANCE,
    [genre_enum.Ficci_n]: BookGenere.FICCION,
    [genre_enum.Fantas_a]: BookGenere.FANTASIA,
    [genre_enum.Fantas_a__pica]: BookGenere.FANTASIA_EPICA,
    [genre_enum.Ficci_n_contempor_nea]: BookGenere.FICCION_CONTEMPORANEA,
    [genre_enum.Terror]: BookGenere.TERROR,
    [genre_enum.Distop_a]: BookGenere.DISTOPIA,
    [genre_enum.B_lico]: BookGenere.BELICO,
    [genre_enum.Misterio]: BookGenere.MISTERIO,
    [genre_enum.Ciencia_ficci_n]: BookGenere.CIENCIA_FICCION,
    [genre_enum.Ficci_n_hist_rica]: BookGenere.FICCION_HISTORICA,
    [genre_enum.Misterio_hist_rico]: BookGenere.MISTERIO_HISTORICO,
    [genre_enum.Finanzas_personales]: BookGenere.FINANZAS_PERSONALES,
};

export class PrismaBookRepository {

    async getAllBooks(): Promise<Book[]> {
        const booksFromDb = await prisma.books.findMany({
            include: {
                authors: true
            }
        });
        return booksFromDb.map(book => ({
            ...book,
            publishedAt: book.published_at,
            genre: genreMap[book.genre],
            author: {
                ...book.authors,
                birthDate: book.authors.birth_date
            }
        }));
    }

    async getBookById(id: number): Promise<Book | null> {
        const bookFromDb = await prisma.books.findUnique({
            where: {id},
            include: {
                authors: true
            }
        });

        if (!bookFromDb) {
            return null;
        }

        return {
            ...bookFromDb,
            publishedAt: bookFromDb.published_at,
            genre: genreMap[bookFromDb.genre],
            author: {
                ...bookFromDb.authors,
                birthDate: bookFromDb.authors.birth_date
            }
        };
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

    async getFavoriteBooks(): Promise<Book[]> {
        const favoriteBooksFromDb = await prisma.books.findMany({
            where: {isFavorite: true},
            include: {
                authors: true
            }
        });

        return favoriteBooksFromDb.map(book => ({
            ...book,
            publishedAt: book.published_at,
            genre: genreMap[book.genre],
            author: {
            ...book.authors,
            birthDate: book.authors.birth_date
            }
        }));
    }
}