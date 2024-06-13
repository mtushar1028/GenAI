const assert = require('assert');

describe('Product', function() {
    describe('#loadProducts()', function() {
        it('should load products successfully', function() {
            loadProducts();
            const productsDiv = document.getElementById('products');
            assert.notStrictEqual(productsDiv.innerHTML, '');
        });
    });
});
