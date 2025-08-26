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
        localStorage.setItem('theme', 'dark');
    } else {
        body.setAttribute('data-theme', 'light');
        themeIcon.className = 'fas fa-sun';
        localStorage.setItem('theme', 'light');
    }
    
    // Remove transition class after animation
    setTimeout(() => {
        body.classList.remove('theme-transitioning');
    }, 300);
}

// ============================================
// INITIALIZE THEME AND PERFORMANCE SETTINGS
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme based on user preference or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPreference = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    const themeIcon = document.getElementById('theme-icon');
    
    const themeToApply = savedTheme || systemPreference;
    
    if (themeToApply === 'light') {
        document.body.setAttribute('data-theme', 'light');
        themeIcon.className = 'fas fa-sun';
    } else {
        themeIcon.className = 'fas fa-moon';
    }
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            if (e.matches) {
                document.body.setAttribute('data-theme', 'light');
                themeIcon.className = 'fas fa-sun';
            } else {
                document.body.removeAttribute('data-theme');
                themeIcon.className = 'fas fa-moon';
            }
        }
    });
    
    // Check for browser feature support
    checkBrowserSupport();
    
    // Initialize performance optimizations
    initPerformanceOptimizations();
});

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
                const headerOffset = 80; // Offset for fixed elements
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL without jumping
                history.pushState(null, null, targetId);
            }
        });
    });
}

// ============================================
// ENHANCED INTERSECTION OBSERVER FOR ANIMATIONS
// ============================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay for multiple elements
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, index * 100);
                
                animationObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all fade-in elements
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
            const increment = numericValue / 30; // 30 frames for smooth animation
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
    
    // Focus management for forms
    const form = document.querySelector('.contact-form');
    if (form) {
        const firstInput = form.querySelector('input');
        
        // Enhanced focus management
        const contactSection = document.getElementById('contact');
        if (contactSection && firstInput) {
            const contactObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && entry.intersectionRatio > 0.7) {
                        // Only focus if no element is currently focused
                        setTimeout(() => {
                            if (document.activeElement === document.body || 
                                document.activeElement === document.documentElement) {
                                firstInput.focus({ preventScroll: true });
                            }
                        }, 1000);
                    }
                });
            }, { threshold: 0.7 });
            
            contactObserver.observe(contactSection);
        }
    }
    
    // Add skip link for screen readers
    addSkipLink();
    
    // Enhance ARIA attributes dynamically
    enhanceAriaAttributes();
}

function addSkipLink() {
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-to-content';
    skipLink.textContent = 'Skip to main content';
    
    // Add main content identifier
    const mainContent = document.querySelector('.about-section') || document.querySelector('main');
    if (mainContent) {
        mainContent.id = 'main-content';
    }
    
    document.body.insertBefore(skipLink, document.body.firstChild);
}

function enhanceAriaAttributes() {
    // Add live region for form feedback
    const form = document.querySelector('.contact-form');
    if (form) {
        const liveRegion = document.createElement('div');
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.className = 'sr-only';
        liveRegion.id = 'form-status';
        form.appendChild(liveRegion);
    }
    
    // Enhance button states
    document.querySelectorAll('button').forEach(button => {
        if (button.disabled) {
            button.setAttribute('aria-disabled', 'true');
        }
    });
}

// ============================================
// PERFORMANCE OPTIMIZATIONS
// ============================================
function initPerformanceOptimizations() {
    // Lazy loading for images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        }, { rootMargin: '50px' });

        // Observe lazy loading images
        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Preload critical resources
    preloadCriticalResources();
    
    // Optimize scroll performance
    optimizeScrollPerformance();
}

