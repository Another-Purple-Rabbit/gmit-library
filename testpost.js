const http = require('http');

const data = '{"title":"Дорожные работы для чайников", "author":"А.Ноним", "category":"2", "amount":"5", "year":"2015", "publisher":"Худжанд"}';
let resBody = '';

const req = http.request({
    host: 'localhost',
    port: 8080,
    path: '/api/books/add',
    method: 'POST',
    headers: {
        'Content-Type':'application/json; charset=utf-8',
        length: data.length
            }
    }, 
    (res) => {res.on('data', chunk => {resBody+=chunk}); console.log(resBody)});

req.write(data);
req.end();