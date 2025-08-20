import express from 'express';
import cors from 'cors';
import bookRoutes from "./controller/routes/book-routes.js";

const app = express();
const port = 3000;

app.use(cors());

app.use('/book', bookRoutes);

app.get('/', (req, res) => {
    res.send('¡Hola desde el backend con Express y TypeScript!');
});

app.listen(port, () => {
    console.log(`El servidor está corriendo en http://localhost:${port}`);
});