const http = require('http');

/*const data = {
    surname: 'Рахмонкулов',
    name: 'Оламафруз',
    patronymic: 'Какеготамхзвович',
    role: 1,
    faculty: 2,
    username: 'olam',
    password: '540'
};*/
const data = {   
    username: 'olam',
    password: '540' };

const body = JSON.stringify(data);
let resBody = '';

const req = http.request({
    host: 'localhost',
    port: 9000,
    path: '/api/users/auth',
    method: 'POST',
    headers: {
        'Content-Type':'application/json; charset=utf-8',
        length: body.length
            }
    }, 
    (res) => {res.on('data', chunk => {resBody+=chunk}); console.log(resBody)});

req.write(body);
req.end();