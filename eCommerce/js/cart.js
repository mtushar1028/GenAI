const cart = [];

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        alert('Product added to cart');
        displayCart();
    }
}

function displayCart() {
    const cartItemsDiv = document.getElementById('cart-items');
    cartItemsDiv.innerHTML = '';

    let totalAmount = 0;
    cart.forEach((product, index) => {
        totalAmount += product.price;
        cartItemsDiv.innerHTML += `
            <div>
                <span>${product.name} - $${product.price}</span>
                <button onclick="removeFromCart(${index})">Remove</button>
            </div>
        `;
    });

    localStorage.setItem('totalAmount', totalAmount);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    displayCart();
}

function redirectToPayment() {
    if (cart.length > 0) {
        window.location.href = 'payment.html';
    } else {
        alert('Cart is empty');
    }
}
