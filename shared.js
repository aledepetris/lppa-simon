var menuToggle = document.querySelector('.menu-toggle');
var topnav = document.querySelector('.topnav');

menuToggle.addEventListener('click', function () {
    topnav.classList.toggle('responsive');
});