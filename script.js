
// ============================================
// ENHANCED THEME TOGGLE FUNCTIONALITY
// ============================================
function toggleTheme() {
    const body = document.body;
    const themeIcon = document.getElementById('theme-icon');
    const currentTheme = body.getAttribute('data-theme');
    
    // Add transition class for smooth theme switching
    body.classList.add('theme-transitioning');
    
    if (currentTheme === 'light') {
        body.removeAttribute('data-theme');
        themeIcon.className = 'fas fa-moon';
        // Use in-memory storage instead of localStorage
        window.themePreference = 'dark';
    } else {
        body.setAttribute('data-theme', 'light');
        themeIcon.className = 'fas fa-sun';
        window.themePreference = 'light';
    }
    
    // Remove transition class after animation
    setTimeout(() => {
        body.classList.remove('theme-transitioning');
    }, 300);
}

// ============================================
// IMAGE MODAL FUNCTIONALITY
// ============================================
function openModal(title, imageSrc, description, type) {
    const modal = document.getElementById('imageModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalImage = document.getElementById('modalImage');
    const modalDescription = document.getElementById('modalDescription');
    const modalMeta = document.getElementById('modalMeta');
    
    // Set modal content
    modalTitle.textContent = title;
    modalImage.src = imageSrc;
    modalImage.alt = title;
    modalDescription.textContent = description;
    
    // Create meta information
    modalMeta.innerHTML = '';
    if (type === 'project') {
        modalMeta.innerHTML = `
            <div class="modal-meta-item">
                <i class="fas fa-folder-open" aria-hidden="true"></i>
                <span>Project</span>
            </div>
            <div class="modal-meta-item">
                <i class="fas fa-code" aria-hidden="true"></i>
                <span>Machine Learning</span>
            </div>
        `;
    } else if (type === 'certificate') {
        modalMeta.innerHTML = `
            <div class="modal-meta-item">
                <i class="fas fa-certificate" aria-hidden="true"></i>
                <span>Certification</span>
            </div>
            <div class="modal-meta-item">
                <i class="fas fa-graduation-cap" aria-hidden="true"></i>
                <span>Professional Development</span>
            </div>
        `;
    }
    
    // Show modal
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    
    // Focus management for accessibility
    modal.querySelector('.modal-close').focus();
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    
    // Hide modal
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    
    // Restore body scroll
    document.body.style.overflow = '';
    
    // Return focus to the clicked image (better UX)
    const clickedImage = document.querySelector('.clickable-image:focus');
    if (clickedImage) {
        clickedImage.focus();
    }
}

// ============================================
// INITIALIZE THEME AND PERFORMANCE SETTINGS
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme based on system preference (no localStorage)
    const systemPreference = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    const themeIcon = document.getElementById('theme-icon');
    
    if (systemPreference === 'light') {
        document.body.setAttribute('data-theme', 'light');
        themeIcon.className = 'fas fa-sun';
    } else {
        themeIcon.className = 'fas fa-moon';
    }
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
        if (!window.themePreference) {
            if (e.matches) {
                document.body.setAttribute('data-theme', 'light');
                themeIcon.className = 'fas fa-sun';
            } else {
                document.body.removeAttribute('data-theme');
                themeIcon.className = 'fas fa-moon';
            }
        }
    });
    
    // Initialize all features
    initSmoothScrolling();
    initScrollAnimations();
    initFormHandling();
    initAccessibilityFeatures();
    initErrorHandling();
    initModalEventListeners();
    
    // Add loaded class to body for CSS transitions
    document.body.classList.add('loaded');
});

// ============================================
// MODAL EVENT LISTENERS
// ============================================
function initModalEventListeners() {
    const modal = document.getElementById('imageModal');
    
    // Close modal on backdrop click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close modal on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
    
    // Keyboard navigation for modal
    modal.addEventListener('keydown', function(e) {
        if (!modal.classList.contains('active')) return;
        
        if (e.key === 'Tab') {
            // Trap focus within modal
            const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            
            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                }
            } else {
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        }
    });
}

