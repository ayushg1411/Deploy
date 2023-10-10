const express = require('express');
const app = express();
const sql = require("mssql");
require('dotenv').config();

const port = process.env.PORT || 3400; // Use 3000 as the default if PORT is not defined

// Define a route


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://musical-snickerdoodle-08c739.netlify.app' );
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

const config = {
  user: "Ayush", // better stored in an app setting such as process.env.DB_USER
  password: "Data@12345", // better stored in an app setting such as process.env.DB_PASSWORD
  server: "render.database.windows.net", // better stored in an app setting such as process.env.DB_SERVER
  port: 1433, // optional, defaults to 1433, better stored in an app setting such as process.env.DB_PORT
  database: "Parking", // better stored in an app setting such as process.env.DB_NAME
  authentication: {
    type: "default",
  },
  options: {
    encrypt: true,
  },
};

async function connectAndQuery() {
  try {
    var poolConnection = await sql.connect(config);

    // console.log("Reading rows from the Table...");
    // var resultSet = await poolConnection.request().query(`SELECT * from test`);

    // console.log(resultSet.recordset[0].id);

    // const arg="select * from test";
    // var ress=await poolConnection.request().query(arg);
    // console.log(ress);

    // // output column headers
    console.log("connected....");
    // // close connection only when we're certain application is finished
  } catch (err) {
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