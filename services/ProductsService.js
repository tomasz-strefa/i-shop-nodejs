const ProductsRepository = require('../repositories/ProductsRepository');

class ProductService {
    constructor(baseDir) {
        this.ProductsRepository = new ProductsRepository(baseDir);
    }

    getProducts() {
        return this.ProductsRepository.getProducts();
    }

    findOne(productId) {
        return this.ProductsRepository.findOne(productId);
    }

    checkRequest(body) {
        var resultValid = false;
    
        body.products.forEach(el => {
    
            if(this._isValidProduct(el)) {
                resultValid = true;
            }
        }, this);
    
        var checkSize = false;
        var counterProducts = 0;
        body.products.forEach(el => {
            counterProducts += el.counter;
        });
    
        if(counterProducts === body.productsCounter) {
            checkSize = true;
        }
    
        var checkPrice = false;
        var sumPrice = 0.0;
        body.products.forEach(el => {
            sumPrice += (el.price * el.counter);
        });
    
        if(sumPrice === body.productsPrice) {
            checkPrice = true;
        }
    
        return resultValid && checkSize && checkPrice;
    }
    
    _isValidProduct(productDTO) {
        var product = this.findOne(productDTO.productId);
        
        return product.price === productDTO.price;
    }

}

module.exports = ProductService;
