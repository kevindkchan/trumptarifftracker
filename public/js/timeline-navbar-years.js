const year2024 = document.getElementById("2024");
const year2025 = document.getElementById("2025");
const showAll = document.getElementById("all");

const timeline2024 = document.querySelector(".second-term-2024");
const timeline2025 = document.querySelector(".second-term-2025");

year2024.addEventListener("click", (e) => {
  e.preventDefault();
  timeline2024.classList.add("active");
  timeline2025.classList.remove("active");

  year2024.classList.add("active");
  year2025.classList.remove("active");
  showAll.classList.remove("active");
});

year2025.addEventListener("click", (e) => {
  e.preventDefault();
  timeline2025.classList.add("active");
  timeline2024.classList.remove("active");

  year2025.classList.add("active");
  year2024.classList.remove("active");
  showAll.classList.remove("active");
});

showAll.addEventListener("click", (e) => {
  e.preventDefault();
  timeline2024.classList.add("active");
  timeline2025.classList.add("active");

  showAll.classList.add("active");
  year2024.classList.remove("active");
  year2025.classList.remove("active");
});
