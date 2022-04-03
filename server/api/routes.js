import express from "express";
import { pbkdf2Sync, randomBytes, randomUUID } from 'crypto';
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

apiRouter.param('uid', async (req, res, next, uid) => {
  try {
    const user = await db.getUserInfo(uid);
    req.user = user;
    next();
  } catch (e) {
    res.sendStatus(500);
  }
})

apiRouter.get('/users/:uid', (req, res) => {
  res.status(200).send(JSON.stringify(req.user[0]));
})

apiRouter.post('/books/add', async (req, res) => {
  const { title, author, category, amount, year, publisher } = req.body;
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
  const { status, faculty } = req.body;
  const { username, password } = req.body;
  const salt = randomBytes(32).toString('base64');
  const derivedKey = pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  const passstring = [derivedKey, salt].join(',');
  const id = randomUUID();
  try {
    const result = await db.addUser({id, name, surname, patronymic, status, faculty, username, passstring})
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
        
        const sessionId = await db.createSession({id: randomUUID(), uid: result[0].user_id});
        res.setHeader('Content-Type','application-json');
        res.status(200);
        res.end(JSON.stringify({sid: sessionId}));
      
      } else { res.status(200).json({error: 'UIP'}); } 
    } else { res.status(200).json({error: 'UNF'}); }
  } catch(e) {
    console.log(e);
    res.sendStatus(500);
  }
}); 

apiRouter.post('/users/session/check', async (req,res) => {
  const { sid } = req.body;
  const session = await db.getSession(sid);
  if (session.length !== 0) {
    const created_time = session[0].created_date.getTime() / 1000;
    const expiration_time = created_time + session[0].lifetime * 60;
    if (Date.now().getTime / 1000 > expiration_time) {
      res.status(200).end(JSON.stringify({status: 'expired'}));
    } else {
      res.status(200).end(JSON.stringify({status: 'alive', uid: session[0].user_id}));
    }
  } else {
      res.status(200).end(JSON.stringify({status:'none'}));
  }
})

export default apiRouter;