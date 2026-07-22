import express from 'express';

const app = express() ;
const PORT = 3000 ;

let tasks = [
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

// --------------------------------------------------
// STAGE - 1
app.get('/',(req,res)=>{
    res.json(descirbe) ;
    // res.status(200).end(JSON.stringify(data)) ;
});

app.get('/health' , (req,res)=>{
    res.json(status);
    //res.status(200).end(JSON.stringify(data)) ;
});

// --------------------------------------------------
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

// --------------------------------------------------
// STAGE - 3
app.post('/tasks',(req,res)=>{
    let next_id = tasks.length +1 ;

    if(Object.keys(req.body).length === 0){
        res.status(400).json({error:"Body of POST request cannot be empty"}) ;
    }
    else if(!req.body.title){
        res.status(400).json({error:"Title not found in request"}) ;
    }
    else{
        // .trim() method removes the extra spaces before and after the string 
        if(req.body.title.trim() === ""){
            res.status(400).json({error:"Title cannot be empty"}) ;
            res.end() ;
        }else{
            let task_title = req.body.title ; 
            tasks = [
                ...tasks,
                {id:next_id , title: task_title , done:false}
            ];
            res.status(201).json(tasks[next_id-1]);
        }
    }
    //console.log(typeof(req.body));
});


// --------------------------------------------------
// STAGE - 0
app.listen(PORT,()=>{
    console.log(`App is listening to port: ${PORT}`) ;
});