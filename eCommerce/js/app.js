document.addEventListener("DOMContentLoaded", function() {
    checkUserStatus();
    loadProducts();
});

function checkUserStatus() {
    const userLoggedIn = sessionStorage.getItem('userLoggedIn');

    if (userLoggedIn) {
        document.getElementById('registration-form').classList.add('hidden');
        document.getElementById('login-form').classList.add('hidden');
        document.getElementById('product-catalog').classList.remove('hidden');
        document.getElementById('cart').classList.remove('hidden');
    } else {
        document.getElementById('registration-form').classList.remove('hidden');
        document.getElementById('login-form').classList.remove('hidden');
        document.getElementById('product-catalog').classList.add('hidden');
        document.getElementById('cart').classList.add('hidden');
    }
}