// ============================================
// ENHANCED SMOOTH SCROLLING WITH OFFSET
// ============================================
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                history.pushState(null, null, targetId);
            }
        });
    });
}

// ============================================
// ENHANCED INTERSECTION OBSERVER FOR ANIMATIONS
// ============================================
function initScrollAnimations() {
    if (!('IntersectionObserver' in window)) {
        // Fallback for browsers without IntersectionObserver
        document.querySelectorAll('.fade-in-up').forEach(el => {
            el.classList.add('animate');
        });
        return;
    }

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, index * 100);
                
                animationObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animateElements = document.querySelectorAll('.fade-in-up');
    animateElements.forEach(el => {
        animationObserver.observe(el);
    });

    // Stats counter animation
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
}

// ============================================
// ANIMATED STATISTICS COUNTER
// ============================================
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const finalValue = stat.textContent;
        const numericValue = parseInt(finalValue.replace(/\D/g, ''));
        const suffix = finalValue.replace(/\d/g, '');
        
        if (numericValue) {
            let currentValue = 0;
            const increment = numericValue / 30;
            const timer = setInterval(() => {
                currentValue += increment;
                if (currentValue >= numericValue) {
                    currentValue = numericValue;
                    clearInterval(timer);
                }
                stat.textContent = Math.floor(currentValue) + suffix;
            }, 50);
        }
    });
}

// ============================================
// ENHANCED FORM VALIDATION AND SUBMISSION
// ============================================
function initFormHandling() {
    const form = document.querySelector('.contact-form');
    if (!form) return;
    
    const submitButton = form.querySelector('.btn-submit');
    const inputs = form.querySelectorAll('input, textarea, select');
    
    // Real-time validation
    inputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => clearFieldError(input));
    });
    
    // Form submission
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Validate all fields
        let isValid = true;
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });
        
        if (!isValid) {
            showNotification('Please correct the errors before submitting.', 'error');
            return;
        }
        
        // Show loading state
        submitButton.classList.add('loading');
        submitButton.disabled = true;
        
        try {
            const formData = new FormData(form);
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                form.reset();
                inputs.forEach(input => clearFieldError(input));
            } else {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            showNotification('There was an error sending your message. Please try again.', 'error');
        } finally {
            // Reset button state
            setTimeout(() => {
                submitButton.classList.remove('loading');
                submitButton.disabled = false;
            }, 1000);
        }
    });
}

// ============================================
// FIELD VALIDATION FUNCTIONS
// ============================================
function validateField(field) {
    const value = field.value.trim();
    const fieldType = field.type;
    const isRequired = field.hasAttribute('required');
    
    clearFieldError(field);
    
    // Required field validation
    if (isRequired && !value) {
        showFieldError(field, 'This field is required.');
        return false;
    }
    
    // Email validation
    if (fieldType === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldError(field, 'Please enter a valid email address.');
            return false;
        }
    }
    
    // Name validation (minimum 2 characters)
    if (field.name === 'name' && value && value.length < 2) {
        showFieldError(field, 'Name must be at least 2 characters long.');
        return false;
    }
    
    // Message validation (minimum 10 characters)
    if (field.name === 'message' && value && value.length < 10) {
        showFieldError(field, 'Message must be at least 10 characters long.');
        return false;
    }
    
    // Mark field as valid
    field.classList.add('is-valid');
    return true;
}

function showFieldError(field, message) {
    field.classList.add('is-invalid');
    field.classList.remove('is-valid');
    
    let errorElement = field.parentNode.querySelector('.form-feedback');
    if (errorElement) {
        errorElement.textContent = message;
    }
}

function clearFieldError(field) {
    field.classList.remove('is-invalid');
    
    const errorElement = field.parentNode.querySelector('.form-feedback');
    if (errorElement) {
        errorElement.textContent = '';
    }
}

