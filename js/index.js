window.addEventListener('DOMContentLoaded', () => {

  //Timer
  function countTimer(deadline) {
    let timerHours = document.querySelector('#timer-hours'),
        timerMinutes = document.querySelector('#timer-minutes'),
        timerSeconds = document.querySelector('#timer-seconds');

      function getTemeRemaining() {
        let dateStop = new Date(deadline).getTime(),
            dateStart = new Date().getTime(),
            difference = (dateStop - dateStart) / 1000,
            seconds = Math.floor(difference  % 60),
            minutes = Math.floor((difference / 60) % 60),
            hours = Math.floor(difference / 60/ 60);
            return { hours, minutes, seconds };
      };

     let timer = getTemeRemaining()
     let timerInterval;
      if(timer.hours > 0 && timer.minutes > 0 && timer.seconds > 0) {
        setInterval(render, 1000);
      } else {
        clearInterval(render);
        timerHours.textContent = '00';
        timerMinutes.textContent = '00';
        timerSeconds.textContent = '00';
      }

      function render() {
        let timer = getTemeRemaining();
        timerHours.textContent = timer.hours.toString().length > 1 ? timer.hours : '0' + timer.hours;
        timerMinutes.textContent = timer.minutes.toString().length > 1 ? timer.minutes : '0' + timer.minutes;
        timerSeconds.textContent = timer.seconds.toString().length > 1 ? timer.seconds : '0' + timer.seconds;

        

      }
        


  }
  countTimer('30 september 2020');

  //Menu
  const toggleMenu = () => {
    const btnMenu = document.querySelector('.menu'),
          closeMenu = document.querySelector('.close-btn'),
          menu = document.querySelector('menu'),
          menuItem = menu.querySelectorAll('ul>li');
    
    const handlerMenu = () => {
      if(document.documentElement.clientWidth > 768) {
        menu.removeAttribute('style');
        menu.classList.toggle('active-menu');  
      } 
      else {
        menu.setAttribute('style', 'transition: 0s');
        menu.classList.toggle('active-menu');
      }     
    }          
    document.addEventListener('click', event => {
      let target = event.target;
        if(target.classList.contains('btnMenu') 
          || target.classList.contains('close-btn') 
          || target.parentElement === btnMenu) {
          handlerMenu();
          menuItem.forEach( item => {
            if(event.target === item.querySelector('a')) handlerMenu();           
          });
        }
        else if(menu.classList.contains('active-menu')) {
          if(target === menu) return
          handlerMenu()         
        }            
    });
    

  }
  toggleMenu();


  //Modal
  const popupToggle = () => {

    const popupBtn = document.querySelectorAll('.popup-btn'),
          popup = document.querySelector('.popup'),
          popupClose = popup.querySelector('.popup-close');

    let open;
    let close;
    let i = 0;

    function openPopup() {
      open = requestAnimationFrame(openPopup);
      popup.style.opacity = i;
      popup.style.display = `block`;     
      if(i  < 1) popup.style.opacity = i += 0.1;  
      else { 
        cancelAnimationFrame(open)
      }  
    }
    function closePopup() {
      close = requestAnimationFrame(closePopup);
      popup.style.opacity = 1;
      
      if(i  > 0 ) popup.style.opacity = i -= 0.1;  
      else {
        popup.style.display = ``; 
        cancelAnimationFrame(close)
      }  

    }  

    popupBtn.forEach( btn => btn.addEventListener('click', () => {
      // ширина экрана меньше 768px
      if(document.documentElement.clientWidth <= 768) {
        popup.style.display = 'block'
      } else {
        open = window.requestAnimationFrame(openPopup) 
      }

    }));
    popupClose.addEventListener('click', () => {
      if(document.body.clientWidth <= 768) {
        popup.style.display = ''
      } else {
        close = window.requestAnimationFrame(closePopup)
      }

    });   
  }
  popupToggle();


  //Anchors
  anchorsanimated = () => {
   
    const anchors = document.querySelectorAll('a[href*="#"]');

    anchors.forEach( el => {
      el.addEventListener('click', (e) => {
        if(document.documentElement.clientWidth <= 768) return;
        e.preventDefault();
        const blockID = document.getElementById(el.getAttribute('href').substr(1)); 
        if(blockID === null) return;    
        let incr = 0;
        let open = requestAnimationFrame(scrollGently);
        function scrollGently() {
          open = requestAnimationFrame(scrollGently);        
          if(incr < blockID.offsetTop) {
            incr = incr += 60;
            window.scrollTo(0, incr)
          } else {
            cancelAnimationFrame(open)
            }
          }   
      });
    });
  }
  anchorsanimated();


  //Tabs
  const tabToggle = () => {

    const service = document.getElementById('service-block'),
          tabsHeader = document.querySelectorAll('.service-header-tab'),
          tabs = document.querySelectorAll('.service-tab');
    tabs.forEach( tab => tab.style.display = 'none');
    tabs[0].style.display = 'flex';
    function slideTabs(i) {
      tabs.forEach( tab => {
        tab.style.display = 'none';
      });
      tabs[i].style.display = 'flex'
    }       

    function tabsMoving(event) {
      event.preventDefault();
      let target = event.target;
        if(!target.classList.contains('service-header-tab')) {
          target =  target.parentElement;

        }

        if(target.classList.contains('service-header-tab') ) {
          tabsHeader.forEach( (tab, i) => {
              tab.classList.remove('active');
              if(tab === target)  slideTabs(i);         
            })
            target.classList.add('active');        
          }      
    }

    service.addEventListener('click', (event) => tabsMoving(event), false)
  }

  tabToggle();


  // Slider
  const slider = () => {

    const slider = document.querySelector('.portfolio-content'),
          slide = document.querySelectorAll('.portfolio-item');

    let current = 0,
        interval;

    const dotDinamicAdd = function() {
      slide.forEach( slide => {
        let dot = document.createElement('li');
        dot.classList.add('dot')
        document.querySelector('.portfolio-dots').insertAdjacentElement('beforeend', dot);        
      })
    }  
    dotDinamicAdd(); 
    const dot = document.querySelectorAll('.dot');
    dot[0].classList.add('dot-active')




    const nextSlide = (el, index, classStr) => {
      el[index].classList.add(classStr);    
    }
    const prevSlide = (el, index, classStr) => {             
      el[index].classList.remove(classStr);
    }

    const autoSlide = () => {
      prevSlide(slide, current, 'portfolio-item-active'); 
      prevSlide(dot, current, 'dot-active'); 
      current++; 
      if(current >= slide.length) current = 0;
      nextSlide(slide, current, 'portfolio-item-active');      
      nextSlide(dot, current, 'dot-active');      
    }
    const startSlide = (time = 3000) => {     
      interval = setInterval(autoSlide, time);

    }
    const stopSlide = () => clearInterval(interval);

    slider.addEventListener('click', event => {
      event.preventDefault();
      let target = event.target;
      if(!target.matches('#arrow-right, #arrow-left, .dot')) return;

      prevSlide(slide, current, 'portfolio-item-active'); 
      prevSlide(dot, current, 'dot-active'); 

      if(target.matches('#arrow-right')) current++;
      else if(target.matches('#arrow-left')) current--;
      else if(target.matches('.dot')) {
        dot.forEach( (el, index) => {
          if(el === target) current = index;
        });
      }
      if(current >= slide.length) current = 0;
      if(current < 0 ) current = slide.length - 1;
      nextSlide(slide, current, 'portfolio-item-active');      
      nextSlide(dot, current, 'dot-active'); 
    });

    slider.addEventListener('mouseover', event => {
      if(event.target.matches('#arrow-left, #arrow-right, .dot')) stopSlide();    
    })
    slider.addEventListener('mouseout', event => {
      if(event.target.matches('#arrow-left, #arrow-right, .dot')) startSlide(2000);
    })

    startSlide(2000);        

  }
  slider();

  //Comands
  const commandImg = () => {
    const commandBlock = document.getElementById('command');
    let src;
    let hover;

    const animCopleted = (el) => {
      let i = 0;

      const animFunc = () => {     
        el.style.opacity = i;
        i = i + 0.03;
        if(i < 1) requestAnimationFrame(animFunc);     
      }
      requestAnimationFrame(animFunc);        
    }

    const transformImg = (target) => {      
      animCopleted(target)
      src = target.src;
      hover = target.getAttribute('data-img');
      target.src = hover
      target.setAttribute('data-img', src)
    }

    commandBlock.addEventListener('mouseover', event => {
      target = event.target;      
      if(target.matches('.command__photo')) transformImg(target);        
    })
    commandBlock.addEventListener('mouseout', event => {
      target = event.target;      
      if(target.matches('.command__photo')) transformImg(target);  
    })
  }
  commandImg();

  // Calc
  const calc = (price = 100) => {
    const calcBlock = document.querySelector('.calc-block'),
          calcType = document.querySelector('.calc-type'),
          calcSquare = document.querySelector('.calc-square'),
          calcCount = document.querySelector('.calc-count'),
          calcDay = document.querySelector('.calc-day');
    let calcTotal = document.getElementById('total');

    calcBlock.addEventListener( 'input', (event) => {
      if(event.target.matches('.calc-count, .calc-day, .calc-square')) {
        event.target.value = event.target.value.replace (/[\D\s]/, '').trim()
      }     
    });

    const animTotal = (num) => {
      let i = 1;    
      const plus = () => {
        if(num >= 500) i += 5;
        else if(num >= 3000) i += 10;
        else if(num >= 10000) i += 50;
        else i++;

        if( i !== num) calcTotal.textContent = i - 1
        else calcTotal.textContent = i
        if( i >= num) {
          clearInterval(interval);
          return;
        }
      }
      const interval = setInterval( plus , 1)
    }

    const countSum = () => {
      let total = 0,
          countValue = 1,
          dayValue = 1,
          typeValue = calcType.options[calcType.selectedIndex].value,
          squereValue = +calcSquare.value;

      if(calcCount.value > 1) {
        countValue += (calcCount.value - 1) / 10
      }
      if(calcDay.value && calcDay.value < 5) dayValue = 2
      else if(calcDay.value && calcDay.value < 10) dayValue = 1.5

      if(typeValue && squereValue) {
        total = price * typeValue * squereValue * countValue * dayValue
        animTotal(total)
      }
    }

    calcBlock.addEventListener('change', (event) => {
      const target = event.target;
      countSum()
    })
  }
  calc();


  // send Ajax form
  const sendForm = () => {
    const errorMesage = 'Ошибка',
          loadMesage = 'Загрузка',
          successMesage = 'Отправлено';

    const form_1 = document.getElementById('form1'),
          form_2 = document.getElementById('form2');

          form_1.style.cssText = 'position: relative'

    const statusMesage = document.createElement('div');
    statusMesage.style.cssText = `
      position: absolute;
      padding: 6rem 2rem;
      width: 30%;
      top: -100%;
      left: 50%;
      right: 50%;
      transform: translateX(-50%);
      background: #00000094;
      color: #19b5fe;
      font-size: 4rem;
      `;
    //statusMesage.textContent = loadMesage;
    //
    const formIdArray = [form_1, form_2]
    formIdArray.forEach( form => {
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        form.appendChild(statusMesage);

        const request = new XMLHttpRequest();

      })
    })

  }
  sendForm();
});


