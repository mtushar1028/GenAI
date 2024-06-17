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
        totalCartItems=index+1;
        cartItemsDiv.innerHTML += `
            <li>
                <span>${product.name} - $${product.price}</span>
                <button style="margin:5px;" onclick="removeFromCart(${index})">Remove</button>
            </li>
        `;
    });

    const cartItemsCountDiv = document.getElementById('cart-product-items');
    cartItemsCountDiv.innerHTML = totalCartItems;
    if(totalCartItems>0){
        
    }
    
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
// function savelist()
// {

// }
