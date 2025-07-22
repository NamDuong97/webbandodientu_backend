import express from 'express'

const app = express()
const hostname = 'localhost'
const port = 8071

app.get('/', function(req, res){
 res.send("hello")
})

app.listen(port, hostname, ()=>{
    console.log(`server da chay tai duong dan http://${hostname}:${port}`)
})