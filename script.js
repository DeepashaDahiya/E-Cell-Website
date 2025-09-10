// ----------------------------
// WhatsApp Button
// ----------------------------
const whatsapp = "https://chat.whatsapp.com/LyUgaqkkSHT0hbmRVMJwcg";
const buttonJoin = document.querySelector(".button-join");

if (buttonJoin) {
  buttonJoin.addEventListener("click", () => {
    window.open(whatsapp, "_blank");
  });
}

// ----------------------------
// Hamburger Toggle
// ----------------------------
function toggleMenu() {
  document.getElementById("mobileMenu").classList.toggle("active");
}

// ----------------------------
// Recruitment Form
// ----------------------------
const formURL = "https://docs.google.com/forms/d/e/1FAIpQLSfHy1giYR_NxI9f9oWHrUkJ43KoZj_oQaZaX-LTN3iovimyNw/viewform";

document.addEventListener("DOMContentLoaded", () => {
  const recruitButton = document.querySelector(".recruit");
  if (recruitButton) {
    recruitButton.addEventListener("click", () => {
      window.open(formURL, "_blank");
    });
  }

  // ----------------------------
  // Preloader - Show only once
  // ----------------------------
  const preloader = document.getElementById("preloader");
  const hasVisited = localStorage.getItem("preloaderShown");

  if (preloader && !hasVisited) {
    preloader.style.display = "flex"; // Show preloader

    // Fade out after 3 seconds
    setTimeout(() => {
      preloader.style.transition = "opacity 0.5s ease";
      preloader.style.opacity = 0;
      setTimeout(() => {
        preloader.style.display = "none";
      }, 500);
    }, 3000);

    localStorage.setItem("preloaderShown", "true");
  } else if (preloader) {
    preloader.style.display = "none"; // Hide immediately if already visited
  }

  // ----------------------------
  // GSAP Sponsors Carousel Animation
  // ----------------------------
  const sponsorRows = document.querySelectorAll(".sponsor-column-inner");
  if (sponsorRows.length >= 2) {
    sponsorRows.forEach((row, index) => {
      const direction = index % 2 === 0 ? 'left' : 'right';
      const rowWidth = row.scrollWidth;

      gsap.to(row, {
        x: direction === 'left' ? -rowWidth / 2 : 0,
        duration: 20,
        ease: "none",
        repeat: -1,
        overwrite: "auto"
      });
    });
  }
});

