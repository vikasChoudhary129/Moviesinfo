const express = require('express');
const req = require('express/lib/request');
const weather = require('./externaAPIs/weather/weather');
const app = express();
const cors = require('cors');

app.use(cors())

app.use( "/core", weather, );

const server = app.listen(8000, ()=>{
    console.log(`listening on ${server.address().port}`)
});
