document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger);

  // -----------------------------
  // RESET ANIMATIONS ON LOAD
  // -----------------------------
  resetAnimations();

  // -----------------------------
  // Preloader Logic
  // -----------------------------
  if (sessionStorage.getItem('loaderShown') === 'true') {
    // Immediately hide preloader/loader
    hidePreloaderElements();

    // Run hero animations right away
    runHeroAnimations();

    // Refresh triggers & start counters if visible
    ScrollTrigger.refresh();
    animateCounters();
    initTyped();

  } else {
    // Loader not shown before, run preloader animation
    runPreloaderAnimation();
  }

  // -----------------------------
  // Fade-ins
  // -----------------------------
  gsap.utils.toArray(".gsap-fade-in").forEach(element => {
    gsap.from(element, {
      scrollTrigger: { trigger: element, start: "top 80%" },
      opacity: 0,
      y: 20,
      duration: 1,
      ease: "power2.inOut",
      stagger: 0.2
    });
  });

  // -----------------------------
  // Drawer functionality
  // -----------------------------
  const drawer = document.getElementById('drawer');
  const menuBtn = document.getElementById('menuBtn');
  const closeDrawer = document.getElementById('closeDrawer');

  function openDrawer() {
    drawer.classList.add('active');
    menuBtn.setAttribute('aria-expanded', 'true');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function hideDrawer() {
    drawer.classList.remove('active');
    menuBtn.setAttribute('aria-expanded', 'false');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  menuBtn.addEventListener('click', openDrawer);
  closeDrawer.addEventListener('click', hideDrawer);
  drawer.addEventListener('click', (e) => { if (e.target === drawer) hideDrawer(); });

  // -----------------------------
  // Smooth scroll for in-page links
  // -----------------------------
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id.length > 1) {
        e.preventDefault();
        hideDrawer();
        document.querySelector(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // -----------------------------
  // Animate Event Cards
  // -----------------------------
  gsap.utils.toArray(".event-card").forEach((card, i) => {
    gsap.to(card, {
      scrollTrigger: { trigger: card, start: "top 85%" },
      opacity: 1,
      y: 0,
      duration: 1,
      delay: i * 0.2,
      ease: "power3.out"
    });
  });

  // -----------------------------
  // Animate Sponsors Grid
  // -----------------------------
  gsap.utils.toArray('.sponsor-logos-container img').forEach((logo, i) => {
    gsap.to(logo, {
      scrollTrigger: { trigger: logo, start: "top 85%" },
      opacity: 1,
      y: 0,
      duration: 1,
      delay: i * 0.2,
      ease: "power3.out"
    });
  });
  // Horizontal scrolling for mobile rows
// Mobile horizontal scroll animation
if (window.innerWidth <= 480) {
  document.querySelectorAll(".mobile-only .sponsor-row").forEach((row, index) => {
    // Duplicate content for seamless scroll
    row.innerHTML += row.innerHTML;

    const totalWidth = row.scrollWidth / 2; // width of original logos
    const direction = index % 2 === 0 ? 1 : -1; // alternate directions

    gsap.to(row, {
      x: direction * -totalWidth,
      duration: 20,  // adjust speed here
      repeat: -1,
      ease: "linear"
    });
  });
}


  // -----------------------------
  // Cursor gradient effect
  // -----------------------------
  const gradientBg = document.getElementById("gradient-bg");
  if (gradientBg) {
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
  }

  // -----------------------------
  // Counters with ScrollTrigger
  // -----------------------------
  ScrollTrigger.create({
    trigger: "#stats-ribbon",
    start: "top 80%",
    onEnter: animateCounters,
    once: true // only once per load
  });

  // -----------------------------
  // Ribbon underline animation
  // -----------------------------
  ScrollTrigger.create({
    trigger: ".sponsor-ribbon h2",
    start: "top 80%",
    onEnter: () => {
      gsap.to(".ribbon-underline", {
        width: "100%",
        duration: 1,
        ease: "power2.out"
      });
    },
    once: true
  });

  // Refresh all triggers
  ScrollTrigger.refresh();
});

// -----------------------------
// FUNCTIONS
// -----------------------------

function resetAnimations() {
  // Reset counters to 0
  document.querySelectorAll(".counter").forEach(c => c.textContent = "0");

  // Kill old Typed instance if any
  if (window.typedInstance) {
    window.typedInstance.destroy();
    window.typedInstance = null;
  }
}

function hidePreloaderElements() {
  document.getElementById('preloader').style.display = 'none';
  document.querySelector('.loader').style.display = 'none';
  document.getElementById('innovate').style.display = 'none';
  document.getElementById('create').style.display = 'none';
  document.getElementById('grow').style.display = 'none';
  document.getElementById('final-text').style.display = 'none';
}

function animateCounters() {
  const counters = document.querySelectorAll('.counter');
  counters.forEach(counter => {
    counter.innerText = "0";
    const target = +counter.getAttribute("data-target");
    gsap.to(counter, {
      innerText: target,
      duration: 2,
      ease: "power1.out",
      snap: { innerText: 1 },
      onUpdate: function () {
        counter.innerText = Math.ceil(this.targets()[0].innerText);
      },
      onComplete: function () {
        counter.innerText = target + "+";
      }
    });
  });
}

function initTyped() {
  window.typedInstance = new Typed("#typed-text", {
    strings: ["Learning", "Growth", "Knowledge", "Innovation", "Future"],
    typeSpeed: 80,
    backSpeed: 50,
    backDelay: 1200,
    loop: true
  });
}

// -----------------------------
// Preloader Animations
// -----------------------------
function runPreloaderAnimation() {
  const preloader = document.getElementById('preloader');
  const tl = gsap.timeline();

  tl.to("#innovate", { opacity: 1, duration: 0.5 })
    .to("#innovate", { opacity: 0, duration: 0.5, delay: 0.5 })
    .to("#create", { opacity: 1, duration: 0.5 })
    .to("#create", { opacity: 0, duration: 0.5, delay: 0.5 })
    .to("#grow", { opacity: 1, duration: 0.5 })
    .to("#grow", { opacity: 0, duration: 0.5, delay: 0.5 })
    .to("#final-text", { opacity: 1, duration: 1 })
    .to(preloader, {
      onComplete: () => {
        loaderAnimation();
        ScrollTrigger.refresh();
        sessionStorage.setItem('loaderShown', 'true');
      }
    });
}

function loaderAnimation() {
  var t2 = gsap.timeline({
    onComplete: () => {
      const ribbon = document.querySelector("#stats-ribbon");
      if (ribbon && ribbon.getBoundingClientRect().top < window.innerHeight) {
        animateCounters();
      }

      hidePreloaderElements();
      runHeroAnimations();
      initTyped();

      // Play hero video once loader is done
      const heroVideo = document.getElementById("heroVideo");
      if (heroVideo) {
        heroVideo.play().catch(err => console.log("Video play blocked:", err));
      }
    }
  });

  t2.to("#preloader", { height: 0, duration: 1.5, ease: "circ.inOut" })
    .to("#final-text", { opacity: 0, delay: -1.5, ease: "circ.inOut" })
    .to(".white", { height: "100%", duration: 2, delay: -2.5, top: 0, ease: "circ.inOut" })
    .to(".white", { height: "0%", duration: 1, delay: -0.5, ease: "circ.inOut" });
}
const video = document.getElementById('heroVideo');
const homeSection = document.getElementById('home');

// Function to play video from start
function playHomeVideo() {
  video.currentTime = 0; // start from beginning
  video.play().catch(err => {
    console.log("Video play failed:", err);
  });
}

// Example: if you are using buttons or links to navigate
const navLinks = document.querySelectorAll('nav a'); // adjust selector as needed
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    setTimeout(() => {
      if (homeSection.offsetParent !== null) { // checks if visible
        playHomeVideo();
      }
    }, 50); // slight delay to allow display changes
  });
});



// -----------------------------
// Hero animations
// -----------------------------
function runHeroAnimations() {
  gsap.from(".headline", {
    y: 50,
    opacity: 0,
    rotationX: -90,
    duration: 1.2,
    ease: "power3.out"
  });

  gsap.from(".hero-content .sub", {
    y: 20,
    opacity: 0,
    duration: 1.5,
    ease: "power2.out"
  });
}
