/**
 * 유태형 3.0
 * 
 * 최근 수정: 2026-01-03
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

    /**
     * Lenis 스무스 스크롤 초기화
     */
    function initLenis() {
        if (typeof Lenis === 'undefined') {
            console.warn('[Lenis] 라이브러리 로딩 대기 중...');
            setTimeout(initLenis, 100);
            return;
        }

        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            smoothWheel: true
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);
        window.lenis = lenis;
        console.log('[Lenis] 스무스 스크롤 초기화 완료');
    }

    // Initialize
    document.addEventListener('DOMContentLoaded', () => {
        new ScrollReveal();
        initLenis();

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
