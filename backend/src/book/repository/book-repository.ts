import {PrismaClient} from '@prisma/client';
import type {Book} from "../domain/book.js";


const prisma = new PrismaClient();

export class PrismaBookRepository {

    async getAllBooks() {
        return prisma.books.findMany()
    }

    async getBookById(id: number) {
        return prisma.books.findUnique({
            where: {id}
        })
    }

    async createBook(book: Book) {
        return prisma.books.create({
            data: book
        });
    }




}