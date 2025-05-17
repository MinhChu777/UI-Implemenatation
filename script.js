// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Cart functionality
    const cart = {
        items: [],
        total: 0,
        
        // Add item to cart
        addItem: function(id, name, price, quantity = 1) {
            const existingItem = this.items.find(item => item.id === id);
            
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                this.items.push({
                    id: id,
                    name: name,
                    price: parseFloat(price),
                    quantity: quantity
                });
            }
            
            this.updateTotal();
            this.updateCartCount();
            this.showNotification(`${name} added to cart!`);
            this.saveToLocalStorage();
        },
        
        // Remove item from cart
        removeItem: function(id) {
            this.items = this.items.filter(item => item.id !== id);
            this.updateTotal();
            this.updateCartCount();
            this.saveToLocalStorage();
            this.showNotification("Item removed from cart!");
        },
        
        // Update item quantity
        updateQuantity: function(id, quantity) {
            const item = this.items.find(item => item.id === id);
            if (item) {
                item.quantity = quantity;
                this.updateTotal();
                this.updateCartCount();
                this.saveToLocalStorage();
            }
        },
        
        // Calculate cart total
        updateTotal: function() {
            this.total = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        },
        
        // Update cart count UI
        updateCartCount: function() {
            // This would normally update a cart counter element in the header
            // For this example, we'll just log it to the console
            console.log(`Cart now has ${this.items.length} items with a total of $${this.total.toFixed(2)}`);
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
                this.updateCartCount();
            }
        }
    };
    
    // Initialize cart from localStorage
    cart.loadFromLocalStorage();
    
    // Add to cart functionality
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const id = this.getAttribute('data-id');
            const name = this.getAttribute('data-name');
            const price = this.getAttribute('data-price');
            
            // Add some animation effect
            this.classList.add('adding');
            setTimeout(() => {
                this.classList.remove('adding');
            }, 500);
            
            cart.addItem(id, name, price);
        });
    });
    
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
            
            // In a real application, you would send this to a server
            // Here we'll just show a notification
            cart.showNotification(`Thank you! ${email} has been subscribed to our newsletter.`);
            
            // Reset the form
            this.reset();
        });
    }
    
    // Chat button functionality
    const chatBtn = document.querySelector('.chat-btn');
    if (chatBtn) {
        chatBtn.addEventListener('click', function() {
            cart.showNotification('Chat feature coming soon!');
            
            // Add a little animation
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
    
    // Optional: Add subtle parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const heroElements = document.querySelector('.hero-content');
        
        if (heroElements && scrollPosition < 600) {
            const speed = 0.15;
            heroElements.style.transform = `translateY(${scrollPosition * speed}px)`;
        }
    });
});
