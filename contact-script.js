// Contact Form Functionality
document.addEventListener('DOMContentLoaded', function() {
    
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
            alert(message); // Fallback
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
    console.log('Contact form initialized successfully');
});
