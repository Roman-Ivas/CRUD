const express=require("express");
const {Pool} = require('pg');


const pool = new Pool({
    user: 'yourusername',
    host: 'yourhost',
    database: 'yourdatabase',
    password: 'yourpassword',
    port: 5432,
  });


  const app=express();
const jsonParser=express.json();
const port=3000;


app.use((req,resp,next)=>{
    resp.setHeader("Access-Control-Allow-Origin","*");
    resp.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    resp.setHeader("Access-Control-Allow-Methods","GET, POST, PUT,DELETE");
    next();
});
app.get("/list",async (req,resp)=>{
    try{
        const client = await pool.connect();
        const result = await client.query(getAllItemsQuery);
        const items = result.rows;
        res.json(items);
        client.release();
    }
    catch(err){
        console.error(err);
        resp.status(500).json({error:"Something's gone bad"})
    }
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
  });