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
  for (var i = 0; i <= counter; i++) {
    sum = sum + i;
  }
  return sum;
}

function mul(counter) {
  var ans = 1;
  for (var i = 1; i <= counter; i++) {
    ans = ans * i;
  }
  return ans;
}

function handleFirstRequest(req, res) {
  console.log(req.body);
  var counter = req.body.counter;

  var calSum = sum(counter);
  var calMul = mul(counter);

  var answerObject = {
    sum: calSum,
    mul: calMul,
  };

  res.status(200).send(answerObject);
}

app.post("/handleSum", handleFirstRequest);

function createUser(req, res) {}

app.post("/createUser", createUser);

app.listen(port, () => {
  console.log(`Port started at ${port}`);
});

// var calculatedSum = sum(100);
// console.log(calculatedSum);