let money = prompt('Ваш бюджет на месяц?');
let time = prompt('Введите дату в формате YYYY-MM-DD');
let appData = {
  budget: money,
  timeData: time,
  expenses: {
    expensesQuantity: prompt('Введите статью расходов в этом месяце') + ':' + prompt('Во сколько обойдётся?')
   },
  optionalExpences: {
  },
  income: [],
  savings: false
};
alert((appData.budget)/30);