const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const ProductsService = require('./services/ProductsService');
var productsService = new ProductsService(__dirname);

var app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/api/i-shop/products', function (req, res) {
    console.log("Got a GET request for the homepage");

    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(productsService.getProducts());
    res.end();
})

app.post('/api/i-shop/order', function (req, res) {
    const result = productsService.checkRequest(req.body);
    console.log('STATUS === ', result);
    res.writeHead(result ? 200 : 400);
    res.end();
})

var server = app.listen(8080, function () {
   var port = server.address().port
   
   console.log("Example app listening at %s", port)
});

