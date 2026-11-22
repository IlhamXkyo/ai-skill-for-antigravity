/**
 * AI SKILL FOR ANTIGRAVITY — WEIGHTED EDITORIAL SCROLL CHOREOGRAPHY
 * Curtain Clip-Path Unmasking · Weighted Lerp Parallax · Digital Chiaroscuro Sheen
 */

(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------------------------------
   * 1. SUBTLE CHIAROSCURO HARMONIC CANVAS (HERO ATMOSPHERE)
   * ------------------------------------------------------------------------ */
  const canvas = document.getElementById('hero-canvas');
  if (canvas && !prefersReducedMotion) {
    const ctx = canvas.getContext('2d');
    let width = 0;
    let height = 0;
    let pointerX = 0.5;
    let pointerY = 0.45;
    let targetX = 0.5;
    let targetY = 0.45;

    function resizeCanvas() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth || window.innerWidth;
      height = canvas.clientHeight || window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    window.addEventListener('resize', resizeCanvas, { passive: true });
    window.addEventListener(
      'pointermove',
      function (e) {
        targetX = e.clientX / Math.max(window.innerWidth, 1);
        targetY = e.clientY / Math.max(window.innerHeight, 1);
      },
      { passive: true }
    );

    resizeCanvas();

    function renderAtmosphere(time) {
      const t = time * 0.00028;
      pointerX += (targetX - pointerX) * 0.035;
      pointerY += (targetY - pointerY) * 0.035;

      ctx.clearRect(0, 0, width, height);

      const lines = 9;
      for (let i = 0; i < lines; i++) {
        const ratio = i / (lines - 1);
        const baseY = height * (0.18 + ratio * 0.68);
        ctx.beginPath();

        for (let x = 0; x <= width; x += 28) {
          const nx = x / Math.max(width, 1);
          const wave1 = Math.sin(nx * 3.4 + t + i * 0.45) * 18;
          const wave2 = Math.cos(nx * 5.6 - t * 1.1 + i * 0.22) * 9;
          const pull = Math.exp(-Math.pow(nx - pointerX, 2) * 7) * (pointerY - 0.5) * 52;
          const y = baseY + wave1 + wave2 + pull;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        const alpha = 0.02 + (1 - Math.abs(ratio - 0.5) * 1.5) * 0.038;
        ctx.strokeStyle = i % 3 === 0
          ? `rgba(214, 176, 114, ${Math.max(0.018, alpha)})`
          : `rgba(242, 239, 233, ${Math.max(0.012, alpha * 0.55)})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      window.requestAnimationFrame(renderAtmosphere);
    }

    window.requestAnimationFrame(renderAtmosphere);
  }

  /* ------------------------------------------------------------------------
   * 2. WEIGHTED SCROLL CHOREOGRAPHY, MARGIN RULER & TIMELINE BEAM
   * ------------------------------------------------------------------------ */
  const progressBar = document.getElementById('scroll-progress-bar');
  const rulerTicks = Array.from(document.querySelectorAll('.ruler-tick[data-scroll-to]'));
  const depthPlates = Array.from(document.querySelectorAll('[data-depth]'));
  const workflowTimeline = document.getElementById('workflow-timeline');
  const timelineBeam = document.getElementById('timeline-beam');
  const principleItems = Array.from(document.querySelectorAll('.principle-item'));

  // Smooth weighted lerp offsets for asymmetric gallery plates (desktop only)
  const plateStates = depthPlates.map(function (el) {
    return {
      el: el,
      depth: parseFloat(el.getAttribute('data-depth') || '0'),
      currentY: 0,
      targetY: 0,
    };
  });

  rulerTicks.forEach(function (tick) {
    tick.addEventListener('click', function () {
      const sel = tick.getAttribute('data-scroll-to');
      const target = sel ? document.querySelector(sel) : null;
      if (target) {
        target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
      }
    });
  });

  function computeScrollTargets() {
    const scrollY = window.scrollY || window.pageYOffset;
    const docHeight = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
    const progress = Math.min(Math.max(scrollY / docHeight, 0), 1);

    if (progressBar) {
      progressBar.style.transform = `scaleX(${progress.toFixed(4)})`;
    }

    // Quiet margin ruler active state
    const triggerY = window.innerHeight * 0.44;
    let activeTick = rulerTicks[0];
    for (let i = 0; i < rulerTicks.length; i++) {
      const sel = rulerTicks[i].getAttribute('data-scroll-to');
      const sec = sel ? document.querySelector(sel) : null;
      if (sec && sec.getBoundingClientRect().top <= triggerY) {
        activeTick = rulerTicks[i];
      }
    }
    if (activeTick) {
      for (let i = 0; i < rulerTicks.length; i++) {
        rulerTicks[i].classList.toggle('is-active', rulerTicks[i] === activeTick);
      }
    }

    // Weighted parallax targets on desktop viewports
    const isDesktop = window.innerWidth >= 1025 && !prefersReducedMotion;
    const vh = Math.max(window.innerHeight, 1);
    const center = vh * 0.5;
    for (let i = 0; i < plateStates.length; i++) {
      const st = plateStates[i];
      if (!isDesktop) {
        st.targetY = 0;
        continue;
      }
      const r = st.el.getBoundingClientRect();
      if (r.bottom > -120 && r.top < vh + 120) {
        const delta = (r.top + r.height * 0.5) - center;
        st.targetY = Math.max(-22, Math.min(22, delta * st.depth));
      }
    }

    // Quiet vertical hairline beam in How It Works section
    if (workflowTimeline && timelineBeam) {
      const rect = workflowTimeline.getBoundingClientRect();
      const rawRatio = (window.innerHeight * 0.56 - rect.top) / Math.max(rect.height, 1);
      const beamScale = Math.min(Math.max(rawRatio, 0.08), 1);
      timelineBeam.style.transform = `scaleY(${beamScale.toFixed(4)})`;

      let activeIdx = 0;
      for (let i = 0; i < principleItems.length; i++) {
        if (principleItems[i].getBoundingClientRect().top <= window.innerHeight * 0.58) {
          activeIdx = i;
        }
      }
      for (let i = 0; i < principleItems.length; i++) {
        principleItems[i].classList.toggle('is-active', i === activeIdx);
      }
    }
  }

  function animateWeightedMotion() {
    for (let i = 0; i < plateStates.length; i++) {
      const st = plateStates[i];
      const diff = st.targetY - st.currentY;
      if (Math.abs(diff) > 0.05) {
        st.currentY += diff * 0.09; // Silk-weighted inertia damping
        st.el.style.transform = `translate3d(0, ${st.currentY.toFixed(2)}px, 0)`;
      } else if (st.targetY === 0 && st.currentY !== 0) {
        st.currentY = 0;
        st.el.style.transform = '';
      }
    }
    window.requestAnimationFrame(animateWeightedMotion);
  }

  window.addEventListener('scroll', computeScrollTargets, { passive: true });
  window.addEventListener('resize', computeScrollTargets, { passive: true });
  computeScrollTargets();
  if (!prefersReducedMotion) {
    window.requestAnimationFrame(animateWeightedMotion);
  }

  /* ------------------------------------------------------------------------
   * 3. CURTAIN CLIP-PATH UNMASK REVEALS & CHIAROSCURO HOVER SHEEN
   * ------------------------------------------------------------------------ */
  const plateViewports = Array.from(document.querySelectorAll('.plate-viewport'));
  const revealNodes = Array.from(document.querySelectorAll('.reveal-up'));

  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    const curtainObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-unmasked');
            curtainObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    );
    plateViewports.forEach(function (vp) {
      curtainObserver.observe(vp);
    });

    const textObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            textObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -24px 0px' }
    );
    revealNodes.forEach(function (node) {
      textObserver.observe(node);
    });
  } else {
    plateViewports.forEach(function (vp) {
      vp.classList.add('is-unmasked');
    });
    revealNodes.forEach(function (node) {
      node.classList.add('is-visible');
    });
  }

  // Subtle studio chiaroscuro sheen following cursor across unframed plates
  plateViewports.forEach(function (vp) {
    vp.addEventListener(
      'pointermove',
      function (e) {
        if (prefersReducedMotion) return;
        const r = vp.getBoundingClientRect();
        vp.style.setProperty('--spot-x', `${(e.clientX - r.left).toFixed(0)}px`);
        vp.style.setProperty('--spot-y', `${(e.clientY - r.top).toFixed(0)}px`);
      },
      { passive: true }
    );
  });

  /* ------------------------------------------------------------------------
   * 4. FULL-RESOLUTION LIGHTBOX
   * ------------------------------------------------------------------------ */
  const lightbox = document.getElementById('proof-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxCloseBtn = document.getElementById('lightbox-close-btn');
  const lightboxTriggers = document.querySelectorAll('[data-lightbox-src]');

  function openLightbox(src, caption) {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    if (lightboxCaption) {
      lightboxCaption.textContent = caption || 'AI Skill for Antigravity';
    }
    lightbox.classList.add('is-open');
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('is-open');
  }

  lightboxTriggers.forEach(function (btn) {
    btn.addEventListener('click', function () {
      openLightbox(
        btn.getAttribute('data-lightbox-src'),
        btn.getAttribute('data-lightbox-caption')
      );
    });
  });

  if (lightboxCloseBtn) {
    lightboxCloseBtn.addEventListener('click', closeLightbox);
  }
  if (lightbox) {
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });
  }
  window.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeLightbox();
  });

  /* ------------------------------------------------------------------------
   * 5. DIRECT WHATSAPP ORDER CONCIERGE (085217124804)
   * ------------------------------------------------------------------------ */
  const conciergeForm = document.getElementById('wa-concierge-form');
  const packageSelect = document.getElementById('package-select');
  const buyerNote = document.getElementById('buyer-note');
  const conciergeFeedback = document.getElementById('concierge-feedback');
  const conciergeSubmitBtn = document.getElementById('concierge-submit-btn');

  function updatePreviewMessage() {
    if (!packageSelect || !conciergeFeedback) return;
    const pkg = packageSelect.value;
    const note = buyerNote ? buyerNote.value.trim() : '';

    if (note.length > 180) {
      buyerNote.setAttribute('aria-invalid', 'true');
      conciergeFeedback.className = 'field-feedback is-error';
      conciergeFeedback.textContent = 'Catatan terlalu panjang (maksimal 180 karakter).';
      return;
    }

    if (buyerNote) {
      buyerNote.removeAttribute('aria-invalid');
    }

    conciergeFeedback.className = note ? 'field-feedback' : 'field-feedback is-empty';
    conciergeFeedback.textContent = note
      ? `Pesan WhatsApp: "kak mau pesan paket yang ini: ${pkg} — ${note}"`
      : `Pesan WhatsApp: "kak mau pesan paket yang ini: ${pkg}"`;
  }

  if (packageSelect) packageSelect.addEventListener('change', updatePreviewMessage);
  if (buyerNote) buyerNote.addEventListener('input', updatePreviewMessage);
  updatePreviewMessage();

  if (conciergeForm) {
    conciergeForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const pkg = packageSelect ? packageSelect.value : 'AI Skill for Antigravity (Rp 50.000)';
      const note = buyerNote ? buyerNote.value.trim() : '';
      if (note.length > 180) return;

      if (conciergeSubmitBtn) {
        conciergeSubmitBtn.classList.add('is-loading');
        conciergeSubmitBtn.setAttribute('disabled', 'disabled');
      }

      const rawText = note
        ? `kak mau pesan paket yang ini: ${pkg} — ${note}`
        : `kak mau pesan paket yang ini: ${pkg}`;
      const waUrl = `https://wa.me/6285217124804?text=${encodeURIComponent(rawText)}`;

      window.open(waUrl, '_blank', 'noopener,noreferrer');

      window.setTimeout(function () {
        if (conciergeSubmitBtn) {
          conciergeSubmitBtn.classList.remove('is-loading');
          conciergeSubmitBtn.removeAttribute('disabled');
        }
      }, 600);
    });
  }
})();
