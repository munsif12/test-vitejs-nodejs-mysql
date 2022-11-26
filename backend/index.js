const express = require('express');
const { db, connectDb } = require('./database');
const cors = require('cors');
const app = express();

app.use(cors())
app.use(express.json());//will convert the incomming json object to js object

// http://localhost:5000/
app.get('/', (request, response) => {
    return response.send('Hello World');
})



// http://localhost:5000/users
app.get('/users', (request, response) => {
    const query = `SELECT * FROM users`;
    db.query(query, (err, result) => {
        if (err) {
            console.log(err.message)
        }
        console.log(result);
        return response.status(200).json({ sucesss: true, users: result });
    })
})


// http://localhost:5000/register
app.post('/register', (request, response) => {
    const query = `INSERT INTO users(name,email) VALUES(? , ?)`;
    const userData = Object.values(request.body) //[ 'munsf', 'ali' ]

    db.query(query, userData, (err, result) => {
        if (err) {
            console.log(err.message)
        }
        return response.status(200).json({ sucesss: true, message: 'User registered successfully' });
    })
})


// http://localhost:5000/signin
app.post('/signin', (request, response) => {
    console.log(request.body)
    const query = `SELECT * FROM users WHERE email = ?`;
    db.query(query, [request.body.email], (err, result) => {
        if (err) {
            console.log('err', err.message)
        }
        console.log(result);
        if (result.length <= 0) return response.status(400).json({ sucesss: false, message: 'Invalid cradentials' });
        return response.status(200).json({ sucesss: true, message: 'User login successfully', user: result });
    })
})

app.listen(5000, () => {
    console.log("Server is running on port 5000");
    connectDb()
})