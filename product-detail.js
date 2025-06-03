// Professional Product Detail Page JavaScript - Clean & Optimized

let currentQuantity = 1;

// Get current product data (set in the HTML page)
function getCurrentProduct() {
    return window.currentProductData || null;
}

// Select thumbnail image
function selectThumbnail(thumbnailElement, imageSrc) {
    // Remove active class from all thumbnails
    document.querySelectorAll('.thumbnail').forEach(thumb => thumb.classList.remove('active'));
    
    // Add active class to clicked thumbnail
    thumbnailElement.classList.add('active');
    
    // Update main image
    const mainImage = document.querySelector('.main-img');
    if (mainImage) {
        mainImage.src = imageSrc;
    }
}

// Quantity control functions
function increaseQuantity() {
    const quantityInput = document.getElementById('quantity');
    if (quantityInput) {
        currentQuantity = parseInt(quantityInput.value) + 1;
        quantityInput.value = currentQuantity;
    }
}

function decreaseQuantity() {
    const quantityInput = document.getElementById('quantity');
    if (quantityInput && currentQuantity > 1) {
        currentQuantity = parseInt(quantityInput.value) - 1;
        quantityInput.value = currentQuantity;
    }
}

function updateQuantityFromInput() {
    const quantityInput = document.getElementById('quantity');
    if (quantityInput) {
        const value = parseInt(quantityInput.value);
        
        if (value && value > 0) {
            currentQuantity = value;
        } else {
            currentQuantity = 1;
            quantityInput.value = 1;
        }
    }
}

// Add to cart function for current product
function addToCartFromDetail() {
    const product = getCurrentProduct();
    
    if (!product) {
        showNotification('Product information not found');
        return;
    }
    
    if (product.availability === 'outofstock') {
        showNotification('Product is out of stock');
        return;
    }
    
    // Use the cart system from products.js if available
    if (typeof cart !== 'undefined') {
        for (let i = 0; i < currentQuantity; i++) {
            cart.addItem(product.id, product.name, product.price, product.image);
        }
        
        // Professional visual feedback on button
        const button = document.getElementById('addToCartBtn');
        if (button) {
            const originalText = button.textContent;
            const originalBg = button.style.background;
            
            button.textContent = 'ADDED TO CART';
            button.style.background = '#22c55e';
            button.style.color = '#ffffff';
            button.style.transform = 'scale(0.98)';
            
            setTimeout(() => {
                button.textContent = originalText;
                button.style.background = originalBg || '';
                button.style.color = '';
                button.style.transform = '';
            }, 2000);
        }
    } else {
        // Fallback if cart system not available
        showNotification(`${currentQuantity}x ${product.name} added to cart`);
    }
}

// Buy now function
function buyNow() {
    const product = getCurrentProduct();
    
    if (!product) {
        showNotification('Product information not found');
        return;
    }
    
    if (product.availability === 'outofstock') {
        showNotification('Product is out of stock');
        return;
    }
    
    // Add to cart first
    addToCartFromDetail();
    
    // Show professional checkout message
    setTimeout(() => {
        showNotification('Proceeding to checkout...');
        // In a real store, this would redirect to checkout
        // window.location.href = 'checkout.html';
    }, 1000);
}

// Toggle expandable sections
function toggleSection(header) {
    const sectionContent = header.nextElementSibling;
    const toggle = header.querySelector('.section-toggle');
    
    if (sectionContent && toggle) {
        sectionContent.classList.toggle('collapsed');
        
        if (sectionContent.classList.contains('collapsed')) {
            toggle.style.transform = 'rotate(180deg)';
        } else {
            toggle.style.transform = 'rotate(0deg)';
        }
    }
}

// Professional notification function
function showNotification(message) {
    // Create notification element if it doesn't exist
    let notification = document.getElementById('notification');
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'notification';
        notification.className = 'notification';
        notification.style.cssText = `
            position: fixed;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%) translateY(100px);
            background: linear-gradient(135deg, rgba(17, 17, 34, 0.95), rgba(30, 30, 60, 0.95));
            backdrop-filter: blur(15px);
            color: #ffffff;
            padding: 16px 28px;
            border-radius: 0;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3), 0 0 20px rgba(161, 204, 231, 0.3);
            z-index: 1000;
            opacity: 0;
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            border: 1px solid rgba(161, 204, 231, 0.2);
            font-weight: 600;
            font-size: 0.95rem;
            max-width: 350px;
            word-wrap: break-word;
            text-align: center;
        `;
        document.body.appendChild(notification);
    }
    
    notification.textContent = message;
    notification.style.transform = 'translateX(-50%) translateY(0)';
    notification.style.opacity = '1';
    
    setTimeout(() => {
        notification.style.transform = 'translateX(-50%) translateY(100px)';
        notification.style.opacity = '0';
    }, 3500);
}

// Update action buttons based on product availability
function updateActionButtons() {
    const product = getCurrentProduct();
    if (!product) return;
    
    const addToCartBtn = document.getElementById('addToCartBtn');
    const buyNowBtn = document.getElementById('buyNowBtn');
    
    if (product.availability === 'outofstock') {
        if (addToCartBtn) {
            addToCartBtn.textContent = 'OUT OF STOCK';
            addToCartBtn.classList.add('disabled');
            addToCartBtn.disabled = true;
        }
        
        if (buyNowBtn) {
            buyNowBtn.textContent = 'OUT OF STOCK';
            buyNowBtn.classList.add('disabled');
            buyNowBtn.disabled = true;
        }
    } else {
        if (addToCartBtn) {
            addToCartBtn.classList.remove('disabled');
            addToCartBtn.disabled = false;
        }
        
        if (buyNowBtn) {
            buyNowBtn.classList.remove('disabled');
            buyNowBtn.disabled = false;
        }
    }
}

