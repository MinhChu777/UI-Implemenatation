// Enhanced Cart functionality for policy pages - Make it globally accessible
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
            this.showNotification(`${name} added to cart!`);
            this.saveToLocalStorage();
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
            const totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
            
            if (badge) {
                badge.textContent = totalItems;
                
                if (totalItems > 0) {
                    badge.classList.add('active');
                } else {
                    badge.classList.remove('active');
                }
            }
        },
        
        // Animate badge when item is added
        animateBadge: function() {
            const badge = document.getElementById('cartBadge');
            if (badge) {
                badge.classList.add('pulse');
                setTimeout(() => {
                    badge.classList.remove('pulse');
                }, 600);
            }
        },
        
        // Animate cart icon bounce
        animateCartBounce: function() {
            const cartBtn = document.getElementById('cartToggle');
            if (cartBtn) {
                cartBtn.classList.add('bounce');
                setTimeout(() => {
                    cartBtn.classList.remove('bounce');
                }, 600);
            }
        },
        
        // Update cart dropdown content
        updateDropdown: function() {
            const cartItems = document.getElementById('cartItems');
            const cartTotal = document.getElementById('cartTotal');
            
            if (cartTotal) {
                cartTotal.textContent = this.total.toFixed(2);
            }
            
            if (!cartItems) return;
            
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
                        <button class="quantity-btn" onclick="window.cart.updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <span class="quantity-display">${item.quantity}</span>
                        <button class="quantity-btn" onclick="window.cart.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    </div>
                    <div class="cart-item-remove" onclick="window.cart.removeItem(${item.id})">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </div>
                </div>
            `).join('') + `
                <div style="padding: 15px 20px; border-top: 1px solid rgba(232, 62, 140, 0.1);">
                    <button onclick="window.cart.clearCart()" style="width: 100%; padding: 8px; background: transparent; border: 1px solid rgba(232, 62, 140, 0.3); color: #e83e8c; cursor: pointer; font-size: 0.85rem; transition: all 0.3s ease;" 
                    onmouseover="this.style.backgroundColor='rgba(232, 62, 140, 0.1)'" 
                    onmouseout="this.style.backgroundColor='transparent'">
                        CLEAR CART
                    </button>
                </div>
            `;
        },
        
        // Show notification
        showNotification: function(message) {
            // Create notification element if it doesn't exist
            let notification = document.getElementById('notification');
            if (!notification) {
                notification = document.createElement('div');
                notification.className = 'notification';
                notification.id = 'notification';
                notification.innerHTML = '<div class="notification-content"><span class="notification-message"></span></div>';
                document.body.appendChild(notification);
            }
            
            const notificationMessage = notification.querySelector('.notification-message');
            
            if (notificationMessage) {
                notificationMessage.textContent = message;
                notification.classList.add('active');
                
                setTimeout(() => {
                    notification.classList.remove('active');
                }, 3000);
            }
        },
        
        // Save cart to localStorage
        saveToLocalStorage: function() {
            try {
                localStorage.setItem('butlerCart', JSON.stringify({
                    items: this.items,
                    total: this.total
                }));
            } catch (e) {
                // Handle localStorage errors silently
                console.warn('Could not save cart to localStorage');
            }
        },
        
        // Load cart from localStorage
        loadFromLocalStorage: function() {
            try {
                const savedCart = localStorage.getItem('butlerCart');
                if (savedCart) {
                    const parsedCart = JSON.parse(savedCart);
                    this.items = parsedCart.items || [];
                    this.total = parsedCart.total || 0;
                    this.updateCartUI();
                }
            } catch (e) {
                // Handle localStorage errors silently
                console.warn('Could not load cart from localStorage');
                this.items = [];
                this.total = 0;
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

// Make cart globally accessible
window.cart = cart;

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

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize cart from localStorage
    cart.loadFromLocalStorage();
    
    // Search functionality for policy pages
    const initializeSearch = function() {
        const searchInput = document.getElementById('searchInput');
        const searchBtn = document.getElementById('searchBtn');
        
        // Function to perform search (redirect to products page)
        function performSearch(query) {
            if (query.trim()) {
                cart.showNotification(`Searching for "${query}"...`);
                // Redirect to products page with search parameter
                window.location.href = `products.html?search=${encodeURIComponent(query.trim())}`;
            }
        }
        
        // Search button click
        if (searchBtn) {
            searchBtn.addEventListener('click', function() {
                const query = searchInput ? searchInput.value.trim() : '';
                if (query) {
                    performSearch(query);
                }
            });
        }
        
        // Search input enter key
        if (searchInput) {
            searchInput.addEventListener('keydown', function(e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    const query = this.value.trim();
                    if (query) {
                        performSearch(query);
                    }
                }
            });
        }
    };
    
    // Initialize search
    initializeSearch();
    
    // Chat button functionality
    const chatBtn = document.querySelector('.chat-btn');
    if (chatBtn) {
        chatBtn.addEventListener('click', function() {
            cart.showNotification('Chat feature coming soon!');
            
            this.classList.add('pulse');
            setTimeout(() => {
                this.classList.remove('pulse');
            }, 300);
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
    
    // Smooth scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            e.preventDefault();
            
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Policy section expand/collapse functionality (optional enhancement)
    const policySections = document.querySelectorAll('.policy-section');
    policySections.forEach(section => {
        const header = section.querySelector('h2');
        if (header) {
            header.style.cursor = 'pointer';
            header.style.position = 'relative';
            header.addEventListener('click', function() {
                const content = section.querySelector('p, ul, div');
                if (content) {
                    section.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        }
    });
    
    // Table of contents generation (optional enhancement)
    const generateTableOfContents = function() {
        const sections = document.querySelectorAll('.policy-section h2');
        const policyContent = document.querySelector('.policy-content');
        
        if (sections.length > 5 && policyContent) {
            const toc = document.createElement('div');
            toc.className = 'table-of-contents';
            toc.innerHTML = '<h3>Table of Contents</h3>';
            
            const tocList = document.createElement('ul');
            
            sections.forEach((section, index) => {
                const sectionId = `section-${index}`;
                section.parentElement.id = sectionId;
                
                const tocItem = document.createElement('li');
                const tocLink = document.createElement('a');
                tocLink.href = `#${sectionId}`;
                tocLink.textContent = section.textContent;
                tocLink.addEventListener('click', function(e) {
                    e.preventDefault();
                    document.getElementById(sectionId).scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                });
                
                tocItem.appendChild(tocLink);
                tocList.appendChild(tocItem);
            });
            
            toc.appendChild(tocList);
            policyContent.insertBefore(toc, policyContent.firstChild);
        }
    };
    
    // Generate table of contents for long policy documents
    // generateTableOfContents(); // Uncomment if you want TOC
    
    // Highlight current section in viewport (optional enhancement)
    const highlightCurrentSection = function() {
        const sections = document.querySelectorAll('.policy-section');
        const scrollPosition = window.scrollY + 200;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                section.classList.add('current-section');
            } else {
                section.classList.remove('current-section');
            }
        });
    };
    
    // Add scroll listener for section highlighting
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(highlightCurrentSection, 10);
    });
    
    // Add print functionality
    const addPrintButton = function() {
        const policyHeader = document.querySelector('.policy-header');
        if (policyHeader) {
            const printBtn = document.createElement('button');
            printBtn.className = 'print-btn';
            printBtn.innerHTML = '🖨️ Print';
            printBtn.style.cssText = `
                position: absolute;
                top: 20px;
                right: 20px;
                background: rgba(232, 62, 140, 0.1);
                border: 1px solid rgba(232, 62, 140, 0.3);
                color: #e83e8c;
                padding: 8px 16px;
                cursor: pointer;
                transition: all 0.3s ease;
                font-size: 0.9rem;
            `;
            
            printBtn.addEventListener('click', function() {
                window.print();
            });
            
            printBtn.addEventListener('mouseenter', function() {
                this.style.backgroundColor = 'rgba(232, 62, 140, 0.2)';
            });
            
            printBtn.addEventListener('mouseleave', function() {
                this.style.backgroundColor = 'rgba(232, 62, 140, 0.1)';
            });
            
            policyHeader.style.position = 'relative';
            policyHeader.appendChild(printBtn);
        }
    };
    
    // Add print button
    addPrintButton();
    
    // Add copy link functionality to sections
    const addCopyLinkToSections = function() {
        const sections = document.querySelectorAll('.policy-section h2');
        
        sections.forEach((header, index) => {
            const section = header.parentElement;
            const sectionId = section.id || `section-${index}`;
            section.id = sectionId;
            
            header.addEventListener('mouseenter', function() {
                if (!this.querySelector('.copy-link')) {
                    const copyLink = document.createElement('span');
                    copyLink.className = 'copy-link';
                    copyLink.innerHTML = ' 🔗';
                    copyLink.style.cssText = `
                        opacity: 0.6;
                        cursor: pointer;
                        font-size: 0.8em;
                        transition: opacity 0.3s ease;
                    `;
                    
                    copyLink.addEventListener('click', function(e) {
                        e.stopPropagation();
                        const url = `${window.location.origin}${window.location.pathname}#${sectionId}`;
                        
                        if (navigator.clipboard && navigator.clipboard.writeText) {
                            navigator.clipboard.writeText(url).then(() => {
                                cart.showNotification('Section link copied to clipboard!');
                            }).catch(() => {
                                cart.showNotification('Could not copy link');
                            });
                        } else {
                            const textArea = document.createElement('textarea');
                            textArea.value = url;
                            document.body.appendChild(textArea);
                            textArea.select();
                            try {
                                document.execCommand('copy');
                                cart.showNotification('Section link copied to clipboard!');
                            } catch (err) {
                                cart.showNotification('Could not copy link');
                            }
                            document.body.removeChild(textArea);
                        }
                    });
                    
                    this.appendChild(copyLink);
                }
            });
            
            header.addEventListener('mouseleave', function() {
                const copyLink = this.querySelector('.copy-link');
                if (copyLink) {
                    setTimeout(() => {
                        if (copyLink.parentElement) {
                            copyLink.remove();
                        }
                    }, 100);
                }
            });
        });
    };
    
    addCopyLinkToSections();
});
