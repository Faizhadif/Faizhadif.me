document.addEventListener('DOMContentLoaded', () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;

    let lenis = null;
    let lenisRafId = null;

    if (!prefersReducedMotion && !isCoarsePointer && typeof window.Lenis === 'function') {
        lenis = new window.Lenis({
            lerp: 0.085,
            wheelMultiplier: 0.95,
            smoothWheel: true,
            smoothTouch: false,
        });

        window.lenis = lenis;

        const raf = (time) => {
            lenis.raf(time);
            lenisRafId = requestAnimationFrame(raf);
        };

        lenisRafId = requestAnimationFrame(raf);

        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                lenis.stop();
                return;
            }
            lenis.start();
        });

        document.addEventListener('modal:open', () => {
            lenis.stop();
        });

        document.addEventListener('modal:close', () => {
            lenis.start();
        });

        window.addEventListener('beforeunload', () => {
            if (lenisRafId) cancelAnimationFrame(lenisRafId);
            lenis.destroy();
        });
    }

    const revealTargets = Array.from(document.querySelectorAll([
        '#services .group',
        '#about h2',
        '#about .grid > div',
        '#works .group',
        '#education article',
        '#certificates article',
        '#faq details'
    ].join(',')));

    if (!prefersReducedMotion && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, io) => {
            for (const entry of entries) {
                if (!entry.isIntersecting) continue;
                entry.target.classList.add('reveal-in');
                io.unobserve(entry.target);
            }
        }, {
            root: null,
            threshold: 0.12,
            rootMargin: '0px 0px -10% 0px'
        });

        revealTargets.forEach((el) => {
            el.classList.add('reveal-init');
            observer.observe(el);
        });
    }

    // Keep interaction lightweight: only cards/buttons with explicit transform classes get composited.
    const interactiveTargets = document.querySelectorAll('.group, [data-modal-open], [data-modal-close], button, a');
    interactiveTargets.forEach((el) => {
        if (!el.className || !String(el.className).includes('transform')) return;
        el.style.willChange = 'transform';
    });
});
