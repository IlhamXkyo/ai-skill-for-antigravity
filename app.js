/**
 * AI SKILL FOR ANTIGRAVITY — INTERACTIVE 3D SCROLLTELLING, VELOCITY PHYSICS & MOTION MODE SWITCHER
 * 60fps Compositor Choreography · Live User Interactivity Choice (Kinetic 3D / Tactile / Calm)
 */

(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let motionMode = prefersReducedMotion ? 'calm' : (document.body.getAttribute('data-motion-mode') || 'kinetic');

  /* ------------------------------------------------------------------------
   * 0. LIVE INTERACTIVE MOTION MODE SWITCHER (KINETIC 3D / TACTILE / CALM)
   * ------------------------------------------------------------------------ */
  const motionButtons = Array.from(document.querySelectorAll('[data-set-motion]'));
  const showcases = Array.from(document.querySelectorAll('.hd-showcase-shell'));
  const kineticTitles = Array.from(document.querySelectorAll('.spread-title, .section-title'));
  const frameCards = Array.from(document.querySelectorAll('.hd-frame-btn'));

  function setMotionMode(nextMode) {
    motionMode = nextMode;
    document.body.setAttribute('data-motion-mode', nextMode);
    motionButtons.forEach(function (btn) {
      btn.classList.toggle('is-active', btn.getAttribute('data-set-motion') === nextMode);
    });
    if (nextMode === 'calm') {
      showcases.forEach(function (el) {
        el.style.transform = 'none';
      });
      kineticTitles.forEach(function (el) {
        el.style.transform = 'none';
      });
      frameCards.forEach(function (el) {
        el.style.transform = 'none';
      });
    }
  }

  motionButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      setMotionMode(btn.getAttribute('data-set-motion') || 'kinetic');
    });
  });

  /* ------------------------------------------------------------------------
   * 1. FULL-BLEED SPATIAL HERO CANVAS (POINTER + SCROLL VELOCITY REACTIVE)
   * ------------------------------------------------------------------------ */
  const canvas = document.getElementById('hero-canvas');
  let currentScrollVelocity = 0;

  if (canvas && !prefersReducedMotion) {
    const ctx = canvas.getContext('2d');
    let width = 0;
    let height = 0;
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
      if (motionMode !== 'calm') {
        const t = time * 0.00045;
        pointerX += (targetX - pointerX) * 0.05;
        pointerY += (targetY - pointerY) * 0.05;

        ctx.clearRect(0, 0, width, height);

        const velBoost = Math.min(Math.max(currentScrollVelocity * 0.018, -38), 38);
        const lineCount = 13;
        for (let i = 0; i < lineCount; i++) {
          const ratio = i / (lineCount - 1);
          const baseY = height * (0.14 + ratio * 0.74);
          ctx.beginPath();

          for (let x = 0; x <= width; x += 22) {
            const nx = x / Math.max(width, 1);
            const wave1 = Math.sin(nx * 4.1 + t + i * 0.42) * (24 + Math.abs(velBoost) * 0.45);
            const wave2 = Math.cos(nx * 6.5 - t * 1.35 + i * 0.25) * 13;
            const pull = Math.exp(-Math.pow(nx - pointerX, 2) * 8) * ((pointerY - 0.5) * 84 + velBoost);
            const y = baseY + wave1 + wave2 + pull;

            if (x === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          }

          const alpha = 0.03 + (1 - Math.abs(ratio - 0.5) * 1.5) * 0.055;
          ctx.strokeStyle = i % 3 === 0
            ? `rgba(226, 184, 107, ${Math.max(0.025, alpha)})`
            : i % 3 === 1
              ? `rgba(56, 189, 248, ${Math.max(0.02, alpha * 0.85)})`
              : `rgba(163, 172, 194, ${Math.max(0.015, alpha * 0.75)})`;
          ctx.lineWidth = i % 3 === 0 ? 1.25 : 1;
          ctx.stroke();
        }
      }
      window.requestAnimationFrame(renderSpatialField);
    }

    window.requestAnimationFrame(renderSpatialField);
  }

  /* ------------------------------------------------------------------------
   * 2. INTERACTIVE 3D SCROLLTELLING & VELOCITY PHYSICS ENGINE
   * ------------------------------------------------------------------------ */
  const progressBar = document.getElementById('scroll-progress-bar');
  const hudPct = document.getElementById('hud-scroll-pct');
  const hudVel = document.getElementById('hud-scroll-vel');
  const hudChapterBtns = Array.from(document.querySelectorAll('[data-scroll-to]'));
  const workflowTimeline = document.getElementById('workflow-timeline');
  const timelineBeam = document.getElementById('timeline-beam');
  const timelineChapters = Array.from(document.querySelectorAll('.timeline-chapter'));
  const activeStageCode = document.getElementById('active-stage-code');
  const activeStageDesc = document.getElementById('active-stage-desc');
  const simStagePct = document.getElementById('sim-stage-pct');
  const simDynamicFill = document.getElementById('sim-dynamic-fill');
  const simStepPills = Array.from(document.querySelectorAll('[data-jump-step]'));

  let lastScrollY = window.scrollY || window.pageYOffset;
  let lastScrollTime = performance.now();
  let smoothedVelocity = 0;

  // Clickable Chapter Jump HUD
  hudChapterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const targetSel = btn.getAttribute('data-scroll-to');
      const targetEl = targetSel ? document.querySelector(targetSel) : null;
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: motionMode === 'calm' ? 'auto' : 'smooth', block: 'start' });
      }
    });
  });

  // Clickable Step Pills in Section 02 Live Simulator
  simStepPills.forEach(function (pill) {
    pill.addEventListener('click', function () {
      const idx = parseInt(pill.getAttribute('data-jump-step') || '0', 10);
      const targetChapter = timelineChapters[idx];
      if (targetChapter) {
        targetChapter.scrollIntoView({ behavior: motionMode === 'calm' ? 'auto' : 'smooth', block: 'center' });
      }
    });
  });

  function updateScrollChoreography() {
    const now = performance.now();
    const scrollY = window.scrollY || window.pageYOffset;
    const dt = Math.max(now - lastScrollTime, 16);
    const rawVel = ((scrollY - lastScrollY) / dt) * 1000;
    smoothedVelocity = smoothedVelocity * 0.82 + rawVel * 0.18;
    currentScrollVelocity = smoothedVelocity;
    lastScrollY = scrollY;
    lastScrollTime = now;

    const docHeight = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
    const progress = Math.min(Math.max(scrollY / docHeight, 0), 1);
    const pctInt = Math.round(progress * 100);

    if (progressBar) {
      progressBar.style.transform = `scaleX(${progress.toFixed(4)})`;
    }
    if (hudPct) {
      hudPct.textContent = `${pctInt}%`;
    }
    if (hudVel) {
      hudVel.textContent = `${Math.min(Math.round(Math.abs(smoothedVelocity)), 4500)} px/s`;
    }

    // Update shimmer position along serif-italic accents
    document.body.style.setProperty('--scroll-shimmer-pos', `${(progress * 240).toFixed(1)}%`);

    // Highlight active chapter in Floating Scrollytelling Cockpit HUD
    const triggerY = window.innerHeight * 0.42;
    let activeHudBtn = hudChapterBtns[0];
    for (let i = 0; i < hudChapterBtns.length; i++) {
      const sel = hudChapterBtns[i].getAttribute('data-scroll-to');
      const sec = sel ? document.querySelector(sel) : null;
      if (sec) {
        const r = sec.getBoundingClientRect();
        if (r.top <= triggerY) {
          activeHudBtn = hudChapterBtns[i];
        }
      }
    }
    if (activeHudBtn) {
      for (let i = 0; i < hudChapterBtns.length; i++) {
        hudChapterBtns[i].classList.toggle('is-active', hudChapterBtns[i] === activeHudBtn);
      }
    }

    // 3D Scroll-Driven Perspective Stage Unfolding & Specular Light Beam on Visual Showcases
    if (motionMode !== 'calm') {
      const vh = Math.max(window.innerHeight, 1);
      const isKinetic = motionMode === 'kinetic';

      for (let i = 0; i < showcases.length; i++) {
        const stage = showcases[i];
        const rect = stage.getBoundingClientRect();
        if (rect.bottom > -120 && rect.top < vh + 120) {
          // entryRatio goes from 0 (entering at bottom of viewport) to 1 (centered/locked in viewport)
          const entryRatio = Math.min(Math.max((vh - rect.top) / (vh * 0.72), 0), 1);
          const beamPct = Math.min(Math.max(((vh - rect.top) / (vh + rect.height)) * 100, 5), 95);
          stage.style.setProperty('--scroll-beam-x', `${beamPct.toFixed(1)}%`);

          if (isKinetic) {
            const tiltX = (1 - entryRatio) * 10.5;
            const scaleVal = 0.945 + entryRatio * 0.055;
            const liftY = (1 - entryRatio) * 28;
            stage.style.transform = `perspective(1500px) rotateX(${tiltX.toFixed(2)}deg) scale3d(${scaleVal.toFixed(4)}, ${scaleVal.toFixed(4)}, 1) translate3d(0, ${liftY.toFixed(1)}px, 0)`;
          } else {
            // Tactile mode: smooth subtle lift without 3D rotation
            const liftY = (1 - entryRatio) * 14;
            stage.style.transform = `translate3d(0, ${liftY.toFixed(1)}px, 0)`;
          }
        }
      }

      // Kinetic Scroll-Velocity Skew & Drift on Package Titles
      if (isKinetic) {
        const clampedSkew = Math.min(Math.max(smoothedVelocity * -0.0018, -3.2), 3.2);
        const clampedDrift = Math.min(Math.max(smoothedVelocity * 0.005, -9), 9);
        for (let i = 0; i < kineticTitles.length; i++) {
          const title = kineticTitles[i];
          const r = title.getBoundingClientRect();
          if (r.bottom > 0 && r.top < vh) {
            title.style.transform = `translate3d(0, ${clampedDrift.toFixed(2)}px, 0) skewX(${clampedSkew.toFixed(2)}deg)`;
          }
        }
      } else {
        for (let i = 0; i < kineticTitles.length; i++) {
          kineticTitles[i].style.transform = 'none';
        }
      }
    }

    // Section 02 Pinned Scrollytelling Timeline & Live Stage Simulator
    if (workflowTimeline && timelineBeam) {
      const rect = workflowTimeline.getBoundingClientRect();
      const triggerPoint = window.innerHeight * 0.56;
      const rawRatio = (triggerPoint - rect.top) / Math.max(rect.height, 1);
      const beamScale = Math.min(Math.max(rawRatio, 0.08), 1);
      timelineBeam.style.transform = `scaleY(${beamScale.toFixed(4)})`;

      let activeIdx = 0;
      for (let i = 0; i < timelineChapters.length; i++) {
        const ch = timelineChapters[i];
        const cRect = ch.getBoundingClientRect();
        if (cRect.top <= window.innerHeight * 0.58) {
          activeIdx = i;
        }
      }

      const activeChapter = timelineChapters[activeIdx];
      if (activeChapter) {
        for (let i = 0; i < timelineChapters.length; i++) {
          timelineChapters[i].classList.toggle('is-active', i === activeIdx);
        }
        for (let i = 0; i < simStepPills.length; i++) {
          simStepPills[i].classList.toggle('is-active', i === activeIdx);
        }
        const stagePct = (activeIdx + 1) * 25;
        if (simStagePct) {
          simStagePct.textContent = `STAGE ${activeIdx + 1} / 4 (${stagePct}%)`;
        }
        if (simDynamicFill) {
          simDynamicFill.style.width = `${stagePct}%`;
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

  // Decay scroll velocity smoothly to 0 when user stops scrolling
  function velocityDecayLoop() {
    if (Math.abs(smoothedVelocity) > 0.5) {
      const dt = performance.now() - lastScrollTime;
      if (dt > 48) {
        smoothedVelocity *= 0.86;
        currentScrollVelocity = smoothedVelocity;
        if (hudVel) {
          hudVel.textContent = `${Math.round(Math.abs(smoothedVelocity))} px/s`;
        }
        if (motionMode === 'kinetic') {
          const clampedSkew = Math.min(Math.max(smoothedVelocity * -0.0018, -3.2), 3.2);
          const clampedDrift = Math.min(Math.max(smoothedVelocity * 0.005, -9), 9);
          for (let i = 0; i < kineticTitles.length; i++) {
            kineticTitles[i].style.transform = Math.abs(smoothedVelocity) < 2
              ? 'none'
              : `translate3d(0, ${clampedDrift.toFixed(2)}px, 0) skewX(${clampedSkew.toFixed(2)}deg)`;
          }
        }
      }
    }
    window.requestAnimationFrame(velocityDecayLoop);
  }

  window.addEventListener('scroll', updateScrollChoreography, { passive: true });
  window.addEventListener('resize', updateScrollChoreography, { passive: true });
  updateScrollChoreography();
  window.requestAnimationFrame(velocityDecayLoop);

  /* ------------------------------------------------------------------------
   * 3. 3D CURSOR-TRACKING TILT & RADIAL SPOTLIGHT ON HD CREATION CARDS
   * ------------------------------------------------------------------------ */
  frameCards.forEach(function (card) {
    card.addEventListener(
      'pointermove',
      function (e) {
        if (motionMode === 'calm') return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--spot-x', `${x.toFixed(0)}px`);
        card.style.setProperty('--spot-y', `${y.toFixed(0)}px`);

        if (motionMode === 'kinetic') {
          const nx = (x / Math.max(rect.width, 1)) - 0.5;
          const ny = (y / Math.max(rect.height, 1)) - 0.5;
          const rotY = nx * 7.5;
          const rotX = -ny * 7.5;
          card.style.transform = `perspective(900px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translate3d(0, -4px, 0)`;
        }
      },
      { passive: true }
    );

    card.addEventListener(
      'pointerleave',
      function () {
        card.style.transform = '';
      },
      { passive: true }
    );
  });

  /* ------------------------------------------------------------------------
   * 4. INTERSECTION OBSERVER REVEALS
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
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
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
   * 5. FULL-RESOLUTION VISUAL PROOF LIGHTBOX
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
      lightboxCaption.textContent = caption || 'Contoh Hasil Karya Resolusi HD — AI Skill for Antigravity';
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
   * 6. DIRECT WHATSAPP ORDER CONCIERGE (085217124804 — AUTO-TEXT FORMAT)
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

    if (!note) {
      conciergeFeedback.className = 'field-feedback is-empty';
      conciergeFeedback.textContent = `Pesan otomatis: "kak mau pesan paket yang ini: ${pkg}"`;
    } else {
      conciergeFeedback.className = 'field-feedback';
      conciergeFeedback.textContent = `Pesan otomatis: "kak mau pesan paket yang ini: ${pkg} — Fokus proyek: ${note}"`;
    }
  }

  if (packageSelect) {
    packageSelect.addEventListener('change', updatePreviewMessage);
  }
  if (buyerNote) {
    buyerNote.addEventListener('input', updatePreviewMessage);
  }
  updatePreviewMessage();

  if (conciergeForm) {
    conciergeForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const pkg = packageSelect ? packageSelect.value : 'AI Skill for Antigravity (50)';
      const note = buyerNote ? buyerNote.value.trim() : '';

      if (note.length > 180) {
        return;
      }

      if (conciergeSubmitBtn) {
        conciergeSubmitBtn.classList.add('is-loading');
        conciergeSubmitBtn.setAttribute('disabled', 'disabled');
      }

      const rawText = note
        ? `kak mau pesan paket yang ini: ${pkg} — Fokus proyek: ${note}`
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
