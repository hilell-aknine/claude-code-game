// flipbook.js — scroll-bound canvas image-sequence background (pure Vanilla JS)
// Renders frame_001..frame_150.webp from assets/frames/ as a fixed background
// behind the landing page. Drawing is decoupled from the scroll event via a
// single requestAnimationFrame loop. Activates only while the landing is visible.
(function () {
    'use strict';

    const FRAME_COUNT = 150;
    const FRAME_PATH = i => `assets/frames/frame_${String(i).padStart(3, '0')}.webp`;
    const DPR = Math.min(window.devicePixelRatio || 1, 2); // cap to avoid huge canvases on 3x phones

    const canvas = document.getElementById('flipbook-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const frames = new Array(FRAME_COUNT).fill(null); // index 0 = frame_001
    let loadedCount = 0;
    let currentIndex = -1;        // last frame actually drawn
    let latestScrollPercent = 0;  // updated by scroll listener only
    let needsDraw = true;         // set by scroll/resize, consumed by rAF loop
    let rafId = null;
    let active = false;

    // ── Cover-fit math: scale image to fill viewport, center-crop (object-fit: cover) ──
    function drawCover(img) {
        const cw = canvas.width, ch = canvas.height;
        const iw = img.naturalWidth, ih = img.naturalHeight;
        if (!iw || !ih) return;
        const scale = Math.max(cw / iw, ch / ih);
        const dw = iw * scale, dh = ih * scale;
        const dx = (cw - dw) / 2, dy = (ch - dh) / 2;
        ctx.clearRect(0, 0, cw, ch);
        ctx.drawImage(img, dx, dy, dw, dh);
    }

    function resize() {
        canvas.width = Math.floor(window.innerWidth * DPR);
        canvas.height = Math.floor(window.innerHeight * DPR);
        needsDraw = true; // re-paint current frame at new size
    }

    function scrollPercent() {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        if (max <= 0) return 0;
        const p = window.scrollY / max;
        return p < 0 ? 0 : (p > 1 ? 1 : p);
    }

    // ── The single rAF loop: the ONLY place that calls drawImage ──
    function tick() {
        if (!active) { rafId = null; return; }
        if (needsDraw) {
            needsDraw = false;
            const target = Math.min(
                FRAME_COUNT - 1,
                Math.round(latestScrollPercent * (FRAME_COUNT - 1))
            );
            // Use the target frame if loaded; otherwise fall back to the nearest
            // already-loaded earlier frame so the background never flickers blank.
            let idx = target;
            while (idx > 0 && !frames[idx]) idx--;
            const img = frames[idx];
            if (img && idx !== currentIndex) {
                drawCover(img);
                currentIndex = idx;
            } else if (img && idx === currentIndex && canvas.width) {
                // size changed (resize) — redraw same frame to refit
                drawCover(img);
            }
        }
        rafId = requestAnimationFrame(tick);
    }

    function onScroll() {
        latestScrollPercent = scrollPercent();
        needsDraw = true;
    }

    // ── Smart loading: frame 1 immediately, 2..150 after window load ──
    function loadFirstFrame() {
        const img = new Image();
        img.decoding = 'async';
        img.onload = () => {
            frames[0] = img;
            loadedCount = 1;
            needsDraw = true; // paint as soon as it decodes
        };
        img.onerror = () => { /* graceful: no frames yet → dark theme shows through */ };
        img.src = FRAME_PATH(1);
    }

    function lazyLoadRest() {
        for (let i = 2; i <= FRAME_COUNT; i++) {
            const img = new Image();
            img.decoding = 'async';
            const slot = i - 1;
            img.onload = () => { frames[slot] = img; loadedCount++; needsDraw = true; };
            img.onerror = () => { /* skip missing frame */ };
            img.src = FRAME_PATH(i);
        }
    }

    // ── Activation (landing-only) ──
    function enable() {
        if (active) return;
        active = true;
        document.body.classList.add('flipbook-on');
        resize();
        latestScrollPercent = scrollPercent();
        needsDraw = true;
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', resize, { passive: true });
        if (!rafId) rafId = requestAnimationFrame(tick);
    }

    function disable() {
        if (!active) return;
        active = false;
        document.body.classList.remove('flipbook-on');
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', resize);
        if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
    }

    window.Flipbook = { enable, disable };

    // Kick off image loading right away (frame 1 only)
    loadFirstFrame();
    if (document.readyState === 'complete') {
        lazyLoadRest();
    } else {
        window.addEventListener('load', lazyLoadRest, { once: true });
    }

    // ── Self-activation: on while the landing page is visible, off otherwise.
    // Zero edits to game.js — we observe #landing-page's display style. ──
    const landing = document.getElementById('landing-page');
    function syncToLanding() {
        if (!landing) return;
        const visible = getComputedStyle(landing).display !== 'none';
        if (visible) enable(); else disable();
    }
    if (landing) {
        const mo = new MutationObserver(syncToLanding);
        mo.observe(landing, { attributes: true, attributeFilter: ['style', 'class'] });
        // Initial sync once DOM is ready
        if (document.readyState !== 'loading') syncToLanding();
        else document.addEventListener('DOMContentLoaded', syncToLanding, { once: true });
    }
})();
