const id = e => document.getElementById(e);
const c = e => document.createElement(e);

const amountInput = id('amount');
amountInput.value = 9;
const lunchInput = id('lunch');
lunchInput.value = 6;
const tbody = document.getElementsByClassName('tbody')[0];
const textarea = document.getElementsByTagName('textarea')[0];
const clearButton = id('clear');
clearButton.addEventListener('click', clear);

const timeInput = c('input');
timeInput.type = 'time';

const times = {
  0: '08:00 - 08:45',
  1: '08:45 - 09:30',
  2: '09:50 - 10:35',
  3: '10:40 - 11:25',
  4: '11:30 - 12:15',
  5: '12:20 - 13:05',
  6: '13:10 - 13:55',
  7: '13:55 - 14:40',
  8: '14:50 - 15:35',
};

const courses = {};
const lunchVals = {
  old: null,
  origin: null,
};
modifyRows();

updateTextarea();
document.body.addEventListener('input', handleInput);

function modifyRows() {
  if (!(+amountInput.value < +amountInput.min)) {
    while (tbody.childElementCount > +amountInput.value) {
      tbody.removeChild(tbody.lastElementChild);
    }
    while (tbody.childElementCount < +amountInput.value) {
      const row = c('div');
      row.classList.add('row');
      const time = document.createElement('div');
      time.classList.add('td', 'time');
      time.textContent = times[tbody.childElementCount] || '';
      time.tabIndex = 1;
      time.appendChild(c('br'));
      time.contentEditable = true;
      time.addEventListener('focus', selectAll);
      row.appendChild(time);
      for (let i = 0; i < 5; i++) {
        const td = c('div');
        td.classList.add('td');
        td.contentEditable = true;
        td.tabIndex = i + 2;
        td.addEventListener('focus', selectAll);
        const dataId = tbody.childElementCount + '-' + (i + 1);
        td.dataset.id = dataId;
        if (Object.prototype.hasOwnProperty.call(courses, dataId))
          td.textContent = courses[dataId];
        if (tbody.childElementCount === +lunchInput.value - 1)
          td.textContent = 'Mittag';
        td.appendChild(c('br'));
        row.appendChild(td);
      }
      tbody.appendChild(row);
    }

    if (+lunchInput.value > +amountInput.value) {
      if (lunchVals.origin === null) lunchVals.origin = +lunchInput.value;
      lunchInput.value = amountInput.value;
    }
    changeLunch();
  }
}

function handleInput(e) {
  if (e.target.classList.contains('time')) {
    validateTime();
  } else if (e.target.nodeName === 'DIV' && e.target.classList.contains('td')) {
    if (e.target.textContent.trim() === 'Mittag') {
      delete courses[e.target.dataset.id];
    } else {
      courses[e.target.dataset.id] = e.target.textContent;
    }
  } else if (e.target.id === 'amount') {
    modifyRows();
  } else if (e.target.id === 'lunch') {
    changeLunch(e);
  } else if (e.target.nodeName === 'TEXTAREA') {
    handleJSON(e);
    return;
  }
  updateTextarea();
}

function validateTime() {
  const children = [...tbody.children].map(e => e.firstElementChild);
  let anyRed = false;
  for (let i = 0; i < children.length; i++) {
    const value = children[i].textContent;
    if (
      value.match(/-/g) &&
      value.match(/-/g).length === 1 &&
      value.match(/:/g) &&
      value.match(/:/g).length === 2
    ) {
      let [from, to] = value.split('-');
      from = from.trim();
      to = to.trim();
      timeInput.value = from;
      const fromValid = timeInput.value.trim() === from;
      timeInput.value = to;
      const toValid = timeInput.value.trim() === to;
      if (fromValid && toValid) {
        children[i].style.color = '';
      } else {
        children[i].style.color = 'red';
      }
    } else {
      children[i].style.color = 'red';
      anyRed = true;
    }
  }
  if (anyRed) return;

  let anyWrongOrder = false;
  const values = children.map(e => {
    const obj = {};
    obj.input = e;
    let [from, to] = e.textContent.split('-');
    from = from.trim();
    to = to.trim();
    obj.from = +from.split(':')[0] * 60 + +from.split(':')[1];
    obj.to = +to.split(':')[0] * 60 + +to.split(':')[1];
    if (obj.from > obj.to) {
      anyWrongOrder = true;
      e.style.color = 'red';
    }
    return obj;
  });
  if (anyWrongOrder) return;

  for (let i = 0; i < values.length - 1; i++) {
    if (values[i + 1].from < values[i].to) {
      values[i + 1].input.style.color = 'red';
      values[i].input.style.color = 'red';
    }
  }
  for (let i = 0; i < children.length; i++) {
    if (children[i].style.color === '') {
      times[i] = children[i].textContent;
    }
  }
}

