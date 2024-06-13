const assert = require('assert');

describe('Authentication', function() {
    describe('#register()', function() {
        it('should register a user successfully', function() {
            register('testuser', 'testpassword');
            assert.strictEqual(users.length, 1);
            assert.strictEqual(users[0].username, 'testuser');
        });
    });

    describe('#login()', function() {
        it('should login a user successfully', function() {
            register('testuser', 'testpassword');
            const result = login('testuser', 'testpassword');
            assert.strictEqual(result, true);
        });
    });
});
