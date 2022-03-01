import express from 'express';
import session from 'express-session';
import dotenv from 'dotenv';

dotenv.config()
// quick sanity check
const app = express();
app.get('/', (req, res) => {
    res.send({message:'You are sane'})
})
const port = process.env.PORT || 3000
app.listen(`http://${process.env.HOST}:${port}/`, ()=>{
    console.log(`server started on port ${port}`)
})