// Handle image loading errors professionally
function handleImageError(img) {
    img.style.display = 'none';
    
    // Create professional placeholder if it doesn't exist
    let placeholder = img.nextElementSibling;
    if (!placeholder || !placeholder.classList.contains('image-placeholder')) {
        placeholder = document.createElement('div');
        placeholder.className = 'image-placeholder';
        placeholder.textContent = 'Image Not Available';
        placeholder.style.cssText = `
            display: flex;
            width: 100%;
            height: 100%;
            align-items: center;
            justify-content: center;
            color: #6b7280;
            font-size: 1rem;
            font-weight: 500;
            background: linear-gradient(45deg, #f8f9fa, #e9ecef);
        `;
        img.parentNode.insertBefore(placeholder, img.nextSibling);
    }
    placeholder.style.display = 'flex';
}

// Setup cart dropdown functionality
function setupCartDropdown() {
    const cartToggle = document.getElementById('cartToggle');
    const cartClose = document.getElementById('cartClose');
    const cartDropdown = document.getElementById('cartDropdown');
    
    if (cartToggle) {
        cartToggle.addEventListener('click', function(e) {
            e.preventDefault();
            if (typeof toggleCartDropdown !== 'undefined') {
                toggleCartDropdown();
            }
        });
    }
    
    if (cartClose) {
        cartClose.addEventListener('click', function() {
            if (typeof closeCartDropdown !== 'undefined') {
                closeCartDropdown();
            }
        });
    }
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.cart-container')) {
            if (typeof closeCartDropdown !== 'undefined') {
                closeCartDropdown();
            }
        }
    });
    
    // Prevent dropdown from closing when clicking inside it
    if (cartDropdown) {
        cartDropdown.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
}

// Setup chat button functionality
function setupChatButton() {
    const chatBtn = document.querySelector('.chat-btn');
    if (chatBtn) {
        chatBtn.addEventListener('click', function() {
            showNotification('Live chat support coming soon');
            
            this.classList.add('pulse');
            setTimeout(() => {
                this.classList.remove('pulse');
            }, 300);
        });
    }
}

// Initialize sections (first expanded, rest collapsed)
function initializeSections() {
    const sectionContents = document.querySelectorAll('.section-content');
    sectionContents.forEach((content, index) => {
        if (index > 0) {
            content.classList.add('collapsed');
            const toggle = content.previousElementSibling?.querySelector('.section-toggle');
            if (toggle) {
                toggle.style.transform = 'rotate(180deg)';
            }
        }
    });
}

// Setup image error handlers
function setupImageErrorHandlers() {
    // Main product image
    const mainImg = document.querySelector('.main-img');
    if (mainImg) {
        mainImg.addEventListener('error', function() {
            handleImageError(this);
        });
    }
    
    // Thumbnail images
    const thumbnailImgs = document.querySelectorAll('.thumbnail img');
    thumbnailImgs.forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
            this.parentElement.innerHTML = '<span style="font-size: 0.8rem; color: #6b7280;">No Image</span>';
        });
    });
    
    // Related product images
    const relatedImgs = document.querySelectorAll('.related-product-img img');
    relatedImgs.forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
            this.parentElement.innerHTML = '<span style="font-size: 0.8rem; color: #6b7280;">Image Not Available</span>';
        });
    });
}

// Main initialization function
function initializeProductDetailPage() {
    // Initialize cart from localStorage if cart system exists
    if (typeof cart !== 'undefined') {
        cart.loadFromLocalStorage();
    }
    
    // Set up quantity controls
    const increaseBtn = document.getElementById('increaseQty');
    const decreaseBtn = document.getElementById('decreaseQty');
    const quantityInput = document.getElementById('quantity');
    
    if (increaseBtn) increaseBtn.addEventListener('click', increaseQuantity);
    if (decreaseBtn) decreaseBtn.addEventListener('click', decreaseQuantity);
    if (quantityInput) {
        quantityInput.addEventListener('input', updateQuantityFromInput);
        quantityInput.addEventListener('change', updateQuantityFromInput);
    }
    
    // Set up action buttons
    const addToCartBtn = document.getElementById('addToCartBtn');
    const buyNowBtn = document.getElementById('buyNowBtn');
    
    if (addToCartBtn) addToCartBtn.addEventListener('click', addToCartFromDetail);
    if (buyNowBtn) buyNowBtn.addEventListener('click', buyNow);
    
    // Update buttons based on product availability
    updateActionButtons();
    
    // Setup other functionality
    setupCartDropdown();
    setupChatButton();
    initializeSections();
    setupImageErrorHandlers();
    
    // Optional: Log product information for debugging (remove in production)
    const product = getCurrentProduct();
    if (product && window.location.hostname === 'localhost') {
        console.log('Product detail page loaded:', product.name);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeProductDetailPage);

// Export functions for global access
window.selectThumbnail = selectThumbnail;
window.toggleSection = toggleSection;
window.addToCartFromDetail = addToCartFromDetail;
window.buyNow = buyNow;
window.showNotification = showNotification;