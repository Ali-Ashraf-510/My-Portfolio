       // ============================================
        // THEME TOGGLE FUNCTIONALITY
        // ============================================
        function toggleTheme() {
            const body = document.body;
            const themeIcon = document.getElementById('theme-icon');
            const currentTheme = body.getAttribute('data-theme');
            
            if (currentTheme === 'light') {
                body.removeAttribute('data-theme');
                themeIcon.className = 'fas fa-moon';
                localStorage.setItem('theme', 'dark');
            } else {
                body.setAttribute('data-theme', 'light');
                themeIcon.className = 'fas fa-sun';
                localStorage.setItem('theme', 'light');
            }
        }

        // ============================================
        // INITIALIZE THEME AND FEATURES
        // ============================================
        document.addEventListener('DOMContentLoaded', function() {
            // Initialize theme
            const savedTheme = localStorage.getItem('theme');
            const systemPreference = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
            const themeIcon = document.getElementById('theme-icon');
            
            const themeToApply = savedTheme || systemPreference;
            
            if (themeToApply === 'light') {
                document.body.setAttribute('data-theme', 'light');
                themeIcon.className = 'fas fa-sun';
            }
            
            // Initialize smooth scrolling
            initSmoothScrolling();
            
            // Initialize scroll animations
            initScrollAnimations();
            
            // Initialize form handling
            initFormHandling();
            
            // Initialize stats animation
            initStatsAnimation();
        });

        // ============================================
        // SMOOTH SCROLLING
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
                    }
                });
            });
        }

        // ============================================
        // SCROLL ANIMATIONS
        // ============================================
        function initScrollAnimations() {
            if ('IntersectionObserver' in window) {
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

                // Observe fade-in elements
                document.querySelectorAll('.fade-in-up').forEach(el => {
                    animationObserver.observe(el);
                });
            }
        }

        // ============================================
        // STATS ANIMATION
        // ============================================
        function initStatsAnimation() {
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
        // FORM HANDLING
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
                    setTimeout(() => {
                        submitButton.classList.remove('loading');
                        submitButton.disabled = false;
                    }, 1000);
                }
            });
        }

        // ============================================
        // FORM VALIDATION
        // ============================================
        function validateField(field) {
            const value = field.value.trim();
            const fieldType = field.type;
            const isRequired = field.hasAttribute('required');
            
            clearFieldError(field);
            
            if (isRequired && !value) {
                showFieldError(field, 'This field is required.');
                return false;
            }
            
            if (fieldType === 'email' && value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    showFieldError(field, 'Please enter a valid email address.');
                    return false;
                }
            }
            
            if (field.name === 'name' && value && value.length < 2) {
                showFieldError(field, 'Name must be at least 2 characters long.');
                return false;
            }
            
            if (field.name === 'message' && value && value.length < 10) {
                showFieldError(field, 'Message must be at least 10 characters long.');
                return false;
            }
            
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
            const existingNotification = document.querySelector('.notification');
            if (existingNotification) {
                existingNotification.remove();
            }
            
            const notification = document.createElement('div');
            notification.className = `notification notification-${type}`;
            notification.innerHTML = `
                <div class="notification-content">
                    <i class="fas fa-${getNotificationIcon(type)}"></i>
                    <span>${message}</span>
                    <button class="notification-close">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `;
            
            // Add notification styles
            if (!document.querySelector('#notification-styles')) {
                const style = document.createElement('style');
                style.id = 'notification-styles';
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
                        padding: var(--space-lg);
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
                        gap: var(--space-md);
                        color: var(--text-primary);
                    }
                    .notification-close {
                        background: none;
                        border: none;
                        color: var(--text-muted);
                        cursor: pointer;
                        margin-left: auto;
                        padding: var(--space-sm);
                        border-radius: var(--radius-sm);
                        transition: all var(--transition-fast);
                    }
                    .notification-close:hover {
                        color: var(--text-primary);
                        background: rgba(255, 255, 255, 0.1);
                    }
                `;
                document.head.appendChild(style);
            }
            
            document.body.appendChild(notification);
            
            requestAnimationFrame(() => {
                notification.classList.add('show');
            });
            
            const hideTimer = setTimeout(() => {
                hideNotification(notification);
            }, 5000);
            
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