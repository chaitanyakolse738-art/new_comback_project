const express = require("express");
const redis = require("redis");

const app = express();
const client = redis.createClient({
  url: "redis://redis:6379"
});

client.connect();

app.get("/", async (req, res) => {
  let visits = await client.get("visits");
  visits = visits ? parseInt(visits) + 1 : 1;
  await client.set("visits", visits);
  res.send(`<h1>Visitor Count: ${visits}</h1>`);
});

app.listen(5000, () => {
  console.log("App running on port 5000");
});
