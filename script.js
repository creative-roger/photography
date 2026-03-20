// Init Feather Icons
feather.replace();

// Custom Cursor
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');

if (cursor && follower) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        setTimeout(() => {
            follower.style.left = e.clientX - 16 + 'px';
            follower.style.top = e.clientY - 16 + 'px';
        }, 50);
    });

    document.querySelectorAll('a, button, .portfolio-item, .filter-pill').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(4)';
            cursor.style.opacity = '0.5';
            follower.style.opacity = '0';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.opacity = '1';
            follower.style.opacity = '0.3';
        });
    });
}

// Loading Screen
window.addEventListener('load', () => {
    setTimeout(() => {
        const loader = document.getElementById('loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => loader.style.display = 'none', 1000);
        }
    }, 2500);
});

// Scroll Reveal
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (nav) {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }
});

// Portfolio Filtering
const filterPills = document.querySelectorAll('.filter-pill');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
        const filter = pill.getAttribute('data-filter');
        
        filterPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');

        portfolioItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
                setTimeout(() => item.style.opacity = '1', 10);
            } else {
                item.style.opacity = '0';
                setTimeout(() => item.style.display = 'none', 500);
            }
        });
    });
});

// Lightbox Logic
const lightbox = document.getElementById('lightbox');
if (lightbox) {
    const lightboxImg = lightbox.querySelector('.lightbox-img');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const nextBtn = document.getElementById('next-btn');
    const prevBtn = document.getElementById('prev-btn');
    let currentIdx = 0;
    let images = [];

    portfolioItems.forEach((item, index) => {
        const img = item.querySelector('img');
        if (img) {
            images.push(img.src);
            
            item.addEventListener('click', () => {
                currentIdx = index;
                showLightbox(images[currentIdx]);
            });
        }
    });

    function showLightbox(src) {
        if (lightboxImg) {
            lightboxImg.src = src;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentIdx = (currentIdx + 1) % images.length;
            lightboxImg.src = images[currentIdx];
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentIdx = (currentIdx - 1 + images.length) % images.length;
            lightboxImg.src = images[currentIdx];
        });
    }

    // Close lightbox on background click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}
