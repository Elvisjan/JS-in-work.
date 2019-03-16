let money, time;

function start() {
  money = +prompt('Ваш бюджет на месяц?', '');
  time = prompt('Введите дату в формате YYYY-MM-DD', '');
  while (isNaN(money) || money == '' || money == null) {
    money = +prompt('Ваш бюджет на месяц?', '');
  }
}
start();
let appData = {
  budget: money,
  timeData: time,
  expenses: {},
  optionalExpences: {},
  income: [],
  savings: true,
  chooseExpenses: function () {
    for (let i = 0; i < 2; i++) {
      let a = prompt('Введите обязательную статью расходов в этом месяце', ''),
        b = prompt('Во сколько обойдётся?', '');
      if ((typeof (a)) === 'string' && (typeof (a)) !== null && (typeof (b)) != null &&
        a != '' && b != '' && a.length < 50) {
        console.log('done');
        appData.expenses[a] = b;
      } else {
        i -= 1;
      }
    }
  },
  declineMoneyPerDay: function () {
    appData.moneyPerDay = (appData.budget / 30).toFixed(1);
    alert('Ежедневный бюджет: ' + appData.moneyPerDay);
  },
  detectLevel: function () {
    if (appData.moneyPerDay < 100) {
      console.log('Минимальный уровень достатка');
    } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
      console.log('Средний уровень достатка');
    } else if (appData.moneyPerDay > 2000) {
      console.log('Высокий уровень достатка');
    } else {
      console.log('Произошла ошибка')
    };
  },
  chooseOptExpenses: function () {
    for (let i = 0; i < 2; i++) {
      let state = +prompt('Статья необязательных расходов?', '');
      appData.optionalExpences[i + 1] = state;
    }
  },
  checkSavings: function () {
    if (appData.savings == true) {
      let save = +prompt('Какова сумма накоплений?'),
        percent = +prompt('Под какой процент?');

      appData.monthIncome = save / 100 / 12 * percent;
      alert('Доход в месяц с вашего депозита: ' + appData.monthIncome);
    }
  },
  chooseIncomes: function () {
    let items = prompt('Что принесёт дополнительный доход? (Перечислите через запятую)', '');
    if ((typeof (items)) === 'string' && (typeof (items) !== null) && items != '') {
      appData.income = items.split(', ');
      appData.income.push(prompt('Может что-то ещё?', ''));
      appData.income.sort();
    }
    appData.income.forEach(function (item, i) {
      alert('Способы доп. заработка: ' + (i + 1) + '-' + item);
    });
  }
};