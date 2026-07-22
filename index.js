import express from 'express';

const app = express() ;
const PORT = 3000 ;

const descirbe = {
         "name": "Task API", 
         "version": "1.0", 
         "endpoints": ["/tasks"] 
};

const status = { "status": "ok" } ;

app.use(express.json()) ;

app.get('/',(req,res)=>{
    
    res.json(descirbe) ;
    // res.status(200).end(JSON.stringify(data)) ;
});

app.get('/health' , (req,res)=>{
    res.json(status);
    //res.status(200).end(JSON.stringify(data)) ;
});

app.listen(PORT,()=>{
    console.log(`App is listening to port: ${PORT}`) ;
});