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
    console.log('STATUS === ', result);
    res.writeHead(result ? 200 : 400);
    res.end();
})

var server = app.listen(8080, function () {
   var port = server.address().port
   
   console.log("Example app listening at %s", port)
})

function checkRequest(body) {
    resultValid = false;

    body.products.forEach(el => {

        if(_isValidProduct(el)) {
            resultValid = true;
        }
    });

    checkSize = false;
    counterProducts = 0;
    body.products.forEach(el => {
        counterProducts += el.counter;
    });

    if(counterProducts === body.productsCounter) {
        checkSize = true;
    }

    checkPrice = false;
    sumPrice = 0.0;
    body.products.forEach(el => {
        sumPrice += (el.price * el.counter);
    });

    if(sumPrice === body.productsPrice) {
        checkPrice = true;
    }

    return resultValid && checkSize && checkPrice;
}

function _isValidProduct(productDTO) {
    var product = productsRepository.findOne(productDTO.productId);
    
    return product.price === productDTO.price;
}
