// Checkout Page JavaScript - Updated for New Layout

let checkoutCart = {
    items: [],
    subtotal: 0,
    shipping: 0,
    tax: 0,
    total: 0
};

// Shipping rates
const SHIPPING_RATES = {
    standard: 9.00,
    express: 15.00,
    international: 25.00
};

// Load cart from localStorage or products.js cart
function loadCheckoutCart() {
    // Try to get cart from localStorage first
    const savedCart = localStorage.getItem('butlerCart');
    if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        checkoutCart.items = parsedCart.items || [];
    } else if (typeof cart !== 'undefined' && cart.items) {
        // Fallback to global cart if available
        checkoutCart.items = [...cart.items];
    }
    
    calculateTotals();
    updateCheckoutDisplay();
}

// Calculate all totals
function calculateTotals() {
    // Calculate subtotal
    checkoutCart.subtotal = checkoutCart.items.reduce((sum, item) => 
        sum + (item.price * item.quantity), 0
    );
    
    // Get selected shipping rate
    const selectedShipping = document.querySelector('input[name="shipping"]:checked');
    checkoutCart.shipping = selectedShipping ? 
        SHIPPING_RATES[selectedShipping.value] : SHIPPING_RATES.standard;
    
    // No tax calculation for now (can be added later)
    checkoutCart.tax = 0;
    
    // Calculate final total
    checkoutCart.total = checkoutCart.subtotal + checkoutCart.shipping + checkoutCart.tax;
    
    updateTotalsDisplay();
}

// Update totals display
function updateTotalsDisplay() {
    const subtotalEl = document.getElementById('subtotalAmount');
    const shippingEl = document.getElementById('shippingAmount');
    const totalEl = document.getElementById('finalTotal');
    
    if (subtotalEl) subtotalEl.textContent = `$${checkoutCart.subtotal.toFixed(2)}`;
    if (shippingEl) shippingEl.textContent = `$${checkoutCart.shipping.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `$${checkoutCart.total.toFixed(2)}`;
}

// Update checkout display
function updateCheckoutDisplay() {
    const cartItemsSummary = document.getElementById('cartItemsSummary');
    const checkoutMainContainer = document.querySelector('.checkout-main-container');
    const emptyCheckout = document.getElementById('emptyCheckout');
    
    if (checkoutCart.items.length === 0) {
        // Show empty cart message
        if (checkoutMainContainer) checkoutMainContainer.style.display = 'none';
        if (emptyCheckout) emptyCheckout.style.display = 'flex';
        return;
    }
    
    // Show checkout form
    if (checkoutMainContainer) checkoutMainContainer.style.display = 'grid';
    if (emptyCheckout) emptyCheckout.style.display = 'none';
    
    // Render cart items summary
    if (cartItemsSummary) {
        cartItemsSummary.innerHTML = checkoutCart.items.map(item => `
            <div class="cart-item-summary">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}" style="width: 100%; height: 100%; object-fit: cover;" 
                         onerror="this.style.display='none'; this.parentElement.innerHTML='IMG';">
                </div>
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-meta">
                        <span class="cart-item-quantity">Qty: ${item.quantity}</span>
                        <span class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    calculateTotals();
}

// Express payment processing
function processExpressPayment(method) {
    if (checkoutCart.items.length === 0) {
        showNotification('Your cart is empty');
        return;
    }
    
    showNotification(`Processing ${method.charAt(0).toUpperCase() + method.slice(1)} payment...`);
    
    // Simulate express payment processing
    setTimeout(() => {
        const orderNumber = generateOrderNumber();
        processOrderSuccess(orderNumber, method);
    }, 2000);
}

// Save checkout cart to localStorage
function saveCheckoutCart() {
    localStorage.setItem('butlerCart', JSON.stringify({
        items: checkoutCart.items,
        total: checkoutCart.total
    }));
}

