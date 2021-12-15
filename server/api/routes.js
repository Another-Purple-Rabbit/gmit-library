import express from "express";
import db from "./db.js";
const apiRouter = express.Router();

apiRouter.get('/books/all', async (req, res, next) => {
  try {
    const books = await db.getAllBooks();
    res.status(200).json({books})
  }
  catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

apiRouter.param('bookId', async (req, res, next, bookId) => {
  try {  
    const book = await db.getOneBook(bookId);
    req.book = book;
    next();
  } catch (e) {
    res.sendStatus(500);
  }
});

apiRouter.get('/books/single/:bookId', (req, res) => {
  res.status(200).json(req.book);
});

apiRouter.post('/books/add', async (req, res) => {
  const title = req.body.title; const author = req.body.author;
  const category = req.body.category; const amount = req.body.amount;
  const year = req.body.year; const publisher = req.body.publisher;
  try {
    const result = await db.addBook(title, author, category, amount, year, publisher);
    res.status(200).json(result);
  }
  catch(e) {
    console.log(e);
    res.sendStatus(500);
  }
});


export default apiRouter;