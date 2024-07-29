const PRELOADER_MAX_WIDTH = 99.9;
const INITIAL_LOADER_WIDTH = 99;

const navigationDropdown = document.querySelector('.dropdown-nav');

if (navigationDropdown) {
    navigationDropdown.addEventListener('mouseenter', (e)=>{
        e.currentTarget.classList.add('active');
    })  
    navigationDropdown.addEventListener('mouseleave', (e)=>{
        e.currentTarget.classList.remove('active');
    }) 

} 

document.querySelector('.services__tab-item') && document.querySelectorAll('.services__tab-item').forEach((el, index) =>{
    const tabs = document.querySelectorAll('.services__block');

    el.addEventListener('click', (e)=>{
        if (!e.currentTarget.classList.contains('services__tab-item--active')) {
            e.currentTarget.parentElement.querySelector('.services__tab-item--active').classList.remove('services__tab-item--active');
            e.currentTarget.classList.add('services__tab-item--active');
            document.querySelector('.services__block.active').classList.remove('active');
            console.log(index);
            tabs[index].classList.add('active');
        }
    })
})

document.querySelector('.schedule__tab') && document.querySelectorAll('.schedule__tab').forEach(link=>{
    link.addEventListener('click', (e) => {
        e.currentTarget.parentElement.querySelector('.schedule__tab--active').classList.remove('schedule__tab--active');
        e.currentTarget.classList.add('schedule__tab--active');
    })
})


if (document.querySelector('.pop-up-wrapper')) { 
    if (document.getElementById('main-timeout')) {
        // появление модалки-уведомления
        setTimeout(()=>{ 
            document.querySelector('.pop-up-wrapper').classList.add('active'); 
        }, 6000) 

        // вывод лоадера на главной странице
        initLoaderBar();
    }

    document.querySelectorAll('.close-button').forEach(el=>{
        el.addEventListener('click', (e)=>{
            e.currentTarget.closest('.pop-up-wrapper').classList.remove('active');
        })
    })
    document.querySelectorAll('.pop-up-wrapper').forEach(el=>{
        el.addEventListener('click', (e)=>{
            if (e.target.classList.contains('pop-up-wrapper')) {
                e.currentTarget.classList.remove('active');
            }
        })
    })
}

const burgerMenu = document.querySelector('.burger-menu')

if (burgerMenu) {
    burgerMenu.addEventListener('click', (e)=>{
        e.currentTarget.classList.toggle('active');
        document.querySelector('.navigation').classList.toggle('active');
        document.body.classList.toggle('scroll--disabled');
    })
}

const sheduleWrapper = document.querySelector('.schedule-relative')

if (sheduleWrapper) {
    sheduleWrapper.addEventListener('click', (e)=>{
        e.currentTarget.classList.toggle('active');
    })

    sheduleWrapper.querySelectorAll('.schedule__tab').forEach(el=>{
        el.addEventListener('click', (e)=>{
            document.querySelector('.mobile-select-wrapper span').innerHTML = e.currentTarget.innerHTML;
        })
    })
}

const contactsWrapper = document.querySelector('.contacts__status')

if (contactsWrapper) {
    contactsWrapper.addEventListener('click', (e)=>{
        e.currentTarget.classList.toggle('active');
    })

    contactsWrapper.querySelectorAll('.contacts__status-li').forEach(el=>{
        el.addEventListener('click', (e)=>{
            document.querySelector('.mobile-select-wrapper span').innerHTML = e.currentTarget.firstElementChild.innerHTML;
        })
    })
}

const selectItem = document.querySelector('.calc__dropdown-wrapper')

if (selectItem) {
    selectItem.addEventListener('click', (e)=>{
        e.currentTarget.classList.toggle('active');
    })
    
    selectItem.querySelectorAll('.dropdown-content__li').forEach(el=>{
        el.addEventListener('click', (e)=>{
            const value = e.currentTarget.innerHTML;
            e.currentTarget.closest('.calc__dropdown-wrapper').querySelector('.value').innerHTML = value;
        })
    })
}

if (document.getElementById('calendar')) {
    const calendar = new VanillaCalendar('#calendar', { 
        input: true,
        settings: {
            visibility: {
              theme: 'light',
            },
            lang: 'ru-RU', 
          },
          actions: {
            clickDay(event, self) {
              console.log(self.selectedDates);
              document.getElementById('calendar').value = self.selectedDates[0];
            },
          },
     })

    calendar.init();
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        document.querySelectorAll('.contacts__status-li a').forEach((link) => {
          let id = link.getAttribute('href').replace('#', '');
          if (id === entry.target.id) {
            link.parentElement.classList.add('contacts__status-li--active');
            document.querySelector('.mobile-select-wrapper span').innerHTML = link.innerHTML;
          } else {
            link.parentElement.classList.remove('contacts__status-li--active');
          }
        });
      }
    });
  }, {
    threshold: 0.5
});

if (document.querySelector('.contacts__item')) {
    document.querySelectorAll('.contacts__item').forEach(section => { observer.observe(section)} );
}

function initLoaderBar() {
    const elem = document.querySelector('.progress-bar span');
    const preloader = document.querySelector('.preloader');

    let width = INITIAL_LOADER_WIDTH;
    let id = setInterval(frame, 20);

    function frame() {
        if (!elem || !preloader) return;

        if (width >= PRELOADER_MAX_WIDTH) {
            clearInterval(id);
            preloader.classList.add('hide');
            document.body.classList.remove('scroll--disabled');
        } else {
            width++;
            elem.style.width = width + "%";
        }
    }
}