let money, time;
let startBtn = document.getElementById('start');
let budgetValue = document.querySelector('.budget-value');
let dayBudgetValue = document.querySelector('.daybudget-value');
let levelValue = document.querySelector('.level-value');
let expensesValue = document.querySelector('.expenses-value');
let optionalExpensesValue = document.querySelector('.optionalexpenses-value');
let incomeValue = document.querySelector('.income-value');
let monthSavingsValue = document.querySelector('.monthsavings-value');
let yearSavingsValue = document.querySelector('.yearsavings-value');

let yearValue = document.querySelector('.year-value');
let monthValue = document.querySelector('.month-value');
let dayValue = document.querySelector('.day-value');
let expensesItem = document.querySelectorAll('.expenses-item');
let expensesBtn = document.querySelector('.expenses-item-btn');
let optionalExpensesBtn = document.querySelector('.optionalexpenses-btn');
let countBtn = document.querySelector('.count-budget-btn');
let optionalExpensesItem = document.querySelectorAll('.optionalexpenses-item');
let incomeItem = document.querySelector('.choose-income');
let sumValue = document.querySelector('.choose-sum');
let percentValue = document.querySelector('.choose-percent');
let checkSavings = document.getElementById('savings');
let b = document.querySelectorAll('button');

for (let i = 0; i < b.length; i++) {
  b[i].setAttribute('disabled', 'disabled');
};
startBtn.removeAttribute('disabled', 'disabled');
startBtn.addEventListener('click', function () {
  money = +prompt('Ваш бюджет на месяц?', '');
  time = prompt('Введите дату в формате YYYY-MM-DD', '');
  while (isNaN(money) || money == '' || money == null) {
    money = +prompt('Ваш бюджет на месяц?', '');
  }
  appData.budget = money;
  appData.timeData = time;
  budgetValue.textContent = money.toFixed();
  yearValue.value = new Date(Date.parse(time)).getFullYear();
  monthValue.value = new Date(Date.parse(time)).getMonth();
  dayValue.value = new Date(Date.parse(time)).getDate();
  for (let i = 0; i < b.length; i++) {
    b[i].removeAttribute('disabled', 'disabled');
  };
});
expensesBtn.addEventListener('click', function () {
  let sum = 0;
  for (let i = 0; i < expensesItem.length; i++) {
    let a = expensesItem[i].value,
      b = expensesItem[++i].value;
    if ((typeof (a)) != null && (typeof (b)) != null &&
      a != '' && b != '' && a.length < 50) {
      console.log('done');
      appData.expenses[a] = +b;
      sum += +b;
    } else {
      i -= 1;
    }
  }
  expensesValue.textContent = sum;
});
optionalExpensesBtn.addEventListener('click', function () {
  for (let i = 0; i < optionalExpensesItem.length; i++) {
    let state = optionalExpensesItem[i].value;
    appData.optionalExpenses[i] = state;
    optionalExpensesValue.textContent += appData.optionalExpenses[i] + ' ';
  }
});
countBtn.addEventListener('click', function () {

  let values = Object.values(appData.expenses);
  let sum1 = 0;
  for (let value in values) {
    sum1 += +values[value];
  };
  let balance = appData.budget - sum1;
  if (appData.budget != undefined) {
    appData.moneyPerDay = (balance / 30).toFixed(1);
    dayBudgetValue.textContent = appData.moneyPerDay;
    if (appData.moneyPerDay < 100) {
      levelValue.textContent = 'Минимальный уровень достатка';
    } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
      levelValue.textContent = 'Средний уровень достатка';
    } else if (appData.moneyPerDay > 2000) {
      levelValue.textContent = 'Высокий уровень достатка';
    } else {
      levelValue.textContent = 'Произошла ошибка';
    }
  } else {
    dayBudgetValue.textContent = 'Произошла ошибка'
  }
});
incomeItem.addEventListener('input', function () {
  let items = incomeItem.value;
  appData.income = items.split(',');
  incomeValue.textContent = appData.income;
});
checkSavings.addEventListener('click', function () {
  if (appData.savings) {
    appData.savings = false;
  } else {
    appData.savings = true;
  }
});
sumValue.addEventListener('input', function () {
  if (appData.savings) {
    let sum = +sumValue.value,
      percent = +percentValue.value;
    appData.monthIncome = sum / 100 / 12 * percent;
    appData.yearIncome = sum / 100 * percent;
    monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
    yearSavingsValue.textContent = appData.yearIncome.toFixed(1);

  }
});
percentValue.addEventListener('input', function () {
  if (appData.savings) {
    let sum = +sumValue.value,
      percent = +percentValue.value;
    appData.monthIncome = sum / 100 / 12 * percent;
    appData.yearIncome = sum / 100 * percent;
    monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
    yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
  }
})
let appData = {
  budget: money,
  timeData: time,
  expenses: {},
  optionalExpenses: {},
  income: [],
  savings: false,
};
for (const key in appData) {
  console.log("Наша программа включает в себя данные: " + key);
};