// creating routes in the back end using express router
const express = require('express');
// this time have to use mongo db client to extract top five values since it will
// be different in the collection every update
const MongoClient = require('mongodb').MongoClient;
const router = express.Router();
let { PythonShell } = require('python-shell');
//having a callback for running python script to make sure it runs the script before mongo db send to REST
function PythonExecute(callback) {
  let options = {
    mode: 'text',
    scriptPath: '/Users/awais/Documents/Independent\ Work/MeanStack/Mean-Stack/Backend/python'
  }
  //running the pythn script then calling the callback after
  PythonShell.run('MessageStatistics.py', options, (err, results) => {
    if (err) throw err;
    console.log(results);
    callback();
  })
}
router.get('', (req, res) =>  {
  PythonExecute(() => {
  //Once python shell runs and completes retrive the data from mongodb
 MongoClient.connect('mongodb+srv://awais:######@mstackcluster-hwzch.mongodb.net/angular-Data?retryWrites=true&w=majority', (err, db) => {
 if(err){
   res.status(500).json({message: "Connecting to Database failed"});
 }

 let dbo = db.db("angular-Data");
 //once the item is retrieved then send it to REST service
 dbo.collection("TopFive").findOne().then(result => {
   if(result) {
     res.status(200).json(result);
   } else {
     res.status(404).json({message: "Object not found"});
   }
 })
 })
})
})
//sending the router method to app
module.exports = router;
