document.addEventListener('DOMContentLoaded', () => {
    console.log('page loaded');
    var username=localStorage.getItem('currentUser');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalAmount = cart.reduce((total, product) => total + product.price, 0);
    document.getElementById('total-amount').textContent = totalAmount.toFixed(2);
    fetchCartData(username);
});

function fetchCartData(username) {
    fetch(`http://localhost:3000/cart/${username}`)
    .then(response => response.json())
    .then(data => {
        const cartItemsContainer = document.getElementById('cartItems');
        cartItemsContainer.innerHTML = '';
        console.log(data);
        var totalProductsAmount=0;
   var visited_prduct_id=0;

        data.forEach(item => {

            totalProductsAmount=parseInt(totalProductsAmount) + parseInt(item.product_price);
            document.getElementById('total-amount').innerHTML = totalProductsAmount;


            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
  
            visited_prduct_id=item.product_id;

            cartItem.innerHTML = `
            <p> ${item.product_name}  &nbsp;::&nbsp; $${item.product_price}</p>
        `;
          cartItemsContainer.appendChild(cartItem); 

        });
       
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}


document.getElementById('payment-form').addEventListener('submit', function (event) {
    event.preventDefault();
    makePayment();
});

function makePayment() {
    alert('Payment successful!');
    setTimeout(() => {
        alert('Order placed successfully!');
        localStorage.removeItem('cart');
        window.location.href = 'products.html';
    }, 2000);
}
