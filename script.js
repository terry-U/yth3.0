/**
 * 유태형 3.0
 * 
 * 최근 수정: 2026-01-04
 * - Lenis 스무스 스크롤 제거 (성능 개선)
 */

(function() {
    'use strict';

    /**
     * Scroll Reveal Animation
     */
    class ScrollReveal {
        constructor() {
            this.sections = document.querySelectorAll('.section');
            this.init();
        }

        init() {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('visible');
                        }
                    });
                },
                { threshold: 0.1, rootMargin: '-30px' }
            );

            this.sections.forEach(section => {
                section.classList.add('reveal');
                observer.observe(section);
            });
        }
    }

    // Initialize
    document.addEventListener('DOMContentLoaded', () => {
        new ScrollReveal();

        console.log('%c유태형 3.0', 'font-size: 24px; font-weight: 900; color: #fff;');
        console.log('%c인류를 더 지혜롭게', 'font-size: 12px; color: #888;');
    });

    // Reveal Animation CSS (동적 주입)
    const style = document.createElement('style');
    style.textContent = `
        .section.reveal {
            opacity: 0;
            transform: translateY(24px);
            transition: opacity 0.5s ease-out, transform 0.5s ease-out;
        }
        .section.reveal.visible {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);

})();
