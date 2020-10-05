var fs = require("fs");

class ProductsRepository {

    products;

    constructor(baseDir) {
        
        console.log('dirname = ', baseDir);
        
        this.products = fs.readFileSync( baseDir + "/entities/" + "products.json", 'utf8');

        console.log('result = ', this.products);
    }

    getProducts() {
        return this.products;
    }

    findOne(productId) {
        const element = this.products.find(el => el.productId == productId);
        console.log('found: ', element);
        return element;

    }
}

module.exports = ProductsRepository;
