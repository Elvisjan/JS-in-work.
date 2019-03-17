let money, time;
let paymentButton = document.getElementById('start');
let budgetValue = document.querySelector('.budget-value');
let daybudgetValue = document.querySelector('.daybudget-value');
let levelValue = document.querySelector('.level-value');
let expensesValue = document.querySelector('.expenses-value');
let optionalExpencesValue = document.querySelector('.optionalexpences-value');
let incomeValue = document.querySelector('.income-value');
let monthSavingsValue = document.querySelector('.monthsavings-value');
let yearSavingsValue = document.querySelector('.yearsavings-value');
let yearValue = document.querySelector('.year-value');
let monthValue = document.querySelector('.month-value');
let dailyValue = document.querySelector('.daily-value');
let expensesChooseable = document.querySelector('.expenses-item');
let expensesButton = document.querySelector('.expenses-item-btn');
let optExpensesButton = document.querySelector('.optionalexpenses-btn');
let calculate = document.querySelector('.count-budget-btn');
let optionalExpencesItems = document.querySelectorAll('.optionalexpenses-item');
let incomeInput = document.querySelector('.choose-income');
let sumInput = document.querySelector('.choose-sum');
let percentInput = document.querySelector('.choose-percent');
let savingsCheckbox = document.getElementById('savings');

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
      appData.income = items.split(',');
      appData.income.push(prompt('Может что-то ещё?', ''));
      appData.income.sort();
    }
    appData.income.forEach(function (item, i, array) {
      alert('Способы доп. заработка: ' + [i+1] + ' ' + item);
    });
  }
};
for (const key in appData) {
  console.log("Наша программа включает в себя данные: " + key);
};