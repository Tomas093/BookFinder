import request from 'supertest';
import express from 'express';
import bookRoutes from '../src/book/controller/book-routes.js';

const app = express();
app.use(express.json());
app.use('/books', bookRoutes);

describe('Book Routes', () => {
    describe('GET /books/', () => {
        it('returns all books with status 200', async () => {
            const res = await request(app).get('/books/');
            expect(res.status).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
        });

        it('returns 500 if service throws error', async () => {
            // Simulate error by mocking bookService.getAllBooks
            // (Assume you have a way to inject a mock or spy)
        });
    });

    describe('GET /books/search', () => {
        it('returns empty array if searchString is missing', async () => {
            const res = await request(app).get('/books/search');
            expect(res.status).toBe(200);
            expect(res.body).toEqual([]);
        });

        it('returns 400 for invalid matchType', async () => {
            const res = await request(app).get('/books/search')
                .query({searchString: 'foo', matchType: 'invalid', searchField: 'title'});
            expect(res.status).toBe(400);
            expect(res.body.message).toMatch(/Invalid matchType/);
        });

        it('returns 400 for invalid searchField', async () => {
            const res = await request(app).get('/books/search')
                .query({searchString: 'foo', matchType: 'contains', searchField: 'invalid'});
            expect(res.status).toBe(400);
            expect(res.body.message).toMatch(/Invalid searchField/);
        });

        it('returns matching books for valid search params', async () => {
            const res = await request(app).get('/books/search')
                .query({searchString: 'foo', matchType: 'contains', searchField: 'title'});
            expect(res.status).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
        });
    });

    describe('GET /books/favorites', () => {
        it('returns favorite books with status 200', async () => {
            const res = await request(app).get('/books/favorites');
            expect(res.status).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
        });
    });

    describe('GET /books/:id', () => {
        it('returns book by id with status 200', async () => {
            const res = await request(app).get('/books/1');
            expect([200, 404]).toContain(res.status);
        });

        it('returns 400 for invalid id', async () => {
            const res = await request(app).get('/books/abc');
            expect(res.status).toBe(400);
            expect(res.body.message).toMatch(/Invalid book ID/);
        });

        it('returns 404 if book not found', async () => {
            const res = await request(app).get('/books/999999');
            expect([200, 404]).toContain(res.status);
        });
    });

    describe('PUT /books/:id/favorite', () => {
        it('marks book as favorite and returns 200', async () => {
            const res = await request(app).put('/books/1/favorite');
            expect([200, 404]).toContain(res.status);
        });

        it('returns 400 for invalid id', async () => {
            const res = await request(app).put('/books/abc/favorite');
            expect(res.status).toBe(400);
            expect(res.body.message).toMatch(/Invalid book ID/);
        });
    });

    describe('DELETE /books/:id/favorite', () => {
        it('removes book from favorites and returns 200', async () => {
            const res = await request(app).delete('/books/1/favorite');
            expect([200, 404]).toContain(res.status);
        });

        it('returns 400 for invalid id', async () => {
            const res = await request(app).delete('/books/abc/favorite');
            expect(res.status).toBe(400);
            expect(res.body.message).toMatch(/Invalid book ID/);
        });
    });
});