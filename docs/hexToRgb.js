'use strict';
/* jshint esversion: 10 */
document.getElementById('hex').addEventListener('input', hex);
const hexInput = document.getElementById('hex').lastElementChild;

document.getElementById('rgb').addEventListener('input', rgb);
const inputs = [...document.getElementById('rgb').querySelectorAll('input')];

let oldValHex = hexInput.value.length;

const oldValRgb = inputs.map(e => e.value);

rgb({
    target: inputs[0]
});



function hex(e) {
    let index = hexInput.selectionStart + (hexInput.value.indexOf('#') === -1 ? 1 : 0);

    let string = e.target.value.toLowerCase().replace(/[^0-9a-f]/g, '');
    e.target.value = '#' + string.toUpperCase();

    if (oldValHex === string.length) index--;

    oldValHex = string.length;

    e.target.setSelectionRange(index, index);

    if (string.length === 3) string = string.split('').map(e => e.repeat(2)).join('');
    if (string.length === 6) {
        const nums = string.match(/.{2}/g).map(e => parseInt(e, 16));

        for (let i = 0; i < 3; i++) {
            inputs[i].value = nums[i];
        }
        document.body.style.backgroundColor = e.target.value;
    }
}

function rgb(e) {
    const index = inputs.indexOf(e.target);
    if (e.target.validity.badInput) e.target.value = oldValRgb[index];
    else oldValRgb[index] = e.target.value;

    e.target.value = ( (e.target.value === '') ? '' : parseInt(e.target.value) );
    
    if (+e.target.value > 255) e.target.value = 255;
    else if (+e.target.value < 0) e.target.value = 0;

    const nums = inputs.map(a => (+a.value).toString(16)).map(a => a.length < 2 ? '0' + a : a);

    hexInput.value = ('#' + nums.join('')).toUpperCase();

    document.body.style.backgroundColor = hexInput.value;
}