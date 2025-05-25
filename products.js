// Sample product data
const products = [
    { id: 1, name: "NBA Hoops 2023-24", type: "Basketball Cards", price: 119.99, brand: "Panini", sport: "basketball", productType: "hobby", availability: "instock" },
    { id: 2, name: "Panini Spectra 2023", type: "NBA Trading Cards", price: 299.99, brand: "Panini", sport: "basketball", productType: "hobby", availability: "instock" },
    { id: 3, name: "Donruss Basketball 2023", type: "Basketball Cards", price: 159.99, brand: "Donruss", sport: "basketball", productType: "blaster", availability: "instock" },
    { id: 4, name: "Prizm Draft Picks 2023", type: "NCAA Basketball Cards", price: 179.99, brand: "Panini", sport: "basketball", productType: "hobby", availability: "preorder" },
    { id: 5, name: "Topps Chrome Basketball", type: "Basketball Cards", price: 89.99, brand: "Topps", sport: "basketball", productType: "blaster", availability: "instock" },
    { id: 6, name: "NBA Flawless 2023", type: "Premium Cards", price: 599.99, brand: "Panini", sport: "basketball", productType: "hobby", availability: "outofstock" },
    { id: 7, name: "Panini Contenders 2023", type: "Basketball Cards", price: 79.99, brand: "Panini", sport: "basketball", productType: "pack", availability: "instock" },
    { id: 8, name: "Upper Deck Basketball", type: "Basketball Cards", price: 49.99, brand: "Upper Deck", sport: "basketball", productType: "pack", availability: "instock" },
    { id: 9, name: "Panini Prizm Basketball", type: "Basketball Cards", price: 149.99, brand: "Panini", sport: "basketball", productType: "hobby", availability: "instock" },
    { id: 10, name: "NBA Select 2023", type: "Basketball Cards", price: 129.99, brand: "Panini", sport: "basketball", productType: "blaster", availability: "instock" },
    { id: 11, name: "Panini National Treasures", type: "Premium Cards", price: 899.99, brand: "Panini", sport: "basketball", productType: "hobby", availability: "preorder" },
    { id: 12, name: "Topps Stadium Club", type: "Basketball Cards", price: 69.99, brand: "Topps", sport: "basketball", productType: "blaster", availability: "instock" },
    { id: 13, name: "NFL Prizm 2023", type: "Football Cards", price: 169.99, brand: "Panini", sport: "football", productType: "hobby", availability: "instock" },
    { id: 14, name: "Topps Chrome Football", type: "Football Cards", price: 119.99, brand: "Topps", sport: "football", productType: "hobby", availability: "instock" },
    { id: 15, name: "Panini Mosaic Football", type: "Football Cards", price: 99.99, brand: "Panini", sport: "football", productType: "blaster", availability: "instock" },
    { id: 16, name: "Baseball Heritage 2023", type: "Baseball Cards", price: 89.99, brand: "Topps", sport: "baseball", productType: "hobby", availability: "instock" },
    { id: 17, name: "Panini Chronicles Baseball", type: "Baseball Cards", price: 199.99, brand: "Panini", sport: "baseball", productType: "hobby", availability: "preorder" },
    { id: 18, name: "Soccer Prizm World Cup", type: "Soccer Cards", price: 249.99, brand: "Panini", sport: "soccer", productType: "hobby", availability: "instock" },
    { id: 19, name: "Topps Chrome Soccer", type: "Soccer Cards", price: 139.99, brand: "Topps", sport: "soccer", productType: "blaster", availability: "instock" },
    { id: 20, name: "NBA Immaculate 2023", type: "Premium Cards", price: 1299.99, brand: "Panini", sport: "basketball", productType: "hobby", availability: "outofstock" },
    { id: 21, name: "Donruss Elite Football", type: "Football Cards", price: 189.99, brand: "Donruss", sport: "football", productType: "hobby", availability: "instock" },
    { id: 22, name: "Upper Deck Series 1", type: "Hockey Cards", price: 79.99, brand: "Upper Deck", sport: "hockey", productType: "hobby", availability: "instock" },
    { id: 23, name: "Panini Absolute Football", type: "Football Cards", price: 149.99, brand: "Panini", sport: "football", productType: "blaster", availability: "instock" },
    { id: 24, name: "Topps Allen & Ginter", type: "Baseball Cards", price: 109.99, brand: "Topps", sport: "baseball", productType: "hobby", availability: "instock" }
];

