const express = require("express");
const fs = require("fs");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 4000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});
app.get("/api/notes", (req, res) => {
  console.log("hello");
  let db = fs.readFileSync("./db/db.json", "utf-8");
  console.log(db);
  console.log(typeof db);
  if (!db) return res.json([]); // if db.json is empty return empty array
  let dbParsed = JSON.parse(db);
  res.json(dbParsed);
});
app.post("/api/notes", (req, res) => {
  let db = fs.readFileSync("./db/db.json", "utf-8");
  if (!db) db = "[]"; // if db.json is empty create a string with empty array
  let parsedDB = JSON.parse(db);
  const newNote = {
    id: Math.floor(Math.random() * 10000000),
    title: req.body.title,
    text: req.body.text,
  };
  parsedDB.push(newNote);
  parsedDB = JSON.stringify(parsedDB);
  fs.writeFileSync("./db/db.json", parsedDB);
  // res.json(parsedDB);
  res.json(JSON.parse(parsedDB));
});
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});
app.listen(PORT, () => {
  console.log("App is listening on PORT 4000");
});
