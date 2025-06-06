// Debug function to force clear cart
window.forceClearCart = function() {
    localStorage.removeItem('butlerCart');
    const cartBadge = document.getElementById('cartBadge');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    if (cartBadge) {
        cartBadge.textContent = '0';
        cartBadge.classList.remove('active');
    }
    if (cartItems) {
        cartItems.innerHTML = '<div class="empty-cart"><p>Your cart is empty</p></div>';
    }
    if (cartTotal) {
        cartTotal.textContent = '0.00';
    }
    
    console.log('Cart force cleared!');
};

// Sample product data - Updated with actual products, images, and detail page URLs
const products = [
    { id: 1, name: "2023-24 Panini NBA Hoops Basketball Hobby Box", type: "NBA Trading Cards", price: 119.99, brand: "Panini", sport: "basketball", productType: "hobby", availability: "instock", image: "hoops23-24.png", detailPage: "hoops-23-24.html" },
    { id: 2, name: "2023-24 Spectra Basketball Hobby International Box", type: "NBA Trading Cards", price: 229.99, brand: "Panini", sport: "basketball", productType: "hobby", availability: "instock", image: "spectra23-24.png", detailPage: "spectra-23-24.html" },
    { id: 3, name: "2024-25 Donruss Basketball Hobby Box", type: "NBA Trading Cards", price: 159.99, brand: "Panini", sport: "basketball", productType: "hobby", availability: "instock", image: "donruss24-25.png", detailPage: "donruss-24-25.html" },
    { id: 4, name: "2024-25 Panini Select Basketball Hobby Box", type: "NBA Trading Cards", price: 799.99, brand: "Panini", sport: "basketball", productType: "hobby", availability: "preorder", image: "select24-25.png", detailPage: "select-24-25.html" },
    { id: 5, name: "2023-24 Premium NBA Basketball Blaster Box", type: "NBA Trading Cards", price: 110.00, brand: "Panini", sport: "basketball", productType: "blaster", availability: "instock", image: "premium23-24.png", detailPage: "premium-23-24.html" },
    { id: 6, name: "2021-22 Panini Immaculate NBA Hobby Box", type: "NBA Trading Cards", price: 2999.95, brand: "Panini", sport: "basketball", productType: "hobby", availability: "outofstock", image: "immaculate21-22.png", detailPage: "immaculate-21-22.html" },
    { id: 7, name: "2024-25 Panini NBA Basketball Prizm 12-Card Hobby Pack", type: "NBA Trading Cards", price: 120.00, brand: "Panini", sport: "basketball", productType: "pack", availability: "instock", image: "prizm24-25.png", detailPage: "prizm-24-25.html" },
    { id: 8, name: "Upper Deck SE 1993-94 East Pack", type: "NBA Trading Cards", price: 15.00, brand: "Upper Deck", sport: "basketball", productType: "pack", availability: "instock", image: "upperdeck93-94.png", detailPage: "upperdeck-93-94.html" },
    { id: 9, name: "1993/94 Upper Deck Series 1 Basketball Hobby Box", type: "NBA Trading Cards", price: 449.99, brand: "Upper Deck", sport: "basketball", productType: "hobby", availability: "instock", image: "upperdeck93-94-box.png", detailPage: "upperdeck-93-94-box.html" },
    { id: 10, name: "2024-25 Panini Origins Basketball H2 Box", type: "NBA Trading Cards", price: 249.99, brand: "Panini", sport: "basketball", productType: "blaster", availability: "instock", image: "origins24-25.png", detailPage: "origins-24-25.html" },
    { id: 11, name: "2024 Prizm Draft Picks Basketball", type: "NCAA Basketball Cards", price: 179.99, brand: "Panini", sport: "basketball", productType: "hobby", availability: "instock", image: "prizm-draft24.png", detailPage: "prizm-draft-24.html" },
    { id: 12, name: "2024 Topps Resurgence Football Mega Box", type: "Football Cards", price: 99.99, brand: "Topps", sport: "football", productType: "blaster", availability: "preorder", image: "resurgence24.png", detailPage: "resurgence-24.html" },
    { id: 13, name: "2024 Topps Cosmic Chrome Football Hobby Box", type: "Football Cards", price: 629.99, brand: "Topps", sport: "football", productType: "hobby", availability: "preorder", image: "cosmic-chrome24.png", detailPage: "cosmic-chrome-24.html" },
    { id: 14, name: "2024-25 Topps UEFA Club Competition Chrome Soccer Blaster Box", type: "Soccer Cards", price: 54.99, brand: "Topps", sport: "soccer", productType: "blaster", availability: "instock", image: "uefa24-25.png", detailPage: "uefa-24-25.html" },
    { id: 15, name: "2021-22 Panini NBA Hoops 8-Card Hobby Pack", type: "NBA Trading Cards", price: 19.99, brand: "Panini", sport: "basketball", productType: "pack", availability: "instock", image: "hoops21-22-pack.png", detailPage: "hoops-21-22-pack.html" },
    { id: 16, name: "2025 Topps Chrome Black Baseball Hobby box", type: "Baseball Cards", price: 599.99, brand: "Topps", sport: "baseball", productType: "hobby", availability: "instock", image: "chrome-black25.png", detailPage: "chrome-black-25.html" },
    { id: 17, name: "2024 Panini Select Baseball Blaster Box", type: "Baseball Cards", price: 45.99, brand: "Panini", sport: "baseball", productType: "blaster", availability: "preorder", image: "select-baseball24.png", detailPage: "select-baseball-24.html" },
    { id: 18, name: "2022 Panini Prizm FIFA World Cup Soccer Hobby Box", type: "Soccer Cards", price: 999.99, brand: "Panini", sport: "soccer", productType: "hobby", availability: "instock", image: "fifa-worldcup22.png", detailPage: "fifa-worldcup-22.html" },
    { id: 19, name: "2024-25 Topps Soccer Real Madrid Fan Set Box", type: "Soccer Cards", price: 44.99, brand: "Topps", sport: "soccer", productType: "blaster", availability: "instock", image: "real-madrid24-25.png", detailPage: "real-madrid-24-25.html" },
    { id: 20, name: "2025-26 Upper Deck Artifacts Hockey Hobby Box", type: "Hockey Cards", price: 199.99, brand: "Upper Deck", sport: "hockey", productType: "hobby", availability: "preorder", image: "artifacts25-26.png", detailPage: "artifacts-25-26.html" },
    { id: 21, name: "2024-25 Upper Deck Series 1 Hockey Blaster Box", type: "Hockey Cards", price: 39.99, brand: "Upper Deck", sport: "hockey", productType: "blaster", availability: "instock", image: "hockey-series24-25.png", detailPage: "hockey-series-24-25.html" },
    { id: 22, name: "2024-25 Topps Chrome Basketball 8-Pack Blaster Box", type: "NBA Trading Cards", price: 49.99, brand: "Topps", sport: "basketball", productType: "blaster", availability: "preorder", image: "topps-chrome24-25.png", detailPage: "topps-chrome-24-25.html" },
    { id: 23, name: "2015-16 Panini Donruss Basketball Hobby 20-Box Case", type: "NBA Trading Cards", price: 14999.99, brand: "Panini", sport: "basketball", productType: "case", availability: "instock", image: "donruss15-16-case.png", detailPage: "donruss-15-16-case.html" },
    { id: 24, name: "2023 Topps Chrome Update Series Baseball Jumbo Pack", type: "Baseball Cards", price: 49.99, brand: "Topps", sport: "baseball", productType: "pack", availability: "instock", image: "chrome-update23.png", detailPage: "chrome-update-23.html" }
];

