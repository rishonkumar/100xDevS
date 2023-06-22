const express = require("express");
const app = express();
const port = 3000;
var bodyParser = require("body-parser");

// function middleware(req, res, next) {
//   console.log("Inside middleware " + req.headers.counter);
//   next();
// }

// app.use(middleware);

app.use(bodyParser.json()); // this extracts the body

function sum(counter) {
  var sum = 0;
  for (var i = 0; i < counter; i++) {
    sum = sum + i;
  }
  return sum;
}

function handleFirstRequest(req, res) {
  console.log(req.body);
  var counter = req.body.counter;
  if (counter < 100000) {
    var calSum = sum(counter);
    var ans = "this sum is " + calSum;
    res.send(ans);
  } else {
    res.status(411).send("You have sent very big number");
  }
}

app.post("/handleSum", handleFirstRequest);

function createUser(req, res) {}

app.post("/createUser", createUser);

app.listen(port, () => {
  console.log(`Port started at ${port}`);
});

// var calculatedSum = sum(100);
// console.log(calculatedSum);
