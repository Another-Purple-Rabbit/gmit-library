import mysql from 'mysql';
import { config } from 'dotenv';

config({path:'./config/.env'});

const connPool = mysql.createPool({
    connectionLimit: process.env.DB_CONNECTION_LIMIT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME});

    let db = {};

db.getAllBooks = () => {
    return new Promise((resolve, reject) => {
        connPool.query('SELECT * FROM books', (err, books) => {
            if (err) reject(err);
            return resolve(books);
        });
    });
}

db.getOneBook = (id) => {
    return new Promise((resolve, reject) => {
        connPool.query('SELECT * FROM books WHERE id=?', [id], (err, book) => {
            if (err) reject(err);
            return resolve(book);
        })
    })
}

db.addBook = (title, author, category, amount, year, publisher) => {
    return new Promise((resolve, reject) => {
        connPool.query('INSERT INTO books (title, author, category, amount, year_of_issue, publisher, added_date) VALUES (?, ?, ?, ?, ?, ?, NOW())', [title, author, category, amount, year, publisher], (err, result) => {
            if (err) return reject(err);
            return resolve(result.insertId);
        });
    });
}

db.deleteBook = (id) => {
    return new Promise((resolve, reject) => {
        connPool.query('DELETE FROM books where id = ?', [id], (err, result) => {
            if (err) return reject(err);
            return resolve(result);
        });
    });
}

db.authUser = (username) => {
    return new Promise((resolve, reject) => {
        connPool.query('SELECT user_id, password FROM auth WHERE username=?', [username], (err, res) => {
            if (err) return reject(err);
            return resolve(res);
        })
    })
}

db.addUser = (credentials) => {
    const { name, surname, patronymic, role, faculty, username, passstring } = credentials;
    return new Promise((resolve, reject) => {
        connPool.query('INSERT INTO users (name, surname, patronymic, role, faculty) VALUES (?, ?, ?, ?, ?)', 
                        [name, surname, patronymic, role, faculty], (err, res) => {
                            if (err) return reject(err);
                            connPool.query('INSERT INTO auth (user_id, username, password) VALUES (?, ? , ?)',
                            [res.insertId, username, passstring], (err, res) => {
                                if (err) return reject(err);
                                return resolve(res);
                            });
                        });
    });
}

export default db;