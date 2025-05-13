// Cart Functionality
const cartIcon = document.querySelector('.cart-icon');
const cartSidebar = document.querySelector('.cart-sidebar');
const cartItemsContainer = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total span');
const cartCount = document.querySelector('.cart-count');
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const checkoutButton = document.querySelector('.checkout-btn');

let cart = [];

// Toggle Cart Sidebar
cartIcon.addEventListener('click', () => {
    cartSidebar.classList.toggle('active');
});

// Add to Cart
addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const product = button.parentElement;
        const productName = product.querySelector('h3').textContent;
        const productPrice = parseFloat(product.querySelector('p').textContent.replace('$', ''));
        
        // Check if item already exists in cart
        const existingItem = cart.find(item => item.name === productName);
        
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({
                name: productName,
                price: productPrice,
                quantity: 1
            });
        }
        
        updateCart();
    });
});

// Update Cart UI
function updateCart() {
    cartItemsContainer.innerHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        const cartItemElement = document.createElement('div');
        cartItemElement.classList.add('cart-item');
        cartItemElement.innerHTML = `
            <span>${item.name} (x${item.quantity})</span>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
        `;
        cartItemsContainer.appendChild(cartItemElement);
        
        total += item.price * item.quantity;
    });
    
    cartTotal.textContent = total.toFixed(2);
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}

// Checkout
checkoutButton.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Your cart is empty!');
    } else {
        alert(`Order placed! Total: $${cartTotal.textContent}`);
        cart = [];
        updateCart();
    }
});