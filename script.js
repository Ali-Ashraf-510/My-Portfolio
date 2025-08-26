// document.addEventListener('DOMContentLoaded', () => {
//             // --- ENHANCED THEME TOGGLER WITH MEMORY ---
//             const themeToggle = document.getElementById('theme-toggle');
//             let currentTheme = 'dark'; // Default to dark theme
            
//             // Check for saved theme preference or default to dark
//             const savedTheme = localStorage.getItem('theme') || 'dark';
//             setTheme(savedTheme);

//             function setTheme(theme) {
//                 currentTheme = theme;
//                 document.documentElement.setAttribute('data-theme', theme);
                
//                 if (theme === 'dark') {
//                     themeToggle.textContent = '☀️';
//                 } else {
//                     themeToggle.textContent = '🌙';
//                 }
                
//                 localStorage.setItem('theme', theme);
//             }

//             themeToggle.addEventListener('click', () => {
//                 const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
//                 setTheme(newTheme);
                
//                 // Add a fun rotation animation
//                 themeToggle.style.transform = 'rotate(360deg)';
//                 setTimeout(() => {
//                     themeToggle.style.transform = '';
//                 }, 300);
//             });

//             // --- ENHANCED MOBILE NAVIGATION ---
//             const hamburger = document.querySelector('.hamburger');
//             const navLinks = document.querySelector('.nav-links');

//             hamburger.addEventListener('click', () => {
//                 navLinks.classList.toggle('active');
//                 hamburger.classList.toggle('active');
//             });

//             // Close mobile menu when a link is clicked
//             navLinks.querySelectorAll('a').forEach(link => {
//                 link.addEventListener('click', () => {
//                     navLinks.classList.remove('active');
//                     hamburger.classList.remove('active');
//                 });
//             });

//             // --- SCROLL PROGRESS INDICATOR ---
//             const scrollIndicator = document.querySelector('.scroll-indicator');
            
//             window.addEventListener('scroll', () => {
//                 const scrollTop = document.documentElement.scrollTop;
//                 const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
//                 const scrolled = (scrollTop / scrollHeight) * 100;
//                 scrollIndicator.style.width = scrolled + '%';
//             });

//             // --- ADVANCED SCROLLSPY WITH SMOOTH TRANSITIONS ---
//             const sections = document.querySelectorAll('section[id]');
//             const navLi = document.querySelectorAll('.nav-links li a');

//             window.addEventListener('scroll', () => {
//                 let current = '';
//                 sections.forEach(section => {
//                     const sectionTop = section.offsetTop;
//                     const sectionHeight = section.clientHeight;
//                     if (pageYOffset >= sectionTop - 200) {
//                         current = section.getAttribute('id');
//                     }
//                 });

//                 navLi.forEach(a => {
//                     a.classList.remove('active');
//                     if (a.getAttribute('href') === '#' + current) {
//                         a.classList.add('active');
//                     }
//                 });
//             });

//             // --- SCROLL REVEAL ANIMATIONS ---
//             const observerOptions = {
//                 threshold: 0.1,
//                 rootMargin: '0px 0px -50px 0px'
//             };

//             const observer = new IntersectionObserver((entries) => {
//                 entries.forEach(entry => {
//                     if (entry.isIntersecting) {
//                         entry.target.classList.add('visible');
//                     }
//                 });
//             }, observerOptions);

//             // Observe all fade-in elements
//             document.querySelectorAll('.fade-in').forEach(el => {
//                 observer.observe(el);
//             });

//             // --- NAVBAR BLUR EFFECT ON SCROLL ---
//             let lastScrollY = window.scrollY;
            
//             window.addEventListener('scroll', () => {
//                 const navbar = document.querySelector('.navbar');
//                 const currentScrollY = window.scrollY;
                
//                 if (currentScrollY > 100) {
//                     navbar.style.background = 'rgba(255, 255, 255, 0.05)';
//                     navbar.style.backdropFilter = 'blur(30px)';
//                 } else {
//                     navbar.style.background = 'rgba(255, 255, 255, 0.1)';
//                     navbar.style.backdropFilter = 'blur(20px)';
//                 }
                
//                 lastScrollY = currentScrollY;
//             });

//             // --- ENHANCED CARD INTERACTIONS ---
//             const cards = document.querySelectorAll('.skill-card, .project-card, .certificate-card');
            
//             cards.forEach(card => {
//                 card.addEventListener('mouseenter', (e) => {
//                     const rect = card.getBoundingClientRect();
//                     const x = e.clientX - rect.left;
//                     const y = e.clientY - rect.top;
                    
