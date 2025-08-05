        // Neural network background animation
        function createNeuralNetwork() {
            const neuralBg = document.querySelector('.neural-bg');
            const nodeCount = 20;
            
            for (let i = 0; i < nodeCount; i++) {
                const node = document.createElement('div');
                node.className = 'neural-node';
                node.style.left = Math.random() * 100 + '%';
                node.style.top = Math.random() * 100 + '%';
                node.style.animationDelay = Math.random() * 3 + 's';
                neuralBg.appendChild(node);
            }
        }

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, observerOptions);

        // Observe all sections and cards
        document.querySelectorAll('section, .project-card, .certificate-card').forEach(el => {
            observer.observe(el);
        });

        // Theme switcher functionality
        const themeSwitcher = document.getElementById('theme-switcher');
        const body = document.body;

        themeSwitcher.addEventListener('click', () => {
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            // Update CSS variables for light theme
            if (newTheme === 'light') {
                document.documentElement.style.setProperty('--dark-bg', '#ffffff');
                document.documentElement.style.setProperty('--dark-surface', '#f8f9fa');
                document.documentElement.style.setProperty('--dark-card', '#ffffff');
                document.documentElement.style.setProperty('--text-primary', '#2d3748');
                document.documentElement.style.setProperty('--text-secondary', '#718096');
                document.documentElement.style.setProperty('--border-color', '#e2e8f0');
            } else {
                document.documentElement.style.setProperty('--dark-bg', '#0a0a0a');
                document.documentElement.style.setProperty('--dark-surface', '#1a1a1a');
                document.documentElement.style.setProperty('--dark-card', '#2a2a2a');
                document.documentElement.style.setProperty('--text-primary', '#ffffff');
                document.documentElement.style.setProperty('--text-secondary', '#a0a0a0');
                document.documentElement.style.setProperty('--border-color', '#333');
            }
        });

        // Load saved theme
        const savedTheme = localStorage.getItem('theme') || 'dark';
        body.setAttribute('data-theme', savedTheme);

        // Mobile menu toggle
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');
        
        hamburger.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        });

        // Form submission handling
        const contactForm = document.getElementById('contact-form');
        const formStatus = document.getElementById('form-status');

        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            formStatus.textContent = 'Sending message...';
            formStatus.style.color = '#667eea';
            
            try {
                // Simulate form submission (replace with actual endpoint)
                await new Promise(resolve => setTimeout(resolve, 1000));
                formStatus.textContent = 'Message sent successfully! I\'ll get back to you soon.';
                formStatus.style.color = '#48bb78';
                contactForm.reset();
            } catch (error) {
                formStatus.textContent = 'Error sending message. Please try again.';
                formStatus.style.color = '#f56565';
            }
        });

        // Typing animation for subtitle
        const subtitle = document.querySelector('.subtitle');
        const titles = ['AI/ML Engineer', 'Deep Learning Expert', 'Computer Vision Specialist', 'Data Scientist'];
        let titleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeTitle() {
            const currentTitle = titles[titleIndex];
            
            if (isDeleting) {
                subtitle.textContent = currentTitle.substring(0, charIndex - 1);
                charIndex--;
            } else {
                subtitle.textContent = currentTitle.substring(0, charIndex + 1);
                charIndex++;
            }

            if (!isDeleting && charIndex === currentTitle.length) {
                setTimeout(() => isDeleting = true, 2000);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                titleIndex = (titleIndex + 1) % titles.length;
            }

            const speed = isDeleting ? 50 : 100;
            setTimeout(typeTitle, speed);
        }

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(10, 10, 10, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.3)';
            } else {
                navbar.style.background = 'rgba(10, 10, 10, 0.95)';
                navbar.style.boxShadow = 'none';
            }
        });

        // Parallax effect for hero section
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const homeSection = document.getElementById('home');
            const rate = scrolled * -0.5;
            
            if (homeSection) {
                homeSection.style.transform = `translateY(${rate}px)`;
            }
        });

        // Initialize animations
        document.addEventListener('DOMContentLoaded', () => {
            createNeuralNetwork();
            setTimeout(typeTitle, 1000);
            
            // Add staggered animation delays to project cards
            const projectCards = document.querySelectorAll('.project-card');
            projectCards.forEach((card, index) => {
                card.style.animationDelay = `${index * 0.2}s`;
            });

            // Add staggered animation delays to certificate cards
            const certCards = document.querySelectorAll('.certificate-card');
            certCards.forEach((card, index) => {
                card.style.animationDelay = `${index * 0.1}s`;
            });
        });

        // Add particle effect on mouse move
        document.addEventListener('mousemove', (e) => {
            const cursor = document.createElement('div');
            cursor.style.position = 'fixed';
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            cursor.style.width = '4px';
            cursor.style.height = '4px';
            cursor.style.background = 'rgba(102, 126, 234, 0.5)';
            cursor.style.borderRadius = '50%';
            cursor.style.pointerEvents = 'none';
            cursor.style.zIndex = '9999';
            cursor.style.animation = 'fadeOut 1s forwards';
            
            document.body.appendChild(cursor);
            
            setTimeout(() => {
                cursor.remove();
            }, 1000);
        });

        // Add fadeOut animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeOut {
                0% { opacity: 1; transform: scale(1); }
                100% { opacity: 0; transform: scale(0); }
            }
        `;
        document.head.appendChild(style);

        // Tech stack hover effects
        document.querySelectorAll('.tech-tag').forEach(tag => {
            tag.addEventListener('mouseenter', () => {
                tag.style.transform = 'scale(1.1) translateY(-2px)';
            });
            
            tag.addEventListener('mouseleave', () => {
                tag.style.transform = 'scale(1) translateY(0)';
            });
        });

        // Project card tilt effect
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
            });
        });