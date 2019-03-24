window.addEventListener('DOMContentLoaded', function () {
  'use strict';
  let tabContent = document.querySelectorAll('.info-tabcontent'),
    tab = document.querySelectorAll('.info-header-tab'),
    header = document.querySelector('.info-header');

  function hideTabContent(a) {
    for (let i = a; i < tabContent.length; i++) {
      tabContent[i].classList.remove('show');
      tabContent[i].classList.add('hide');
    }
  }
  hideTabContent(1);

  function showTabContent(b) {
    if (tabContent[b].classList.contains('hide')) {
      tabContent[b].classList.remove('hide');
      tabContent[b].classList.add('show');
    }
  }
  header.addEventListener('click', function (event) {
    let target = event.target;
    if (target && target.classList.contains('info-header-tab')) {
      for (let i = 0; i < tab.length; i++) {
        if (target == tab[i]) {
          hideTabContent(0);
          showTabContent(i);
          break;
        }
      }
    }
  });
  // Timer
  let deadline = '3019-03-20';

  function getTimeRemaining(endtime) {
    let t = Date.parse(endtime) - Date.parse(new Date()),
      seconds = Math.floor((t / 1000) % 60),
      minutes = Math.floor((t / 1000 / 60) % 60),
      hours = Math.floor((t / 1000 / 60 / 60) % 24),
      days = Math.floor((t / (1000 * 60 * 60 * 24)));

    return {
      'total': t,
      'seconds': seconds,
      'minutes': minutes,
      'hours': hours,
      'days': days
    };
  };

  function setClock(id, endtime) {
    let timer = document.getElementById(id),
      hours = timer.querySelector('.hours'),
      minutes = timer.querySelector('.minutes'),
      seconds = timer.querySelector('.seconds'),
      days = timer.querySelector('.days'),
      timeInterval = setInterval(updateClock, 1000);

    function updateClock() {
      let t = getTimeRemaining(endtime);
      hours.textContent = t.hours;
      minutes.textContent = t.minutes;
      seconds.textContent = t.seconds;
      days.textContent = t.days;
      if (seconds.textContent.length < 2) {
        seconds.textContent = '0' + t.seconds
      };
      if (minutes.textContent.length < 2) {
        minutes.textContent = '0' + t.minutes
      };
      if (hours.textContent.length < 2) {
        hours.textContent = '0' + t.hours
      };
      if (days.textContent.length < 2) {
        days.textContent = '0' + t.days
      };
      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }


  }
  setClock('timer', deadline);
  //Modal
  let more = document.querySelector('.more'),
    descriptionBtn = document.querySelectorAll('.description-btn'),
    overlay = document.querySelector('.overlay'),
    close = document.querySelector('.popup-close');
  more.addEventListener('click', function () {
    overlay.style.display = 'block';
    this.classList.add('more-splash');
    document.body.style.overflow = 'hidden';
  });
  close.addEventListener('click', function () {
    overlay.style.display = 'none';
    more.classList.remove('more-splash');
    document.body.style.overflow = '';
  });
  for (let i = 0; i < descriptionBtn.length; i++) {
    descriptionBtn[i].addEventListener('click', function () {
      overlay.style.display = 'block';
      this.classList.add('more-splash');
      document.body.style.overflow = 'hidden'
    });
  };
  //Form
  let message = {
    loading: 'Загрузка...',
    success: 'Спасибо! Скоро мы с вами свяжемся!',
    failure: 'Что-то пошло не так...'
  };
  let form = document.querySelector('.main-form'),
    input = document.getElementsByTagName('input'),
    contacts = document.getElementById('form'),
    statusMessage = document.createElement('div');
  statusMessage.classList.add('status');

  function sendForm(elem) {
    elem.addEventListener('submit', function (event) {
      event.preventDefault();
      elem.appendChild(statusMessage);
      let formData = new FormData(elem);
      let obj = {}
      for (const [key, value] of formData.entries()) {
        obj[key] = value;
      };
      let json = JSON.stringify(obj);

      function postData(data) {
        return new Promise(function (resolve, reject) {
          let xhr = new XMLHttpRequest();
          xhr.open('POST', 'http://127.0.0.1:8080/yoga/server.js');
          xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
          xhr.onreadystatechange = function () {
            if (xhr.readyState < 4) {
              resolve()
            } else if (xhr.readyState === 4) {
              if (xhr.status == 200 && xhr.status < 300) {
                resolve()
              } else {
                reject()
              }
            }
          }
          xhr.send(data);
        })
      }

      function clearInput() {
        for (let i = 0; i < input.length; i++) {
          input[i].value = '';
        }
      }
      postData(json)
        .then(() => statusMessage.innerText = message.loading)
        .then(() => {
          statusMessage.innerText = message.success;
        })
        .catch(() => statusMessage.innerText = message.failure)
        .then(clearInput)
    });

  }
  sendForm(form);
  sendForm(contacts);
  // Slider
  let slideIndex = 1,
    slides = document.querySelectorAll('.slider-item'),
    prev = document.querySelector('.prev'),
    next = document.querySelector('.next'),
    dotsWrap = document.querySelector('.slider-dots'),
    dots = document.querySelectorAll('.dot');
  showSlides(slideIndex);

  function showSlides(n) {
    if (n > slides.length) {
      slideIndex = 1;
    }
    if (n < 1) {
      slideIndex = slides.length;
    }
    slides.forEach((item) => item.style.display = 'none');
    dots.forEach((item) => item.classList.remove('dot-active'));
    slides[slideIndex - 1].style.display = 'block';
    dots[slideIndex - 1].classList.add('dot-active');
  }

  function plusSlides(n) {
    showSlides(slideIndex += n);
  }

  function currentSlide(n) {
    showSlides(slideIndex = n);
  }
  prev.addEventListener('click', function () {
    plusSlides(-1);
  });
  next.addEventListener('click', function () {
    plusSlides(1);
  });
  dotsWrap.addEventListener('click', function (event) {
    for (let i = 0; i < dots.length; i++) {
      if (event.target.classList.contains('dot') && event.target == dots[i]) {
        console.log(i)
        currentSlide(i + 1);
      }
    }
  });
  // Calculator
  let persons = document.querySelectorAll('.counter-block-input')[0],
    restDays = document.querySelectorAll('.counter-block-input')[1],
    place = document.getElementById('select'),
    totalValue = document.getElementById('total'),
    personsSum = 0,
    daysSum = 0,
    total = 0;
  totalValue.innerText = 0;
  persons.addEventListener('change', function () {
    personsSum = +this.value;
    total = (daysSum + personsSum) * 4000;
    if (personsSum == 0 || personsSum < 0) {
      totalValue.innerText = 0;
    } else {
      totalValue.innerText = total;
    }
  });
  restDays.addEventListener('change', function () {
    daysSum = +this.value;
    total = (daysSum + personsSum) * 4000;
    if (daysSum == 0 || daysSum < 0) {     
      totalValue.innerText = 0;
    } else {
      totalValue.innerText = total;
    }
  });
  place.addEventListener('change', function () {
    if (restDays.value == '' || personsSum == '') {
      totalValue.innerText = 0;
    } else {
      let a = total;
      totalValue.innerText = a * this.options[this.selectedIndex].value;
    }
  })
});