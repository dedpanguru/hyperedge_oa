import express from 'express'
import session from 'express-session' // middle ware that will auto generate the session token
import dotenv from 'dotenv'

dotenv.config() // config env vars -> access thru process.env
const app = express() // intialize app
app.use(session({
    secret: process.env.SECRET || 'secretsecretsecret',
    saveUninitialized: false
}))
app.get('/', (req, res) => {
    res.status(200).send({message:'You are sane'})
})

app.post('/login', (req,res) => {
    if(!req.body.emailId)
        res.status(400).json({message:'Credentials missing'})
    else {
        req.session.admin = req.body.emailId === 'admin@createmytrip.com'
        req.session.user = {
            email:req.body.emailID
        }
        res.status(200).json(req.session.token) // valid request
    }
})

app.post('/seat/reserve', (req, res) => {
    const input = JSON.parse(req.body)
    if(input.seatNumber && input.passengerPhone && input.passengerName && input.passengerAge){
        /*TODO: Query db for taken seats (shortcut = if all seats are taken, reject all reqs to this endpoint), 
        check if input.seatNumber is open (i.e. not already taken), 
        if seat isn't taken, enter in customer information (phone, name, age) into the DB (edit the entry)
        else, reject the request (send 400 status code back)*/
    }
    else
        res.status(400)
})

app.post('/seat/reset', (req,res) => {
    if(!req.body){ // 
        if(req.session.admin){
            /*TODO: DELETE RESERVATIONS IN DB*/
        }
        res.status(401)
    }else
        res.status(400) // bad request
})

const port = process.env.PORT || 3000
app.listen(port, ()=>{
    console.log(`server started on port ${port}`)
})