//                     card.style.setProperty('--mouse-x', x + 'px');
//                     card.style.setProperty('--mouse-y', y + 'px');
//                 });
//             });

//             // --- SMOOTH SCROLLING FOR ANCHOR LINKS ---
//             document.querySelectorAll('a[href^="#"]').forEach(anchor => {
//                 anchor.addEventListener('click', function (e) {
//                     e.preventDefault();
//                     const target = document.querySelector(this.getAttribute('href'));
//                     if (target) {
//                         target.scrollIntoView({
//                             behavior: 'smooth',
//                             block: 'start'
//                         });
//                     }
//                 });
//             });

//             // --- FORM ENHANCEMENT ---
//             const form = document.querySelector('.contact-form');
//             const inputs = form.querySelectorAll('input, textarea');
            
//             inputs.forEach(input => {
//                 input.addEventListener('focus', () => {
//                     input.parentElement.classList.add('focused');
//                 });
                
//                 input.addEventListener('blur', () => {
//                     if (!input.value) {
//                         input.parentElement.classList.remove('focused');
//                     }
//                 });
//             });

//             // --- TYPING ANIMATION FOR HERO SUBTITLE ---
//             const subtitle = document.querySelector('.hero-subtitle');
//             const originalText = subtitle.textContent;
//             subtitle.textContent = '';
            
//             let i = 0;
//             function typeWriter() {
//                 if (i < originalText.length) {
//                     subtitle.textContent += originalText.charAt(i);
//                     i++;
//                     setTimeout(typeWriter, 50);
//                 }
//             }
            
//             // Start typing animation after a delay
//             setTimeout(typeWriter, 1000);

//             // --- PARTICLE SYSTEM FOR HERO BACKGROUND ---
//             const canvas = document.createElement('canvas');
//             const ctx = canvas.getContext('2d');
//             const hero = document.querySelector('.hero');
            
//             canvas.style.position = 'absolute';
//             canvas.style.top = '0';
//             canvas.style.left = '0';
//             canvas.style.zIndex = '-1';
//             canvas.style.opacity = '0.3';
//             hero.appendChild(canvas);

//             function resizeCanvas() {
//                 canvas.width = hero.offsetWidth;
//                 canvas.height = hero.offsetHeight;
//             }
            
//             resizeCanvas();
//             window.addEventListener('resize', resizeCanvas);

//             const particles = [];
//             const particleCount = 50;

//             class Particle {
//                 constructor() {
//                     this.x = Math.random() * canvas.width;
//                     this.y = Math.random() * canvas.height;
//                     this.vx = (Math.random() - 0.5) * 0.5;
//                     this.vy = (Math.random() - 0.5) * 0.5;
//                     this.life = Math.random() * 100;
//                 }

//                 update() {
//                     this.x += this.vx;
//                     this.y += this.vy;
//                     this.life += 0.5;

//                     if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
//                     if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
//                 }

//                 draw() {
//                     ctx.save();
//                     ctx.globalAlpha = Math.sin(this.life * 0.05) * 0.5 + 0.5;
//                     ctx.beginPath();
//                     ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
//                     ctx.fillStyle = currentTheme === 'dark' ? '#8b5cf6' : '#6366f1';
//                     ctx.fill();
//                     ctx.restore();
//                 }
//             }

//             for (let i = 0; i < particleCount; i++) {
//                 particles.push(new Particle());
//             }

//             function animate() {
//                 ctx.clearRect(0, 0, canvas.width, canvas.height);
                
//                 particles.forEach(particle => {
//                     particle.update();
//                     particle.draw();
//                 });

//                 // Draw connections
//                 particles.forEach((particle, i) => {
//                     particles.slice(i + 1).forEach(otherParticle => {
//                         const dx = particle.x - otherParticle.x;
//                         const dy = particle.y - otherParticle.y;
//                         const distance = Math.sqrt(dx * dx + dy * dy);

//                         if (distance < 100) {
//                             ctx.save();
//                             ctx.globalAlpha = (100 - distance) / 100 * 0.2;
//                             ctx.beginPath();
//                             ctx.moveTo(particle.x, particle.y);
//                             ctx.lineTo(otherParticle.x, otherParticle.y);
//                             ctx.strokeStyle = currentTheme === 'dark' ? '#8b5cf6' : '#6366f1';
//                             ctx.lineWidth = 1;
//                             ctx.stroke();
//                             ctx.restore();
//                         }
//                     });
//                 });

//                 requestAnimationFrame(animate);
//             }

//             animate();
//         });