const whatsapp = "https://chat.whatsapp.com/LyUgaqkkSHT0hbmRVMJwcg";
let updates = document.getElementsByClassName("button-join");
document.querySelector(".button-join").onclick = function () {
  window.open(whatsapp, "_blank");
};

// Hamburger toggle
// const hamburger = document.querySelector(".hamburger");
// const navLinks = document.querySelector(".nav-links");
// hamburger.addEventListener("click", () => {
//   navLinks.classList.toggle("active");
// });

document.addEventListener("DOMContentLoaded", () => {
  const recruit = document.querySelector(".recruit");
  if (recruit) {
    recruit.addEventListener("click", () => {
      window.alert("Not active yet");
    });
  }
});
// Load navbar from components folder

// Smooth scroll
