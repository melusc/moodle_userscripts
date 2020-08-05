const getLCM = () => {
  const input = document.getElementById('numbers');
  const str = input.value;
  if (input.validity.valid && str !== '' && !/[a-zA-Z]/.test(str)) {
    input.classList.remove('invalid');
    if (str !== '') {
      let arr = str
        .replace(/[^\d,-]/g, '')
        .replace(/([,-])\1+/g, '$1')
        .split(',')
        .filter(e => e); // no falsy values like '' and 0

      const regex = /^\d+-\d+$/;

      while (arr.findIndex(e => regex.test(e)) !== -1) {
        const ind = arr.findIndex(e => regex.test(e));

        let [first, second] = arr[ind].split('-').map(e => +e);

        if (first > second) [first, second] = [second, first];

        const range = new Array(second - first + 1)
          .fill(0)
          .map((_cur, i) => i + first);

        arr.splice(ind, 1, ...range);
      }
      arr = arr
        .reduce(
          (acc, cur) =>
            acc.indexOf(parseInt(cur)) === -1 ? acc.concat(parseInt(cur)) : acc,
          []
        )
        .filter(e => e > 0)
        .sort((a, b) => a - b);

      const input = document.getElementById('input');
      input.textContent = arr.length > 0 ? arr.join(', ') : 1;

      const primes = [2];

      const max = arr[arr.length - 1];
      for (let i = 2; i <= max; i++) {
        if (primes.every(cur => i % cur !== 0)) {
          primes.push(i);
        }
      }

      const amount = {};
      for (let i = 0; i < arr.length; i++) {
        const curAmount = {};

        let val = arr[i];

        outerLoop: for (let j = 0; j < primes.length; j++) {
          while (val > 1) {
            if (val % primes[j] === 0) {
              val /= primes[j];
              if (curAmount[primes[j]]) {
                curAmount[primes[j]]++;
              } else {
                curAmount[primes[j]] = 1;
              }
            } else {
              continue outerLoop;
            }
          }
        }

        const keys = Object.keys(curAmount).filter(e =>
          Object.prototype.hasOwnProperty.call(curAmount, e)
        );
        for (let j = 0; j < keys.length; j++) {
          const key = keys[j];
          if (amount[key]) {
            if (amount[key] < curAmount[key]) amount[key] = curAmount[key];
          } else {
            amount[key] = curAmount[key];
          }
        }
      }

      const keys = Object.keys(amount).filter(e =>
        Object.prototype.hasOwnProperty.call(amount, e)
      );
      const result = keys.reduce(
        (acc, cur) => acc * BigInt(cur) ** BigInt(amount[cur]),
        1n
      );
      console.log(result);
      const zeroWidthSpace = '​';
      document.getElementById('output').textContent = result
        .toLocaleString('en')
        .replace(/,/g, `,${zeroWidthSpace}`);
    }
  } else {
    input.classList.add('invalid');
    if (input.value === '') {
      document.getElementById('output').textContent = document.getElementById(
        'input'
      ).textContent = 'Enter some numbers';
    } else {
      document.getElementById('output').textContent = document.getElementById(
        'input'
      ).textContent = 'Input is invalid';
    }
  }
};

document.getElementById('numbers').addEventListener('input', getLCM);
document.getElementById('run').addEventListener('click', getLCM);

if (document.getElementById('numbers').value !== '') {
  getLCM();
}
