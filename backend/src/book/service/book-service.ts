import {type Request, type Response, Router} from 'express';
    import { BookService } from '../service/book-service.js';
    
    const router = Router();
    const bookService = new BookService();

    router.get('/', async (_req: Request, res: Response) => {
        try {
            const books = await bookService.getAllBooks();
            res.status(200).json(books);
        } catch (error) {
            console.error('Error in GET /book route:', error);
            res.status(500).json({message: 'Error retrieving books'});
        }
    });

    // router.get('/favorites', async (_req: Request, res: Response) => {
    //     try {
    //         const books = await bookService.getFavoriteBooks();
    //         res.status(200).json(books);
    //     } catch (error) {
    //         res.status(500).json({message: 'Error retrieving favorite books'});
    //     }
    // });
    //
    // router.get('/:id', async (req: Request, res: Response) => {
    //     try {
    //         const id = parseInt(req.params.id!);
    //         const book = await bookService.getBookById(id);
    //         if (book) {
    //             res.status(200).json(book);
    //         } else {
    //             res.status(404).json({message: `Book with id ${id} not found`});
    //         }
    //     } catch (error) {
    //         res.status(500).json({message: 'Error retrieving book'});
    //     }
    // });
    //
    // router.put('/:id/favorite', async (req: Request, res: Response) => {
    //     try {
    //         const id = parseInt(req.params.id!);
    //         await bookService.addFavoriteBook(id);
    //         res.status(200).json({message: `Book with id ${id} marked as favorite`});
    //     } catch (error) {
    //         res.status(500).json({message: 'Error updating book'});
    //     }
    // });
    //
    // router.delete('/:id/favorite', async (req: Request, res: Response) => {
    //     try {
    //         const id = parseInt(req.params.id!);
    //         await bookService.removeFavoriteBook(id);
    //         res.status(200).json({message: `Book with id ${id} removed from favorites`});
    //     } catch (error) {
    //         res.status(500).json({message: 'Error updating book'});
    //     }
    // });


    export default router;