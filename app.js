const express = require('express');
const app = express();
require('dotenv').config();

const port = process.env.PORT || 3000; // Use 3000 as the default if PORT is not defined

// Define a route


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://musical-snickerdoodle-08c739.netlify.app');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.get('/', (req, res) => {
  res.send('Hello, Express!');
});
app.get('/ayush', (req, res)=>{
    res.send("ayush")
})
app.get('/about', (req, res)=>{
  res.send({"name":"ayush gupta"})
})

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
