require('dotenv').config();
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const { parse } = require('dotenv');
const express = require('express')
const app = express()
const port = process.env.PORT || 80

app.get('/', async (req, res) => {
  console.log(req.query);
  let stocks = await fetch(`https://finnhub.io/api/v1/stock/candle?symbol=AAPL&resolution=1&from=1631022248&to=1631627048&token=${process.env.API_KEY}`)
  let stocksResponse = await stocks.json();

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

  res.send([
    {response: stocksResponse}
  ]);
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })