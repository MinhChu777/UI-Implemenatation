// Cart state management - Make globally accessible
const cart = {
    items: [],
    total: 0,
    
    // Add item to cart
    addItem: function(id, name, price, image = null) {
        const existingItem = this.items.find(item => item.id === id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                id: id,
                name: name,
                price: parseFloat(price),
                quantity: 1,
                image: image || 'Product Image'
            });
        }
        
        this.updateTotal();
        this.updateCartUI();
        this.animateBadge();
        this.animateCartBounce();
        this.saveToLocalStorage();
        this.showNotification(`${name} added to cart!`);
    },
    
    // Remove item from cart
    removeItem: function(id) {
        this.items = this.items.filter(item => item.id !== id);
        this.updateTotal();
        this.updateCartUI();
        this.saveToLocalStorage();
        this.showNotification("Item removed from cart!");
    },
    
    // Update item quantity
    updateQuantity: function(id, quantity) {
        const item = this.items.find(item => item.id === id);
        if (item) {
            if (quantity <= 0) {
                this.removeItem(id);
            } else {
                item.quantity = quantity;
                this.updateTotal();
                this.updateCartUI();
                this.saveToLocalStorage();
            }
        }
    },
    
    // Calculate cart total
    updateTotal: function() {
        this.total = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    },
    
    // Update cart UI elements
    updateCartUI: function() {
        this.updateBadge();
        this.updateDropdown();
    },
    
    // Update cart badge
    updateBadge: function() {
        const badge = document.getElementById('cartBadge');
        if (!badge) return;
        
        const totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
        
        badge.textContent = totalItems;
        
        if (totalItems > 0) {
            badge.classList.add('active');
        } else {
            badge.classList.remove('active');
        }
    },
    
    // Animate badge when item is added
    animateBadge: function() {
        const badge = document.getElementById('cartBadge');
        if (!badge) return;
        
        badge.classList.add('pulse');
        setTimeout(() => {
            badge.classList.remove('pulse');
        }, 600);
    },
    
    // Animate cart icon bounce
    animateCartBounce: function() {
        const cartBtn = document.getElementById('cartToggle');
        if (!cartBtn) return;
        
        cartBtn.classList.add('bounce');
        setTimeout(() => {
            cartBtn.classList.remove('bounce');
        }, 600);
    },
    
    // Update cart dropdown content
    updateDropdown: function() {
        const cartItems = document.getElementById('cartItems');
        const cartTotal = document.getElementById('cartTotal');
        
        if (!cartItems || !cartTotal) return;
        
        cartTotal.textContent = this.total.toFixed(2);
        
        if (this.items.length === 0) {
            cartItems.innerHTML = '<div class="empty-cart"><p>Your cart is empty</p></div>';
            return;
        }
        
        cartItems.innerHTML = this.items.map(item => `
            <div class="cart-item">
                <div class="cart-item-img">${item.image}</div>
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                </div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                    <span class="quantity-display">${item.quantity}</span>
                    <button class="quantity-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                </div>
                <div class="cart-item-remove" onclick="cart.removeItem(${item.id})">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </div>
            </div>
        `).join('') + `
            <div style="padding: 15px 20px; border-top: 1px solid rgba(232, 62, 140, 0.1);">
                <button onclick="cart.clearCart()" style="width: 100%; padding: 8px; background: transparent; border: 1px solid rgba(232, 62, 140, 0.3); color: #e83e8c; cursor: pointer; font-size: 0.85rem; transition: all 0.3s ease;" 
                onmouseover="this.style.backgroundColor='rgba(232, 62, 140, 0.1)'" 
                onmouseout="this.style.backgroundColor='transparent'">
                    CLEAR CART
                </button>
            </div>
        `;
    },
    
    // Show notification
    showNotification: function(message) {
        showNotification(message);
    },
    
    // Save cart to localStorage
    saveToLocalStorage: function() {
        localStorage.setItem('butlerCart', JSON.stringify({
            items: this.items,
            total: this.total
        }));
    },
    
    // Load cart from localStorage
    loadFromLocalStorage: function() {
        const savedCart = localStorage.getItem('butlerCart');
        if (savedCart) {
            try {
                const parsedCart = JSON.parse(savedCart);
                this.items = parsedCart.items || [];
                this.total = parsedCart.total || 0;
                this.updateCartUI();
            } catch (e) {
                console.error('Error loading cart from localStorage:', e);
                this.items = [];
                this.total = 0;
            }
        }
    },
    
    // Clear all items from cart
    clearCart: function() {
        this.items = [];
        this.total = 0;
        this.updateCartUI();
        this.saveToLocalStorage();
        this.showNotification("Cart cleared!");
    }
};

// Cart dropdown toggle functionality - Make globally accessible
window.toggleCartDropdown = function() {
    const dropdown = document.getElementById('cartDropdown');
    if (dropdown) {
        dropdown.classList.toggle('active');
    }
};

window.closeCartDropdown = function() {
    const dropdown = document.getElementById('cartDropdown');
    if (dropdown) {
        dropdown.classList.remove('active');
    }
};

