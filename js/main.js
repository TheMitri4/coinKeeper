let sideNavShowBtn = document.querySelector('.side-nav__show-button');
let sideNav = document.querySelector('.side-nav');

sideNavShowBtn.addEventListener('click', (event) => {
    event.preventDefault();
    sideNav.classList.toggle('side-nav--shown');
    sideNavShowBtn.classList.toggle('side-nav__show-button--left');
    console.log('priv')
});