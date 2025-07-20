import express from 'express';
import { config } from 'dotenv';
import { join } from 'path'

import routerComment from './routers/comments.route.js';
import routerUsers from './routers/users.route.js';
import routerSubscription from './routers/subscriptions.route.js'
import routerVideos from './routers/videos.route.js';

import { connectDB } from './database/connect.databasa.js';
config()


await connectDB()
const server = express();
server.use(express.json());

server.use('/comment', routerComment);
server.use('/users', routerUsers);
server.use('/subscription', routerSubscription);
server.use('/videos', routerVideos);

server.use((_, res) => {
    res.status(404).sendFile(join(process.cwd(), 'public', 'image', '404error.png'));
})
const PORT = +process.env.PORT || 5000
server.listen(PORT, () => console.log('Server is runing PORT:', PORT))