function preloadCriticalResources() {
    // Preload hero image and other critical assets
    const criticalImages = [
        'assets/Profile/profile.jpeg',
        'assets/Projects/Fire Detection.png'
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

function optimizeScrollPerformance() {
    let ticking = false;
    
    function updateScrollEffects() {
        const scrollY = window.pageYOffset;
        
        // Parallax effect for background gradients
        const gradientElements = document.querySelectorAll('body::before');
        if (gradientElements.length > 0) {
            document.documentElement.style.setProperty('--scroll-y', `${scrollY * 0.5}px`);
        }
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick, { passive: true });
}

// ============================================
// BROWSER COMPATIBILITY CHECKS
// ============================================
function checkBrowserSupport() {
    // Check for CSS custom properties support
    if (!window.CSS || !CSS.supports('color', 'var(--fake-var)')) {
        document.body.classList.add('no-css-vars');
        console.warn('CSS custom properties not supported');
    }

    // Check for backdrop-filter support
    if (!CSS.supports('backdrop-filter', 'blur(10px)')) {
        document.body.classList.add('no-backdrop-filter');
        console.info('Backdrop-filter not supported, using fallback styles');
    }
    
    // Check for CSS Grid support
    if (!CSS.supports('display', 'grid')) {
        document.body.classList.add('no-css-grid');
        console.info('CSS Grid not supported, using flexbox fallbacks');
    }
    
    // Check for IntersectionObserver support
    if (!('IntersectionObserver' in window)) {
        console.warn('IntersectionObserver not supported, animations will be static');
        // Fallback: show all elements immediately
        document.querySelectorAll('.fade-in-up').forEach(el => {
            el.classList.add('animate');
        });
    }
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
        if (e.filename && e.filename.includes('script.js')) {
            showNotification('Some interactive features may not be working properly. Please refresh the page.', 'error');
        }
    });
    
    // Unhandled promise rejection handler
    window.addEventListener('unhandledrejection', function(e) {
        console.error('Unhandled Promise Rejection:', e.reason);
        e.preventDefault(); // Prevent default browser behavior
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

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
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
// ENHANCED MOBILE EXPERIENCE
// ============================================
function initMobileOptimizations() {
    const deviceType = getDeviceType();
    document.body.setAttribute('data-device', deviceType);
    
    if (deviceType === 'mobile') {
        // Optimize touch interactions
        document.body.style.touchAction = 'manipulation';
        
        // Add mobile-specific event listeners
        document.addEventListener('touchstart', function() {}, { passive: true });
        
        // Optimize form experience on mobile
        const inputs = document.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                // Prevent zoom on focus for better UX
                if (input.getAttribute('type') === 'email') {
                    input.setAttribute('inputmode', 'email');
                }
            });
        });
    }
}

// ============================================
// SOCIAL SHARING (Optional Enhancement)
// ============================================
function initSocialSharing() {
    // Add share functionality if Web Share API is supported
    if (navigator.share) {
        const shareButton = document.createElement('button');
        shareButton.className = 'btn-secondary';
        shareButton.innerHTML = '<i class="fas fa-share" aria-hidden="true"></i><span>Share Portfolio</span>';
        shareButton.addEventListener('click', async () => {
            try {
                await navigator.share({
                    title: 'Ali Ashraf - ML/DL Engineer',
                    text: 'Check out this amazing Machine Learning Engineer portfolio',
                    url: window.location.href
                });
            } catch (err) {
                console.log('Error sharing:', err);
            }
        });
        
        // Add to hero actions if available
        const heroActions = document.querySelector('.hero-actions');
        if (heroActions) {
            heroActions.appendChild(shareButton);
        }
    }
}

// ============================================
// MAIN INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initSmoothScrolling();
    initScrollAnimations();
    initFormHandling();
    initAccessibilityFeatures();
    initErrorHandling();
    initMobileOptimizations();
    initSocialSharing();
    
    // Add loaded class to body for CSS transitions
    document.body.classList.add('loaded');
    
    // Performance monitoring (development only)
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        monitorPerformance();
    }
});

// ============================================
// PERFORMANCE MONITORING (Development)
// ============================================
function monitorPerformance() {
    // Log performance metrics
    window.addEventListener('load', () => {
        const perfData = performance.getEntriesByType('navigation')[0];
        console.log('Performance Metrics:', {
            'Page Load Time': `${perfData.loadEventEnd - perfData.fetchStart}ms`,
            'DOM Content Loaded': `${perfData.domContentLoadedEventEnd - perfData.fetchStart}ms`,
            'First Paint': getFirstPaint(),
            'Largest Contentful Paint': getLCP()
        });
    });
}

function getFirstPaint() {
    const paintEntries = performance.getEntriesByType('paint');
    const firstPaint = paintEntries.find(entry => entry.name === 'first-paint');
    return firstPaint ? `${Math.round(firstPaint.startTime)}ms` : 'N/A';
}

function getLCP() {
    return new Promise((resolve) => {
        new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            const lastEntry = entries[entries.length - 1];
            resolve(`${Math.round(lastEntry.startTime)}ms`);
        }).observe({entryTypes: ['largest-contentful-paint']});
    });
}

// ============================================
// WINDOW RESIZE HANDLING
// ============================================
window.addEventListener('resize', debounce(function() {
    // Update device type on resize
    const newDeviceType = getDeviceType();
    document.body.setAttribute('data-device', newDeviceType);
    
    // Update any size-dependent calculations
    updateResponsiveElements();
}, 250));

function updateResponsiveElements() {
    // Update any elements that depend on window size
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats && window.innerWidth < 768) {
        // Mobile-specific adjustments
        heroStats.style.setProperty('--columns', '1');
    } else if (heroStats) {
        heroStats.style.removeProperty('--columns');
    }
}

// ============================================
// EXPORT FOR TESTING (Development)
// ============================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        toggleTheme,
        validateField,
        showNotification,
        debounce,
        throttle
    };
}