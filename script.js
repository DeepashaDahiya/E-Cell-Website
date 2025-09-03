const whatsapp = "https://chat.whatsapp.com/LyUgaqkkSHT0hbmRVMJwcg";
let updates = document.getElementsByClassName("button-join");
document.querySelector(".button-join").onclick = function () {
  window.open(whatsapp, "_blank");
};

// Hamburger toggle

  function toggleMenu() {
    document.getElementById("mobileMenu").classList.toggle("active");
  }


// const hamburger = document.querySelector(".hamburger");
// const navLinks = document.querySelector(".nav-links");
// hamburger.addEventListener("click", () => {
//   navLinks.classList.toggle("active");
// });
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
// Load navbar from components folder

// Smooth scroll
