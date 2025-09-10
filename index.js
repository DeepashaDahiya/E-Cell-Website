document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger);

  // 🍔 Hamburger menu
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });

  // 🎬 Preloader animation (only once)
  const preloader = document.getElementById('preloader');
  const mainContent = document.getElementById('main-content');

  if (!sessionStorage.getItem("preloaderShown")) {
    const tl = gsap.timeline();
    tl.to("#innovate", { opacity: 1, duration: 0.5, ease: "power2.inOut" })
      .to("#innovate", { opacity: 0, duration: 0.5, ease: "power2.inOut", delay: 0.5 })
      .to("#create", { opacity: 1, duration: 0.5, ease: "power2.inOut" })
      .to("#create", { opacity: 0, duration: 0.5, ease: "power2.inOut", delay: 0.5 })
      .to("#grow", { opacity: 1, duration: 0.5, ease: "power2.inOut" })
      .to("#grow", { opacity: 0, duration: 0.5, ease: "power2.inOut", delay: 0.5 })
      .to("#final-text", { opacity: 1, duration: 1, ease: "power2.inOut" })
      .to(preloader, {
        opacity: 0,
        duration: 1,
        delay: 1,
        ease: "power2.inOut",
        onComplete: () => {
          preloader.style.display = 'none';
          mainContent.classList.remove('hidden');
          document.body.style.backgroundColor = '#1a1a1a';
          sessionStorage.setItem("preloaderShown", "true"); // ✅ Save flag
        }
      });
  } else {
    // Skip preloader and show content immediately
    preloader.style.display = 'none';
    mainContent.classList.remove('hidden');
    document.body.style.backgroundColor = '#1a1a1a';
  }

  // 👀 Fade-ins
  gsap.utils.toArray(".gsap-fade-in").forEach(element => {
    gsap.from(element, {
      scrollTrigger: { trigger: element, start: "top 80%", toggleActions: "play none none none" },
      opacity: 0,
      y: 20,
      duration: 1,
      ease: "power2.inOut",
      stagger: 0.2
    });
  });

  // Animate Event Cards on Scroll
  gsap.utils.toArray(".event-card").forEach((card, i) => {
    gsap.to(card, {
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
      },
      opacity: 1,
      y: 0,
      duration: 1,
      delay: i * 0.2,
      ease: "power3.out"
    });
  });

  // Animate Sponsors Grid
  gsap.utils.toArray('.sponsor-grid img').forEach((logo, i) => {
    gsap.to(logo, {
      scrollTrigger: {
        trigger: logo,
        start: "top 85%",
        toggleActions: "play none none none"
      },
      opacity: 1,
      y: 0,
      duration: 1,
      delay: i * 0.2,
      ease: "power3.out"
    });
  });

  // 🎨 Cursor gradient effect
  const gradientBg = document.getElementById("gradient-bg");
  document.addEventListener("mousemove", (e) => {
    const { innerWidth, innerHeight } = window;
    const x = (e.clientX / innerWidth) * 100;
    const y = (e.clientY / innerHeight) * 100;
    gradientBg.style.background = `
      radial-gradient(
        circle at ${x}% ${y}%,
        rgba(255, 182, 193, 0.4),
        rgba(147, 112, 219, 0.3),
        rgba(135, 206, 250, 0.2),
        rgba(26, 26, 26, 1)
      )
    `;
  });

  // 🔢 Counters (now correctly placed OUTSIDE mousemove!)
  const counters = document.querySelectorAll('.counter');
  const speed = 100;
  const animateCounters = () => {
    counters.forEach(counter => {
      const updateCount = () => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const increment = Math.ceil(target / speed);
        if (count < target) {
          counter.innerText = count + increment;
          setTimeout(updateCount, 30);
        } else {
          counter.innerText = target + "+";
        }
      };
      updateCount();
    });
  };
  let started = false;
  window.addEventListener('scroll', () => {
    const ribbon = document.querySelector('section.bg-gray-900');
    if (!started && ribbon.getBoundingClientRect().top < window.innerHeight) {
      animateCounters();
      started = true;
    }
  });

  // 🟣 Navbar scroll effect
  window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.head-nav');
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // ✍️ Typing effect
  const typed = new Typed("#typed-text", {
    strings: ["Learning", "Growth", "Knowledge", "Innovation", "Future"],
    typeSpeed: 80,
    backSpeed: 50,
    backDelay: 1200,
    loop: true
  });
});
