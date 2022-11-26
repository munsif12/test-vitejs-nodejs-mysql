const mysql2 = require('mysql2');


const db = mysql2.createConnection({
    host: 'localhost',
    user: 'munsif',
    password: 'munsif1234',
    database: 'world'
});


const connectDb = () => {
    db.connect((err) => {
        if (err) {
            throw err;
        }
        console.log("Connected to database");
    });
}

module.exports = { db, connectDb };
