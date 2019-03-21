let money = +prompt('Ваш бюджет на месяц?'),
    time = prompt('Введите дату в формате YYYY-MM-DD');
let appData = {
  budget: money,
  timeData: time,
  expenses: {},
  optionalExpences: {},
  income: [],
  savings: false
};
for (let i =0; i < 2; i++) {
  let a = prompt('Введите обязательную статью расходов в этом месяце', ''),
      b = prompt('Во сколько обойдётся?', '');
  if ( (typeof (a))=== 'string' && (typeof(a)) !== null && (typeof(b)) != null
  && a != '' && b !='' && a.length < 50) {
    console.log('done');
    appData.expenses[a] = b;
  } 
}
appData.moneyPerDay = appData.budget / 30;
alert('Ежедневный бюджет: ' + appData.moneyPerDay);
if(appData.moneyPerDay < 100) {
  console.log('Минимальный уровень достатка');
} else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
  console.log('Средний уровень достатка');
} else if (appData.moneyPerDay > 2000) {
  console.log('Высокий уровень достатка');
} else {
  console.log('Произошла ошибка')};
class Options {
  constructor(height = 300, width = 600, bg = 'black', fontSize, textAlign = 'center') {
    this.height = height;
    this.width = width;
    this.bg = bg;
    this.fontSize = fontSize;
    this.textAlign = textAlign;
  }

  createDiv(text) {
    let creation = document.createElement('div');
    creation.classList.add('created');
    creation.textContent = text;
    document.body.appendChild(creation);
    creation.style.cssText = `width: ${this.width +'px'}; height: ${this.height+'px'}; color: ${this.bg}; background: yellow;font-size: ${this.fontSize+'px'}; text-align: ${this.textAlign};`
    /*div.style.cssText = 'height; width; bg; fontSize; textAlign;';*/
  }
  changeValues(h, w, b, fs, ta) {
    let created = document.querySelector('.created');
    created.style.cssText += `width: ${w+'px'}; height: ${h+'px'}; color: ${b};font-size: ${fs+'px'}; text-align: ${ta};`
  }
}
let creationOne = new Options(500, 700, 'red', 96, 'right');