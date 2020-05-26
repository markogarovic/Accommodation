const cron = require("node-cron")
var shell = require("shelljs")

cron.schedule("49-49 22,12 * * *",()=>{
    if(shell.exec("node scraper.js").code !== 0){
        console.log("Error")
    }
})