function changeLunch(e) {
  if (typeof e !== 'undefined') {
    lunchVals.origin = null;
  }

  if (
    lunchVals.origin !== null &&
    +lunchInput.value < lunchVals.origin &&
    amountInput.value > +lunchInput.value
  ) {
    lunchInput.value = lunchVals.origin;
  }
  if (+lunchInput.value > +amountInput.value)
    lunchInput.value = amountInput.value;
  if (+lunchInput.value < +lunchInput.min) lunchInput.value = lunchInput.min;

  if (lunchVals !== null && lunchInput.value >= lunchVals.origin)
    lunchVals.origin = null;

  const oldRow = tbody.children[lunchVals.old];
  if (oldRow) {
    for (let i = 1; i < oldRow.childElementCount; i++) {
      const el = oldRow.children[i];
      if (el.textContent.trim() === 'Mittag') el.textContent = '';
    }
  }
  if (+lunchInput.value > 0) {
    const newRow = tbody.children[+lunchInput.value - 1];
    for (let i = 1; i < newRow.childElementCount; i++) {
      const el = newRow.children[i];
      if (el.textContent.trim() === '') el.textContent = 'Mittag';
    }
    lunchVals.old = +lunchInput.value - 1;
  }
}

function updateTextarea() {
  const obj = {
    times: [],
    1: {},
    2: {},
    3: {},
    4: {},
    5: {},
    lunch: +lunchInput.value,
    amount: +amountInput.value,
    valid: true,
  };
  const invalid = JSON.parse({
    valid: false,
  });
  for (let i = 0; i < tbody.childElementCount; i++) {
    if (tbody.children[i].firstElementChild.style.color === 'red') {
      textarea.value = invalid;
      return;
    }
  }
  const timeKeys = Object.keys(times);
  for (let i = 0; i < timeKeys.length; i++) {
    if (Object.prototype.hasOwnProperty.call(times, timeKeys[i])) {
      let [from, to] = times[timeKeys[i]].split('-');
      from = from.trim();
      to = to.trim();
      const fromTime = +from.split(':')[0] * 60 + +from.split(':')[1];
      const toTime = +to.split(':')[0] * 60 + +to.split(':')[1];
      obj.times[i] = [fromTime, toTime];
    }
  }
  for (let i = 0; i < tbody.childElementCount; i++) {
    for (let j = 0; j < 5; j++) {
      const text = tbody.children[i].children[j + 1].textContent;
      if (text !== '') {
        obj[j + 1][i + 1] = text;
      }
    }
  }
  textarea.value = JSON.stringify(obj, null, 2);
}

function selectAll(e) {
  const cL = e.target.classList;
  if (cL.contains('td') && e.target.firstChild.nodeType === Node.TEXT_NODE) {
    const range = new Range();
    const sel = getSelection();
    const end = e.target.textContent.length;
    this.focus();
    range.setStart(e.target.firstChild, 0);
    range.setEnd(e.target.firstChild, end);
    sel.removeAllRanges();
    sel.addRange(range);
  }
}

function clear() {
  for (let i = 0; i < tbody.childElementCount; i++) {
    for (let j = 1; j < 6; j++) {
      const el = tbody.children[i].children[j];
      el.textContent = '';
    }
  }
}

function handleJSON() {
  const value = textarea.value;
  try {
    const json = JSON.parse(value);
    if (
      Object.prototype.hasOwnProperty.call(json, 1) &&
      Object.prototype.hasOwnProperty.call(json, 2) &&
      Object.prototype.hasOwnProperty.call(json, 3) &&
      Object.prototype.hasOwnProperty.call(json, 4) &&
      Object.prototype.hasOwnProperty.call(json, 5) &&
      Object.prototype.hasOwnProperty.call(json, 'times') &&
      Object.prototype.hasOwnProperty.call(json, 'lunch') &&
      Object.prototype.hasOwnProperty.call(json, 'amount')
    ) {
      amountInput.value = json.amount;
      lunchInput.value = json.lunch;
      lunchVals.origin = null;
      lunchVals.old = 4;
      modifyRows();

      for (let i = 0; i < json.times.length; i++) {
        const first = +json.times[i][0];
        const second = +json.times[i][1];

        const firstMin = first % 60;
        const firstHour = (first - firstMin) / 60;

        const secondMin = second % 60;
        const secondHour = (second - secondMin) / 60;

        const time = `${('0' + firstHour).slice(-2)}:${('0' + firstMin).slice(
          -2
        )} - ${('0' + secondHour).slice(-2)}:${('0' + secondMin).slice(-2)}`;
        tbody.children[i].firstChild.textContent = time;
        tbody.children[i].firstChild.style.color = '';
      }

      for (let i = 1; i < 6; i++) {
        const keys = Object.keys(json[i]);
        for (let j = 0; j < keys.length; j++) {
          tbody.children[+keys[j] - 1].children[i].textContent =
            json[i][keys[j]];
        }
      }

      textarea.style.color = '';
    } else throw new Error();
  } catch (a) {
    textarea.style.color = 'red';
  }
}

/*function prevent(e) {
  e.preventDefault();
  e.stopPropagation();
  return false;
}*/
