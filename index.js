document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger);

  // Check if loader has been shown already in this session
  if (sessionStorage.getItem('loaderShown') === 'true') {
    // Immediately hide preloader and loader elements (no animation)
    document.getElementById('preloader').style.display = 'none';
    document.querySelector('.loader').style.display = 'none';
    document.getElementById('innovate').style.display = 'none';
    document.getElementById('create').style.display = 'none';
    document.getElementById('grow').style.display = 'none';
    document.getElementById('final-text').style.display = 'none';

    // Run hero animations right away
    runHeroAnimations();

    ScrollTrigger.refresh();
    animateCounters();

  } else {
    // Loader not shown before, run preloader animation
    runPreloaderAnimation();
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

  // Drawer functionality
  const drawer = document.getElementById('drawer');
  const menuBtn = document.getElementById('menuBtn');
  const closeDrawer = document.getElementById('closeDrawer');

  function openDrawer(){
    drawer.classList.add('active');
    menuBtn.setAttribute('aria-expanded', 'true');
    drawer.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden'; // Prevent scrolling when drawer is open
  }
  function hideDrawer(){
    drawer.classList.remove('active');
    menuBtn.setAttribute('aria-expanded', 'false');
    drawer.setAttribute('aria-hidden','true');
    document.body.style.overflow = ''; // Re-enable scrolling
  }

  menuBtn.addEventListener('click', openDrawer);
  closeDrawer.addEventListener('click', hideDrawer);
  drawer.addEventListener('click', (e)=>{ if(e.target === drawer) hideDrawer(); });

  // Smooth scroll for in-page links (desktop nav & drawer)
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e)=>{
      const id = a.getAttribute('href');
      if(id.length > 1){
        e.preventDefault();
        hideDrawer(); // Close drawer for mobile links
        document.querySelector(id)?.scrollIntoView({behavior:'smooth', block:'start'});
      }
    })
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

  // Animate Sponsors Grid (selector adjusted)
  gsap.utils.toArray('.sponsor-logos-container img').forEach((logo, i) => {
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

  // Cursor gradient effect
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

  // Counters using GSAP ScrollTrigger
  const counters = document.querySelectorAll('.counter');

  function animateCounters() {
    counters.forEach(counter => {
      counter.innerText = "0";
      const target = +counter.getAttribute("data-target");
      gsap.to(counter, {
        innerText: target,
        duration: 2,
        ease: "power1.out",
        snap: { innerText: 1 },
        onUpdate: function() {
          counter.innerText = Math.ceil(this.targets()[0].innerText);
        },
        onComplete: function() {
          counter.innerText = target + "+";
        }
      });
    });
  }

  ScrollTrigger.create({
    trigger: "#stats-ribbon",
    start: "top 80%",
    onEnter: animateCounters,
    once: true
  });

  // Typing effect
  const typed = new Typed("#typed-text", {
    strings: ["Learning", "Growth", "Knowledge", "Innovation", "Future"],
    typeSpeed: 80,
    backSpeed: 50,
    backDelay: 1200,
    loop: true
  });

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

});

// Function to run preloader animation with loader and preloader hiding
function runPreloaderAnimation() {
  const preloader = document.getElementById('preloader');

  const tl = gsap.timeline();
  tl.to("#innovate", { opacity: 1, duration: 0.5, ease: "power2.inOut" })
    .to("#innovate", { opacity: 0, duration: 0.5, ease: "power2.inOut", delay: 0.5 })
    .to("#create", { opacity: 1, duration: 0.5, ease: "power2.inOut" })
    .to("#create", { opacity: 0, duration: 0.5, ease: "power2.inOut", delay: 0.5 })
    .to("#grow", { opacity: 1, duration: 0.5, ease: "power2.inOut" })
    .to("#grow", { opacity: 0, duration: 0.5, ease: "power2.inOut", delay: 0.5 })
    .to("#final-text", { opacity: 1, duration: 1, ease: "power2.inOut" })
    .to(preloader, {
      onComplete: () => {
        loaderAnimation();
        ScrollTrigger.refresh();
        // Mark loader as shown to prevent replay
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

      // Hide loader/preloader and their text elements
      document.getElementById('preloader').style.display = 'none';
      document.querySelector('.loader').style.display = 'none';
      document.getElementById('innovate').style.display = 'none';
      document.getElementById('create').style.display = 'none';
      document.getElementById('grow').style.display = 'none';
      document.getElementById('final-text').style.display = 'none';

      // Run hero animations after loader is hidden
      runHeroAnimations();
    }
  });

  t2
    .to("#preloader", {
      height: 0,
      delay: 0,
      duration: 1.5,
      ease: "circ.inOut"
    })
    .to("#final-text", {
      opacity: 0,
      delay: -1.5,
      ease: "circ.inOut"
    })
    .to(".white", {
      height: "100%",
      duration: 2,
      delay: -2.5,
      top: 0,
      ease: "circ.inOut"
    })
    .to(".white", {
      height: "0%",
      duration: 1,
      delay: -0.5,
      ease: "circ.inOut",
    });
}

// Hero animations separately so we can call immediately when skipping loader
function runHeroAnimations() {
  gsap.from(".headline", {
    y: 50,
    opacity: 0,
    rotationX: -90,
    duration: 1.2,
    ease: "power3.out",
    delay: 0 // Run immediately, no delay when skipping loader
  });

  gsap.from(".hero-content .sub", {
    y: 20,
    opacity: 0,
    duration: 1.5,
    ease: "power2.out",
    delay: 0
  });
}

