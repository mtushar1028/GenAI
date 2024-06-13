const assert = require('assert');

describe('Cart', function() {
    describe('#addToCart()', function() {
        it('should add a product to the cart', function() {
            addToCart(1);
            assert.strictEqual(cart.length, 1);
        });
    });

    describe('#removeFromCart()', function() {
        it('should remove a product from the cart', function() {
            addToCart(1);
            removeFromCart(0);
            assert.strictEqual(cart.length, 0);
        });
    });

    describe('#checkout()', function() {
        it('should clear the cart after checkout', function() {
            addToCart(1);
            checkout();
            assert.strictEqual(cart.length, 0);
        });
    });
});