// Update global cart if it exists
function updateGlobalCart() {
    if (typeof cart !== 'undefined') {
        cart.items = [...checkoutCart.items];
        cart.total = checkoutCart.total;
        if (typeof cart.updateCartUI === 'function') {
            cart.updateCartUI();
        }
    }
}

// Format card number input
function formatCardNumber(input) {
    let value = input.value.replace(/\D/g, '');
    value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    input.value = value;
}

// Format expiry date input
function formatExpiryDate(input) {
    let value = input.value.replace(/\D/g, '');
    
    // Limit to 4 digits (MMYY)
    if (value.length > 4) {
        value = value.substring(0, 4);
    }
    
    // Format as MM/YY (without spaces for simplicity)
    if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2);
    }
    
    input.value = value;
}

// Validate form
function validateCheckoutForm() {
    const form = document.getElementById('checkoutForm');
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.style.borderColor = '#e74c3c';
            isValid = false;
        } else {
            field.style.borderColor = 'rgba(232, 62, 140, 0.2)';
        }
    });
    
    // Validate email format (required field)
    const emailField = document.getElementById('email');
    if (emailField) {
        if (!emailField.value.trim()) {
            emailField.style.borderColor = '#e74c3c';
            isValid = false;
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailField.value)) {
                emailField.style.borderColor = '#e74c3c';
                isValid = false;
            }
        }
    }
    
    // Validate credit card if selected
    const creditCardSelected = document.getElementById('creditCard')?.checked;
    if (creditCardSelected) {
        const cardNumber = document.getElementById('cardNumber');
        const expiryDate = document.getElementById('expiryDate');
        const cvv = document.getElementById('cvv');
        const cardName = document.getElementById('cardName');
        
        if (!cardNumber.value.replace(/\s/g, '') || cardNumber.value.replace(/\s/g, '').length < 13) {
            cardNumber.style.borderColor = '#e74c3c';
            isValid = false;
        }
        
        if (!expiryDate.value || expiryDate.value.replace(/\//g, '').length < 4) {
            expiryDate.style.borderColor = '#e74c3c';
            isValid = false;
        }
        
        if (!cvv.value || cvv.value.length < 3) {
            cvv.style.borderColor = '#e74c3c';
            isValid = false;
        }
        
        if (!cardName.value.trim()) {
            cardName.style.borderColor = '#e74c3c';
            isValid = false;
        }
    }
    
    return isValid;
}

// Process order
function processOrder(formData) {
    const orderData = {
        items: checkoutCart.items,
        totals: {
            subtotal: checkoutCart.subtotal,
            shipping: checkoutCart.shipping,
            tax: checkoutCart.tax,
            total: checkoutCart.total
        },
        customer: formData,
        orderDate: new Date().toISOString(),
        orderNumber: generateOrderNumber()
    };
    
    // Simulate order processing
    setTimeout(() => {
        processOrderSuccess(orderData.orderNumber, 'credit card');
    }, 2000);
}

// Process successful order
function processOrderSuccess(orderNumber, paymentMethod) {
    // Clear cart
    checkoutCart.items = [];
    localStorage.removeItem('butlerCart');
    updateGlobalCart();
    
    // Show success message
    showOrderSuccess(orderNumber, paymentMethod);
}

// Generate order number
function generateOrderNumber() {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `BTC${timestamp.toString().slice(-6)}${random.toString().padStart(3, '0')}`;
}

