const express = require('express');
const app = express(); 
app.use(express.json()); 
const cors = require('cors')
app.use(cors())

const Port = 4000; 


const toDoList = [
    { num: 1, content: "washing" },
    { num: 2, content: "shopping" },
    { num: 3, content: "tidying" },
  ];



//get everything
app.get('/api/todolist', (req, res) => {
    res.json(toDoList); 
}); 



// post a new list
app.post('/api/todolist', (req, res) => {
    const newContent = req.body; 
    console.log('req', req.body); 
    const existingValues = toDoList.map((each) => each.content);
    if(existingValues.includes(newContent.content)) {
        res.send('already exist')
    } else {
        toDoList.push(newContent);
        res.status(201).json(toDoList)
    }
})

// make changes to a list

app.put('/api/todolist/:num', (req, res) => {
    const listNumToUpdate = parseInt(req.params.num);
    console.log(listNumToUpdate);
    console.log(req.body); 
    const listIndexToUpdate = toDoList.findIndex((each) => each.num === listNumToUpdate); 
    if (listIndexToUpdate === -1 ) res.status(404).send(); 
    toDoList[listIndexToUpdate] = {...req.body}
    res.json(toDoList); 
})

// delete a list
app.delete('/api/todolist/:num', (req, res) => {
    const listNumToDelete = parseInt(req.params.num);
    const listIndexToDelete = toDoList.findIndex((each) => each.num === listNumToDelete); 
    if (listIndexToDelete !== -1 ) {
        toDoList.splice(listIndexToDelete, 1);
        toDoList.forEach((each, i) => each.num = i + 1); 
        res.json(toDoList); 
    } else {
        res.status(404).send('item not found')
    }; 
})
app.listen(Port, () => {
    console.log('port is running')
})
