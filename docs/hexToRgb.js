'use strict';
/* jshint esversion: 10 */
document.getElementById('hex').addEventListener('input', hex);
const hexInput = document.getElementById('hex').lastElementChild;

document.getElementById('rgb').addEventListener('input', rgb);
const inputs = [...document.getElementById('rgb').querySelectorAll('input')];

document.getElementById('rand').addEventListener('click', randomise);

addEventListener('popstate',()=>{
    hex();
});

const random = () => Math.floor(Math.random() * 256);

let oldValRgb;

if (location.search === '') {
    inputs.map(e => e.value = random());
} else {
    hex();
}
oldValRgb = inputs.map(e => e.value);

rgb();


function hex(e) {
    let string = typeof(e) === 'undefined' ? new URLSearchParams(location.search).get('hex') : hexInput.value;

    string = string.toUpperCase().replace(/[^0-9A-F]/g, '');
    hexInput.value = '#' + string;

    if (string.length === 3) string = string.split('').map(e => e.repeat(2)).join('');
    if (string.length === 6) {
        const url = new URL(location.href);
        url.search = '?hex=' + string;
        history.pushState({},'',url);
        const nums = string.match(/.{2}/g).map(e => parseInt(e, 16));

        for (let i = 0; i < 3; i++) {
            inputs[i].value = nums[i];
        }
        document.body.style.backgroundColor = hexInput.value;
    }
    return false;
}

function rgb(e) {
    if (typeof(e) !== 'undefined') {
        const index = inputs.indexOf(e.target);

        if (e.target.validity.badInput) e.target.value = oldValRgb[index];
        else oldValRgb[index] = e.target.value;

        e.target.value = ((e.target.value === '') ? '' : +e.target.value.replace(/[^\d]/g, ''));

        if (+e.target.value > 255) e.target.value = 255;
        else if (+e.target.value < 0) e.target.value = 0;
    }
    const nums = inputs.map(a => (+a.value).toString(16)).map(a => ('0' + a).slice(-2));

    hexInput.value = '#' + nums.join('').toUpperCase();
    const url = new URL(location.href);
    url.search = '?hex=' + nums.join('').toUpperCase();
    history.pushState({},'',url);

    document.body.style.backgroundColor = hexInput.value;
    return false;
}

function randomise(e) {
    e.preventDefault();
    e.stopPropagation();
    inputs.map(e => e.value = random());
    rgb();
    return false;
}