const express = require('express');
const app = express();
const https = require("https")
const bodyParser = require("body-parser")
const request = require("request");
const { get } = require('request');

app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}))

app.get("/",(req,res)=>{
  res.sendFile(__dirname + "/index.html")
})

const API_KEY = "NxmoiyGhG7hNBxNS2pffT6ps1F7kj0w34QpoqqtP";
// mod.cjs
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

// const marspic = document.querySelector("#marspic")

async function getImage(date) {
    try {
      const response = await fetch(
        `http://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${date}&camera=NAVCAM&api_key=${API_KEY}`
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch images: ${response.statusText}`);
      }
      const data = await response.json();
      let img = (data.photos[9].img_src);
      console.log(img);
    } catch (error) {
      console.error(error);
      return null;
    }
}


app.post("/",(req,res)=>{
  let chosendate = req.body.dateinput;
  getImage(chosendate)
})

app.listen(process.env.PORT || 3000,()=>{
  console.log("port open"); 
})