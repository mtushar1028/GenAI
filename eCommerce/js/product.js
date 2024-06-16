const products = [
    { id: 1, name: "Product 1", description: "Description for Product 1", price: 10.00, image: "images/product1.jpg" },
    { id: 2, name: "Product 2", description: "Description for Product 2", price: 20.00, image: "images/product2.jpg" },
    { id: 3, name: "Product 3", description: "Description for Product 3", price: 30.00, image: "images/product3.jpg" },
    { id: 4, name: "Product 4", description: "Description for Product 4", price: 40.00, image: "images/product4.jpg" },
];

document.addEventListener('DOMContentLoaded', () => {
    const productGrid = document.getElementById('product-list');
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'col-lg-3 card product-card'; //product-card
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p class="price">$${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productGrid.appendChild(productCard);
    });
});

function addToCart(productId) {
    console.log('test product add cart called');

    var mysql = require('./mysql');

    var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: ""
    });
    
    con.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
      con.query("CREATE DATABASE tushar", function (err, result) {
        if (err) throw err;
        console.log("Database created");
      });
    });
      console.log('after new fetch call');

    const product = products.find(p => p.id === productId);
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`Product ${product.name} added to cart`);
}

function showChangePassword() {
    const newPassword = prompt('Enter your new password:');
    if (newPassword) {
        const user = JSON.parse(localStorage.getItem('user'));
        user.password = newPassword;
        localStorage.setItem('user', JSON.stringify(user));
        alert('Password changed successfully!');
    }
}
