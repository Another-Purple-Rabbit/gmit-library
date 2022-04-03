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

db.getSession = (sid) => {
    return new Promise((resolve, reject) => {
        connPool.query('SELECT user_id, lifetime, created_date FROM sessions WHERE id=?',[sid], (err, result) => {
            if (err) return reject(err);
            return resolve(result);
        })
    })
}

db.authUser = (username) => {
    return new Promise((resolve, reject) => {
        connPool.query('SELECT user_id, password FROM auth WHERE username=?', [username], (err, res) => {
            if (err) return reject(err);
            return resolve(res);
        })
    })
}

db.getUserInfo = (uid) => {
    return new Promise((resolve, reject) => {
        connPool.query('SELECT surname, name, patronymic, status, faculty, reg_date FROM users WHERE id=?', 
        [uid], 
        (err, res) => {
            if (err) return reject(err);
            return resolve(res);
        })
    })
}

db.createSession = (params) => {
    const { id, uid } = params;
    return new Promise((resolve, reject) => {
        connPool.query('INSERT INTO sessions (id, user_id, lifetime, created_date) VALUES (?, ?, ?, NOW())',
                        [id, uid, 48], (err, res) => {
                            if (err) return reject(err);
                            return resolve(id);
                        })
    })
}

db.addUser = (credentials) => {
    const { id, name, surname, patronymic, status, faculty, username, passstring } = credentials;
    return new Promise((resolve, reject) => {
        connPool.query('INSERT INTO users (id, name, surname, patronymic, status, faculty) VALUES (?, ?, ?, ?, ?, ?)', 
                        [id, name, surname, patronymic, status, faculty], (err, res) => {
                            if (err) return reject(err);
                            connPool.query('INSERT INTO auth (user_id, username, password) VALUES (?, ? , ?)',
                            [id, username, passstring], (err, res) => {
                                if (err) return reject(err);
                                return resolve(res);
                            });
                        });
    });
}

export default db;