var fs = require("fs");
const e = require("express");

class ProductsRepository {

    products = [];

    constructor(baseDir) {
        this.products = fs.readFileSync( baseDir + "/entities/" + "products.json", 'utf8');
    }

    getProducts() {
        return this.products;
    }

    findOne(productId) {

        const productsArray = JSON.parse(this.products);
        console.log('products length = ', productsArray.length);
        const element = productsArray.find(function(el) {
            return el.productId === productId;
        });
        console.log('found: ', element);
        return element;
    }
}

module.exports = ProductsRepository;
