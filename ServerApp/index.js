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
var db=pgp("postgres://postgres:pass@localhost:5432/ListDb");///!!! put yr pasword here

app.use((req,resp,next)=>{
    resp.setHeader("Access-Control-Allow-Origin","*");
    resp.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    resp.setHeader("Access-Control-Allow-Methods","GET, POST, PUT,DELETE");
    next();
});

app.get('/user/:id',async(req,resp)=>{
    let id=req.params.id;
    console.log(id);
    let user=await db.one(`SELECT * FROM public."Users" WHERE id=${id}`)
    resp.json(user);
})

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

app.delete('/delete/:id',jsonParser, async (req, resp) => {
    let id=req.params.id;
    let resualt=await db.one(`DELETE FROM public."Users" WHERE id=${id} returning id`);
    resualt.message="Success";
    console.log(resualt);
    resp.json(resualt);
});

app.put('/put/:id',jsonParser,async (req,resp)=>{
let id=req.params.id;
if(!id)
resp.sendStatus(404);
let user=await db.one(`SELECT * FROM public."Users" WHERE id=${id}`);
if(!user)
resp.sendStatus(404);
if(!req.body)
resp.sendStatus(404);
let username=req.body.name;
let userage=req.body.age;

await db.none('UPDATE public."Users" SET name=${name}, age=${age} WHERE id=${id}',{
    name:username,
    age:userage,
    id:user.id
})
resp.json({message:"Update was success"});
})

app.listen(port, () => {
    console.log('Server listening on port 3000');
  });