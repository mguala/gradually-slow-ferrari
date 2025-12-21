// Image data with metadata
const imageData = [
    // PNG images (original portfolio images)
    { filename: 'img (1).png', title: 'Commercial Architecture', category: 'Urban Development', device: 'PNG' },
    { filename: 'img (2).png', title: 'Urban Landscape', category: 'City Perspectives', device: 'PNG' },
    { filename: 'img (3).png', title: 'Interior Spaces', category: 'Modern Design', device: 'PNG' },
    { filename: 'img (4).png', title: 'Street Life', category: 'Urban Stories', device: 'PNG' },
    { filename: 'img (5).png', title: 'Urban Patterns', category: 'Abstract Views', device: 'PNG' },
    { filename: 'img (6).png', title: 'City Lights', category: 'Nocturnal Urban', device: 'PNG' },
    { filename: 'img (7).png', title: 'Modern Structures', category: 'Contemporary Design', device: 'PNG' },
    { filename: 'img (8).png', title: 'Urban Flow', category: 'City Movement', device: 'PNG' },
    { filename: 'img (9).png', title: 'Geometric City', category: 'Architectural Patterns', device: 'PNG' },
    { filename: 'img (10).png', title: 'Construction Progress', category: 'Urban Development', device: 'PNG' },
    { filename: 'img (11).png', title: 'Modern Interiors', category: 'Commercial Spaces', device: 'PNG' },
    
    // Camera images
    { filename: 'Canon EOS REBEL T1i052.JPG', title: 'Architectural Perspective', category: 'Canon EOS', device: 'Canon EOS REBEL T1i' },
    
    // Phone images
    { filename: 'Motorola104.JPG', title: 'Quick Capture', category: 'Mobile Photography', device: 'Motorola' },
    { filename: 'Motorola314.JPG', title: 'Urban Details', category: 'Mobile Photography', device: 'Motorola' },
    { filename: 'Nokia Lumia 505896.JPG', title: 'City Snapshot', category: 'Mobile Photography', device: 'Nokia Lumia' },
    { filename: 'Nokia295.JPG', title: 'Structural Lines', category: 'Mobile Photography', device: 'Nokia' },
    { filename: 'Nokia297.JPG', title: 'Urban Texture', category: 'Mobile Photography', device: 'Nokia' },
    { filename: 'Nokia299.JPG', title: 'Architectural Detail', category: 'Mobile Photography', device: 'Nokia' },
    { filename: 'Nokia300.JPG', title: 'City Vibes', category: 'Mobile Photography', device: 'Nokia' },
    { filename: 'Nokia301.JPG', title: 'Urban Landscape', category: 'Mobile Photography', device: 'Nokia' },
    { filename: 'Nokia302.JPG', title: 'Street View', category: 'Mobile Photography', device: 'Nokia' },
    { filename: 'Nokia303.JPG', title: 'Perspective', category: 'Mobile Photography', device: 'Nokia' },
    { filename: 'T310724.JPG', title: 'Moment Captured', category: 'Mobile Photography', device: 'Mobile Device' }
];

// Categorize images for grid layout
const categoryMap = {
    'Urban Development': 'architecture',
    'City Perspectives': 'landscape',
    'Modern Design': 'interior',
    'Urban Stories': 'street',
    'Abstract Views': 'abstract',
    'Nocturnal Urban': 'night',
    'Contemporary Design': 'architecture',
    'City Movement': 'urban',
    'Architectural Patterns': 'architecture',
    'Canon EOS': 'architecture',
    'Mobile Photography': 'urban'
};

// Load images dynamically
const loadImages = () => {
    const container = document.getElementById('gridContainer');
    if (!container) return;

    container.innerHTML = '';

    imageData.forEach((img, index) => {
        const category = categoryMap[img.category] || 'urban';
        const article = document.createElement('article');
        article.className = `grid-item ${category}`;
        article.style.setProperty('--item-index', index);

        article.innerHTML = `
            <img 
                class="grid-image" 
                loading="lazy" 
                decoding="async" 
                src="assets/media/pics/${img.filename}" 
                alt="${img.title}"
                data-title="${img.title}"
                data-category="${img.category}"
                data-device="${img.device}"
            >
            <div class="overlay">
                <h3>${img.title}</h3>
                <p>${img.category}</p>
                <span class="device-info">${img.device}</span>
            </div>
        `;

        container.appendChild(article);
    });

    setupImageLoadingStates();
};

// Setup image loading states and lazy loading
const setupImageLoadingStates = () => {
    const images = document.querySelectorAll('.grid-image');

    // Use Intersection Observer for native lazy loading enhancement
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src && !img.src) {
                    img.src = img.dataset.src;
                }
                imageObserver.unobserve(img);
            }
        });
    }, { rootMargin: '50px' });

    images.forEach(img => {
        // Set up load event
        img.addEventListener('load', () => {
            img.classList.add('loaded');
        });

        // Set up error handling
        img.addEventListener('error', () => {
            img.classList.add('error');
            console.warn(`Failed to load image: ${img.src}`);
        });

        // Observe for lazy loading enhancement
        imageObserver.observe(img);
    });
};

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    loadImages();

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe section titles, service items
    document.querySelectorAll('.section-title, .service-item').forEach(el => {
        observer.observe(el);
    });

    // Observe grid items when they're added
    const observeGridItems = () => {
        document.querySelectorAll('.grid-item').forEach(el => {
            observer.observe(el);
        });
    };
    
    // Observe grid items after they're loaded
    setTimeout(observeGridItems, 100);
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});
