"use strict";
window.onload = function() {
    document.querySelector('#hex').addEventListener('keyup', function() {
        hex(this);
    });
    document.querySelector('#rgb').addEventListener('keyup', function() {
        rgb(this);
    });
    height();
};

function hex(e) {
    let elem = e.value.replace(/[^0-9a-fA-F]/g, '').toLowerCase();
    e.value = '#' + elem.toUpperCase();
    if (elem.length == 3 || elem.length == 6) {
        if (elem.length == 3) {
            elem = elem[0] + elem[0] + elem[1] + elem[1] + elem[2] + elem[2];
        }
        let r = elem[0] + elem[1],
            g = elem[2] + elem[3],
            b = elem[4] + elem[5],
            rgb;
        r = hexToRgb(r);
        g = hexToRgb(g);
        b = hexToRgb(b);
        rgb = `rgb(${ r },${ g },${ b })`;
        document.querySelector('#rgb').value = rgb;
        document.querySelector('#background').style.backgroundColor = e.value;
    }
}

function hexToRgb(num) {
    num = String(num);
    let first = translate(num[0]),
        second = translate(num[1]);

    function translate(elem) {
        return String(elem).replace(/a/g, '10').replace(/b/g, '11').replace(/c/g, '12').replace(/d/g, '13').replace(/e/g, '14').replace(/f/g, '15');
    }
    return (Number(first) * 16 + Number(second));
}

function rgb(elem) {
    let e = elem.value.replace(/[^0-9bgr(,)]/g, '').toLowerCase().replace(',', ':').replace(',', ':').replace(/,/g, '').replace(/:/g, ',');
    elem.value = e;
    const lastChar = e.slice(-1);
    elem = e.replace(/[^0-9,]/g, '');
    elem = elem.split(',');
    const numCommas = elem.length - 1;
    if (numCommas == 2) {
        for (let i = 0; i <= numCommas; i++) {
            elem[i] = elem[i].substring(0, 3);
        }
        if (lastChar == ')') {
            document.querySelector('#rgb').value = `rgb(${elem[0]},${elem[1]},${elem[2]})`;
        } else {
            document.querySelector('#rgb').value = `rgb(${elem[0]},${elem[1]},${elem[2]}`;
        }
        let r = RgbToHex(elem[0]),
            g = RgbToHex(elem[1]),
            b = RgbToHex(elem[2]),
            hex;
        hex = `#${r}${g}${b}`;
        document.querySelector('#hex').value = hex.toUpperCase();
    }
}

function RgbToHex(num) {
    let first = Math.floor(num / 16),
        second = Math.round(num - first * 16);

    function translate(num) {
        return String(num).replace('10', 'a').replace('11', 'b').replace('12', 'c').replace('13', 'd').replace('14', 'e').replace('15', 'f');
    }
    first = translate(first);
    second = translate(second);
    if (!isNaN(num)) return first + second;
}

function height() {
    let divWidth = document.querySelector('#everything').clientWidth,
        divHeight = document.querySelector('#everything').clientHeight,
        bodyWidth = document.body.clientWidth,
        bodyHeight = document.body.clientHeight,
        left = (bodyWidth - divWidth) / 2,
        top = (bodyHeight - divHeight) / 2;
    document.querySelector('#everything').style.top = top + "px";
    document.querySelector('#everything').style.left = left + "px";
}
