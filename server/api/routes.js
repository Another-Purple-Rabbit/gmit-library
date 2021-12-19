import express from "express";
import { pbkdf2Sync, randomBytes } from 'crypto';
import db from "./db.js";
const apiRouter = express.Router();

apiRouter.get('/books/all', async (req, res) => {
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
    res.sendStatus(500);
  }
});

apiRouter.post('/users/add', async (req, res) => {
  const { name, surname, patronymic } = req.body;
  const { role, faculty } = req.body;
  const { username, password } = req.body;
  const salt = randomBytes(32).toString('base64');
  const derivedKey = pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  const passstring = [derivedKey, salt].join(',');
  try {
    const result = await db.addUser({name, surname, patronymic, role, faculty, username, passstring})
    res.status(200).json(result);
  }
  catch(e) {
    console.log(e);
    res.sendStatus(500);
  }
});

apiRouter.post('/users/auth', async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await db.authUser(username);
    if (result.length !== 0) { 
      const splitPass = result[0].password.split(',');
      const comparedHash = pbkdf2Sync(password, splitPass[1], 1000, 64, 'sha512').toString('hex');
      if (comparedHash === splitPass[0]) {
        console.log('Ok!');
        res.status(200).json(result[0].user_id);
      } else { 
        console.log('Invalid password!');
        res.status(200).json('Invalid password'); } 
    } else {
        console.log('User not found'); 
        res.status(200).json("User not found!");
    }
  } catch(e) {
    console.log(e);
    res.sendStatus(500);
  }
}); 

export default apiRouter;