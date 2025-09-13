document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger);

  // 🎬 Preloader animation
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
      // Keep current animation properties as is
      onComplete: () => {
        loaderAnimation();
        // IMPORTANT: Refresh ScrollTrigger after loader to ensure all positions are correct.
        ScrollTrigger.refresh();
      }
    });

  //White-Loader
  function loaderAnimation() {
    var t2 = gsap.timeline({
      onComplete: () => {
        const ribbon = document.querySelector("#stats-ribbon");
        if (ribbon && ribbon.getBoundingClientRect().top < window.innerHeight) {
          animateCounters();
        }

        // Hide loader/preloader and their text elements here
        document.getElementById('preloader').style.display = 'none';
        document.querySelector('.loader').style.display = 'none';
        document.getElementById('innovate').style.display = 'none';
        document.getElementById('create').style.display = 'none';
        document.getElementById('grow').style.display = 'none';
        document.getElementById('final-text').style.display = 'none';
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

  // ... rest of your JS code unchanged ...
  
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

  // Drawer
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

  // Animate Sponsors Grid (You only have images here, not a grid, so the selector needs to be adjusted)
  // Changed '.sponsor-grid img' to '.sponsor-logos-container img'
  gsap.utils.toArray('.sponsor-logos-container img').forEach((logo, i) => {
    gsap.to(logo, {
      scrollTrigger: {
        trigger: logo, // Trigger on each logo individually
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
  if (gradientBg) { // Check if element exists before adding listener
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


  // Apply Now → Google Form (replace with your live form link)
  // There is no element with ID 'applyBtn' in your HTML for this to attach to.
  // I'm commenting it out to prevent an error, or you can add an ID to one of your buttons.
  // const formURL = "https://docs.google.com/forms/d/e/1FAIpQLSfHy1giYR_NxI9f9oWHrUkJ43KoZj_oQaZaX-LTN3iovimyNw/viewform";
  // document.getElementById('applyBtn').addEventListener('click', (e)=>{
  //   e.preventDefault(); window.open(formURL, '_blank');
  // });

  // 🔢 Counters using GSAP ScrollTrigger
  const counters = document.querySelectorAll('.counter');
  const speed = 100; // You can adjust this for faster/slower counting

  function animateCounters() {
    counters.forEach(counter => {
      counter.innerText = "0"; // Reset before animating
      const target = +counter.getAttribute("data-target");

      // Use GSAP's built-in animtion capabilities for smoother counting
      gsap.to(counter, {
        innerText: target,
        duration: 2, // Animation duration for counting
        ease: "power1.out",
        snap: { innerText: 1 }, // Snap to whole numbers
        onUpdate: function() {
          counter.innerText = Math.ceil(this.targets()[0].innerText); // Update text with current number
        },
        onComplete: function() {
          counter.innerText = target + "+"; // Add '+' after completion
        }
      });
    });
  }

  // Trigger counters when the #stats-ribbon enters the viewport
  ScrollTrigger.create({
    trigger: "#stats-ribbon",
    start: "top 80%", // When the top of the ribbon is 80% down the viewport
    onEnter: animateCounters, // Run the function when it enters
    once: true // Only run once
  });


  // ✍️ Typing effect
  const typed = new Typed("#typed-text", {
    strings: ["Learning", "Growth", "Knowledge", "Innovation", "Future"],
    typeSpeed: 80,
    backSpeed: 50,
    backDelay: 1200,
    loop: true
  });

  // Ribbon underline animation for Sponsors section
  ScrollTrigger.create({
    trigger: ".sponsor-ribbon h2",
    start: "top 80%", // When the heading enters view
    onEnter: () => {
      gsap.to(".ribbon-underline", {
        width: "100%",
        duration: 1,
        ease: "power2.out"
      });
    },
    once: true // Only animate once
  });

});



// document.addEventListener('DOMContentLoaded', () => {
//   gsap.registerPlugin(ScrollTrigger);

//   // 🎬 Preloader animation
//   const preloader = document.getElementById('preloader');
//   const tl = gsap.timeline();
//   tl.to("#innovate", { opacity: 1, duration: 0.5, ease: "power2.inOut" })
//     .to("#innovate", { opacity: 0, duration: 0.5, ease: "power2.inOut", delay: 0.5 })
//     .to("#create", { opacity: 1, duration: 0.5, ease: "power2.inOut" })
//     .to("#create", { opacity: 0, duration: 0.5, ease: "power2.inOut", delay: 0.5 })
//     .to("#grow", { opacity: 1, duration: 0.5, ease: "power2.inOut" })
//     .to("#grow", { opacity: 0, duration: 0.5, ease: "power2.inOut", delay: 0.5 })
//     .to("#final-text", { opacity: 1, duration: 1, ease: "power2.inOut" })
//     .to(preloader, {
//       // opacity: 0, duration: 1, delay: 1, ease: "power2.inOut",
//       onComplete: () => {
//         loaderAnimation();
//         // IMPORTANT: Refresh ScrollTrigger after loader to ensure all positions are correct.
//         // This is a good practice and might indirectly help with layout issues.
//         ScrollTrigger.refresh();
//       }
//     });

//   //White-Loader
//   function loaderAnimation() {
//     var t2 = gsap.timeline({
//         onComplete: () => {

//             const ribbon = document.querySelector("#stats-ribbon");
//             if (ribbon && ribbon.getBoundingClientRect().top < window.innerHeight) {

//                 animateCounters();
//             }
//         }
//     });
//     t2
//       .to("#preloader", {
//             height: 0,
//             delay:0,
//             duration: 1.5,
//             ease: "circ.inOut" 
//         })
//       .to("#final-text",{
//         opacity:0,
//         delay:-1.5,
//         ease: "circ.inOut"
//       })
//       .to(".white", {
//         height: "100%",
//         duration: 2,
//         delay: -2.5,
//         top: 0,
//         ease: "circ.inOut"
//       })
//       .to(".white", {
//         height: "0%",
//         duration: 1,
//         delay: -0.5, 
//         ease: "circ.inOut",
//       })
//   }

  
  // Moved these hero animations inside DOMContentLoaded to ensure they run after all elements are loaded
  gsap.from(".headline", {
    y: 50,
    opacity: 0,
    rotationX: -90,
    duration: 1.2,
    ease: "power3.out",
    delay: 8 // Delay slightly after the page loads/preloader finishes
  });

  // Hero Sub-text Fade-in and slight Y-translate
  gsap.from(".hero-content .sub", {
    y: 20,
    opacity: 0,
    duration: 1.5,
    ease: "power2.out",
    delay: 8.5 // After headline
  });