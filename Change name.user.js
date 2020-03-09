// ==UserScript==
// @name         Lolberto Capriolotti
// @namespace    https://github.com/melusc/lusc
// @version      1.5.6
// @author       lusc
// @match        https://moodle.ksasz.ch/user/profile.php?*
// @grant        none
// @updateURL    https://github.com/melusc/lusc/raw/master/Change%20name.user.js
// @downloadURL  https://github.com/melusc/lusc/raw/master/Change%20name.user.js
// ==/UserScript==
let r1 = 'Alberto Caprioni',
    rW1 = 'Lolberto Capriolotti',
    r = `/${r1}/g`,
    rW = `/${rW1}/g`,
    rL = `/${r1.toLowerCase().replace(' ','.')}/g`,
    rWL = `/${rW1.toLowerCase().replace(' ','.')}/g`,
    rL1 = r1.toLowerCase().replace(' ','.'),
    rWL1 = rW1.toLowerCase().replace(' ','.'),
    profile = true,
    script = document.createElement('script');
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
    document.querySelector('body').innerHTML = document.querySelector('body').innerHTML.replace(${r}, '${rW1}');
    document.querySelector('body').innerHTML = document.querySelector('body').innerHTML.replace(${rL}, '${rWL1}');
    document.title = document.title.replace(${r}, '${rW1}');
    if (${profile}){
        document.title = document.title.replace('pro','noob');
}
    document.querySelector('#profileChanger').value = 'Uglify Profile';
    document.querySelector('#profileChanger').setAttribute('onclick','uglify()')
}
function uglify() {
    document.querySelector('body').innerHTML = document.querySelector('body').innerHTML.replace(${rW},'${r1}');
    document.querySelector('body').innerHTML = document.querySelector('body').innerHTML.replace(${rWL}, '${rL1}');
    document.title = document.title.replace(${rW},'${r1}');
    if (${profile}){
        document.title = document.title.replace('noob','pro');
}

    document.querySelector('#profileChanger').value = 'Beautify Profile';
    document.querySelector('#profileChanger').setAttribute('onclick','beautify()');
}`;
document.head.appendChild(script);