// Show order success
function showOrderSuccess(orderNumber, paymentMethod) {
    const successHtml = `
        <div class="order-success">
            <div class="success-content">
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22,4 12,14.01 9,11.01"></polyline>
                </svg>
                <h2>Order Placed Successfully!</h2>
                <p>Thank you for your order. Your order has been processed successfully.</p>
                <div class="order-details">
                    <div class="order-number">Order #${orderNumber}</div>
                    <div class="payment-method">Paid via ${paymentMethod.charAt(0).toUpperCase() + paymentMethod.slice(1)}</div>
                    <div class="order-total">Total: $${checkoutCart.total.toFixed(2)}</div>
                </div>
                <p>You will receive a confirmation email shortly with your order details.</p>
                <div class="success-actions">
                    <button class="continue-shopping-btn" onclick="window.location.href='products.html'">
                        Continue Shopping
                    </button>
                    <button class="track-order-btn" onclick="alert('Order tracking will be available soon!')">
                        Track Order
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.querySelector('main .container').innerHTML = successHtml;
    
    // Add success styles
    const successStyles = `
        <style>
            .order-success {
                display: flex;
                align-items: center;
                justify-content: center;
                min-height: 60vh;
                text-align: center;
                padding: 40px 20px;
            }
            .success-content {
                max-width: 600px;
            }
            .success-content h2 {
                color: #22c55e;
                font-size: 2.5rem;
                margin: 20px 0;
                font-weight: 700;
            }
            .success-content p {
                color: rgba(255, 255, 255, 0.8);
                font-size: 1.1rem;
                margin: 15px 0;
                line-height: 1.5;
            }
            .order-details {
                background: rgba(17, 17, 34, 0.8);
                border: 1px solid rgba(232, 62, 140, 0.2);
                padding: 30px;
                margin: 30px 0;
                backdrop-filter: blur(10px);
            }
            .order-number {
                background: linear-gradient(135deg, #e83e8c, #a1cce7);
                color: #ffffff;
                padding: 15px 30px;
                font-size: 1.3rem;
                font-weight: 700;
                letter-spacing: 2px;
                margin-bottom: 15px;
                display: inline-block;
            }
            .payment-method, .order-total {
                color: #a1cce7;
                font-size: 1.1rem;
                margin: 10px 0;
                font-weight: 600;
            }
            .success-actions {
                display: flex;
                gap: 20px;
                justify-content: center;
                margin-top: 30px;
                flex-wrap: wrap;
            }
            .continue-shopping-btn, .track-order-btn {
                padding: 15px 30px;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 1px;
                transition: all 0.3s ease;
                border: none;
                cursor: pointer;
                font-size: 0.95rem;
            }
            .continue-shopping-btn {
                background: #e83e8c;
                color: #ffffff;
            }
            .track-order-btn {
                background: transparent;
                color: #a1cce7;
                border: 1px solid #a1cce7;
            }
            .continue-shopping-btn:hover {
                background: #a1cce7;
                color: #050510;
                transform: translateY(-3px);
                box-shadow: 0 8px 25px rgba(161, 204, 231, 0.4);
            }
            .track-order-btn:hover {
                background: #a1cce7;
                color: #050510;
                transform: translateY(-3px);
                box-shadow: 0 8px 25px rgba(161, 204, 231, 0.4);
            }
            @media (max-width: 768px) {
                .success-content h2 {
                    font-size: 2rem;
                }
                .order-details {
                    padding: 20px;
                }
                .order-number {
                    font-size: 1.1rem;
                    padding: 12px 20px;
                }
                .success-actions {
                    flex-direction: column;
                    align-items: center;
                }
                .continue-shopping-btn, .track-order-btn {
                    width: 100%;
                    max-width: 250px;
                }
            }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', successStyles);
}

// Show notification
function showNotification(message) {
    let notification = document.getElementById('checkoutNotification');
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'checkoutNotification';
        notification.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: linear-gradient(135deg, rgba(161, 204, 231, 0.95), rgba(232, 62, 140, 0.95));
            backdrop-filter: blur(10px);
            color: #ffffff;
            padding: 15px 25px;
            border-radius: 0;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
            z-index: 1000;
            transform: translateX(400px);
            opacity: 0;
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            font-weight: 600;
            max-width: 300px;
            word-wrap: break-word;
        `;
        document.body.appendChild(notification);
    }
    
    notification.textContent = message;
    notification.style.transform = 'translateX(0)';
    notification.style.opacity = '1';
    
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        notification.style.opacity = '0';
    }, 3000);
}

// Initialize checkout page
function initializeCheckout() {
    console.log('Initializing checkout page...');
    
    // Load cart items
    loadCheckoutCart();
    
    // Set up shipping method change listeners
    const shippingOptions = document.querySelectorAll('input[name="shipping"]');
    shippingOptions.forEach(option => {
        option.addEventListener('change', calculateTotals);
    });
    
    // Set up payment method change listeners
    const paymentOptions = document.querySelectorAll('input[name="payment"]');
    const creditCardForm = document.getElementById('creditCardForm');
    
    paymentOptions.forEach(option => {
        option.addEventListener('change', function() {
            if (creditCardForm) {
                if (this.value === 'credit') {
                    creditCardForm.style.display = 'block';
                } else {
                    creditCardForm.style.display = 'none';
                }
            }
        });
    });
    
    // Set up form input formatting
    const cardNumberInput = document.getElementById('cardNumber');
    const expiryDateInput = document.getElementById('expiryDate');
    const cvvInput = document.getElementById('cvv');
    
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function() {
            formatCardNumber(this);
        });
    }
    
    if (expiryDateInput) {
        expiryDateInput.addEventListener('input', function() {
            formatExpiryDate(this);
        });
    }
    
    if (cvvInput) {
        cvvInput.addEventListener('input', function() {
            this.value = this.value.replace(/\D/g, '');
        });
    }
    
    // Set up form submission
    const checkoutForm = document.getElementById('checkoutForm');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (checkoutCart.items.length === 0) {
                showNotification('Your cart is empty');
                return;
            }
            
            if (!validateCheckoutForm()) {
                showNotification('Please fill in all required fields correctly');
                return;
            }
            
            // Show processing state
            const submitBtn = document.getElementById('placeOrderBtn');
            if (submitBtn) {
                submitBtn.classList.add('processing');
                submitBtn.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M21 12a9 9 0 11-6.219-8.56"></path>
                    </svg>
                    Processing Order...
                `;
                
                // Add rotation animation
                const spinner = submitBtn.querySelector('svg');
                if (spinner) {
                    spinner.style.animation = 'spin 1s linear infinite';
                }
            }
            
            // Get form data
            const formData = new FormData(this);
            const formObject = Object.fromEntries(formData.entries());
            
            // Process order
            processOrder(formObject);
        });
    }
    
    // Set up cart dropdown if products.js is loaded
    if (typeof cart !== 'undefined') {
        setupCartDropdown();
    }
    
    console.log('Checkout page initialized successfully');
}

// Setup cart dropdown functionality (from products.js)
function setupCartDropdown() {
    const cartToggle = document.getElementById('cartToggle');
    const cartClose = document.getElementById('cartClose');
    const cartDropdown = document.getElementById('cartDropdown');
    
    if (cartToggle) {
        cartToggle.addEventListener('click', function(e) {
            e.preventDefault();
            if (typeof toggleCartDropdown !== 'undefined') {
                toggleCartDropdown();
            } else {
                cartDropdown?.classList.toggle('active');
            }
        });
    }
    
    if (cartClose) {
        cartClose.addEventListener('click', function() {
            if (typeof closeCartDropdown !== 'undefined') {
                closeCartDropdown();
            } else {
                cartDropdown?.classList.remove('active');
            }
        });
    }
    
    // Update cart dropdown display
    updateGlobalCart();
}

// Make functions globally available
window.processExpressPayment = processExpressPayment;

// Add CSS for spinner animation
const spinnerCSS = `
    <style>
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    </style>
`;

document.head.insertAdjacentHTML('beforeend', spinnerCSS);

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeCheckout);

// Update cart display when returning to page
window.addEventListener('focus', function() {
    loadCheckoutCart();
});