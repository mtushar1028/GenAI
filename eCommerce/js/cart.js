const cart = [];

function addToCart(productId) {
  
    const product = products.find(p => p.id === productId);
    
  
    console.log('product data');
    
    if (product) {
        cart.push(product);
      
        console.log(productId);
      
      var username=localStorage.getItem('currentUser');
      console.log(username);

        const productDetails = {
            username: username,
            product_id: product['id'],
            product_name: product['name'],
            product_price: product['price'],
          };
 console.log(productDetails);
 addtocartproduct(productDetails);
 let button = document.getElementById('addtocart'+productId);

 // Set the button to disabled (readonly for buttons)
 button.disabled = true;
 displayCart();
   
}}

const addtocartproduct = async (productDetails) => {
    try {
      console.log('before reg api call');
      const response = await fetch('http://localhost:3000/addtocart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin':'*',
          'Content-Length':2000,
          'Accept': '*/*'
        },
        body: JSON.stringify(productDetails),
      });
      console.log('product add beforeres:'+ JSON.stringify(productDetails));
          
      if (!response.ok) {
        throw new Error('product add to cart failed: ' + response.statusText);
      }
  
      const data = await response.json();
      console.log('product added to cart successful:', data);
      alert('Product added to cart');
    } catch (error) {
      console.error('Error during Product added to cart:', error.message);
    }
    
  };
  

function displayCart() {
    const cartItemsDiv = document.getElementById('cart-items');
    cartItemsDiv.innerHTML = '';

    let totalAmount = 0;
    cart.forEach((product, index) => {
        totalAmount += product.price;
        totalCartItems = index + 1;
        cartItemsDiv.innerHTML += `
            <li>
                <span>${product.name} - ₹${product.price}</span>
                <button style="margin:5px;" onclick="removeFromCart(${index},${product.id})">Remove</button>
            </li>
        `;
    });

    const cartItemsCountDiv = document.getElementById('cart-product-items');
    cartItemsCountDiv.innerHTML = totalCartItems;
  

    localStorage.setItem('totalAmount', totalAmount);
}

function removeFromCart(index,productId) {
    cart.splice(index, 1);
    console.log(index);
    console.log(productId);
    removetocartproduct(productId);
    displayCart();
}

const removetocartproduct = async (productId) => {
    try {
        var username=localStorage.getItem('currentUser');
      console.log('before reg api call');
      const response = await fetch(`http://localhost:3000/removetocart/${productId}/${username}`, {
        method: 'DELETE',
        
      });
      console.log('product remove beforeres:'+ JSON.stringify(productId));
          
      if (!response.ok) {
        throw new Error('product removed to cart failed: ' + response.statusText);
      }
  
      const data = await response.json();
      console.log('product removed to cart successful:', data);
      alert('Product removed to cart');
    } catch (error) {
      console.error('Error during Product removed to cart:', error.message);
    }
    
  };

function redirectToPayment() {

    if (cart.length > 0) {
        window.location.href = 'payment.html';
    } else {
        alert('Cart is empty');
    }
}
