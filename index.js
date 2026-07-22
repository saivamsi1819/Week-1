import express from 'express';

const app = express() ;
const PORT = 3000 ;

app.get('/',(req,res)=>{
    res.status(200).end("Hello World") ;
});


app.listen(PORT,()=>{
    console.log(`App is listening to port: ${PORT}`) ;
});