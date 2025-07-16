import express from 'express';
import { config } from 'dotenv';
import {join} from 'path'

import routerCategory from './routers/category.route.js';
import routerProduct from './routers/product.route.js';
import routerReview from './routers/review.route.js'
import { connectDB } from './database/connect.databasa.js';
config()

await connectDB()
const server=express();
server.use(express.json());

server.use('/category',routerCategory);
server.use('/product',routerProduct);
server.use('/review',routerReview);

server.use((_,res)=>{
    res.status(404).sendFile(join(process.cwd(),'public' ,'image', '404error.png'));
})
const PORT=+process.env.PORT
server.listen(PORT,()=>console.log('Server is runing PORT:',PORT))