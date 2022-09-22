//const express= require("express");
import express from "express"; 
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import cors from "cors";


 
dotenv.config();
console.log(process.env.MONGO_URL);

const app = express();


const PORT = process.env.PORT

//const PORT = 4000;
 app.get("/", function(req, res){
     res.send("Hello❤🤞");

 })

 app.listen(PORT,()=>{
     console.log(`server started in ${PORT}`);
 })

 

 const students =[{
     "id":"1",
     "name":"Vijay",
     "Batch":"WD-Tamil",
     "course":"Full Stack Development",
     "course_duration":"3months",
     "attendence_tillnow":"100%"
 },{
    "id":"2",
    "name":"Devi",
    "Batch":"WE-English",
    "course":"Full Stack Development",
    "course_duration":"6months",
    "attendence_tillnow":"100%"
},{
    "id":"3",
    "name":"Jay",
    "Batch":"WD-Tamil",
    "course":"Data Science",
    "course_duration":"3months",
    "attendence_tillnow":"90%"
},{
    "id":"4",
    "name":"Suji",
    "Batch":"WE-English",
    "course":"Full Stack Development",
    "course_duration":"6months",
    "attendence_tillnow":"100%"
},{
    "id":"5",
    "name":"Abi",
    "Batch":"WE-Tamil",
    "course":"Ethical Hacking",
    "course_duration":"6months",
    "attendence_tillnow":"100%"
}]

app.use(express.json()); //middleware -> intercept --> converting body to json

app.use(cors());




//const MONGO_URL ="mongodb://localhost";

const MONGO_URL = process.env.MONGO_URL;
async function createConnection(){
 const client=new MongoClient(MONGO_URL);
await  client.connect();
console.log("Mongo is connected ❤🤞");
return client;
}

 const client = await createConnection();

 app.get("/students/:id", async function(req, res){
    console.log(req.params)
    const {id}= req.params;
    const student=  await client.db("b30wd").collection("students").findOne({id:id});
    console.log(student);
    student ? res.send(student) : res.send({ message:"No such Student found"});

});


app.post("/students", async function(req,res){
    const data = req.body;
    console.log(data);
    const result = await client.db("b30wd").collection("students").insertMany(data);
    res.send(result);
});

app.get("/students", async function(req, res){

    const students = await client.db("b30wd").collection("students").find({}).toArray();  //toarray used to overcome the pagination(i.e.cursor->pagination ->to convert array)
    res.send(students);

});

app.delete("/students/:id", async function(req, res){
    console.log(req.params);
    const {id} = req.params;
    const result =  await client.db("b30wd").collection("students").deleteOne({id:id});
    res.send(result);

});
    
app.put("/students/:id", async function(req, res){
     console.log(req.params);
    const {id}  = req.params;
    const updateData = req.body;
    const result = await client.db("b30wd").collection("students").updateOne({id:id},{$set:updateData});
    res.send(result);
});