window.addEventListener("scroll", () => {
    const header = document.querySelector('.navbar');
    const sticky = document.querySelector('.sticky');
    const headerBottom = header.offsetTop + header.offsetHeight;

    if (window.scrollY >= headerBottom) {
        sticky.style.display = 'flex';
    } else {
        sticky.style.display = 'none';
    }
});