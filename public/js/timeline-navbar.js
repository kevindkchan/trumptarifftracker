const firstBtn = document.getElementById("first-term");
const secondBtn = document.getElementById("second-term");

const firstGroup = document.querySelector(".first-term-years");
const secondGroup = document.querySelector(".second-term-years");

firstBtn.addEventListener("click", (e) => {
    e.preventDefault();
    firstGroup.classList.add("active");
    secondGroup.classList.remove("active");

    firstBtn.classList.add("active");
    secondBtn.classList.remove("active");
});

secondBtn.addEventListener("click", (e) => {
    e.preventDefault();
    secondGroup.classList.add("active");
    firstGroup.classList.remove("active");

    secondBtn.classList.add("active");
    firstBtn.classList.remove("active");
});

secondGroup.classList.add("active");
secondBtn.classList.add("active");