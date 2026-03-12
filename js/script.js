  // Custom Cursor
  const cursor = document.getElementById('cursor');
  const ring = document.getElementById('cursorRing');
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx - 6 + 'px';
    cursor.style.top = my - 6 + 'px';
  });

  function animateRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx - 20 + 'px';
    ring.style.top = ry - 20 + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  document.querySelectorAll('a, button, .skill-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'scale(2)';
      ring.style.transform = 'scale(1.5)';
      ring.style.borderColor = 'rgba(168,85,247,0.8)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'scale(1)';
      ring.style.transform = 'scale(1)';
      ring.style.borderColor = 'rgba(168,85,247,0.5)';
    });
  });

  // Scroll Reveal
  const reveals = document.querySelectorAll('.reveal, .timeline-item');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, (entry.target.dataset.delay || 0) * 100);
      }
    });
  }, { threshold: 0.1 });

  reveals.forEach((el, i) => {
    el.dataset.delay = i % 6;
    observer.observe(el);
  });

  // Stagger skill cards
  document.querySelectorAll('.skill-card').forEach((card, i) => {
    card.style.transitionDelay = (i * 0.06) + 's';
  });

  // Parallax hero orbs on scroll
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    document.querySelector('.orb1').style.transform = `translate(${y*0.05}px, ${y*0.08}px)`;
    document.querySelector('.orb2').style.transform = `translate(${-y*0.04}px, ${-y*0.06}px)`;
  });

  // Counter animation for stats
  function animateCounter(el, target, suffix) {
    let start = 0;
    const dur = 2000;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / dur, 1);
      const val = Math.floor(progress * target);
      el.textContent = val + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  const statsObserver = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      animateCounter(document.querySelectorAll('.stat-num')[0], 8, '+');
      animateCounter(document.querySelectorAll('.stat-num')[1], 6, '');
      statsObserver.disconnect();
    }
  }, { threshold: 0.5 });
  statsObserver.observe(document.querySelector('.hero-stats'));