document.addEventListener('DOMContentLoaded', () => {
    const products = [
        { id: 1, name: 'Product 1', description: 'Description for Product 1', price: 10, image: 'https://via.placeholder.com/150' },
        { id: 2, name: 'Product 2', description: 'Description for Product 2', price: 20, image: 'https://via.placeholder.com/150' },
        { id: 3, name: 'Product 3', description: 'Description for Product 3', price: 30, image: 'https://via.placeholder.com/150' },
        { id: 4, name: 'Product 4', description: 'Description for Product 4', price: 40, image: 'https://via.placeholder.com/150' }
    ];

    const productsContainer = document.getElementById('products');
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h4>${product.name}</h4>
            <p>${product.description}</p>
            <div class="price">₹${product.price}</div>
            <button id="addtocart${product.id}" onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productsContainer.appendChild(productCard);
    });
});

function addToCart(productId) {
    alert(`Product ${productId} added to cart`);
}
