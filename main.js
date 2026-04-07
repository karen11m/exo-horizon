document.addEventListener("DOMContentLoaded", () => {

    // =========================================
    // 2. Particles System (Optimized)
    // =========================================
    const canvas = document.getElementById('particles-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d', { alpha: true });
        let particles = [];
        let animationId;
        let isVisible = true;
        
        const isMobile = window.innerWidth < 768;
        const isLowPerf = isMobile || navigator.hardwareConcurrency <= 4;
        const maxParticles = isLowPerf ? 20 : 40;
        const connectionDistance = isMobile ? 80 : 120;

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            if (isMobile) {
                particles.length = Math.min(particles.length, 15);
            }
        }
        resizeCanvas();

        class Particle {
            constructor() {
                this.reset();
            }
            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 1.5 + 0.5;
                this.speedX = (Math.random() - 0.5) * 0.3;
                this.speedY = (Math.random() - 0.5) * 0.3;
                this.opacity = Math.random() * 0.4 + 0.1;
                this.hue = Math.random() > 0.5 ? 185 : 260;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
                    this.reset();
                }
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${this.hue}, 100%, 70%, ${this.opacity})`;
                ctx.fill();
            }
        }

        for (let i = 0; i < maxParticles; i++) {
            particles.push(new Particle());
        }

        let frameCount = 0;
        function drawConnections() {
            if (isLowPerf && frameCount % 2 !== 0) return;
            
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < connectionDistance) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(0, 242, 254, ${0.05 * (1 - dist / connectionDistance)})`;
                        ctx.lineWidth = 0.4;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
        }

        function animateParticles() {
            if (!isVisible) {
                animationId = requestAnimationFrame(animateParticles);
                return;
            }
            
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            drawConnections();
            frameCount++;
            animationId = requestAnimationFrame(animateParticles);
        }
        animateParticles();

        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(resizeCanvas, 200);
        });

        document.addEventListener('visibilitychange', () => {
            isVisible = !document.hidden;
        });
    }

    // =========================================
    // 3. Typing Effect
    // =========================================
    const typingEl = document.getElementById('typing-text');
    if (typingEl) {
        const phrases = [
            'soluciones digitales',
            'apps inteligentes',
            'automatización',
            'experiencias web',
            'proyectos con IA'
        ];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 60;

        function typeEffect() {
            const currentPhrase = phrases[phraseIndex];

            if (isDeleting) {
                typingEl.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 30;
            } else {
                typingEl.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 60;
            }

            if (!isDeleting && charIndex === currentPhrase.length) {
                typingSpeed = 1500;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typingSpeed = 300;
            }

            setTimeout(typeEffect, typingSpeed);
        }
        setTimeout(typeEffect, 600);
    }

    // =========================================
    // 4. Navbar Sticky & Scrolled Effect
    // =========================================
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    let scrollTicking = false;

    function handleScroll() {
        const scrollY = window.scrollY;

        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Scroll to top button
        const scrollTopBtn = document.getElementById('scrollTopBtn');
        if (scrollTopBtn) {
            if (scrollY > 500) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        }

        lastScroll = scrollY;
        scrollTicking = false;
    }

    window.addEventListener('scroll', () => {
        if (!scrollTicking) {
            requestAnimationFrame(handleScroll);
            scrollTicking = true;
        }
    });

    // =========================================
    // 5. Active Nav Section Tracking
    // =========================================
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links a:not(.btn-contact)');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navItems.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '-80px 0px -50% 0px'
    });

    sections.forEach(section => sectionObserver.observe(section));

    // =========================================
    // 6. Mobile Menu Toggle
    // =========================================
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');

    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            const isActive = mobileBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
            mobileBtn.setAttribute('aria-expanded', isActive);
            document.body.style.overflow = isActive ? 'hidden' : '';
        });

        // Close on link click
        navLinksItems.forEach(link => {
            link.addEventListener('click', () => {
                mobileBtn.classList.remove('active');
                navLinks.classList.remove('active');
                mobileBtn.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });
    }

    // =========================================
    // 7. Smooth Scrolling
    // =========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // =========================================
    // 8. Fade-in on Scroll (Intersection Observer)
    // =========================================
    const fadeElements = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -60px 0px"
    };

    const appearOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    fadeElements.forEach(el => appearOnScroll.observe(el));

    // =========================================
    // 9. Counter Animation (Optimized)
    // =========================================
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-target'));
                const suffix = el.getAttribute('data-suffix') || '';
                const duration = 1500;
                const startTime = performance.now();

                function updateCounter(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const eased = 1 - Math.pow(1 - progress, 3);
                    const current = Math.floor(eased * target);
                    el.textContent = current + suffix;

                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        el.textContent = target + suffix;
                    }
                }
                requestAnimationFrame(updateCounter);
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => counterObserver.observe(el));

    // =========================================
    // 10. FAQ Accordion
    // =========================================
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            faqItems.forEach(faq => {
                faq.classList.remove('active');
                faq.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
            });
            if (!isActive) {
                item.classList.add('active');
                question.setAttribute('aria-expanded', 'true');
            }
        });

        // Keyboard accessibility
        question.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                question.click();
            }
        });
    });

    // =========================================
    // 11. Testimonials Carousel
    // =========================================
    const testimonials = [
        {
            text: 'Karen entendió exactamente lo que necesitábamos. Nuestro sistema de reservas aumentó las reservas online un 40% en el primer mes. Muy profesional y siempre disponible.',
            name: 'Carlos Ramírez',
            role: 'Dueño de Restaurante — Bogotá',
            avatar: 'CR'
        },
        {
            text: 'El chatbot que desarrolló para nuestra tienda redujo los mensajes repetitivos en un 70%. Ahora podemos enfocarnos en vender en lugar de responder las mismas preguntas.',
            name: 'Laura Gómez',
            role: 'E-commerce de Moda — Medellín',
            avatar: 'LG'
        },
        {
            text: 'Gracias al dashboard automatizado ya no paso horas uniendo hojas de cálculo. Karen lo hizo en tiempo récord y siempre estuvo pendiente de cada detalle.',
            name: 'Andrés Peña',
            role: 'Emprendedor Digital — Cali',
            avatar: 'AP'
        }
    ];

    let currentTestimonial = 0;
    const testimonialText = document.getElementById('testimonial-text');
    const testimonialName = document.getElementById('testimonial-name');
    const testimonialRole = document.getElementById('testimonial-role');
    const testimonialAvatar = document.getElementById('testimonial-avatar');
    const testimonialDots = document.querySelectorAll('.testimonial-dots button');

    function showTestimonial(index) {
        if (!testimonialText) return;
        const card = document.getElementById('testimonial-active');

        card.style.opacity = '0';
        card.style.transform = 'translateY(8px)';

        setTimeout(() => {
            const t = testimonials[index];
            testimonialText.textContent = t.text;
            testimonialName.textContent = t.name;
            testimonialRole.textContent = t.role;
            testimonialAvatar.textContent = t.avatar;

            testimonialDots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });

            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 200);

        currentTestimonial = index;
    }

    const testimonialCard = document.getElementById('testimonial-active');
    if (testimonialCard) {
        testimonialCard.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
    }

    testimonialDots.forEach(dot => {
        dot.addEventListener('click', () => {
            showTestimonial(parseInt(dot.getAttribute('data-index')));
        });
    });

    let testimonialInterval;
    function startTestimonialRotation() {
        testimonialInterval = setInterval(() => {
            const next = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(next);
        }, 5000);
    }

    if (testimonialText) {
        startTestimonialRotation();
        const wrapper = document.querySelector('.testimonials-wrapper');
        if (wrapper) {
            wrapper.addEventListener('mouseenter', () => clearInterval(testimonialInterval));
            wrapper.addEventListener('mouseleave', startTestimonialRotation);
        }
    }

    // =========================================
    // 12. Form Validation & Submission
    // =========================================
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm) {
        const validateField = (input) => {
            const formGroup = input.closest('.form-group');
            let errorMsg = formGroup?.querySelector('.error-message');
            
            if (!formGroup) return true;
            
            let isValid = true;
            let message = '';

            if (input.required && !input.value.trim()) {
                isValid = false;
                message = 'Este campo es requerido';
            } else if (input.type === 'email' && input.value.trim()) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(input.value.trim())) {
                    isValid = false;
                    message = 'Ingresa un email válido';
                }
            }

            if (isValid && input.value.trim()) {
                input.classList.remove('error');
                input.classList.add('success');
            } else {
                input.classList.remove('success');
                if (!isValid) {
                    input.classList.add('error');
                } else {
                    input.classList.remove('error');
                }
            }

            if (errorMsg) {
                if (!isValid) {
                    errorMsg.textContent = message;
                    errorMsg.classList.add('visible');
                } else {
                    errorMsg.classList.remove('visible');
                }
            }

            return isValid;
        };

        const inputs = contactForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => validateField(input));
            input.addEventListener('input', () => {
                if (input.classList.contains('error')) {
                    validateField(input);
                }
            });
        });

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            let allValid = true;
            inputs.forEach(input => {
                if (!validateField(input)) {
                    allValid = false;
                }
            });

            if (!allValid) {
                formStatus.textContent = "Por favor completa todos los campos correctamente.";
                formStatus.className = "form-status status-error";
                const firstError = contactForm.querySelector('.error');
                if (firstError) firstError.focus();
                return;
            }

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const type = document.getElementById('project-type').value;
            const message = document.getElementById('message').value.trim();

            const btn = contactForm.querySelector('button[type="submit"]');
            const btnText = btn.querySelector('.btn-text');
            const originalText = btnText.textContent;
            
            btn.classList.add('loading');
            btn.disabled = true;

            fetch('https://exo-horizon.onrender.com/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, type, message })
            })
                .then(response => {
                    if (!response.ok) throw new Error("Error en el servidor");
                    return response.json();
                })
                .then(data => {
                    formStatus.innerHTML = '<span>¡Mensaje enviado con éxito! Te responderé pronto.</span>';
                    formStatus.className = "form-status status-success";
                    contactForm.reset();
                    inputs.forEach(input => {
                        input.classList.remove('success', 'error');
                    });
                })
                .catch(error => {
                    console.error("Error al enviar el formulario:", error);
                    formStatus.textContent = "Error de conexión. Inténtalo de nuevo o contáctame por WhatsApp.";
                    formStatus.className = "form-status status-error";
                })
                .finally(() => {
                    btn.classList.remove('loading');
                    btnText.textContent = originalText;
                    btn.disabled = false;

                    setTimeout(() => {
                        formStatus.textContent = "";
                        formStatus.className = "form-status";
                    }, 6000);
                });
        });
    }

    // =========================================
    // 13. Current Year
    // =========================================
    const yearEl = document.getElementById('currentYear');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // =========================================
    // 14. GitHub Projects
    // =========================================
    const GITHUB_USERNAME = 'karen11m';
    const projectsGrid = document.getElementById('github-projects');

    async function loadGitHubProjects() {
        try {
            const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`);
            const repos = await response.json();

            if (!Array.isArray(repos)) {
                projectsGrid.innerHTML = '<p style="color: var(--text-muted);">Error al conectar con GitHub.</p>';
                return;
            }

            projectsGrid.innerHTML = '';

            repos.forEach((repo, index) => {
                const card = document.createElement('div');
                card.className = `project-card fade-in stagger-${(index % 7) + 1}`;
                const lang = repo.language || 'Código';
                const desc = repo.description || 'Proyecto de desarrollo';

                card.innerHTML = `
                    <div class="project-content">
                        <span class="project-tag">${lang}</span>
                        <h3>${repo.name}</h3>
                        <p style="color: var(--text-muted); margin-bottom: 20px; line-height: 1.7;">${desc}</p>
                        <button class="btn btn-outline" onclick="openModal('${repo.name}', '${desc.replace(/'/g, "\\'")}', '${repo.html_url}')">Ver detalles</button>
                    </div>
                `;
                projectsGrid.appendChild(card);

                // Observe for animation
                appearOnScroll.observe(card);
            });

            if (projectsGrid.innerHTML === '') {
                projectsGrid.innerHTML = '<p style="color: var(--text-muted);">No se encontraron proyectos.</p>';
            }
        } catch (error) {
            console.error('Error cargando proyectos de GitHub:', error);
            projectsGrid.innerHTML = '<p style="color: var(--text-muted);">Error al cargar proyectos. Intenta más tarde.</p>';
        }
    }

    if (projectsGrid) {
        loadGitHubProjects();
    }

    // =========================================
    // 15. Keyboard Shortcuts
    // =========================================
    document.addEventListener('keydown', (e) => {
        // ESC closes modal
        if (e.key === 'Escape') {
            const modal = document.getElementById('project-modal');
            if (modal) modal.style.display = 'none';

            // Also close mobile menu
            if (mobileBtn && mobileBtn.classList.contains('active')) {
                mobileBtn.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });
});

// =========================================
// Modal Functions (Global scope)
// =========================================
function openModal(title, description, link) {
    const modal = document.getElementById('project-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-description');
    const modalLink = document.getElementById('modal-link');

    if (!modal) return;

    modalTitle.textContent = title;
    modalDesc.textContent = description || 'Proyecto de desarrollo';
    modalLink.href = link;

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';

    // Focus trap
    const closeBtn = modal.querySelector('.close-modal');
    if (closeBtn) closeBtn.focus();
}

function closeModal() {
    const modal = document.getElementById('project-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
}

// Close modal events
document.querySelector('.close-modal')?.addEventListener('click', closeModal);

// Close modal on keypress for accessibility
document.querySelector('.close-modal')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        closeModal();
    }
});

window.addEventListener('click', (e) => {
    const modal = document.getElementById('project-modal');
    if (e.target === modal) {
        closeModal();
    }
});
