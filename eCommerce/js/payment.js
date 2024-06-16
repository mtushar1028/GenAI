document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalAmount = cart.reduce((total, product) => total + product.price, 0);
    document.getElementById('total-amount').textContent = totalAmount.toFixed(2);
});

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