// Notification function for both cart and chat
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
            left: 120px;
            background-color: rgba(161, 204, 231, 0.9);
            backdrop-filter: blur(10px);
            color: #050510;
            padding: 15px 25px;
            border-radius: 0;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3), 0 0 15px rgba(161, 204, 231, 0.5);
            z-index: 100;
            transform: translateY(100px);
            opacity: 0;
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            border-left: 3px solid #e83e8c;
            font-weight: 600;
            max-width: 300px;
            word-wrap: break-word;
        `;
        document.body.appendChild(notification);
    }
    
    notification.textContent = message;
    notification.style.transform = 'translateY(0)';
    notification.style.opacity = '1';
    
    setTimeout(() => {
        notification.style.transform = 'translateY(100px)';
        notification.style.opacity = '0';
    }, 3000);
}

// Search functionality (redirect to products page)
function performSearch(query) {
    if (query.trim()) {
        window.location.href = `products.html?search=${encodeURIComponent(query.trim())}`;
    }
}

// Smooth scrolling for anchor links
function smoothScrollTo(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Animate elements on scroll (Intersection Observer)
function animateOnScroll() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements that should animate on scroll
    const animatedElements = document.querySelectorAll(`
        .stat-card,
        .value-card,
        .highlight-item,
        .feature-row,
        .contact-method
    `);

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number, .big-stat-number, .mini-stat-number');
    
    const animateCounter = (counter) => {
        const originalText = counter.textContent;
        
        // Skip animation for non-numeric content (like "4.9/5")
        if (originalText.includes('/') || originalText.includes('%') || isNaN(parseInt(originalText.replace(/[^\d]/g, '')))) {
            return; // Don't animate, just keep the original text
        }
        
        const target = parseInt(originalText.replace(/[^\d]/g, '')) || 0;
        const increment = target / 50; // Animation duration control
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = originalText.replace(/[\d,]+/g, Math.floor(current).toLocaleString());
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = originalText.replace(/[\d,]+/g, target.toLocaleString());
            }
        };
        
        updateCounter();
    };
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Initialize cart from localStorage
    cart.loadFromLocalStorage();
    
    // Make cart functions globally accessible
    window.cart = cart;
    
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch(this.value);
            }
        });
    }
    
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            const query = searchInput ? searchInput.value : '';
            performSearch(query);
        });
    }
    
    // Cart dropdown listeners
    const cartToggle = document.getElementById('cartToggle');
    const cartClose = document.getElementById('cartClose');
    const cartDropdown = document.getElementById('cartDropdown');
    
    if (cartToggle) {
        cartToggle.addEventListener('click', function(e) {
            e.preventDefault();
            window.toggleCartDropdown();
        });
    }
    
    if (cartClose) {
        cartClose.addEventListener('click', function() {
            window.closeCartDropdown();
        });
    }
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.cart-container')) {
            window.closeCartDropdown();
        }
    });
    
    // Prevent dropdown from closing when clicking inside it
    if (cartDropdown) {
        cartDropdown.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
    
    // Chat button functionality
    const chatBtn = document.querySelector('.chat-btn');
    if (chatBtn) {
        chatBtn.addEventListener('click', function() {
            showNotification('Chat feature coming soon!');
            
            this.classList.add('pulse');
            setTimeout(() => {
                this.classList.remove('pulse');
            }, 300);
        });
    }
    
    // Smooth scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            e.preventDefault();
            smoothScrollTo(targetId);
        });
    });
    
    // CTA button functionality
    const primaryBtn = document.querySelector('.primary-btn');
    const secondaryBtn = document.querySelector('.secondary-btn');
    
    if (primaryBtn) {
        primaryBtn.addEventListener('click', function(e) {
            // Already has href to products.html, no additional functionality needed
        });
    }
    
    if (secondaryBtn) {
        secondaryBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('Redirecting to Facebook page...');
            // In a real implementation, this would redirect to the actual Facebook page
            setTimeout(() => {
                // window.open('https://facebook.com/your-page', '_blank');
            }, 1000);
        });
    }
    
    // Initialize animations
    animateOnScroll();
    animateCounters();
    
    // Add some interactive effects to cards
    const interactiveCards = document.querySelectorAll('.stat-card, .value-card, .contact-method');
    interactiveCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click effects to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                transform: scale(0);
                animation: ripple 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
            `;
            
            // Add ripple animation keyframes if not already added
            if (!document.querySelector('#ripple-animation')) {
                const style = document.createElement('style');
                style.id = 'ripple-animation';
                style.textContent = `
                    @keyframes ripple {
                        to {
                            transform: scale(4);
                            opacity: 0;
                        }
                    }
                `;
                document.head.appendChild(style);
            }
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Console welcome message
    console.log('%c🏀 Welcome to Butler Trading Cards! 🏀', 'color: #e83e8c; font-size: 16px; font-weight: bold;');
    console.log('%cThanks for checking out our About Us page!', 'color: #a1cce7; font-size: 12px;');
});
