#!/usr/bin/env node

import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hi everyone!");
});

app.listen(4000, () => {
  console.log("server is running on port", 4000);
});
