// creating routes in the back end using express router
const express = require('express');
// this time have to use mongo db client to extract top five values since it will
// be different in the collection every update
const MongoClient = require('mongodb').MongoClient;
const router = express.Router();
let { PythonShell } = require('python-shell');

router.get('', (req, res)  => {
  let options = {
    mode: 'text',
    scriptPath: '/Users/awais/Documents/Independent\ Work/MeanStack/Mean-Stack/Backend/python'
  }
  PythonShell.run('MessageStatistics.py', options, (err, results) => {
    if (err) throw err;
    console.log(results);
  })
  //Once python shell runs and completes retrive the data from mongodb
 MongoClient.connect('mongodb+srv://awais:dragonballz1@mstackcluster-hwzch.mongodb.net/angular-Data?retryWrites=true&w=majority', (err, db) => {
 if(err){
   res.status(500).json({message: "Connecting to Database failed"});
 }
 let dbo = db.db("angular-Data");
 //once the item is retrieved then send it to localhost
 dbo.collection("TopFive").findOne().then(result => {
   if(result) {
     res.status(200).json(result);
   } else {
     res.status(404).json({message: "Object not found"});
   }
 })
 })
})

module.exports = router;