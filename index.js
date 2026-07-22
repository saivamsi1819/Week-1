import express from 'express';

const app = express() ;
const PORT = 3000 ;

const tasks = [
    {id : 1 , title:"do flyrank assignment" , done: true},
    {id: 2 , title:"do leetcode problems" , done: false},
    {id: 3 , title:"do codeforces problems", done: false}
];

const descirbe = {
         "name": "Task API", 
         "version": "1.0", 
         "endpoints": ["/tasks"] 
};

const status = { "status": "ok" } ;

app.use(express.json()) ;

// STAGE - 1
app.get('/',(req,res)=>{
    res.json(descirbe) ;
    // res.status(200).end(JSON.stringify(data)) ;
});

app.get('/health' , (req,res)=>{
    res.json(status);
    //res.status(200).end(JSON.stringify(data)) ;
});

// STAGE - 2
app.get('/tasks',(req,res)=>{
    res.json(tasks);
});

app.get('/tasks/:id',(req,res)=>{
    const id = req.params.id ;
    let exists = false ;

    const obj = tasks.filter((task)=>{
        if(task.id == id){
            exists = true ;
            return task ;
        }
    });

    if(exists){
        res.json(obj) ;
    }else{
        res.status(404).json({error : `Task ${id} not found`});
    }
});

app.get('/tasks/:',)


// STAGE - 0
app.listen(PORT,()=>{
    console.log(`App is listening to port: ${PORT}`) ;
});