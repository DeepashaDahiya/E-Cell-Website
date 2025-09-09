const whatsapp = "https://chat.whatsapp.com/LyUgaqkkSHT0hbmRVMJwcg";
let updates = document.getElementsByClassName("button-join");
document.querySelector(".button-join").onclick = function () {
  window.open(whatsapp, "_blank");
   // GSAP Sponsors carousel animation
            function setupSponsorCarousel(row, direction) {
                const logos = row.querySelectorAll('.sponsor-logo-circle');
                const rowWidth = row.scrollWidth;
                
                gsap.to(row, {
                    x: direction === 'left' ? -rowWidth / 2 : 0,
                    duration: 20,
                    ease: "none",
                    repeat: -1,
                    overwrite: "auto"
                });
            }

            // Animate each row in a different direction for visual interest
            setupSponsorCarousel(sponsorRows[0], 'left');
            setupSponsorCarousel(sponsorRows[1], 'right');

};

// Hamburger toggle

  function toggleMenu() {
    document.getElementById("mobileMenu").classList.toggle("active");
  }

 
const form =
  "https://docs.google.com/forms/d/e/1FAIpQLSfHy1giYR_NxI9f9oWHrUkJ43KoZj_oQaZaX-LTN3iovimyNw/viewform";
document.addEventListener("DOMContentLoaded", () => {
  const recruit = document.querySelector(".recruit");
  if (recruit) {
    recruit.addEventListener("click", () => {
      window.open(form, "_blank");
      // window.alert("Not active yet");
    });
  }
});

