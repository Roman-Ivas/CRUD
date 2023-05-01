const express=require("express");
//const {Pool} = require('pg');

// const pool = new Pool({
//     user: 'yourusername',
//     host: 'yourhost',
//     database: 'yourdatabase',
//     password: 'yourpassword',
//     port: 5432,
//   });


const app=express();
const jsonParser=express.json();
const port=3001;

const pgp = require('pg-promise')(/* options */)
var db=pgp("postgres://postgres:17858517qw@localhost:5432/ListDb");

app.use((req,resp,next)=>{
    resp.setHeader("Access-Control-Allow-Origin","*");
    resp.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    resp.setHeader("Access-Control-Allow-Methods","GET, POST, PUT,DELETE");
    next();
});
app.get("/list",jsonParser,async (req,resp)=>{
let user=await db.any('SELECT * FROM "Users"');
resp.json(user)
});


app.post("/create",jsonParser,async (req,resp)=>{
if(!req.body)
resp.statusCode(404)
let username=req.body.name;
let userage=req.body.age;
console.log(userage)
await db.none('INSERT INTO public."Users"(name,age) VALUES(${name},${age})',{
    name:username,
    age:userage
})
resp.json({name:username,age:userage})
})

// app.delete('/delete/:id', async (req, res) => {
//     const { id } = req.params;
  
//     try {
//       const result = await db.result(`
//         DELETE FROM "Users" 
//         WHERE id = $1`,
//         [id]
//       );
//       res.json({ success: true, message: `${result.rowCount} record deleted` });
//     } catch (err) {
//       console.error(err);
//       res.status(500).send('Error deleting record from database');
//     }
//   });


app.listen(port, () => {
    console.log('Server listening on port 3000');
  });