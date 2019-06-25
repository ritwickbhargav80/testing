const express = require('express');
const index = require('./app');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

mongoose.Promise = global.Promise;
// Mongoose Connect
const connectionString = "mongodb://ritwick80:ritwick123@cluster0-shard-00-00-rloq9.mongodb.net:27017,cluster0-shard-00-01-rloq9.mongodb.net:27017,cluster0-shard-00-02-rloq9.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true";

mongoose.connect(connectionString, { useNewUrlParser: true })
    .then(function() {
        console.log("MongoDB Connected");
    })
    .catch(function(err) {
        console.log(err);
});

const Name = require('./models/Name');

app.use(bodyParser.urlencoded({ extended: true }));
const PORT = 3000;

app.set("view engine", "ejs");

app.get('/', (req, res) =>  {
	res.send("<h1>hi</h1>");
});

app.get("/index", (req, res) => {
	res.render('index.ejs');
});

app.post("/form-submission", (req, res) => {
	console.log(req.body);
	Name.create({firstname: req.body.firstname}, (err, data) => {
		if (err) {
			console.log(err);
		}
		else{
			console.log("user created");
			res.send("hello " + req.body.firstname);
		}
	});
});

app.get("/route", (req, res) => {
	console.log(app);
	res.send("hello " + app.name);
});

app.get('/test', (req, res) => {
	res.send("hi test")
	// res.render("index", {data: ["asad", "ADFHRE"]});
});

app.listen(PORT, () => {
	console.log("Server started");
});
