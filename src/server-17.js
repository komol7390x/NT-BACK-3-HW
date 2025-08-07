import express from "express";
import config from "./config/config.js";
import { allFunction } from "./app.js";

const server=express()

await allFunction(server)

const PORT=config.PORT

server.listen(PORT,()=>console.log('Server is runing PORT:',PORT))