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
    input = form.getElementsByTagName('input'),
    statusMessage = document.createElement('div');
  statusMessage.classList.add('status');
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    form.appendChild(statusMessage);
    let request = new XMLHttpRequest();
    request.open('POST', 'http://127.0.0.1:8080/yoga/server.js');
    request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    let formData = new FormData(form);
    let obj = {};
    for (const [key, value] of formData.entries()) {
      obj[key] = value;
    };
    let jsonObj = JSON.stringify(obj);
    request.send(jsonObj);
    request.addEventListener('readystatechange', function () {
      if (request.readyState < 4) {
        statusMessage.innerHTML = message.loading;
      } else if (request.readyState === 4 && request.status == 200) {
        statusMessage.innerHTML = message.success;
      } else {
        statusMessage.innerHTML = message.failure;
      }
    });
    for (let i = 0; i < input.length; i++) {
      input[i].value = '';
    }
  });
  //Contacts
  let contacts = document.getElementById('form'),
  contactsInput = contacts.getElementsByTagName('input');
  contacts.addEventListener('submit', function(event){
    event.preventDefault();
    contacts.appendChild(statusMessage);
    let request1 = new XMLHttpRequest();
    request1.open('POST', 'http://127.0.0.1:8080/yoga/server.js');
    request1.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    let formData1 = new FormData(contacts);
    let obj1 = {};
    for (const [key, value] of formData1.entries()) {
      obj1[key] = value;
    };
    let jsonObj1 = JSON.stringify(obj1);
    request1.send(jsonObj1);
    request1.addEventListener('readystatechange', function () {
      if (request1.readyState < 4) {
        statusMessage.textContent = message.loading;
      } else if (request1.readyState === 4 && request1.status == 200) {
        statusMessage.textContent = message.success;
      } else {
        statusMessage.textContent = message.failure;
      }
    });
    for (let i = 0; i < contactsInput.length; i++) {
      contactsInput[i].value = '';
    }
  });
});