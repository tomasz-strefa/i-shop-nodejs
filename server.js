var express = require('express'), bodyParser = require('body-parser');
const cors = require('cors');

const ProductsRepository = require('./repositories/ProductsRepository');
var productsRepository = new ProductsRepository(__dirname);

var app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/api/i-shop/products', function (req, res) {
    console.log("Got a GET request for the homepage");

    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(productsRepository.getProducts());
    res.end();
})

app.post('/api/i-shop/order', function (req, res) {
    const result = checkRequest(req.body);
    res.sendStatus(result ? 200 : 400);
})

var server = app.listen(8081, function () {
   var port = server.address().port
   
   console.log("Example app listening at %s", port)
})

function checkRequest(body) {
    console.log('body -> ', body);
    result = false
    body.products.forEach(el => {
        console.log('el price = ' + el.price + ' body price: ' + body.price);
        if(el.price == body.price) {
            result = true;
        }
    });

    return result;
}
