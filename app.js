const express = require("express");

const app = express();
const scrapRealitica = require("./scraper");


app.get("/result", async function (req, res) {
  const result = await scrapRealitica();
  res.write(JSON.stringify(result,undefined,2))
  
})

 
app.listen(3000, (err, data) => {
    if (!err) console.log("Connected")
  })