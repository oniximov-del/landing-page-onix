document.addEventListener('DOMContentLoaded', () => {
    // --- Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on load

    // --- Mobile Menu Toggle ---
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');
    
    const toggleMenu = () => {
        navLinks.classList.toggle('active');
        const isActive = navLinks.classList.contains('active');
        mobileMenuBtn.innerHTML = isActive ? '<i class="ph ph-x"></i>' : '<i class="ph ph-list"></i>';
        
        if(isActive) {
            document.body.style.overflow = 'hidden';
            navbar.classList.add('scrolled'); // ensure dark text for mobile menu
        } else {
            document.body.style.overflow = '';
            if(window.scrollY <= 50) {
                navbar.classList.remove('scrolled');
            }
        }
    };

    mobileMenuBtn.addEventListener('click', toggleMenu);

    // Close menu when clicking a link
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // --- Scroll Animations (Intersection Observer) ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Animate only once
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-up, .fade-in-left, .fade-in-right');
    animatedElements.forEach(el => observer.observe(el));
});

// --- Lightbox Functionality ---
function openLightbox(imageSrc) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    
    lightbox.style.display = 'flex';
    lightboxImg.src = imageSrc;
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'none';
    document.body.style.overflow = ''; // Restore scrolling
}

// Close lightbox on outside click or ESC key
window.addEventListener('click', (e) => {
    const lightbox = document.getElementById('lightbox');
    if (e.target === lightbox) {
        closeLightbox();
    }
});

window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeLightbox();
    }
});
