const header = document.querySelector('.header');
        
window.addEventListener('scroll', () => {
    header.classList.toggle('header--scrolled', window.scrollY > 50);
});

const searchBtn = document.querySelector('.search__btn');
const searchOverlay = document.getElementById('searchOverlay');
const closeBtn = document.querySelector('.searchOverlay__close');

searchBtn.addEventListener('click', () => {
    searchOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
});

const closeSearch = () => {
    searchOverlay.classList.remove('active');
    document.body.style.overflow = '';
};

closeBtn.addEventListener('click', closeSearch);

searchOverlay.addEventListener('click', (e) => {
    if (e.target === searchOverlay) {
        closeSearch();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeSearch();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const mobileMenu = document.getElementById('mobile-menu');
    const overlay = document.querySelector('.mobile-menu-overlay');
    const openBtn = document.querySelector('.mobileMenuBtn');

    const logo = document.querySelector('.logo').cloneNode(true);
    const menu = document.querySelector('.menu').cloneNode(true);

    const mobileHeader = document.createElement('div');
    mobileHeader.classList.add('mobile-menu__header');

    const closeBtn = document.createElement('button');
    closeBtn.classList.add('mobile-menu__close');
    closeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';

    

    const closeAllSubmenus = () => {
        mobileMenu.querySelectorAll('.menu__li.open')
            .forEach(li => li.classList.remove('open'));
    };

    const openMenu = () => {
        mobileMenu.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeMenu = () => {
        mobileMenu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
        closeAllSubmenus();
    };

    closeBtn.addEventListener('click', closeMenu);

    mobileHeader.append(logo, closeBtn);
    mobileMenu.append(mobileHeader, menu);

    openBtn.addEventListener('click', openMenu);
    overlay.addEventListener('click', closeMenu);

    mobileMenu.addEventListener('click', (e) => {
        const link = e.target.closest('.menu__li--has-sub > .menu__link');
        if (!link) return;

        e.preventDefault();

        const parent = link.closest('.menu__li');

        parent.parentElement
            .querySelectorAll('.menu__li.open')
            .forEach(li => {
                if (li !== parent) li.classList.remove('open');
            });

        parent.classList.toggle('open');
    });
});

AOS.init({
    duration: 800,
    easing: 'ease-out-cubic',
    once: true,
    offset: 100
});