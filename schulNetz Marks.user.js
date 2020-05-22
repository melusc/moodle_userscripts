// ==UserScript==
// @name         Moodle unconfirmed marks on schulNetz
// @version      2020.05.21b
// @author       lusc
// @match        https://moodle.ksasz.ch/
// @match        https://moodle.ksasz.ch/?*
// @downloadURL  https://github.com/melusc/lusc/raw/master/schulNetz%20Marks.user.js
// @updateURL    https://github.com/melusc/lusc/raw/master/schulNetz%20Marks.user.js
// @grant        GM_xmlhttpRequest
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==
'use strict';
let url = GM_getValue('url');
if(!url){
    url = prompt('What is the url to your schulNetz.mobile?\nYou can get the url from the frontpage of schulNetz\nExample: https://www.schul-netz.com/ausserschwyz/mindex.php?longurl=****');
    GM_setValue('url',url);
}
let pin = GM_getValue('pin');
if(!pin){
    pin = prompt('What is your pin?');
    GM_setValue('pin',pin);
}
const c = (e)=>{
    return document.createElement(e);
}

const li = c('li'),
      div = c('div'),
      div1 = c('div'),
      strong = c('strong'),
      divTable = c('div'),
      loadingSpan = c('span'),
      loadingI = c('i');

loadingSpan.classList.add('loading-icon','icon-no-margin');
loadingI.classList.add('icon','fa','fa-circle-o-notch','fa-spin','fa-fw');
loadingI.title = 'Loading';
loadingI.style.color = 'white';
loadingSpan.appendChild(loadingI);

li.classList.add('activity','label','modtype_label');
li.id = 'module-marks';

strong.innerHTML = 'Unbestätigte Noten';
strong.style.fontSize = 'medium';

div.classList.add('mod-indent-outer');

div1.classList.add('contentwithoutlink');

divTable.appendChild(loadingSpan);

div1.appendChild(c('hr'));
div1.appendChild(strong);
div1.appendChild(c('br'));
div1.appendChild(c('br'));
div1.appendChild(divTable);

div.appendChild(div1);
li.appendChild(div);
document.getElementById('module-533').parentElement.insertBefore(li,document.getElementById('module-533'));

const data = new FormData();
data.append('pin',pin);

GM_xmlhttpRequest({
    method: 'POST',
    url: url,
    data: data,
    anonymous: true,
    onload: res => {
        divTable.removeChild(loadingSpan);
        let doc = new DOMParser().parseFromString(res.response,'text/html');
        divTable.appendChild(doc.getElementsByClassName('mdl-data-table mdl-js-data-table mdl-shadow--2dp mdl-table--cls-print-table')[0]);
    }
})