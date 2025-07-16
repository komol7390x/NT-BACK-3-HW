import express from 'express';
import { config } from 'dotenv';
import { join } from 'path'

import routerAuthor from './routers/author.route.js';
import routerBooks from './routers/books.route.js';
import routerOrders from './routers/orders.route.js'
import { connectDB } from './database/connect.databasa.js';
config()

await connectDB()
const server = express();
server.use(express.json());

server.use('/author', routerAuthor);
server.use('/books', routerBooks);
server.use('/orders', routerOrders);

server.use((_, res) => {
    res.status(404).sendFile(join(process.cwd(), 'public', 'image', '404error.png'));
})
const PORT = +process.env.PORT
server.listen(PORT, () => console.log('Server is runing PORT:', PORT))