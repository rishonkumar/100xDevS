const express = require("express");
const PORT = 3000;
const app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.json());

let admins = [];
// Route to handle admin signup
app.post("/admin/signup", (req, res) => {
  const { username, password } = req.body;

  // Check if admin username already exists
  const existingAdmin = admins.find((admin) => admin.username === username);
  if (existingAdmin) {
    return res.status(400).json({ message: "Admin username already exists" });
  }

  // Create a new admin account
  const newAdmin = { username, password };
  admins.push(newAdmin);

  return res.status(201).json({ message: "Admin created successfully" });
});

// Route to handle admin login
app.post("/admin/login", (req, res) => {
  const { username, password } = req.body;

  // Check if admin username already exists
  const existingAdmin = admins.find(
    (admin) => admin.username === username && admin.password === password
  );
  if (!existingAdmin) {
    return res.status(400).json({ message: "Admin username doesn't exists" });
  } else {
    return res.status(201).json({ message: "Logged successfully" });
  }
});

app.listen(PORT, () => {
  console.log(`PORT started at ${PORT}`);
});
