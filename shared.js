var menuToggle = document.querySelector('.menuToggle');
var topnav = document.querySelector('.topnav');

menuToggle.addEventListener('click', function () {
    topnav.classList.toggle('responsive');
});