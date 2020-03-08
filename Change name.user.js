// ==UserScript==
// @name         Alberto Müller
// @namespace    https://github.com/melusc/lusc
// @version      1.5.4
// @author       lusc
// @match        https://moodle.ksasz.ch/user/profile.php?*
// @grant        none
// @updateURL    https://github.com/melusc/lusc/raw/master/Change%20name.user.js
// @downloadURL  https://github.com/melusc/lusc/raw/master/Change%20name.user.js
// ==/UserScript==

let script = document.createElement('script');
script.innerHTML = `if (document.querySelector('.page-header-headings').children[0].innerHTML == 'Alberto Caprioni') {
    let whitespace = document.createElement('span'),
        input = document.createElement('input');

    whitespace.innerHTML = '&nbsp;&nbsp;&nbsp;';
    whitespace.setAttribute('style', 'display:inline');
    whitespace.id = 'whitespace';

    input.setAttribute('type', 'button');
    input.setAttribute('value', 'Beautify profile');
    input.setAttribute('class', 'buttons');
    input.setAttribute('id', 'profileChanger');
    input.setAttribute('onclick', 'beautify()');

    if (document.querySelector('#exploreProfiles')) {
        document
            .querySelector('.page-header-headings')
            .appendChild(input);
        document
            .querySelector('.page-header-headings')
            .insertBefore(whitespace, document.querySelector('.page-header-headings').children[3]);
    } else {
        document
            .querySelector('.page-header-headings')
            .children[0]
            .setAttribute('style', 'display:inline');
        input.setAttribute('style', 'display:inline');
        document
            .querySelector('.page-header-headings')
            .appendChild(whitespace);
        document
            .querySelector('.page-header-headings')
            .appendChild(input);
    }
}

function beautify() {
    document.querySelector('body').innerHTML = document.querySelector('body').innerHTML.replace(/Caprioni/g, 'Caprilotti');
    document.querySelector('body').innerHTML = document.querySelector('body').innerHTML.replace(/caprioni/g, 'caprilotti');

    document.querySelector('#profileChanger').value = 'Uglify Profile';
    document.querySelector('#profileChanger').setAttribute('onclick','uglify()');
}
function uglify() {
    document.querySelector('body').innerHTML = document.querySelector('body').innerHTML.replace(/Caprilotti/g, 'Caprioni');
    document.querySelector('body').innerHTML = document.querySelector('body').innerHTML.replace(/caprilotti/g, 'caprioni');

    document.querySelector('#profileChanger').value = 'Beautify Profile';
    document.querySelector('#profileChanger').setAttribute('onclick','beautify()');
}`;
document.head.appendChild(script);
