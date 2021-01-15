// JavaScript source code
var express = require("express");
//app object global scope
var app = express();
var bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
//app.use(express.json())
//npm install body-parser
//app.use(express.bodyParser());
//==========================================================================================	
//Create a Document Function from MongoDB using a URL Request GET HTTP Method NodeJS
//==========================================================================================
//req is the request object, res is the response object
//The URL route and query string is specified as an example shown below
// /Create?StudentName=JoeOakes&StudentSSN=3336661299&StudentEmail=jxo19@psu.edu&StudentPhone=4445559999
app.get("/Create", function(req, res) {
 try {
    //Require the NPM Node Package Module mongodb
    var mongodb = require('mongodb');
	//Create the MongoClient object
    var MongoClient = mongodb.MongoClient;
	//Response HTTP Header parameter setting
    res.header("Access-Control-Allow-Origin", "*");
	//Check the request query studentID so that it has a value
	console.log("username: " + req.query.username);	
    if(!req.query.username) {
		console.log("missing the username"); //Used for debugging in the console window
		//respond back with the JSON status error message
        return res.send({"result": "missing the username"});
    } else {
	//Create the student JSON object 
	//It is filled in with request query student field values sent
		var user = {
        "Username": req.query.username,
        "Password": req.query.password
        }
		console.log(user); //Used for debugging in the console window
		//Create the URL to connect to the local Mongo Database Server	
        var url = 'mongodb://localhost:27017';
        MongoClient.connect(url, function (err, client) {
          if (err) {
			console.log(err); //Used for debugging in the console window
			//respond there was Mongo connection error
            return res.send({"result" : "failed"});
          } else {
            var db = client.db('Team4'); //Select the Mongo Database OakesDB
		    var collection = db.collection('Tourists'); //Select the Collection Students
            collection.insertOne(user, function (err, res){
			  if (err) throw err;
              client.close();  //Close the client connection
            }); //insertOne code block
            return res.send({"result" : "passed"}); //respond the create operation worked			
		  }//close if err check
        });//close the connect function
    } //close else code block
  } catch (error) {
	  console.error(error);
  } //Close the catch code block
}); //Close the app.get code block

//=================================================================================
//Read a Document Function from MongoDB using a URL Request GET HTTP Method NodeJS
//=================================================================================
app.get("/Read", function(req, res) {
try {
 var mongodb = require('mongodb');
 var MongoClient = mongodb.MongoClient;
    res.header("Access-Control-Allow-Origin", "*");
    if(!req.query.username) {
        return res.send({"result": "missing the username"});
  
    } else {
        var url = 'mongodb://localhost:27017';
        MongoClient.connect(url, function (err, client) {
        if (err) {
          return res.send({"result" : "failed"});
        } else {
		  var db = client.db('Team4');
          var collection = db.collection('Tourists');
            collection.findOne({"Username" : req.query.username}, function(err, user){
			  if (err) throw err;
              client.close();
			  console.log(user);
			  return res.send(user);
            });//close findOne code block
         }//close if err check
       }); //close function
    } //close else
  } catch (error) {
	  console.error(error);
  } //Close the catch code block
});//Close app.get

//==========================================================================================
//Update a Document Function from MongoDB using a URL Request GET HTTP Method NodeJS
//==========================================================================================


//========================================================================================	
//Create Document Function from MongoDB using a URL Request POST HTTP Method NodeJS
//========================================================================================
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var jsonParser = bodyParser.json()
app.post("/Create", jsonParser, function(req, res) {
console.log("Create Post");
try {
    var mongodb = require('mongodb');
    var MongoClient = mongodb.MongoClient;
    res.header("Access-Control-Allow-Origin", "*");
	console.log('Username: ' + req.body.username);
    if(!req.body.username) {
        return res.send({"result": "missing the username"});
    } else {
    var user = {
        "Username": req.body.username,
        "Password": req.body.password,
        }
		console.log("user:" + user);
        var url = 'mongodb://localhost:27017';
        MongoClient.connect(url, function (err, client) {
        if (err) {
          return res.send({"result" : "failed"});
        } else {
          var db = client.db('Team4');
		  var collection = db.collection('Tourists');
            collection.insertOne(user, function (err, res){
			  if (err) throw err;
              client.close();  //Close the client connection
            }); //insertOne code block
            return res.send({"result" : "passed"}); //respond the create operation worked
         }  //close if
        }); //close function
    } //close elses
  } catch (error) {
	  console.error(error);
  } //Close the catch code block
}); //Close app.get


//==========================================================
//Start the listening NodeJS Server on Networking Port 3000
//==========================================================
try{
  var server = app.listen(3000, function () {
    console.log("Listening on port %$...", server.address().port);
  })
} catch (error) {
	  console.error(error);
} //Close the catch code block