let filteredProducts = [...products];
let currentSort = 'relevancy';

// Filter toggle functionality
function toggleFilter(header) {
    const section = header.parentElement;
    section.classList.toggle('collapsed');
}

// Filter products based on selected filters
function filterProducts() {
    filteredProducts = products.filter(product => {
        // Price filters
        const priceMin = document.getElementById('priceMin').value;
        const priceMax = document.getElementById('priceMax').value;
        
        if (priceMin && product.price < parseFloat(priceMin)) return false;
        if (priceMax && product.price > parseFloat(priceMax)) return false;
        
        // Price range checkboxes
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
        
        // Brand filter
        const brandFilters = ['panini', 'topps', 'upperdeck', 'donruss'];
        const selectedBrands = brandFilters.filter(brand => 
            document.getElementById(brand).checked
        ).map(brand => brand === 'upperdeck' ? 'Upper Deck' : brand.charAt(0).toUpperCase() + brand.slice(1));
        
        if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) return false;
        
        // Sport filter
        const sportFilters = ['basketball', 'football', 'baseball', 'soccer'];
        const selectedSports = sportFilters.filter(sport => 
            document.getElementById(sport).checked
        );
        
        if (selectedSports.length > 0 && !selectedSports.includes(product.sport)) return false;
        
        // Product type filter
        const typeFilters = ['hobby', 'blaster', 'pack', 'case'];
        const selectedTypes = typeFilters.filter(type => 
            document.getElementById(type).checked
        );
        
        if (selectedTypes.length > 0 && !selectedTypes.includes(product.productType)) return false;
        
        // Availability filter
        const availabilityFilters = ['instock', 'preorder', 'outofstock'];
        const selectedAvailability = availabilityFilters.filter(availability => 
            document.getElementById(availability).checked
        );
        
        if (selectedAvailability.length > 0 && !selectedAvailability.includes(product.availability)) return false;
        
        return true;
    });
    
    // Apply search filter
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    if (searchTerm) {
        filteredProducts = filteredProducts.filter(product =>
            product.name.toLowerCase().includes(searchTerm) ||
            product.type.toLowerCase().includes(searchTerm) ||
            product.brand.toLowerCase().includes(searchTerm)
        );
    }
    
    sortProducts();
    renderProducts();
}

// Sort products
function sortProducts() {
    switch (currentSort) {
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'newest':
            filteredProducts.sort((a, b) => b.id - a.id);
            break;
        case 'popularity':
            filteredProducts.sort((a, b) => Math.random() - 0.5);
            break;
        default:
            filteredProducts.sort((a, b) => a.id - b.id);
    }
}

// Render products
function renderProducts() {
    const grid = document.getElementById('productsGrid');
    const resultCount = document.getElementById('resultCount');
    
    resultCount.textContent = filteredProducts.length;
    
    if (filteredProducts.length === 0) {
        grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: rgba(255,255,255,0.6);">No products found matching your criteria.</div>';
        return;
    }
    
    grid.innerHTML = filteredProducts.map(product => `
        <div class="product-card">
            <div class="product-img">
                Product Image
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="product-type">${product.type}</p>
                <div class="product-pricing">
                    <span class="price">$${product.price.toFixed(2)}</span>
                    <div class="add-to-cart" onclick="addToCart(${product.id}, '${product.name}', ${product.price})">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="9" cy="21" r="1"></circle>
                            <circle cx="20" cy="21" r="1"></circle>
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Add to cart function
function addToCart(id, name, price) {
    console.log(`Added to cart: ${name} - $${price}`);
    // Add your cart functionality here
    // You can integrate this with your existing cart system from script.js
    
    // Show a simple notification (you can enhance this)
    alert(`${name} has been added to your cart!`);
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Initialize page
    renderProducts();
    
    // Filter change listeners
    const filterInputs = document.querySelectorAll('input[type="checkbox"], input[type="number"]');
    filterInputs.forEach(input => {
        input.addEventListener('change', filterProducts);
    });
    
    // Search input listener
    document.getElementById('searchInput').addEventListener('input', filterProducts);
    
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
});
