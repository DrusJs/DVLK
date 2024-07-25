const PRELOADER_MAX_WIDTH = 99.9

function loaderBar() {
    let counter = 1;
    const elem = document.querySelector('.progress-bar span');
    let width = 99;
    let id = setInterval(frame, 20);
    const preloader = document.querySelector('.preloader')

    function frame() {
        if (width >= PRELOADER_MAX_WIDTH) {
            clearInterval(id);
            counter = 0;
            preloader.classList.add('hide')
            document.body.classList.remove('scroll--disabled')
        } else {
            width = width + 1;
            elem.style.width = width + "%";
        }
    }
} 

const navigationDropdown = document.querySelector('.dropdown-nav')
if (navigationDropdown) {
    navigationDropdown.addEventListener('mouseenter', (e)=>{
        e.currentTarget.classList.add('active')
    })  
    navigationDropdown.addEventListener('mouseleave', (e)=>{
        e.currentTarget.classList.remove('active')
    }) 

} 

const selectDropdown = document.querySelector('.mainscreen__dropdown-wrapper')
if (selectDropdown) {
    selectDropdown.addEventListener('click', (e)=>{
        e.currentTarget.classList.toggle('active')
    })
    
    selectDropdown.querySelectorAll('.dropdown-content__li').forEach(el=>{
        el.addEventListener('click', (e)=>{
            const value = e.currentTarget.innerHTML
            e.currentTarget.closest('.mainscreen__dropdown-wrapper').querySelector('.value').innerHTML = value
        })
    })
}

if (document.querySelector('.services__tab-item')) {
    document.querySelectorAll('.services__tab-item').forEach((el, index) =>{
        const tabs = document.querySelectorAll('.services__block')
        el.addEventListener('click', (e)=>{
            if (!e.currentTarget.classList.contains('services__tab-item--active')) {
                e.currentTarget.parentElement.querySelector('.services__tab-item--active').classList.remove('services__tab-item--active')
                e.currentTarget.classList.add('services__tab-item--active')
                document.querySelector('.services__block.active').classList.remove('active')
                console.log(index)
                tabs[index].classList.add('active')
            }
        })
    })
}

if (document.querySelector('.contacts__status-li')) {
    document.querySelectorAll('.contacts__status-li').forEach(link=>{
        link.addEventListener('click', (e) => {
            e.currentTarget.parentElement.querySelector('.contacts__status-li--active').classList.remove('contacts__status-li--active')
            e.currentTarget.classList.add('contacts__status-li--active')
        })
    })
}

if (document.querySelector('.schedule__tab')) {
    document.querySelectorAll('.schedule__tab').forEach(link=>{
        link.addEventListener('click', (e) => {
            e.currentTarget.parentElement.querySelector('.schedule__tab--active').classList.remove('schedule__tab--active')
            e.currentTarget.classList.add('schedule__tab--active')
        })
    })
}

if (document.querySelector('.pop-up-wrapper')) { 
    if (document.getElementById('main-timeout')) {
        setTimeout(()=>{ 
            document.querySelector('.pop-up-wrapper').classList.add('active') 
        }, 6000) 
        loaderBar()
    }

    document.querySelectorAll('.close-button').forEach(el=>{
        el.addEventListener('click', (e)=>{
            e.currentTarget.closest('.pop-up-wrapper').classList.remove('active')
        })
    })
    document.querySelectorAll('.pop-up-wrapper').forEach(el=>{
        el.addEventListener('click', (e)=>{
            if (e.target.classList.contains('pop-up-wrapper')) {
                e.currentTarget.classList.remove('active')
            }
        })
    })
}

const burgerMenu = document.querySelector('.burger-menu')
if (burgerMenu) {
    burgerMenu.addEventListener('click', (e)=>{
        e.currentTarget.classList.toggle('active')
        document.querySelector('.navigation').classList.toggle('active')
        document.body.classList.toggle('scroll--disabled')
    })
}

const sheduleWrapper = document.querySelector('.schedule-relative')
if (sheduleWrapper) {
    sheduleWrapper.addEventListener('click', (e)=>{
        e.currentTarget.classList.toggle('active')
    })

    sheduleWrapper.querySelectorAll('.schedule__tab').forEach(el=>{
        el.addEventListener('click', (e)=>{
            document.querySelector('.mobile-select-wrapper span').innerHTML = e.currentTarget.innerHTML
        })
    })
}

const contactsWrapper = document.querySelector('.contacts__status')
if (contactsWrapper) {
    contactsWrapper.addEventListener('click', (e)=>{
        e.currentTarget.classList.toggle('active')
    })

    contactsWrapper.querySelectorAll('.contacts__status-li').forEach(el=>{
        el.addEventListener('click', (e)=>{
            document.querySelector('.mobile-select-wrapper span').innerHTML = e.currentTarget.firstElementChild.innerHTML
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
              document.getElementById('calendar').value = self.selectedDates[0]
            },
          },
     });
    calendar.init();    
}