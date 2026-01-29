var heroSlider = new Swiper('.heroSlider', {
    direction: 'vertical',
    loop: true,
    speed: 900,
    autoplay: {
        delay: 5000,
        pauseOnMouseEnter: true
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true
    },
    mousewheel: false,
    on: {
        slideChangeTransitionStart() {
            this.slides.forEach(slide => {
                slide.classList.remove('is-animated');
            });
        },
        slideChangeTransitionEnd() {
            const activeSlide = this.slides[this.activeIndex];
            activeSlide.classList.add('is-animated');
        }
    }
});
heroSlider.slides[heroSlider.activeIndex].classList.add('is-animated');

const newsSlider = new Swiper('.newsSlider', {
    slidesPerView: 3,
    spaceBetween: 40,
    speed: 800,
    loop: true,
    autoplay: {
        delay: 5000,
        pauseOnMouseEnter: true
    },

    navigation: {
        nextEl: '.newsSlider__next',
        prevEl: '.newsSlider__prev'
    },

    breakpoints: {
        0: {
            slidesPerView: 1.1,
            spaceBetween: 16
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 24
        },
        1200: {
            slidesPerView: 3,
            spaceBetween: 40
        }
    }
});


document.addEventListener('DOMContentLoaded', () => {

    /* =================== DATA =================== */

    const concertDays = [
        '2025-12-02',
        '2025-12-03',
        '2025-12-07',
        '2025-12-12',
        '2025-12-14',
        '2025-12-17'
    ];

    const privateDays = [
        '2025-12-06',
        '2025-12-08',
        '2025-12-13',
        '2025-12-19'
    ];

    /* =================== ELEMENTS =================== */

    const toggle = document.getElementById('calendarToggle');
    const dropdown = document.getElementById('calendarDropdown');
    const textEl = document.getElementById('calendarText');
    const calendarEl = document.getElementById('calendar');
    const weekContainer = document.querySelector('.calendar__week');

    let isOpen = false;
    let isFirstRender = true;

    /* =================== TOGGLE =================== */

    toggle.addEventListener('click', e => {
        e.stopPropagation();
        isOpen = !isOpen;
        dropdown.classList.toggle('open', isOpen);
    });

    document.addEventListener('click', e => {
        if (!dropdown.contains(e.target) && !toggle.contains(e.target)) {
            dropdown.classList.remove('open');
            isOpen = false;
        }
    });

    /* =================== WEEK TEXT =================== */

    function setWeekText(monday) {
        const sunday = new Date(monday);
        sunday.setDate(monday.getDate() + 6);

        textEl.textContent =
            `${monday.getDate()}–${sunday.getDate()} ${monday.toLocaleString('en', { month: 'long' })}`;
    }

    /* =================== FULLCALENDAR =================== */

    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        firstDay: 1,
        height: 'auto',
        showNonCurrentDates: false,
        fixedWeekCount: false,

        headerToolbar: {
            left: 'prev',
            center: 'title',
            right: 'next'
        },

        dayCellClassNames(arg) {
            const dateStr = arg.date.toISOString().slice(0, 10);
            if (concertDays.includes(dateStr)) return ['concert'];
            if (privateDays.includes(dateStr)) return ['private'];
            return [];
        },

        dateClick(info) {
            const date = info.date;

            const monday = new Date(date);
            monday.setDate(date.getDate() - ((date.getDay() + 6) % 7));

            setWeekText(monday);

            dropdown.classList.remove('open');
            isOpen = false;

            onWeekSelect(monday);
        }
    });

    calendar.render();

    /* =================== INIT =================== */

    const now = new Date();
    const monday = new Date(now);
    monday.setHours(0, 0, 0, 0);
    monday.setDate(now.getDate() - ((now.getDay() + 6) % 7));

    setWeekText(monday);
    onWeekSelect(monday);

    /* =================== WEEK SELECT =================== */

    function onWeekSelect(startDate) {
        fetchWeekData().then(data => {
            renderWeek(startDate, data);
        });
    }

    /* =================== RENDER WEEK =================== */

    function renderWeek(monday, data) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (!isFirstRender) {
            weekContainer.classList.add('slide-out');
        }

        const render = () => {
            weekContainer.innerHTML = '';

            for (let i = 0; i < 7; i++) {
                const date = new Date(monday);
                date.setDate(monday.getDate() + i);

                const iso = date.toISOString().slice(0, 10);
                const dayData = data.find(d => d.date === formatDMY(date));

                const day = document.createElement('div');
                day.className = 'calendar__day';

                if (date < today) day.classList.add('calendar__day-last');
                if (date.getTime() === today.getTime()) day.classList.add('calendar__day-today');
                if (concertDays.includes(iso)) day.classList.add('concert');
                if (privateDays.includes(iso)) day.classList.add('private');

                day.innerHTML = `
                    <div class="calendarDay__dateWrap">
                        ${date.getTime() === today.getTime()
                            ? '<span class="calendarDayDate__green">Today</span>'
                            : ''}
                        <p class="calendarDayDate__label">
                            ${date.toLocaleDateString('en',{weekday:'short'}).toUpperCase()}
                        </p>
                        <h5 class="calendarDayDate__value">${date.getDate()}</h5>
                    </div>
                    <div class="calendarDay__content">
                        ${dayData ? renderRows(dayData.news) : ''}
                    </div>
                `;

                weekContainer.appendChild(day);
            }

            if (!isFirstRender) {
                weekContainer.classList.remove('slide-out');
                weekContainer.classList.add('slide-in');
                setTimeout(() => weekContainer.classList.remove('slide-in'), 300);
            }

            isFirstRender = false;
        };

        if (!isFirstRender) {
            setTimeout(render, 300);
        } else {
            render();
        }
    }

    /* =================== ROWS =================== */

    function renderRows(news) {
        if (!news || !news.length) return '';

        return `
            <div class="calendarDay__rows">
                ${news.map(item => `
                    <a href="${item.link}" class="calendarDay__row">
                        <div class="calendarDayRow__top">
                            <p class="calendarDayRowTop__label">${item.type}</p>
                        </div>
                        <div class="calendarDayRow__titleWrap">
                            <h5 class="calendarDayRow__title">${item.title}</h5>
                        </div>
                        <div class="calendarDayRow__textWrap">
                            <p class="calendarDayRow__text">${item.text}</p>
                        </div>
                    </a>
                `).join('')}
            </div>
        `;
    }

    /* =================== MOCK AJAX =================== */

    function fetchWeekData() {
        return Promise.resolve([{
                date: '24-12-2025',
                news: [{
                    link: '#',
                    title: 'Raivo Stašana',
                    text: 'Romantisks solo saksofonam',
                    type: 'Concert'
                }]
            },
            {
                date: '25-12-2025',
                news: [{
                        link: '#',
                        title: 'Tautas deju koncerts',
                        text: 'Latviju caurvijot',
                        type: 'Concert'
                    },
                    {
                        link: '#',
                        title: 'Vakara koncerts',
                        text: 'Dzīvā mūzika',
                        type: 'Private'
                    }
                ]
            },
            {
                date: '26-12-2025',
                news: [{
                        link: '#',
                        title: 'Tautas deju koncerts',
                        text: 'Latviju caurvijot',
                        type: 'Concert'
                    },
                    {
                        link: '#',
                        title: 'Vakara koncerts',
                        text: 'Dzīvā mūzika',
                        type: 'Private'
                    }
                ]
            }
        ]);
    }

    /* =================== HELPERS =================== */

    function formatDMY(date) {
        return `${String(date.getDate()).padStart(2,'0')}-${String(date.getMonth()+1).padStart(2,'0')}-${date.getFullYear()}`;
    }

});