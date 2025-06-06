// Contact Form Functionality with Search Suggestions
document.addEventListener('DOMContentLoaded', function() {
    
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
        
        // Sample products data with IDs and detail pages
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
            { id: 9, name: "1993/94 Upper Deck Series 1 Basketball Hobby Box", category: "NBA Trading Cards", price: "$449.99", detailPage: "upperdeck-93-94-box.html" },
            { id: 10, name: "2024-25 Panini Origins Basketball H2 Box", category: "NBA Trading Cards", price: "$249.99", detailPage: "origins-24-25.html" },
            { id: 12, name: "2024 Topps Resurgence Football Mega Box", category: "Football Cards", price: "$99.99", detailPage: "resurgence-24.html" },
            { id: 13, name: "2024 Topps Cosmic Chrome Football Hobby Box", category: "Football Cards", price: "$629.99", detailPage: "cosmic-chrome-24.html" },
            { id: 14, name: "2024-25 Topps UEFA Club Competition Chrome Soccer Blaster Box", category: "Soccer Cards", price: "$54.99", detailPage: "uefa-24-25.html" },
            { id: 15, name: "2021-22 Panini NBA Hoops 8-Card Hobby Pack", category: "NBA Trading Cards", price: "$19.99", detailPage: "hoops-pack-21-22.html" },
            { id: 16, name: "2025 Topps Chrome Black Baseball Hobby box", category: "Baseball Cards", price: "$599.99", detailPage: "chrome-black-25.html" },
            { id: 17, name: "2024 Panini Select Baseball Blaster Box", category: "Baseball Cards", price: "$45.99", detailPage: "select-baseball-24.html" },
            { id: 18, name: "2022 Panini Prizm FIFA World Cup Soccer Hobby Box", category: "Soccer Cards", price: "$999.99", detailPage: "fifa-worldcup-22.html" },
            { id: 19, name: "2024-25 Topps Soccer Real Madrid Fan Set Box", category: "Soccer Cards", price: "$44.99", detailPage: "real-madrid-24-25.html" },
            { id: 20, name: "2025-26 Upper Deck Artifacts Hockey Hobby Box", category: "Hockey Cards", price: "$199.99", detailPage: "artifacts-25-26.html" },
            { id: 21, name: "2024-25 Upper Deck Series 1 Hockey Blaster Box", category: "Hockey Cards", price: "$39.99", detailPage: "hockey-series-24-25.html" },
            { id: 22, name: "2024-25 Topps Chrome Basketball 8-Pack Blaster Box", category: "NBA Trading Cards", price: "$49.99", detailPage: "topps-chrome-24-25.html" },
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
        
        // Function to create suggestion HTML
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
        
        // Function to select suggestion - navigates to product detail page
        function selectSuggestion(productId, productName, detailPage) {
            searchInput.value = productName;
            hideSuggestions();
            
            console.log('Selected product:', productName, 'ID:', productId);
            
            // Navigate to specific product detail page if available
            if (detailPage) {
                window.location.href = detailPage;
            } else if (productId) {
                // Fallback to generic detail page with ID parameter
                window.location.href = `product-detail.html?id=${productId}`;
            } else {
                // Fallback: perform general search
                performSearch(productName);
            }
        }
        
        // Function to perform search (for general searches)
        function performSearch(query) {
            if (query.trim()) {
                showNotification(`Searching for "${query}"...`);
                // Redirect to products page with search parameter
                window.location.href = `products.html?search=${encodeURIComponent(query.trim())}`;
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
                const query = searchInput.value.trim();
                if (query) {
                    performSearch(query);
                    hideSuggestions();
                }
            });
        }
        
        // Hide suggestions when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.search-container')) {
                hideSuggestions();
            }
        });
    };
    
    // Initialize search suggestions
    initializeSearchSuggestions();
    
    // Show notification function for search
    function showNotification(message) {
        // Use the existing cart notification system if available
        if (window.cart && window.cart.showNotification) {
            window.cart.showNotification(message);
        } else {
            // Create a simple notification
            let notification = document.getElementById('searchNotification');
            if (!notification) {
                notification = document.createElement('div');
                notification.id = 'searchNotification';
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
    }
    
    // Form elements
    const contactForm = document.getElementById('contactForm');
    const submitBtn = contactForm.querySelector('.submit-btn');
    const successNotification = document.getElementById('successNotification');
    
    // Form validation rules
    const validationRules = {
        name: {
            required: true,
            minLength: 2,
            maxLength: 50,
            pattern: /^[a-zA-Z\s]+$/,
            message: 'Please enter a valid name (letters and spaces only)'
        },
        email: {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Please enter a valid email address'
        },
        phone: {
            required: false,
            pattern: /^[\+]?[0-9\s\-\(\)]+$/,
            message: 'Please enter a valid phone number'
        },
        subject: {
            required: true,
            message: 'Please select a subject'
        },
        message: {
            required: true,
            minLength: 10,
            maxLength: 1000,
            message: 'Message must be between 10 and 1000 characters'
        }
    };
    
    // Validate individual field
    function validateField(fieldName, value) {
        const rules = validationRules[fieldName];
        if (!rules) return { isValid: true };
        
        // Check if required
        if (rules.required && (!value || value.trim() === '')) {
            return {
                isValid: false,
                message: `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`
            };
        }
        
        // If field is empty and not required, it's valid
        if (!value || value.trim() === '') {
            return { isValid: true };
        }
        
        // Check minimum length
        if (rules.minLength && value.length < rules.minLength) {
            return {
                isValid: false,
                message: `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} must be at least ${rules.minLength} characters`
            };
        }
        
        // Check maximum length
        if (rules.maxLength && value.length > rules.maxLength) {
            return {
                isValid: false,
                message: `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} must be less than ${rules.maxLength} characters`
            };
        }
        
        // Check pattern
        if (rules.pattern && !rules.pattern.test(value)) {
            return {
                isValid: false,
                message: rules.message
            };
        }
        
        return { isValid: true };
    }
    
    // Show field error
    function showFieldError(fieldName, message) {
        const formGroup = document.querySelector(`[name="${fieldName}"]`).closest('.form-group');
        formGroup.classList.add('error');
        
        let errorElement = formGroup.querySelector('.error-message');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            formGroup.appendChild(errorElement);
        }
        errorElement.textContent = message;
    }
    
    // Clear field error
    function clearFieldError(fieldName) {
        const formGroup = document.querySelector(`[name="${fieldName}"]`).closest('.form-group');
        formGroup.classList.remove('error');
        
        const errorElement = formGroup.querySelector('.error-message');
        if (errorElement) {
            errorElement.style.display = 'none';
        }
    }
    
    // Validate entire form
    function validateForm(formData) {
        let isValid = true;
        const errors = {};
        
        // Clear all previous errors
        Object.keys(validationRules).forEach(fieldName => {
            clearFieldError(fieldName);
        });
        
        // Validate each field
        Object.keys(validationRules).forEach(fieldName => {
            const value = formData.get(fieldName);
            const validation = validateField(fieldName, value);
            
            if (!validation.isValid) {
                isValid = false;
                errors[fieldName] = validation.message;
                showFieldError(fieldName, validation.message);
            }
        });
        
        return { isValid, errors };
    }
    
    // Show success notification
    function showSuccessNotification(message = 'Message sent successfully!') {
        const notificationMessage = successNotification.querySelector('.notification-message');
        notificationMessage.textContent = message;
        successNotification.classList.add('active');
        
        setTimeout(() => {
            successNotification.classList.remove('active');
        }, 4000);
    }
    
    // Show error notification
    function showErrorNotification(message = 'There was an error sending your message. Please try again.') {
        // Use the existing cart notification system if available
        if (window.cart && window.cart.showNotification) {
            window.cart.showNotification(message);
        } else {
            showNotification(message);
        }
    }
    
    // Simulate form submission (replace with actual API call)
    async function submitForm(formData) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Simulate success/failure (90% success rate for demo)
        const isSuccess = Math.random() > 0.1;
        
        if (isSuccess) {
            return { success: true, message: 'Your message has been sent successfully!' };
        } else {
            throw new Error('Failed to send message. Please try again.');
        }
    }
    
    // Handle form submission
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        
        // Validate form
        const validation = validateForm(formData);
        if (!validation.isValid) {
            showErrorNotification('Please correct the errors in the form.');
            return;
        }
        
        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
        try {
            // Submit form (replace with actual API call)
            const result = await submitForm(formData);
            
            // Show success notification
            showSuccessNotification(result.message);
            
            // Reset form
            this.reset();
            
            // Log form data for debugging (remove in production)
            console.log('Form submitted successfully:', {
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                subject: formData.get('subject'),
                message: formData.get('message')
            });
            
        } catch (error) {
            console.error('Form submission error:', error);
            showErrorNotification(error.message);
        } finally {
            // Remove loading state
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }
    });
    
    // Real-time validation on field blur
    Object.keys(validationRules).forEach(fieldName => {
        const field = document.querySelector(`[name="${fieldName}"]`);
        if (field) {
            field.addEventListener('blur', function() {
                const validation = validateField(fieldName, this.value);
                if (!validation.isValid) {
                    showFieldError(fieldName, validation.message);
                } else {
                    clearFieldError(fieldName);
                }
            });
            
            // Clear error on input
            field.addEventListener('input', function() {
                clearFieldError(fieldName);
            });
        }
    });
    
    // Character counter for message field
    const messageField = document.getElementById('message');
    if (messageField) {
        const maxLength = validationRules.message.maxLength;
        
        // Create character counter
        const counterElement = document.createElement('div');
        counterElement.className = 'character-counter';
        counterElement.style.cssText = `
            font-size: 0.8rem;
            color: rgba(255, 255, 255, 0.6);
            text-align: right;
            margin-top: 5px;
        `;
        
        messageField.parentElement.appendChild(counterElement);
        
        // Update counter
        function updateCounter() {
            const remaining = maxLength - messageField.value.length;
            counterElement.textContent = `${messageField.value.length}/${maxLength} characters`;
            
            if (remaining < 50) {
                counterElement.style.color = '#e83e8c';
            } else {
                counterElement.style.color = 'rgba(255, 255, 255, 0.6)';
            }
        }
        
        messageField.addEventListener('input', updateCounter);
        updateCounter(); // Initial update
    }
    
    // Enhanced form interactions
    
    // Auto-format phone number (basic formatting)
    const phoneField = document.getElementById('phone');
    if (phoneField) {
        phoneField.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, ''); // Remove non-digits
            
            // Basic formatting for Australian numbers
            if (value.length >= 10) {
                if (value.startsWith('61')) {
                    // International format
                    value = '+' + value.substring(0, 2) + ' ' + value.substring(2, 3) + ' ' + 
                           value.substring(3, 7) + ' ' + value.substring(7, 11);
                } else if (value.startsWith('0')) {
                    // Australian format
                    value = value.substring(0, 4) + ' ' + value.substring(4, 7) + ' ' + 
                           value.substring(7, 10);
                }
            }
            
            e.target.value = value;
        });
    }
    
    // Subject field change handler
    const subjectField = document.getElementById('subject');
    if (subjectField) {
        subjectField.addEventListener('change', function() {
            const messageField = document.getElementById('message');
            if (messageField && !messageField.value) {
                // Pre-fill message based on subject
                const templates = {
                    'product-inquiry': 'Hi, I would like to know more about...',
                    'break-info': 'Hi, I have a question about the live breaks...',
                    'order-status': 'Hi, I would like to check the status of my order...',
                    'membership': 'Hi, I would like to know more about membership benefits...',
                    'technical-support': 'Hi, I am experiencing technical issues with...',
                    'general': 'Hi, I have a general question about...'
                };
                
                if (templates[this.value]) {
                    messageField.value = templates[this.value];
                    messageField.focus();
                    messageField.setSelectionRange(messageField.value.length, messageField.value.length);
                }
            }
        });
    }
    
    // FAQ item interactions
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        item.addEventListener('click', function() {
            // Add visual feedback
            this.style.transform = 'translateX(5px)';
            setTimeout(() => {
                this.style.transform = 'translateX(0)';
            }, 200);
            
            // Optional: Auto-fill form based on FAQ
            const question = this.querySelector('h4').textContent;
            const messageField = document.getElementById('message');
            
            if (messageField && !messageField.value) {
                messageField.value = `Hi, I have a question about: ${question}`;
                messageField.scrollIntoView({ behavior: 'smooth', block: 'center' });
                messageField.focus();
            }
        });
    });
    
    // Contact method interactions
    const contactMethods = document.querySelectorAll('.contact-method');
    contactMethods.forEach(method => {
        method.addEventListener('click', function() {
            const link = this.querySelector('.contact-link');
            if (link && !link.href.startsWith('mailto:') && !link.href.startsWith('tel:')) {
                // For external links, add visual feedback
                this.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
            }
        });
    });
    
    // Page animations
    function animateElements() {
        const animatedElements = document.querySelectorAll('.contact-method, .faq-item, .social-icon');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        entry.target.style.transition = 'all 0.6s ease';
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, Math.random() * 300);
                    
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        animatedElements.forEach(el => {
            observer.observe(el);
        });
    }
    
    // Initialize animations
    animateElements();
    
    // Utility function to pre-fill form from URL parameters
    function prefillFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        
        if (urlParams.get('subject')) {
            const subjectField = document.getElementById('subject');
            if (subjectField) {
                subjectField.value = urlParams.get('subject');
            }
        }
        
        if (urlParams.get('message')) {
            const messageField = document.getElementById('message');
            if (messageField) {
                messageField.value = decodeURIComponent(urlParams.get('message'));
            }
        }
    }
    
    // Initialize URL prefill
    prefillFromURL();
    
    // Add smooth scrolling for contact links
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
    
    // Console log for debugging
    console.log('Contact form initialized successfully with search suggestions');
});