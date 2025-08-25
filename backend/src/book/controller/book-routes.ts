import {type Request, type Response, Router} from 'express';
import {BookService} from '../service/book-service.js';

const router = Router();
const bookService = new BookService();

router.get('/', async (req: Request, res: Response): Promise<void> => {
    try {
        const books = await bookService.getAllBooks();
        res.status(200).json(books);
    } catch (error) {
        console.error('Error in GET /', error);
        res.status(500).json({message: 'Error retrieving books'});
    }
});

router.get('/search', async (req: Request, res: Response): Promise<void> => {
    try {
        const {
            searchString = '',
            matchType = 'contains',
            searchField = 'title',
        } = req.query as {
            searchString?: string;
            matchType?: string;
            searchField?: string;
        };

        console.log('Search params:', {searchString, matchType, searchField});

        if (!searchString) {
            res.status(200).json([]);
            return;
        }

        const allowedMatch = ['contains', 'startsWith', 'endsWith'];
        const allowedFields = ['title', 'author', 'genre', 'synopsis'];

        if (!allowedMatch.includes(matchType)) {
            res.status(400).json({
                message: `Invalid matchType: ${matchType}. Allowed: ${allowedMatch.join(', ')}`,
            });
            return;
        }

        if (!allowedFields.includes(searchField)) {
            res.status(400).json({
                message: `Invalid searchField: ${searchField}. Allowed: ${allowedFields.join(', ')}`,
            });
            return;
        }

        const safeMatchType = matchType as 'contains' | 'startsWith' | 'endsWith';
        const safeSearchField = searchField as 'title' | 'author' | 'genre' | 'synopsis';

        console.log('Safe params:', {searchString, safeMatchType, safeSearchField});

        const results = await bookService.searchBooks(searchString, safeMatchType, safeSearchField);

        console.log('Search results count:', results.length);
        res.status(200).json(results);
    } catch (error) {
        console.error('Error in GET /search:', error);
        res.status(500).json({message: 'Error searching books'});
    }
});

router.get('/favorites', async (req: Request, res: Response): Promise<void> => {
    try {
        const books = await bookService.getFavoriteBooks();
        res.status(200).json(books);
    } catch (error) {
        console.error('Error in GET /favorites:', error);
        res.status(500).json({message: 'Error retrieving favorite books'});
    }
});

router.get('/:id', async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id!);

        if (isNaN(id)) {
            res.status(400).json({message: 'Invalid book ID'});
            return;
        }

        const book = await bookService.getBookById(id);
        if (book) {
            res.status(200).json(book);
        } else {
            res.status(404).json({message: `Book with id ${id} not found`});
        }
    } catch (error) {
        console.error('Error in GET /:id:', error);
        res.status(500).json({message: 'Error retrieving book'});
    }
});

router.put('/:id/favorite', async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id!);

        if (isNaN(id)) {
            res.status(400).json({message: 'Invalid book ID'});
            return;
        }

        await bookService.addFavoriteBook(id);
        res.status(200).json({message: `Book with id ${id} marked as favorite`});
    } catch (error) {
        console.error('Error in PUT /:id/favorite:', error);
        res.status(500).json({message: 'Error updating book'});
    }
});

router.delete('/:id/favorite', async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id!);

        if (isNaN(id)) {
            res.status(400).json({message: 'Invalid book ID'});
            return;
        }

        await bookService.removeFavoriteBook(id);
        res.status(200).json({message: `Book with id ${id} removed from favorites`});
    } catch (error) {
        console.error('Error in DELETE /:id/favorite:', error);
        res.status(500).json({message: 'Error updating book'});
    }
});

export default router;