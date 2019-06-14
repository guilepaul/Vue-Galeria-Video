const mysql = require('mysql')

let connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_galeria_video'
})

module.exports = connection