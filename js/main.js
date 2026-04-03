// Initialize Lenis.js for kinetic smooth scrolling
let lenis;

const initLenis = () => {
    if (typeof Lenis === 'undefined') {
        setTimeout(initLenis, 100);
        return;
    }

    lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smoothWheel: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
};

// Initialize everything on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    initLenis();

    // Anchor links smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#' || !lenis) return;
            lenis.scrollTo(targetId);
        });
    });
});
