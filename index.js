import express from 'express';

const app = express() ;
const PORT = 3000 ;

let tasks = [
    {id : 1 , title:"do flyrank assignment" , done: true},
    {id: 2 , title:"do leetcode problems" , done: false},
    {id: 3 , title:"do codeforces problems", done: false}
];
let id = 3 ;

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

    const obj = tasks.find((task)=>{
        if(task.id == id){
            exists = true ;
            return true ;
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
    
    if(Object.keys(req.body).length === 0){
        res.status(400).json({error:"Body of POST request cannot be empty"}) ;
        return ;
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
            id++;
            let next_id = id ;
            let task_title = req.body.title ; 
            tasks = [
                ...tasks,
                {id:next_id , title: task_title , done:false}
            ];
            res.status(201).json(tasks[tasks.length-1]);
        }
    }
    //console.log(typeof(req.body));
});

// --------------------------------------------------
// STAGE - 4
app.put('/tasks/:id',(req,res)=>{
    const curr_id = req.params.id ;
    let idx = 0 ;

    let exists = false ;
    tasks.forEach((task,index)=>{
        if(task.id == curr_id){
            exists = true ;
            idx = index ;
        }
    });

    if(!exists){
        res.status(404).json({error : `Task ${req.params.id} not found`}) ;
    }
    else if(Object.keys(req.body).length === 0){
        res.status(400).json({error:"Body of PUT request cannot be empty"}) ;
    }
    else if(!req.body.title===undefined && req.body['done'] === undefined){
        res.status(400).json({error:"Title not found in request"}) ;
    }
    else if(req.body['done'] !== undefined){
        tasks[idx].done = req.body.done ;
        if(req.body.title !== undefined && req.body.title.trim() !== ""){
            tasks[idx]['title'] = req.body.title ;
        }
        res.json(tasks[idx]);
    }
    else{
        // .trim() method removes the extra spaces before and after the string 
        if(req.body.title.trim() === ""){
            res.status(400).json({error:"Title cannot be empty"}) ;
        }else{
            tasks[idx]['title'] = req.body.title ;
            tasks[idx]['done'] = req.body.done === undefined ? tasks[idx]['done'] : req.body.done;
            res.status(200).json(tasks[idx]);
        }
    }
});
 // important note : javascript returns undefined if we try to access a key that doesnt exist
app.delete('/tasks/:id' , (req,res)=>{
    let curr_id = 0 ;

    let exists = false ;
    tasks.forEach((task,index)=>{
        if(task.id == req.params.id){
            exists = true ;
            curr_id = index ;
        }
    });

    if(!exists){
        res.status(404).json({error : `Task ${req.params.id} not found`}) ;
    }else{
        tasks.splice(curr_id,1) ;
        res.status(204).end() ;
    }
});

// --------------------------------------------------
// STAGE - 0
app.listen(PORT,()=>{
    console.log(`App is listening to port: ${PORT}`) ;
});