// ============================================
// NOTIFICATION SYSTEM
// ============================================
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}" aria-hidden="true"></i>
            <span>${message}</span>
            <button class="notification-close" aria-label="Close notification">
                <i class="fas fa-times" aria-hidden="true"></i>
            </button>
        </div>
    `;
    
    // Add notification styles
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1000;
            background: var(--glass-bg);
            backdrop-filter: blur(20px);
            border: 1px solid var(--glass-border);
            border-radius: var(--radius-lg);
            padding: var(--space-4);
            box-shadow: var(--glass-shadow);
            transform: translateX(100%);
            transition: transform var(--transition-normal);
            max-width: 400px;
        }
        .notification-success { border-left: 4px solid var(--color-accent); }
        .notification-error { border-left: 4px solid #ef4444; }
        .notification-info { border-left: 4px solid var(--color-secondary); }
        .notification.show { transform: translateX(0); }
        .notification-content {
            display: flex;
            align-items: center;
            gap: var(--space-3);
            color: var(--text-primary);
        }
        .notification-close {
            background: none;
            border: none;
            color: var(--text-muted);
            cursor: pointer;
            margin-left: auto;
            padding: var(--space-1);
            border-radius: var(--radius-sm);
            transition: all var(--transition-fast);
        }
        .notification-close:hover {
            color: var(--text-primary);
            background: rgba(255, 255, 255, 0.1);
        }
    `;
    
    // Add to document
    if (!document.querySelector('#notification-styles')) {
        style.id = 'notification-styles';
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Show notification
    requestAnimationFrame(() => {
        notification.classList.add('show');
    });
    
    // Auto-hide after 5 seconds
    const hideTimer = setTimeout(() => {
        hideNotification(notification);
    }, 5000);
    
    // Manual close button
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', () => {
        clearTimeout(hideTimer);
        hideNotification(notification);
    });
}

function getNotificationIcon(type) {
    switch (type) {
        case 'success': return 'check-circle';
        case 'error': return 'exclamation-triangle';
        case 'info': 
        default: return 'info-circle';
    }
}

function hideNotification(notification) {
    notification.classList.remove('show');
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// ============================================
// ACCESSIBILITY ENHANCEMENTS
// ============================================
function initAccessibilityFeatures() {
    // Enhanced keyboard navigation for theme toggle
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleTheme();
            }
        });
    }
    
    // Enhanced keyboard navigation for clickable images
    const clickableImages = document.querySelectorAll('.clickable-image');
    clickableImages.forEach(img => {
        // Make images focusable
        img.setAttribute('tabindex', '0');
        img.setAttribute('role', 'button');
        
        img.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                // Trigger click event
                img.click();
            }
        });
    });
    
    // Add skip link for screen readers
    addSkipLink();
}

function addSkipLink() {
    const skipLink = document.createElement('a');
    skipLink.href = '#about';
    skipLink.className = 'skip-to-content';
    skipLink.textContent = 'Skip to main content';
    
    document.body.insertBefore(skipLink, document.body.firstChild);
}

// ============================================
// ERROR HANDLING AND LOGGING
// ============================================
function initErrorHandling() {
    // Global error handler
    window.addEventListener('error', function(e) {
        console.error('JavaScript Error:', {
            message: e.message,
            filename: e.filename,
            lineno: e.lineno,
            colno: e.colno,
            error: e.error
        });
        
        // Show user-friendly error message for critical errors
        if (e.filename && e.filename.includes('script')) {
            showNotification('Some interactive features may not be working properly. Please refresh the page.', 'error');
        }
    });
    
    // Unhandled promise rejection handler
    window.addEventListener('unhandledrejection', function(e) {
        console.error('Unhandled Promise Rejection:', e.reason);
        e.preventDefault();
    });
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Debounce function for performance optimization
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func.apply(this, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(this, args);
    };
}

// Device detection for enhanced mobile experience
function getDeviceType() {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        return 'tablet';
    } else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
        return 'mobile';
    }
    return 'desktop';
}

// ============================================
// WINDOW RESIZE HANDLING
// ============================================
window.addEventListener('resize', debounce(function() {
    // Update device type on resize
    const newDeviceType = getDeviceType();
    document.body.setAttribute('data-device', newDeviceType);
}, 250));