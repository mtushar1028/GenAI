const products = [
    { id: 1, name: 'Product 1', price: 10, description: 'Description for product 1', image: 'images/product1.jpg' },
    { id: 2, name: 'Product 2', price: 20, description: 'Description for product 2', image: 'images/product2.jpg' },
    { id: 3, name: 'Product 3', price: 30, description: 'Description for product 3', image: 'images/product3.jpg' },
    { id: 4, name: 'Product 4', price: 40, description: 'Description for product 4', image: 'images/product4.jpg' },
];

function loadProducts() {
    const productsDiv = document.getElementById('products');
    productsDiv.innerHTML = '';

    products.forEach(product => {
        productsDiv.innerHTML += `
            <div>
                <img src="${product.image}" alt="${product.name}" width="100">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <span>$${product.price}</span>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;
    });
}

document.addEventListener("DOMContentLoaded", loadProducts);
