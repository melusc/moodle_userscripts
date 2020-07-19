(() => {
    const id = _ => document.getElementById(_);

    id('buttons').addEventListener('click', check);

    const recordElement = id('record');

    if (localStorage.getItem('record')) {
        recordElement.textContent = localStorage.getItem('record');
    }

    let num = +id('number').textContent;

    function check(e) {
        e.preventDefault();
        e.stopPropagation();

        const divisible = num % 3 === 0 || num % 7 === 0;
        const answer = e.target.dataset.divisible === 'true';

        if (divisible === answer) {
            id('number').textContent = ++num;
        } else {
            console.log('a');
            id('exploded').style.visibility = 'visible';
            if (num > +localStorage.getItem('record')) {
                localStorage.setItem('record', num);
                recordElement.textContent = num;
            }

            console.log('n');
            id('buttons').style.visibility = 'hidden';
            id('reset').style.visibility = 'visible';

            addEventListener('click', reset, {
                once: true,
            });
        }
        return false;
    }

    function reset(e) {
        id('reset').style.visibility = 'hidden';
        id('buttons').style.visibility = 'visible';
        id('exploded').style.visibility = 'hidden';

        id('number').textContent = 1;

        num = 1;

        e.preventDefault();
        e.stopPropagation();
        return false;
    }
})();