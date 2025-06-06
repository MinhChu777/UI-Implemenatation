// Enhanced Cart functionality with dropdown - Make it globally accessible
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
                    image: image || 'default-product.png'
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
            badge.classList.add('pulse');
            setTimeout(() => {
                badge.classList.remove('pulse');
            }, 600);
        },
        
        // Animate cart icon bounce
        animateCartBounce: function() {
            const cartBtn = document.getElementById('cartToggle');
            cartBtn.classList.add('bounce');
            setTimeout(() => {
                cartBtn.classList.remove('bounce');
            }, 600);
        },
        
        // Update cart dropdown content
        updateDropdown: function() {
            const cartItems = document.getElementById('cartItems');
            const cartTotal = document.getElementById('cartTotal');
            
            cartTotal.textContent = this.total.toFixed(2);
            
            if (this.items.length === 0) {
                cartItems.innerHTML = '<div class="empty-cart"><p>Your cart is empty</p></div>';
                return;
            }
            
            cartItems.innerHTML = this.items.map(item => `
                <div class="cart-item">
                    <div class="cart-item-img">
                        <img src="${item.image}" alt="${item.name}" style="width: 100%; height: 100%; object-fit: cover;" 
                             onerror="this.style.display='none'; this.parentElement.innerHTML='IMG';">
                    </div>
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
            const notification = document.getElementById('notification');
            const notificationMessage = notification.querySelector('.notification-message');
            
            notificationMessage.textContent = message;
            notification.classList.add('active');
            
            setTimeout(() => {
                notification.classList.remove('active');
            }, 3000);
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
                const parsedCart = JSON.parse(savedCart);
                this.items = parsedCart.items || [];
                this.total = parsedCart.total || 0;
                this.updateCartUI();
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

// Updated Add to cart function (global) - now accepts image parameter
window.addToCart = function(id, name, price, image = null) {
    // Add to cart (this will trigger both badge pulse and cart bounce)
    cart.addItem(id, name, price, image);
    
    // Visual feedback on the product card button
    const button = event.target.closest('.add-to-cart');
    if (button) {
        button.style.transform = 'scale(0.9)';
        button.style.backgroundColor = '#a1cce7';
        setTimeout(() => {
            button.style.transform = 'scale(1.1)';
            setTimeout(() => {
                button.style.transform = 'scale(1)';
                button.style.backgroundColor = '#e83e8c';
            }, 100);
        }, 150);
    }
    
    console.log(`Added to cart: ${name} - $${price} - Image: ${image}`);
};

// Cart dropdown toggle functionality - Make globally accessible
window.toggleCartDropdown = function() {
    const dropdown = document.getElementById('cartDropdown');
    dropdown.classList.toggle('active');
};

window.closeCartDropdown = function() {
    const dropdown = document.getElementById('cartDropdown');
    dropdown.classList.remove('active');
};

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize cart from localStorage
    cart.loadFromLocalStorage();
    
    // Search suggestions functionality
    const initializeSearchSuggestions = function() {
        const searchInput = document.querySelector('.search-bar input');
        const searchBtn = document.querySelector('.search-btn');
        const searchBar = document.querySelector('.search-bar');
        
        // Create search suggestions dropdown if it doesn't exist
        let searchSuggestions = document.getElementById('searchSuggestions');
        if (!searchSuggestions) {
            searchSuggestions = document.createElement('div');
            searchSuggestions.className = 'search-suggestions';
            searchSuggestions.id = 'searchSuggestions';
            
            // Wrap search bar in container if not already wrapped
            let searchContainer = searchBar.parentElement;
            if (!searchContainer.classList.contains('search-container')) {
                searchContainer = document.createElement('div');
                searchContainer.className = 'search-container';
                searchBar.parentNode.insertBefore(searchContainer, searchBar);
                searchContainer.appendChild(searchBar);
            }
            
            searchContainer.appendChild(searchSuggestions);
        }
        
        // Updated sample data with product IDs and detail pages
        const sampleProducts = [
            { id: 1, name: "2023-24 Panini NBA Hoops Basketball Hobby Box", category: "NBA Trading Cards", price: "$119.99", detailPage: "hoops-23-24.html" },
            { id: 2, name: "2023-24 Spectra Basketball Hobby International Box", category: "NBA Trading Cards", price: "$229.99", detailPage: "spectra-23-24.html" },
            { id: 3, name: "2024-25 Donruss Basketball Hobby Box", category: "NBA Trading Cards", price: "$159.99", detailPage: "donruss-24-25.html" },
            { id: 11, name: "2024 Prizm Draft Picks Basketball", category: "NCAA Basketball Cards", price: "$179.99", detailPage: "prizm-draft-24.html" },
            { id: 4, name: "2024-25 Panini Select Basketball Hobby Box", category: "NBA Trading Cards", price: "$799.99", detailPage: "select-24-25.html" },
            { id: 5, name: "2023-24 Premium NBA Basketball Blaster Box", category: "NBA Trading Cards", price: "$110.00", detailPage: "premium-23-24.html" },
            { id: 6, name: "2021-22 Panini Immaculate NBA Hobby Box", category: "NBA Trading Cards", price: "$2999.95", detailPage: "immaculate-21-22.html" },
            { id: 7, name: "2024-25 Panini NBA Basketball Prizm 12-Card Hobby Pack", category: "NBA Trading Cards", price: "$120.00", detailPage: "prizm-24-25.html" },
            { id: 8, name: "Upper Deck SE 1993-94 East Pack", category: "NBA Trading Cards", price: "$15.00", detailPage: "upperdeck-93-94.html" },
            { id: 9, name: "1993/94 Upper Deck Series 1 Basketball Hobby Box", category: "NBA Trading Cards", price: "$449.99", detailPage: "upperdeck-series1-93-94.html" },
            { id: 10, name: "2024-25 Panini Origins Basketball H2 Box", category: "NBA Trading Cards", price: "$249.99", detailPage: "origins-24-25.html" },
            { id: 12, name: "2024 Topps Resurgence Football Mega Box", category: "Football Cards", price: "$99.99", detailPage: "topps-resurgence-24.html" },
            { id: 13, name: "2024 Topps Cosmic Chrome Football Hobby Box", category: "Football Cards", price: "$629.99", detailPage: "cosmic-chrome-24.html" },
            { id: 14, name: "2024-25 Topps UEFA Club Competition Chrome Soccer Blaster Box", category: "Soccer Cards", price: "$54.99", detailPage: "uefa-chrome-24-25.html" },
            { id: 15, name: "2021-22 Panini NBA Hoops 8-Card Hobby Pack", category: "NBA Trading Cards", price: "$19.99", detailPage: "hoops-pack-21-22.html" },
            { id: 16, name: "2025 Topps Chrome Black Baseball Hobby box", category: "Baseball Cards", price: "$599.99", detailPage: "chrome-black-25.html" },
            { id: 17, name: "2024 Panini Select Baseball Blaster Box", category: "Baseball Cards", price: "$45.99", detailPage: "select-baseball-24.html" },
            { id: 18, name: "2022 Panini Prizm FIFA World Cup Soccer Hobby Box", category: "Soccer Cards", price: "$999.99", detailPage: "fifa-worldcup-22.html" },
            { id: 19, name: "2024-25 Topps Soccer Real Madrid Fan Set Box", category: "Soccer Cards", price: "$44.99", detailPage: "real-madrid-24-25.html" },
            { id: 20, name: "2025-26 Upper Deck Artifacts Hockey Hobby Box", category: "Hockey Cards", price: "$199.99", detailPage: "artifacts-25-26.html" },
            { id: 21, name: "2024-25 Upper Deck Series 1 Hockey Blaster Box", category: "Hockey Cards", price: "$39.99", detailPage: "hockey-series1-24-25.html" },
            { id: 22, name: "2024-25 Topps Chrome Basketball 8-Pack Blaster Box", category: "NBA Trading Cards", price: "$49.99", detailPage: "chrome-basketball-24-25.html" },
            { id: 23, name: "2015-16 Panini Donruss Basketball Hobby Box", category: "NBA Trading Cards", price: "$899.99", detailPage: "donruss-15-16.html" },
            { id: 24, name: "2023 Topps Chrome Update Series Baseball Jumbo Pack", category: "Baseball Cards", price: "$49.99", detailPage: "chrome-update-23.html" }
        ];
        
        let currentHighlight = -1;
        let filteredSuggestions = [];
        
        // Function to filter suggestions based on input
        function filterSuggestions(query) {
            if (query.length < 2) return [];
            
            return sampleProducts.filter(product => 
                product.name.toLowerCase().includes(query.toLowerCase()) ||
                product.category.toLowerCase().includes(query.toLowerCase())
            );
        }
        
        // Function to create suggestion HTML - Updated to include product ID
        function createSuggestionHTML(product, index) {
            return `
                <div class="suggestion-item" data-index="${index}" data-name="${product.name}" data-id="${product.id}" data-detail-page="${product.detailPage}">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <div>${product.name}</div>
                            <div class="suggestion-category">${product.category}</div>
                        </div>
                        <div class="suggestion-price">${product.price}</div>
                    </div>
                </div>
            `;
        }
        
        // Function to show suggestions
        function showSuggestions(suggestions) {
            if (suggestions.length === 0) {
                searchSuggestions.innerHTML = '<div class="no-suggestions">No products found</div>';
            } else {
                searchSuggestions.innerHTML = suggestions
                    .map((product, index) => createSuggestionHTML(product, index))
                    .join('');
            }
            
            searchSuggestions.classList.add('active');
            currentHighlight = -1;
        }
        
        // Function to hide suggestions
        function hideSuggestions() {
            searchSuggestions.classList.remove('active');
            currentHighlight = -1;
        }
        
        // Function to highlight suggestion
        function highlightSuggestion(index) {
            const items = searchSuggestions.querySelectorAll('.suggestion-item');
            
            // Remove previous highlight
            items.forEach(item => item.classList.remove('highlighted'));
            
            // Add new highlight
            if (index >= 0 && index < items.length) {
                items[index].classList.add('highlighted');
                currentHighlight = index;
            }
        }
        
        // Updated function to select suggestion - now navigates to product detail page
        function selectSuggestion(productId, productName, detailPage) {
            searchInput.value = productName;
            hideSuggestions();
            
            console.log('Selected product:', productName, 'ID:', productId);
            
            // Navigate to specific product detail page if available
            if (detailPage) {
                window.location.href = detailPage;
            } else if (productId) {
                // Use the existing goToProductDetail function
                if (typeof window.goToProductDetail === 'function') {
                    window.goToProductDetail(productId);
                } else {
                    // Fallback to generic detail page with ID parameter
                    window.location.href = `product-detail.html?id=${productId}`;
                }
            } else {
                // Fallback: perform general search
                performSearch(productName);
            }
        }
        
        // Function to perform search (for general searches, not specific products)
        function performSearch(query) {
            console.log('Searching for:', query);
            cart.showNotification(`Searching for "${query}"...`);
            // Redirect to products page with search parameter
            window.location.href = `products.html?search=${encodeURIComponent(query)}`;
        }
        
        // Event listeners
        if (searchInput) {
            searchInput.addEventListener('input', function(e) {
                const query = e.target.value.trim();
                
                if (query.length >= 2) {
                    filteredSuggestions = filterSuggestions(query);
                    showSuggestions(filteredSuggestions);
                } else {
                    hideSuggestions();
                }
            });
            
            // Keyboard navigation
            searchInput.addEventListener('keydown', function(e) {
                const items = searchSuggestions.querySelectorAll('.suggestion-item');
                
                switch (e.key) {
                    case 'ArrowDown':
                        e.preventDefault();
                        if (currentHighlight < items.length - 1) {
                            highlightSuggestion(currentHighlight + 1);
                        }
                        break;
                        
                    case 'ArrowUp':
                        e.preventDefault();
                        if (currentHighlight > 0) {
                            highlightSuggestion(currentHighlight - 1);
                        }
                        break;
                        
                    case 'Enter':
                        e.preventDefault();
                        if (currentHighlight >= 0 && items[currentHighlight]) {
                            const productId = items[currentHighlight].getAttribute('data-id');
                            const productName = items[currentHighlight].getAttribute('data-name');
                            const detailPage = items[currentHighlight].getAttribute('data-detail-page');
                            selectSuggestion(parseInt(productId), productName, detailPage);
                        } else {
                            // Perform search with current input value
                            const query = searchInput.value.trim();
                            if (query) {
                                performSearch(query);
                                hideSuggestions();
                            }
                        }
                        break;
                        
                    case 'Escape':
                        hideSuggestions();
                        searchInput.blur();
                        break;
                }
            });
            
            // Focus events
            searchInput.addEventListener('focus', function() {
                const query = this.value.trim();
                if (query.length >= 2) {
                    filteredSuggestions = filterSuggestions(query);
                    showSuggestions(filteredSuggestions);
                }
            });
        }
        
        // Updated click on suggestions - now uses product ID and detail page
        if (searchSuggestions) {
            searchSuggestions.addEventListener('click', function(e) {
                const suggestionItem = e.target.closest('.suggestion-item');
                if (suggestionItem) {
                    const productId = suggestionItem.getAttribute('data-id');
                    const productName = suggestionItem.getAttribute('data-name');
                    const detailPage = suggestionItem.getAttribute('data-detail-page');
                    selectSuggestion(parseInt(productId), productName, detailPage);
                }
            });
        }
        
        // Search button click - performs general search
        if (searchBtn) {
            searchBtn.addEventListener('click', function() {
                const query = searchInput.value.trim();
                if (query) {
                    performSearch(query);
                    hideSuggestions();
                }
            });
        }
        
        // Hide suggestions when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.search-container') && !e.target.closest('.search-bar')) {
                hideSuggestions();
            }
        });
    };
    
    // Initialize search suggestions
    initializeSearchSuggestions();
    
    // Product image hover effect (optional enhancement)
    document.querySelectorAll('.product-card').forEach(card => {
        const img = card.querySelector('.product-img img');
        if (img) {
            card.addEventListener('mouseenter', () => {
                img.style.transform = 'scale(1.05)';
            });
            
            card.addEventListener('mouseleave', () => {
                img.style.transform = 'scale(1)';
            });
        }
    });
    
    // Newsletter form submission
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            cart.showNotification(`Thank you! ${email} has been subscribed to our newsletter.`);
            this.reset();
        });
    }
    
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
    
    // Optional: Add animated countdown for breaks and events
    function updateEventCountdowns() {
        const now = new Date();
        const events = document.querySelectorAll('.event-card');
        
        events.forEach(event => {
            const dayEl = event.querySelector('.day');
            const monthEl = event.querySelector('.month');
            
            if (!dayEl || !monthEl) return;
            
            // Parse the event date from the elements
            const day = parseInt(dayEl.textContent);
            const monthText = monthEl.textContent;
            const monthNames = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
            const monthIndex = monthNames.indexOf(monthText);
            
            if (day && monthIndex !== -1) {
                // Create event date (using current year and time)
                const eventDate = new Date(now.getFullYear(), monthIndex, day, 20, 0, 0); // Assuming 8PM
                
                // If the event date is in the past, move to next year
                if (eventDate < now) {
                    eventDate.setFullYear(eventDate.getFullYear() + 1);
                }
                
                // Calculate time difference
                const diff = eventDate - now;
                const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                
                // Update the event's status if needed
                const infoEl = event.querySelector('.event-info p');
                if (infoEl) {
                    if (days === 0 && hours < 3) {
                        // Event is soon
                        infoEl.innerHTML = `<strong>STARTING SOON!</strong> - ${infoEl.textContent}`;
                        event.classList.add('starting-soon');
                    }
                }
            }
        });
    }
    
    // Initial call and setup interval
    updateEventCountdowns();
    setInterval(updateEventCountdowns, 60000); // Update every minute
    
    // Optional: Animate the hero title on page load
    function animateHeroTitle() {
        const titleTop = document.querySelector('.title-top');
        const titleBottom = document.querySelector('.title-bottom');
        
        if (titleTop && titleBottom) {
            titleTop.style.opacity = '0';
            titleBottom.style.opacity = '0';
            titleTop.style.transform = 'translateY(-20px)';
            titleBottom.style.transform = 'translateY(-20px)';
            
            setTimeout(() => {
                titleTop.style.transition = 'all 0.8s ease';
                titleTop.style.opacity = '1';
                titleTop.style.transform = 'translateY(0)';
                
                setTimeout(() => {
                    titleBottom.style.transition = 'all 0.8s ease';
                    titleBottom.style.opacity = '1';
                    titleBottom.style.transform = 'translateY(0)';
                }, 300);
            }, 300);
        }
    }
    
    // Animate on page load
    animateHeroTitle();
    
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const heroElements = document.querySelector('.hero-content');
        
        if (heroElements && scrollPosition < 600) {
            const speed = 0.15;
            heroElements.style.transform = `translateY(${scrollPosition * speed}px)`;
        }
    });
    
    // Function to update search data dynamically
    window.updateSearchData = function(newProducts) {
        // This function allows you to update the search data dynamically
        if (window.sampleProducts) {
            window.sampleProducts.length = 0;
            window.sampleProducts.push(...newProducts);
        }
    };
    
    // Debug function for development
    window.debugCart = function() {
        console.log('Cart Contents:', cart.items);
        console.log('Cart Total:', cart.total);
        console.log('Cart in localStorage:', localStorage.getItem('butlerCart'));
    };
    
    // Enhanced product card interactions
    document.querySelectorAll('.product-card').forEach(card => {
        // Add hover effect to product cards
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
        
        // Add click effect to add-to-cart buttons
        const addToCartBtn = card.querySelector('.add-to-cart');
        if (addToCartBtn) {
            addToCartBtn.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.05)';
            });
            
            addToCartBtn.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
        }
    });
    
    // Initialize URL parameter handling for search
    function handleURLParameters() {
        const urlParams = new URLSearchParams(window.location.search);
        const searchTerm = urlParams.get('search');
        
        if (searchTerm && document.querySelector('.search-input')) {
            document.querySelector('.search-input').value = searchTerm;
            // If on products page, trigger search
            if (window.location.pathname.includes('products.html') && typeof filterProducts === 'function') {
                filterProducts();
            }
        }
    }
    
    // Handle URL parameters on page load
    handleURLParameters();
    
    // Console log for debugging
    console.log('Butler Trading Cards script initialized successfully');
    console.log('Cart system ready');
    console.log('Search suggestions loaded with products that have detail pages');
});

const homepageProducts = [
    { id: 1, detailPage: "hoops-23-24.html" },
    { id: 2, detailPage: "spectra-23-24.html" },
    { id: 3, detailPage: "donruss-24-25.html" },
    { id: 11, detailPage: "prizm-draft-24.html" }
];

// Navigate to product detail page function for homepage
window.goToProductDetail = function(productId) {
    const product = homepageProducts.find(p => p.id === productId);
    if (product && product.detailPage) {
        window.location.href = product.detailPage;
    } else {
        console.warn('Product detail page not found for product ID:', productId);
        // Fallback to a generic detail page with URL parameter
        window.location.href = `product-detail.html?id=${productId}`;
    }
    
    console.log(`Navigating to product detail for ID: ${productId}`);
};