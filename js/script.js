        // Loading Screen
        window.addEventListener('load', function() {
            setTimeout(() => {
                document.getElementById('loading').classList.add('hidden');
            }, 1500);
        });

        // Create floating particles
        function createParticles() {
            const particlesContainer = document.getElementById('particles');
            const particleCount = 50;

            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 15 + 's';
                particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
                particlesContainer.appendChild(particle);
            }
        }

        // Initialize particles
        createParticles();

        // Navigation functionality
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');
        const navbar = document.getElementById('navbar');

        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Active navigation link based on scroll
        const sections = document.querySelectorAll('section');
        const navA = document.querySelectorAll('.nav-links a');

        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (pageYOffset >= sectionTop - 150) {
                    current = section.getAttribute('id');
                }
            });

            navA.forEach(a => {
                a.classList.remove('active');
                if (a.getAttribute('href').includes(current)) {
                    a.classList.add('active');
                }
            });
        });

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

        // Theme switcher (placeholder - currently using dark theme)
        const themeSwitcher = document.getElementById('theme-switcher');
        themeSwitcher.addEventListener('click', () => {
            // Add your theme switching logic here
            console.log('Theme switching functionality can be added here');
        });

        // Form handling
        const contactForm = document.getElementById('contact-form');
        const formStatus = document.getElementById('form-status');

        async function handleSubmit(event) {
            event.preventDefault();
            const data = new FormData(event.target);
            
            formStatus.textContent = "Sending message...";
            formStatus.style.color = '#64ffda';
            
            try {
                const response = await fetch(event.target.action, {
                    method: contactForm.method,
                    body: data,
                    headers: { 'Accept': 'application/json' }
                });
                
                if (response.ok) {
                    formStatus.textContent = "Thank you! Your message has been sent successfully ✨";
                    formStatus.style.color = '#64ffda';
                    contactForm.reset();
                } else {
                    throw new Error('Network response was not ok');
                }
            } catch (error) {
                formStatus.textContent = "Sorry, there was an error. Please try again 🤖";
                formStatus.style.color = '#f5576c';
            }
        }

        contactForm.addEventListener("submit", handleSubmit);

        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe elements for animation
        document.querySelectorAll('.project-card, .certificate-card').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s ease';
            observer.observe(el);
        });

        // Add typing effect to the greeting
        function typeWriter(element, text, speed = 100) {
            let i = 0;
            element.textContent = '';
            
            function type() {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                }
            }
            type();
        }

        // Initialize typing effect when page loads
        setTimeout(() => {
            const greetingElement = document.querySelector('.greeting');
            if (greetingElement) {
                typeWriter(greetingElement, "Hello, I'm", 150);
            }
        }, 2000);

        // Add glitch effect to name on hover
        const nameElement = document.querySelector('.name');
        if (nameElement) {
            nameElement.addEventListener('mouseenter', function() {
                this.style.animation = 'glitch 0.5s';
            });
            
            nameElement.addEventListener('animationend', function() {
                this.style.animation = '';
            });
        }

        // Parallax effect for background elements
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.avatar-ring');
            
            parallaxElements.forEach((element, index) => {
                const speed = 0.5 + (index * 0.2);
                element.style.transform = `rotate(${scrolled * speed}deg)`;
            });
        });

        // Add dynamic background color change based on scroll
        window.addEventListener('scroll', () => {
            const scrollPercent = window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight);
            const hue = scrollPercent * 60; // Change hue from 0 to 60
            document.body.style.filter = `hue-rotate(${hue}deg)`;
        });

        // Console message for developers
        console.log('🤖 Ali Ashraf AI Portfolio Loaded Successfully!');
        console.log('💡 Ready to explore the future of AI and Machine Learning');
        
        // Easter egg - Konami code
        let konamiCode = [];
        const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
        
        document.addEventListener('keydown', (e) => {
            konamiCode.push(e.keyCode);
            if (konamiCode.length > konamiSequence.length) {
                konamiCode.shift();
            }
            
            if (konamiCode.join(',') === konamiSequence.join(',')) {
                document.body.style.animation = 'glitch 2s infinite';
                setTimeout(() => {
                    document.body.style.animation = '';
                    alert('🤖 AI Mode Activated! Welcome to the Matrix, Neo...');
                }, 3000);
            }
        });

        // Add some AI-themed console logs
        const aiQuotes = [
            "The future belongs to artificial intelligence 🤖",
            "Machine learning is the new electricity ⚡",
            "Data is the new oil, AI is the refinery 🛢️",
            "In AI we trust, in data we verify 📊",
            "Neural networks: inspired by biology, powered by mathematics 🧠"
        ];
        
        setInterval(() => {
            const randomQuote = aiQuotes[Math.floor(Math.random() * aiQuotes.length)];
            console.log(`%c${randomQuote}`, 'color: #64ffda; font-weight: bold;');
        }, 30000);