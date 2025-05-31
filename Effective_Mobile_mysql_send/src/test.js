//const { Pool } = require('pg');
import  pkg from 'pg';
import  pg from 'pg';
const { Pool } = pkg;
const { Clientl } = pg;
//const client = new Pool({user: 'localhost', user: 'postgres', password: '1312'})
//const client = new Clientl({user: 'localhost',database: 'postgres', user: 'postgres',port: 5432, password: '1312'})

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'my_memo_list',
    password: '1312',
    port: 5432,
    });

    const client = new Clientl({
        user: 'postgres',
        host: 'localhost',
        database: 'my_memo_list',
        password: '1312',
        port: 5432,
        });
  

//     pool.query('SELECT * FROM memo', (err, res) => {
//         if (err) {
//         console.log(err);
//         console.log(res);
//         } else {
//         console.log(res.rows);
//         }
//         });

const dbQuery = client.query(`SELECT FROM pg_database WHERE datname = $1`, 'my_memo_list');
console.log(dbQuery);      