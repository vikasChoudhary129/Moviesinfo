const express= require('express');
const app = express.Router();
const fs = require('fs');
const { json } = require('express/lib/response');
const axios = require('axios');


const options = {
  method: 'GET',
  url: 'https://imdb8.p.rapidapi.com/auto-complete',
  params: {q: ''},
  headers: {
    'X-RapidAPI-Key': '57682110f5mshe3eccbf459a0d34p10bdc5jsn1e610205b967',
    'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
  }
};





app.get('/', (req, res, next)=>{
  res.json({'message':'Welcome to open api'})
});

app.get(`/getmovierating`, (req, res, next)=>{
  const params = req.query.movie 
  if(params){
    getInput(params).then(data=>{
      res.send(`${JSON.stringify(formatData(data))}`)
    })
  
  }
  else{
  res.send('Please pass a movie name in the api')
  }
});




 async function getInput(input){
    // console.log(input);
   if(input){
    options.params.q = input
    try {
      console.log('optipns:', options);
      const response =  await axios.request(options);
      console.log('response:------',response.data.d);
      return response.data.d;
    } catch (error) {
      console.log('error---',error );
     return error;
    }
  }

}


 function formatData(input){
   //console.log(input);
  // const formated =  input.map(ele=> ({Movie_Name:ele.l, Cast:ele.s, Release_Year:ele.y}) )
  const formated = input;
  console.log('formatedData:',formated);
  return formated[0];
}


module.exports = app;
