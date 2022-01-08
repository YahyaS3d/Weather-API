const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended:true}));//using html to process the city from the user
app.get("/", (req,res)=>{
res.sendFile(__dirname + "/index.html");

});
app.post("/",(req,res) =>{
        //fetch the data from an external server
    const query = req.body.cityName;
    const apiID = "fd2de51cbed40335d4972c84b75309d9";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiID + "&units=" + unit;
  https.get(url, (response)=>{
   console.log(response.statusCode);
   response.on("data", (data)=>{
const weatherData = JSON.parse(data);
const temp = weatherData.main.temp;
const weatherDescription = weatherData.weather[0].description;
const icon = weatherData.weather[0].icon;
const imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
//in order to write more than 1 send we can use "write"
res.write("<p> The weather is currently" + weatherDescription+"</p>");
res.write("<h1>The temperature in "+ query +" is: " + temp + " degrees Celsius.</h1>" );
res.write("<img src="+imgURL+">");
res.send();
});
  });   
  //can't send more than 1 req each get 
});
app.listen(3000, ()=>{
console.log("the server is running at index 3000");
});