let filteredProducts = [...products];
let currentSort = 'relevancy';

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

// Enhanced search functionality with suggestions
const initializeSearchSuggestions = function() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const searchContainer = document.querySelector('.search-container');
    
    if (!searchInput || !searchContainer) return; // Exit if search elements don't exist
    
    // Create search suggestions dropdown if it doesn't exist
    let searchSuggestions = document.getElementById('searchSuggestions');
    if (!searchSuggestions) {
        searchSuggestions = document.createElement('div');
        searchSuggestions.className = 'search-suggestions';
        searchSuggestions.id = 'searchSuggestions';
        searchContainer.appendChild(searchSuggestions);
    }
    
    let currentHighlight = -1;
    let filteredSuggestions = [];
    
    // Function to filter suggestions based on input
    function filterSuggestions(query) {
        if (query.length < 2) return [];
        
        return products.filter(product => 
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.type.toLowerCase().includes(query.toLowerCase()) ||
            product.brand.toLowerCase().includes(query.toLowerCase()) ||
            product.sport.toLowerCase().includes(query.toLowerCase())
        );
    }
    
    // Function to create suggestion HTML
    function createSuggestionHTML(product, index) {
        return `
            <div class="suggestion-item" data-index="${index}" data-name="${product.name}" data-id="${product.id}" data-detail-page="${product.detailPage}">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <div>${product.name}</div>
                        <div class="suggestion-category">${product.type}</div>
                    </div>
                    <div class="suggestion-price">$${product.price.toFixed(2)}</div>
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
    
    // Function to select suggestion - navigates to product detail page
    function selectSuggestion(productId, productName, detailPage) {
        searchInput.value = productName;
        hideSuggestions();
        
        console.log('Selected product:', productName, 'ID:', productId);
        
        // Navigate to specific product detail page if available
        if (detailPage) {
            window.location.href = detailPage;
        } else if (productId) {
            // Use the existing goToProductDetail function
            goToProductDetail(productId);
        } else {
            // Fallback: perform search filtering
            filterProducts();
        }
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
                        // Perform regular search filtering
                        filterProducts();
                        hideSuggestions();
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
    
    // Click on suggestions
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
    
    // Search button click
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            filterProducts();
            hideSuggestions();
        });
    }
    
    // Hide suggestions when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.search-container')) {
            hideSuggestions();
        }
    });
};

// Filter toggle functionality
function toggleFilter(header) {
    const section = header.parentElement;
    section.classList.toggle('collapsed');
}

// Updated filter products function with corrected logic
function filterProducts() {
    filteredProducts = products.filter(product => {
        // Price filters - manual input
        const priceMin = document.getElementById('priceMin').value;
        const priceMax = document.getElementById('priceMax').value;
        
        if (priceMin && product.price < parseFloat(priceMin)) return false;
        if (priceMax && product.price > parseFloat(priceMax)) return false;
        
        // Price range checkboxes - Updated ranges to match actual product prices
        const under100 = document.getElementById('under100').checked;
        const range100to200 = document.getElementById('100to200').checked;
        const range200to500 = document.getElementById('200to500').checked;
        const over500 = document.getElementById('over500').checked;
        
        if (under100 || range100to200 || range200to500 || over500) {
            let priceMatches = false;
            if (under100 && product.price < 100) priceMatches = true;
            if (range100to200 && product.price >= 100 && product.price <= 200) priceMatches = true;
            if (range200to500 && product.price >= 200 && product.price <= 500) priceMatches = true;
            if (over500 && product.price > 500) priceMatches = true;
            if (!priceMatches) return false;
        }
        
        // Brand filter - Fixed to match actual brand names
        const brandFilters = ['panini', 'topps', 'upperdeck'];
        const selectedBrands = brandFilters.filter(brand => 
            document.getElementById(brand).checked
        );
        
        if (selectedBrands.length > 0) {
            const brandMatches = selectedBrands.some(selectedBrand => {
                switch(selectedBrand) {
                    case 'panini':
                        return product.brand === 'Panini';
                    case 'topps':
                        return product.brand === 'Topps';
                    case 'upperdeck':
                        return product.brand === 'Upper Deck';
                    default:
                        return false;
                }
            });
            if (!brandMatches) return false;
        }
        
        // Sport filter - Updated to include hockey
        const sportFilters = ['basketball', 'football', 'baseball', 'soccer', 'hockey'];
        const selectedSports = sportFilters.filter(sport => {
            const element = document.getElementById(sport);
            return element && element.checked;
        });
        
        if (selectedSports.length > 0 && !selectedSports.includes(product.sport)) return false;
        
        // Product type filter - Updated to match actual product types
        const typeFilters = ['hobby', 'blaster', 'pack', 'case'];
        const selectedTypes = typeFilters.filter(type => {
            const element = document.getElementById(type);
            return element && element.checked;
        });
        
        if (selectedTypes.length > 0 && !selectedTypes.includes(product.productType)) return false;
        
        // Availability filter
        const availabilityFilters = ['instock', 'preorder', 'outofstock'];
        const selectedAvailability = availabilityFilters.filter(availability => {
            const element = document.getElementById(availability);
            return element && element.checked;
        });
        
        if (selectedAvailability.length > 0 && !selectedAvailability.includes(product.availability)) return false;
        
        return true;
    });
    
    // Apply search filter
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    if (searchTerm) {
        filteredProducts = filteredProducts.filter(product =>
            product.name.toLowerCase().includes(searchTerm) ||
            product.type.toLowerCase().includes(searchTerm) ||
            product.brand.toLowerCase().includes(searchTerm) ||
            product.sport.toLowerCase().includes(searchTerm)
        );
    }
    
    sortProducts();
    renderProducts();
}

// Updated sort products function
function sortProducts() {
    switch (currentSort) {
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'popularity':
            // Sort by a combination of factors (lower price + basketball sport gets higher score)
            filteredProducts.sort((a, b) => {
                const scoreA = (a.sport === 'basketball' ? 100 : 0) + (1000 - a.price/10);
                const scoreB = (b.sport === 'basketball' ? 100 : 0) + (1000 - b.price/10);
                return scoreB - scoreA;
            });
            break;
        default: // relevancy
            // Default sort by sport (basketball first), then by price
            filteredProducts.sort((a, b) => {
                if (a.sport === 'basketball' && b.sport !== 'basketball') return -1;
                if (b.sport === 'basketball' && a.sport !== 'basketball') return 1;
                return a.price - b.price;
            });
    }
}

// Updated render products function with availability badges
function renderProducts() {
    const grid = document.getElementById('productsGrid');
    const resultCount = document.getElementById('resultCount');
    
    resultCount.textContent = filteredProducts.length;
    
    if (filteredProducts.length === 0) {
        grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: rgba(255,255,255,0.6);">No products found matching your criteria.</div>';
        return;
    }
    
    grid.innerHTML = filteredProducts.map(product => {
        // Get availability badge
        let availabilityBadge = '';
        let availabilityClass = '';
        switch(product.availability) {
            case 'preorder':
                availabilityBadge = 'PRE-ORDER';
                availabilityClass = 'preorder';
                break;
            case 'outofstock':
                availabilityBadge = 'OUT OF STOCK';
                availabilityClass = 'outofstock';
                break;
            case 'instock':
                availabilityBadge = 'IN STOCK';
                availabilityClass = 'instock';
                break;
        }
        
        // Get sport icon
        let sportIcon = '';
        switch(product.sport) {
            case 'basketball':
                sportIcon = '🏀';
                break;
            case 'football':
                sportIcon = '🏈';
                break;
            case 'baseball':
                sportIcon = '⚾';
                break;
            case 'soccer':
                sportIcon = '⚽';
                break;
            case 'hockey':
                sportIcon = '🏒';
                break;
        }
        
        return `
            <div class="product-card" data-availability="${product.availability}" onclick="goToProductDetail(${product.id})" style="cursor: pointer;">
                <div class="product-img">
                    <div class="sport-icon">${sportIcon}</div>
                    <div class="availability-badge ${availabilityClass}">${availabilityBadge}</div>
                    <img src="${product.image}" alt="${product.name}" style="width: 100%; height: 100%; object-fit: cover;" 
                         onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                    <div style="display: none; width: 100%; height: 100%; align-items: center; justify-content: center; color: #666; font-size: 0.9rem;">
                        Product Image
                    </div>
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p class="product-type">${product.type}</p>
                    <div class="product-meta">
                        <span class="product-brand">${product.brand}</span>
                        <span class="product-type-badge">${product.productType.toUpperCase()}</span>
                    </div>
                    <div class="product-pricing">
                        <span class="price">$${product.price.toFixed(2)}</span>
                        <div class="add-to-cart ${product.availability === 'outofstock' ? 'disabled' : ''}" 
                             onclick="${product.availability === 'outofstock' ? 'return false;' : `event.stopPropagation(); addToCart(${product.id}, '${product.name.replace(/'/g, "\\'")}', ${product.price}, '${product.image}')`}">
                            ${product.availability === 'outofstock' ? 
                                '<span style="font-size: 0.7rem;">OUT</span>' :
                                `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <circle cx="9" cy="21" r="1"></circle>
                                    <circle cx="20" cy="21" r="1"></circle>
                                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                                </svg>`
                            }
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Add to cart function
function addToCart(id, name, price, image) {
    cart.addItem(id, name, price, image);
    
    // Visual feedback on the button
    const button = event.target.closest('.add-to-cart');
    if (button && !button.classList.contains('disabled')) {
        button.style.transform = 'scale(0.9)';
        button.style.backgroundColor = '#a1cce7';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
            button.style.backgroundColor = '#e83e8c';
        }, 200);
    }
    
    console.log(`Added to cart: ${name} - $${price}`);
}

// Navigate to product detail page
function goToProductDetail(productId) {
    const product = products.find(p => p.id === productId);
    if (product && product.detailPage) {
        window.location.href = product.detailPage;
    } else {
        console.warn('Product detail page not found for product ID:', productId);
        // Fallback to a generic detail page with URL parameter
        window.location.href = `product-detail.html?id=${productId}`;
    }
}

// Cart dropdown toggle functionality - Make globally accessible
window.toggleCartDropdown = function() {
    const dropdown = document.getElementById('cartDropdown');
    dropdown.classList.toggle('active');
};

window.closeCartDropdown = function() {
    const dropdown = document.getElementById('cartDropdown');
    dropdown.classList.remove('active');
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

// Clear all filters function
function clearAllFilters() {
    // Clear price inputs
    document.getElementById('priceMin').value = '';
    document.getElementById('priceMax').value = '';
    
    // Clear all checkboxes
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
    
    // Clear search
    document.getElementById('searchInput').value = '';
    
    // Reset sort
    document.getElementById('sortSelect').value = 'relevancy';
    currentSort = 'relevancy';
    
    // Refilter and render
    filterProducts();
    
    showNotification('All filters cleared!');
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Initialize cart from localStorage
    cart.loadFromLocalStorage();
    
    // Initialize search suggestions
    initializeSearchSuggestions();
    
    // Make sure cart functions are globally accessible
    window.cart = cart;
    window.toggleCartDropdown = toggleCartDropdown;
    window.closeCartDropdown = closeCartDropdown;
    window.clearAllFilters = clearAllFilters;
    window.goToProductDetail = goToProductDetail;
    
    // Initialize page
    renderProducts();
    
    // Add clear filters button to the filter sidebar
    const filterTitle = document.querySelector('.filter-title');
    if (filterTitle && !document.querySelector('.clear-filters-btn')) {
        const clearButton = document.createElement('button');
        clearButton.className = 'clear-filters-btn';
        clearButton.textContent = 'CLEAR ALL';
        clearButton.style.cssText = `
            background: transparent;
            border: 1px solid rgba(232, 62, 140, 0.3);
            color: #e83e8c;
            padding: 5px 10px;
            font-size: 0.8rem;
            cursor: pointer;
            transition: all 0.3s ease;
            font-weight: 600;
            letter-spacing: 0.5px;
        `;
        clearButton.addEventListener('click', clearAllFilters);
        clearButton.addEventListener('mouseenter', function() {
            this.style.backgroundColor = 'rgba(232, 62, 140, 0.1)';
            this.style.borderColor = '#e83e8c';
        });
        clearButton.addEventListener('mouseleave', function() {
            this.style.backgroundColor = 'transparent';
            this.style.borderColor = 'rgba(232, 62, 140, 0.3)';
        });
        filterTitle.appendChild(clearButton);
    }
    
    // Filter change listeners
    const filterInputs = document.querySelectorAll('input[type="checkbox"], input[type="number"]');
    filterInputs.forEach(input => {
        input.addEventListener('change', filterProducts);
    });
    
    // Search input listener with debounce
    let searchTimeout;
    document.getElementById('searchInput').addEventListener('input', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(filterProducts, 300); // Debounce search
    });
    
    // Sort change listener
    document.getElementById('sortSelect').addEventListener('change', function() {
        currentSort = this.value;
        sortProducts();
        renderProducts();
    });
    
    // Search button listener
    document.getElementById('searchBtn').addEventListener('click', function() {
        filterProducts();
    });
    
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
            
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Initialize filter sections as expanded
    const filterSections = document.querySelectorAll('.filter-section');
    filterSections.forEach(section => {
        section.classList.remove('collapsed');
    });
    
    console.log('Products page initialized with', products.length, 'products');
    
    // Log all product detail page URLs for reference
    console.log('Product Detail Pages:');
    products.forEach(product => {
        console.log(`${product.id}: ${product.name} → ${product.detailPage}`);
    });
});