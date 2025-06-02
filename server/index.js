const bodyParser=require('body-parser')
const cors = require('cors'); 
const express = require('express');
const app = express();
const approuter=require('./Routers/AuthRouter')
app.use(express.json());
app.use(cors());

require('dotenv').config()
const PORT=process.env.PORT
require('./Models/dbconfig')

const movierouter = require('./Routers/MovieRouter');
app.use('/', movierouter);

const paymentRoutes = require('./Routers/PaymentRoute');
app.use('/payment', paymentRoutes);

app.use(bodyParser.json());
app.use('/auth',approuter)

app.get('/user',(req,res)=>{
    res.send("server connected")
})
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
  });
  

app.listen(PORT, () => {
    console.log('Server is running on http://localhost:5000');
})
// // const http = require('http');
// // const server = http.createServer((req, res) => {
// //     if( req.url === '/about'){
// //         res.end('hello about');
// //     }
// //     else{
// //         res.end('hello world');
// //     }
// // });
// const express = require('express');
// const app = express();
// app.use(express.json());
// //const router = express.Router();
// //app.use('/router', router);

// app.listen(3000, () => {
//     console.log('Server is running on http://localhost:3000');
// });
// // server.listen(3000, () => {
// //     console.log('Server is running on http://localhost:3000');
// // });