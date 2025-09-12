document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger);


  // // 🍔 Hamburger menu
  // const hamburger = document.querySelector('.hamburger');
  // const mobileMenu = document.getElementById('mobileMenu');
  // hamburger.addEventListener('click', () => {
  //   mobileMenu.classList.toggle('open');
  // });

  // 🎬 Preloader animation (only once)
  const preloader = document.getElementById('preloader');
  const mainContent = document.getElementById('main-content');
<<<<<<< HEAD

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
=======
  const tl = gsap.timeline();
  tl.to("#innovate", { opacity: 1, duration: 0.5, ease: "power2.inOut" })
    .to("#innovate", { opacity: 0, duration: 0.5, ease: "power2.inOut", delay: 0.5 })
    .to("#create", { opacity: 1, duration: 0.5, ease: "power2.inOut" })
    .to("#create", { opacity: 0, duration: 0.5, ease: "power2.inOut", delay: 0.5 })
    .to("#grow", { opacity: 1, duration: 0.5, ease: "power2.inOut" })
    .to("#grow", { opacity: 0, duration: 0.5, ease: "power2.inOut", delay: 0.5 })
    .to("#final-text", { opacity: 1, duration: 1, ease: "power2.inOut" })
    .to(preloader, {
      // opacity: 0, duration: 1, delay: 1, ease: "power2.inOut",
      onComplete: () => {
        // preloader.style.display = 'none';
        loaderAnimation();
        // mainContent.classList.remove('hidden');
        // document.body.style.backgroundColor = '#1a1a1a';
      }
    });

>>>>>>> 89d870f (Updated Loader, Homepage and Navbar)

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

<<<<<<< HEAD
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

=======
  //White-Loader
  function loaderAnimation() {
    var t2 = gsap.timeline();
    t2
      .to("#preloader", {
            height: 0,
            delay:0,
            duration: 1.5,
            ease: Circ.easeInOut
        })
      .to("#final-text",{
        opacity:0,
        delay:-1.5
      })
      .to(".white", {
        height: "100%",
        duration: 2,
        delay: -2.5,
        top: 0,
        ease: Circ.easeInOut
      })
      .to(".white", {
        // bottom: 0,
        height: "0%",
        duration: 1,
        delay: -.5,
        ease: Circ.easeInOut,
      })

  }

  
    // Drawer
    const drawer = document.getElementById('drawer');
    const menuBtn = document.getElementById('menuBtn');
    const closeDrawer = document.getElementById('closeDrawer');

    function openDrawer(){
      drawer.classList.add('active');
      menuBtn.setAttribute('aria-expanded', 'true');
      drawer.setAttribute('aria-hidden','false');
    }
    function hideDrawer(){
      drawer.classList.remove('active');
      menuBtn.setAttribute('aria-expanded', 'false');
      drawer.setAttribute('aria-hidden','true');
    }

    menuBtn.addEventListener('click', openDrawer);
    closeDrawer.addEventListener('click', hideDrawer);
    drawer.addEventListener('click', (e)=>{ if(e.target === drawer) hideDrawer(); });

    // Smooth scroll for in-page links (desktop nav & drawer)
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', (e)=>{
        const id = a.getAttribute('href');
        if(id.length > 1){
          e.preventDefault(); hideDrawer();
          document.querySelector(id)?.scrollIntoView({behavior:'smooth', block:'start'});
        }
      })
    })


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

>>>>>>> 89d870f (Updated Loader, Homepage and Navbar)
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


  // Apply Now → Google Form (replace with your live form link)
    const formURL = "https://docs.google.com/forms/d/e/1FAIpQLSfHy1giYR_NxI9f9oWHrUkJ43KoZj_oQaZaX-LTN3iovimyNw/viewform";
    document.getElementById('applyBtn').addEventListener('click', (e)=>{
      e.preventDefault(); window.open(formURL, '_blank');
    });
    
  // 🔢 Counters (now correctly placed OUTSIDE mousemove!)
const counters = document.querySelectorAll('.counter');
const speed = 100;

function animateCounters() {
  counters.forEach(counter => {
    counter.innerText = "0"; // reset
    const target = +counter.getAttribute("data-target");

    const updateCount = () => {
      const count = +counter.innerText; // always numeric
      const increment = Math.ceil(target / speed);

      if (count < target) {
        counter.innerText = count + increment;
        setTimeout(updateCount, 30);
      } else {
        counter.innerText = target + "+"; // ✅ only once, at the very end
      }
    };

    updateCount();
  });
}

let started = false;
window.addEventListener("scroll", () => {
  const ribbon = document.querySelector("#stats-ribbon");
  if (!started && ribbon.getBoundingClientRect().top < window.innerHeight) {
    animateCounters();
    started = true;
  }
});

  // 🟣 Navbar scroll effect
  // window.addEventListener('scroll', () => {
  //   const navbar = document.querySelector('.head-nav');
  //   if (window.scrollY > 50) {
  //     navbar.classList.add('scrolled');
  //   } else {
  //     navbar.classList.remove('scrolled');
  //   }
  // });

  // ✍️ Typing effect
  const typed = new Typed("#typed-text", {
    strings: ["Learning", "Growth", "Knowledge", "Innovation", "Future"],
    typeSpeed: 80,
    backSpeed: 50,
    backDelay: 1200,
    loop: true
  });
});
<<<<<<< HEAD
=======


// window.addEventListener("load", ()=>{
//   loaderAnimation();
// });
>>>>>>> 89d870f (Updated Loader, Homepage and Navbar)
