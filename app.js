/**
 * AI SKILL FOR ANTIGRAVITY — SCROLLTELLING, SPATIAL CANVAS & WHATSAPP CONCIERGE
 * Zero-Box Architectural Flow · 60fps Compositor Choreography
 */

(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------------------------------
   * 1. FULL-BLEED SPATIAL HERO CANVAS (SUBTLE ARCHITECTURAL HARMONIC LINES)
   * ------------------------------------------------------------------------ */
  const canvas = document.getElementById('hero-canvas');
  if (canvas && !prefersReducedMotion) {
    const ctx = canvas.getContext('2d');
    let width = 0;
    let height = 0;
    let rafId = null;
    let pointerX = 0.5;
    let pointerY = 0.4;
    let targetX = 0.5;
    let targetY = 0.4;

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

    function renderSpatialField(time) {
      const t = time * 0.00035;
      pointerX += (targetX - pointerX) * 0.04;
      pointerY += (targetY - pointerY) * 0.04;

      ctx.clearRect(0, 0, width, height);

      const lineCount = 11;
      for (let i = 0; i < lineCount; i++) {
        const ratio = i / (lineCount - 1);
        const baseY = height * (0.16 + ratio * 0.72);
        ctx.beginPath();

        for (let x = 0; x <= width; x += 24) {
          const nx = x / Math.max(width, 1);
          const wave1 = Math.sin(nx * 3.8 + t + i * 0.42) * 24;
          const wave2 = Math.cos(nx * 6.2 - t * 1.3 + i * 0.25) * 12;
          const pull = Math.exp(-Math.pow(nx - pointerX, 2) * 8) * (pointerY - 0.5) * 68;
          const y = baseY + wave1 + wave2 + pull;

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        const alpha = 0.025 + (1 - Math.abs(ratio - 0.5) * 1.6) * 0.045;
        ctx.strokeStyle = i % 3 === 0
          ? `rgba(226, 184, 107, ${Math.max(0.02, alpha)})`
          : `rgba(163, 172, 194, ${Math.max(0.015, alpha * 0.75)})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      rafId = window.requestAnimationFrame(renderSpatialField);
    }

    rafId = window.requestAnimationFrame(renderSpatialField);
  }

  /* ------------------------------------------------------------------------
   * 2. SCROLLTELLING ENGINE (PROGRESS FILAMENT, PARALLAX, TIMELINE BEAM)
   * ------------------------------------------------------------------------ */
  const progressBar = document.getElementById('scroll-progress-bar');
  const parallaxStages = Array.from(document.querySelectorAll('[data-parallax]'));
  const workflowTimeline = document.getElementById('workflow-timeline');
  const timelineBeam = document.getElementById('timeline-beam');
  const timelineChapters = Array.from(document.querySelectorAll('.timeline-chapter'));
  const activeStageCode = document.getElementById('active-stage-code');
  const activeStageDesc = document.getElementById('active-stage-desc');

  function updateScrollChoreography() {
    const scrollY = window.scrollY || window.pageYOffset;
    const docHeight = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
    const progress = Math.min(Math.max(scrollY / docHeight, 0), 1);

    if (progressBar) {
      progressBar.style.transform = `scaleX(${progress.toFixed(4)})`;
    }

    if (!prefersReducedMotion) {
      const viewportCenter = window.innerHeight * 0.5;
      for (let i = 0; i < parallaxStages.length; i++) {
        const el = parallaxStages[i];
        const rect = el.getBoundingClientRect();
        if (rect.bottom > -100 && rect.top < window.innerHeight + 100) {
          const factor = parseFloat(el.getAttribute('data-parallax') || '0.05');
          const offset = (rect.top + rect.height * 0.5 - viewportCenter) * -factor;
          el.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
        }
      }
    }

    if (workflowTimeline && timelineBeam) {
      const rect = workflowTimeline.getBoundingClientRect();
      const triggerPoint = window.innerHeight * 0.55;
      const rawRatio = (triggerPoint - rect.top) / Math.max(rect.height, 1);
      const beamScale = Math.min(Math.max(rawRatio, 0.08), 1);
      timelineBeam.style.transform = `scaleY(${beamScale.toFixed(4)})`;

      let activeChapter = timelineChapters[0];
      for (let i = 0; i < timelineChapters.length; i++) {
        const ch = timelineChapters[i];
        const cRect = ch.getBoundingClientRect();
        if (cRect.top <= window.innerHeight * 0.58) {
          activeChapter = ch;
        }
      }

      if (activeChapter) {
        for (let i = 0; i < timelineChapters.length; i++) {
          timelineChapters[i].classList.toggle('is-active', timelineChapters[i] === activeChapter);
        }
        const code = activeChapter.getAttribute('data-stage-code');
        const desc = activeChapter.getAttribute('data-stage-desc');
        if (activeStageCode && code && activeStageCode.textContent !== code) {
          activeStageCode.textContent = code;
        }
        if (activeStageDesc && desc && activeStageDesc.textContent !== desc) {
          activeStageDesc.textContent = desc;
        }
      }
    }
  }

  window.addEventListener('scroll', updateScrollChoreography, { passive: true });
  window.addEventListener('resize', updateScrollChoreography, { passive: true });
  updateScrollChoreography();

  /* ------------------------------------------------------------------------
   * 3. INTERSECTION OBSERVER REVEALS
   * ------------------------------------------------------------------------ */
  const revealNodes = document.querySelectorAll('.reveal-up');
  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    revealNodes.forEach(function (node) {
      observer.observe(node);
    });
  } else {
    revealNodes.forEach(function (node) {
      node.classList.add('is-visible');
    });
  }

  /* ------------------------------------------------------------------------
   * 4. FULL-RESOLUTION VISUAL PROOF LIGHTBOX
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
      lightboxCaption.textContent = caption || 'Bukti Output Nyata AI Skill for Antigravity v2.0';
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
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
  }

  window.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeLightbox();
    }
  });

  /* ------------------------------------------------------------------------
   * 5. DIRECT WHATSAPP ORDER CONCIERGE (085217124804 — AUTO-TEXT FORMAT)
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
      buyerNote.setAttribute('aria-invalid', 'false');
    }

    const baseMsg = `kak mau pesan paket yang ini: ${pkg}`;
    if (!note) {
      conciergeFeedback.className = 'field-feedback is-empty';
      conciergeFeedback.textContent = `Pesan WA otomatis: "${baseMsg}"`;
    } else {
      conciergeFeedback.className = 'field-feedback';
      conciergeFeedback.textContent = `Pesan WA otomatis: "${baseMsg} — Catatan: ${note}"`;
    }
  }

  if (packageSelect) {
    packageSelect.addEventListener('change', updatePreviewMessage);
  }
  if (buyerNote) {
    buyerNote.addEventListener('input', updatePreviewMessage);
  }

  if (conciergeForm) {
    conciergeForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const pkg = packageSelect ? packageSelect.value : 'PACK-06 Ultimate All-In-One Master Suite (50)';
      const note = buyerNote ? buyerNote.value.trim() : '';

      if (note.length > 180) {
        updatePreviewMessage();
        return;
      }

      if (conciergeSubmitBtn) {
        conciergeSubmitBtn.classList.add('is-loading');
        conciergeSubmitBtn.setAttribute('disabled', 'disabled');
      }

      const fullMessage = note
        ? `kak mau pesan paket yang ini: ${pkg} (Catatan proyek: ${note})`
        : `kak mau pesan paket yang ini: ${pkg}`;

      const waUrl = `https://wa.me/6285217124804?text=${encodeURIComponent(fullMessage)}`;
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
