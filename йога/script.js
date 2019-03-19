window.addEventListener('DOMContentLoaded', function () {
  'use stict';
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
      for (i = 0; i < tab.length; i++) {
        if (target == tab[i]) {
          hideTabContent(0);
          showTabContent(i);
          break;
        }
      }
    }
  });
  // Timer
  let deadline = '2019-03-20';

  function getTimeRemaining(endtime) {
    let t = Date.parse(endtime) - Date.parse(new Date()),
      seconds = Math.floor((t / 1000) % 60),
      minutes = Math.floor((t / 1000 / 60) % 60),
      hours = Math.floor((t / 1000 / 60 / 60) % 24 - 4),
      days = Math.floor((t/(1000 * 60 * 60 * 24)));
  
    return  {
      'total': t,
      'seconds': seconds,
      'minutes': minutes,
      'hours': hours,
      'days' : days
    };
  };

  function setClock(id, endtime) {
    let timer = document.getElementById(id),
      hours = timer.querySelector('.hours'),
      minutes = timer.querySelector('.minutes'),
      seconds = timer.querySelector('.seconds');
      days = timer.querySelector('.days')
      timeInterval = setInterval(updateClock, 1000);

    function updateClock() {      
      let t = getTimeRemaining(endtime);
      hours.textContent = t.hours;      
      minutes.textContent = t.minutes;
      seconds.textContent = t.seconds;      
      days.textContent = t.days;
      if(seconds.textContent.length < 2) {
        seconds.textContent = '0' + t.seconds
      };
      if(minutes.textContent.length < 2) {
        minutes.textContent = '0' + t.minutes
      };
      if(hours.textContent.length < 2) {
        hours.textContent = '0' + t.hours
      };
      if(days.textContent.length < 2) {
        days.textContent = '0' + t.days
      };
      if (t.total <=0) {
        clearInterval(timeInterval);
      }
    }

  
}
setClock('timer', deadline);
});