document.addEventListener("DOMContentLoaded", () => {

    // 1. Navbar Sticky & Scrolled Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');

    mobileBtn.addEventListener('click', () => {
        mobileBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Cerrar menú al hacer clic en un enlace (en móvil)
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            mobileBtn.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // 3. Smooth Scrolling
    // Se delega el smooth scrolling primariamente en CSS, pero se asegura en JS para navegadores cruzados
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return; // Enlaces vacíos de ejemplo

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Offset calculation (restamos la altura del navbar)
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

    // 4. Fade-in on Scroll (Intersection Observer)
    const fadeElements = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    fadeElements.forEach(el => {
        appearOnScroll.observe(el);
    });

    // 5. FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Cerrar todos excepto el actual
            faqItems.forEach(faq => {
                if (faq !== item) {
                    faq.classList.remove('active');
                }
            });
            // Alternar el actual
            item.classList.toggle('active');
        });
    });

    // 6. Form Submission (Frontend Validation)
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Obtener valores
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const type = document.getElementById('project-type').value;
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !type || !message) {
                formStatus.textContent = "Por favor completa todos los campos requeridos.";
                formStatus.className = "form-status status-error";
                return;
            }

            // Enviar datos al servidor

            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            btn.textContent = "Enviando...";
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
                    formStatus.textContent = "¡Mensaje enviado y guardado en la BD con éxito! Te responderé pronto.";
                    formStatus.className = "form-status status-success";
                    contactForm.reset();
                })
                .catch(error => {
                    console.error("Error al enviar el formulario:", error);
                    formStatus.textContent = "Hubo un problema al conectar con el servidor. Inténtalo de nuevo.";
                    formStatus.className = "form-status status-error";
                })
                .finally(() => {
                    btn.textContent = originalText;
                    btn.disabled = false;

                    // Limpiar mensaje después de 5 segundos
                    setTimeout(() => {
                        formStatus.textContent = "";
                        formStatus.className = "form-status";
                    }, 5000);
                });
        });
    }

    // 7. Año actual en el footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    // 8. Cargar proyectos de GitHub
    const GITHUB_USERNAME = 'karen11m';
    const projectsGrid = document.getElementById('github-projects');

    async function loadGitHubProjects() {
        try {
            const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`);
            const repos = await response.json();

            if (!Array.isArray(repos)) {
                projectsGrid.innerHTML = '<p>Error al conectar con GitHub.</p>';
                return;
            }

            projectsGrid.innerHTML = ''; // Limpiar mensaje de carga

            repos.forEach(repo => {
                // Mostrar todos los repos públicos (sin filtro de lenguaje)
                const card = document.createElement('div');
                card.className = 'project-card fade-in';
                const lang = repo.language || 'Código';
                const desc = repo.description || 'Proyecto de desarrollo';

                card.innerHTML = `
                    <div class="project-content">
                        <span class="project-tag">${lang}</span>
                        <h3>${repo.name}</h3>
                        <p>${desc}</p>
                        <button class="btn btn-outline" onclick="openModal('${repo.name}', '${desc.replace(/'/g, "\\'")}', '${repo.html_url}')">Ver detalles</button>
                    </div>
                `;
                projectsGrid.appendChild(card);
            });

            if (projectsGrid.innerHTML === '') {
                projectsGrid.innerHTML = '<p>No se encontraron proyectos.</p>';
            }
        } catch (error) {
            console.error('Error cargando proyectos de GitHub:', error);
            projectsGrid.innerHTML = '<p>Error al cargar proyectos. Intenta más tarde.</p>';
        }
    }

    // Cargar proyectos si existe el elemento
    if (projectsGrid) {
        loadGitHubProjects();
    }
});

// 9. Modal de proyectos
function openModal(title, description, link) {
    const modal = document.getElementById('project-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-description');
    const modalLink = document.getElementById('modal-link');

    modalTitle.textContent = title;
    modalDesc.textContent = description || 'Proyecto de ' + GITHUB_USERNAME;
    modalLink.href = link;

    modal.style.display = 'block';
}

// Cerrar modal
document.querySelector('.close-modal')?.addEventListener('click', () => {
    document.getElementById('project-modal').style.display = 'none';
});

window.addEventListener('click', (e) => {
    const modal = document.getElementById('project-modal');
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});
