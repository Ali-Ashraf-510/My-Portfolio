document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const themeSwitcher = document.getElementById('theme-switcher');
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    // Mobile menu functionality
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => navLinks.classList.remove('active'));
    });

    // Dark/Light mode switcher
    themeSwitcher.addEventListener('click', () => {
        const currentTheme = document.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme); // Save user's preference
    });
    
    // Apply saved theme on page load
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-theme', savedTheme);
    
    // Active nav link on scroll
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

    // Contact form handling with Formspree
    async function handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        fetch(event.target.action, {
            method: contactForm.method,
            body: data,
            headers: { 'Accept': 'application/json' }
        }).then(response => {
            if (response.ok) {
                formStatus.textContent = "شكراً لك، تم إرسال رسالتك بنجاح!";
                formStatus.style.color = 'green';
                contactForm.reset();
            } else {
                response.json().then(data => {
                    if (Object.hasOwn(data, 'errors')) {
                        formStatus.textContent = data["errors"].map(error => error["message"]).join(", ");
                    } else {
                        formStatus.textContent = "عفواً، حدث خطأ ما. حاول مرة أخرى.";
                    }
                    formStatus.style.color = 'red';
                })
            }
        }).catch(error => {
            formStatus.textContent = "عفواً، حدث خطأ ما. حاول مرة أخرى.";
            formStatus.style.color = 'red';
        });
    }
    contactForm.addEventListener("submit", handleSubmit);
});
