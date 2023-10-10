const express = require('express');
const app = express();
const sql = require("mssql");
require('dotenv').config();

const port = process.env.PORT || 3400; // Use 3000 as the default if PORT is not defined

// Define a route


// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', 'https://musical-snickerdoodle-08c739.netlify.app' );
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   next();
// });

app.get('/', (req, res) => {
  res.send('Hello, Express!');
});
app.get('/ayush', (req, res)=>{
    res.send("ayush")
})

const config = {
  user: process.env.DB_USER, // better stored in an app setting such as process.env.DB_USER
  password: process.env.DB_PASSWORD, // better stored in an app setting such as process.env.DB_PASSWORD
  server: process.env.DB_SERVER, // better stored in an app setting such as process.env.DB_SERVER
  port: process.env.DB_PORT, // optional, defaults to 1433, better stored in an app setting such as process.env.DB_PORT
  database: process.env.DB_NAME, // better stored in an app setting such as process.env.DB_NAME
  authentication: {
    type:"default",
  },
  options: {
    encrypt: true,
  },
};
connectAndQuery();
async function connectAndQuery() {
  try {
    var poolConnection = await sql.connect(config);

    console.log("Reading rows from the Table...");
    var resultSet = await poolConnection.request().query(`SELECT * from nayi`);

    console.log(resultSet);


    // // output column headers
    console.log("connected....");
    // // close connection only when we're certain application is finished
  } catch (err) {

    console.log(":Errore")
    console.error(err.message);
  }
}


app.get("/about", async (req, res) => {
  await connectAndQuery();
  sql.query("select * from test", (error, data) => {
    if (error) {
      console.log("error");
      console.log(error);
      res.send({ error: "error" });
      return;
    } else {
      res.send({ name: `${data.recordset[1].names}` });
    }
  });
});





// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});