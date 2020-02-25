// ===UserScript===
// @name        Clean moodle customisable
// @grant       none
// @version     1.2
// @include     *://moodle.ksasz.ch/*
// @Author      lusc
// @description Improving the looks of moodle
// @downloadURL https://github.com/melusc/lusc/raw/master/clean%20moodle%20customisable.user.js
// @updateURL   https://github.com/melusc/lusc/raw/master/clean%20moodle%20customisable.user.js
// ===/UserScript===

//Currently supports 30 customisations
//It's important that you tell me if something doesn't work, I haven't tested all 30 possible customisations

//Instructions

//customActive* (true/false) is written without '', true means it's active, false means it's deactivated
//customId* is written with '', and is in the format 'label_3_*'
   //the Id can be found by pressing f12 and selecting the to be edited text
//custom* ('replace'/'remove') is written with '' and either replaces the text with your custom text or removes the whole text
//customReplace* is the text you want to edit
//customReplaceWith* is the text you want to replace the text with
//See example below of how to fill in the script
/*
var customActive = true;

var customId = 'label_3_6';

var custom = 'replace';

var customReplace = 'Wahl des Schwerpunktfaches für 1. Gymi-Klassen 2020';

var customReplaceWith = 'SPFWahl';
*/

//No. 1

//Placeholder name
var customActive1 = false; //deactivated if false

var customId1 = 'placeholder';

var custom1 = 'replace'; //'replace' or 'remove'

var customReplace1 = 'placeholder';

var customReplaceWith1 = 'placeholder';


//No. 2

//Placeholder name
var customActive2 = false; //deactivated if false

var customId2 = 'placeholder';

var custom2 = 'replace'; //'replace' or 'remove'

var customReplace2 = 'placeholder';

var customReplaceWith2 = 'placeholder';


//No. 3

//Placeholder name
var customActive3 = false; //deactivated if false

var customId3 = 'placeholder';

var custom3 = 'replace'; //'replace' or 'remove'

var customReplace3 = 'placeholder';

var customReplaceWith3 = 'placeholder';


//No. 4

//Placeholder name
var customActive4 = false; //deactivated if false

var customId4 = 'placeholder';

var custom4 = 'replace'; //'replace' or 'remove'

var customReplace4 = 'placeholder';

var customReplaceWith4 = 'placeholder';


//No. 5

//Placeholder name
var customActive5 = false; //deactivated if false

var customId5 = 'placeholder';

var custom5 = 'replace'; //'replace' or 'remove'

var customReplace5 = 'placeholder';

var customReplaceWith5 = 'placeholder';


//No. 6

//Placeholder name
var customActive6 = false; //deactivated if false

var customId6 = 'placeholder';

var custom6 = 'replace'; //'replace' or 'remove'

var customReplace6 = 'placeholder';

var customReplaceWith6 = 'placeholder';


//No. 7

//Placeholder name
var customActive7 = false; //deactivated if false

var customId7 = 'placeholder';

var custom7 = 'replace'; //'replace' or 'remove'

var customReplace7 = 'placeholder';

var customReplaceWith7 = 'placeholder';


//No. 8

//Placeholder name
var customActive8 = false; //deactivated if false

var customId8 = 'placeholder';

var custom8 = 'replace'; //'replace' or 'remove'

var customReplace8 = 'placeholder';

var customReplaceWith8 = 'placeholder';


//No. 9

//Placeholder name
var customActive9 = false; //deactivated if false

var customId9 = 'placeholder';

var custom9 = 'replace'; //'replace' or 'remove'

var customReplace9 = 'placeholder';

var customReplaceWith9 = 'placeholder';


//No. 10

//Placeholder name
var customActive10 = false; //deactivated if false

var customId10 = 'placeholder';

var custom10 = 'replace'; //'replace' or 'remove'

var customReplace10 = 'placeholder';

var customReplaceWith10 = 'placeholder';


//No. 11

//Placeholder name
var customActive11 = false; //deactivated if false

var customId11 = 'placeholder';

var custom11 = 'replace'; //'replace' or 'remove'

var customReplace11 = 'placeholder';

var customReplaceWith11 = 'placeholder';


//No. 12

//Placeholder name
var customActive12 = false; //deactivated if false

var customId12 = 'placeholder';

var custom12 = 'replace'; //'replace' or 'remove'

var customReplace12 = 'placeholder';

var customReplaceWith12 = 'placeholder';


//No. 13

//Placeholder name
var customActive13 = false; //deactivated if false

var customId13 = 'placeholder';

var custom13 = 'replace'; //'replace' or 'remove'

var customReplace13 = 'placeholder';

var customReplaceWith13 = 'placeholder';


//No. 14

//Placeholder name
var customActive14 = false; //deactivated if false

var customId14 = 'placeholder';

var custom14 = 'replace'; //'replace' or 'remove'

var customReplace14 = 'placeholder';

var customReplaceWith14 = 'placeholder';


//No. 15

//Placeholder name
var customActive15 = false; //deactivated if false

var customId15 = 'placeholder';

var custom15 = 'replace'; //'replace' or 'remove'

var customReplace15 = 'placeholder';

var customReplaceWith15 = 'placeholder';


//No. 16

//Placeholder name
var customActive16 = false; //deactivated if false

var customId16 = 'placeholder';

var custom16 = 'replace'; //'replace' or 'remove'

var customReplace16 = 'placeholder';

var customReplaceWith16 = 'placeholder';


//No. 17

//Placeholder name
var customActive17 = false; //deactivated if false

var customId17 = 'placeholder';

var custom17 = 'replace'; //'replace' or 'remove'

var customReplace17 = 'placeholder';

var customReplaceWith17 = 'placeholder';


//No. 18

//Placeholder name
var customActive18 = false; //deactivated if false

var customId18 = 'placeholder';

var custom18 = 'replace'; //'replace' or 'remove'

var customReplace18 = 'placeholder';

var customReplaceWith18 = 'placeholder';


//No. 19

//Placeholder name
var customActive19 = false; //deactivated if false

var customId19 = 'placeholder';

var custom19 = 'replace'; //'replace' or 'remove'

var customReplace19 = 'placeholder';

var customReplaceWith19 = 'placeholder';


//No. 20

//Placeholder name
var customActive20 = false; //deactivated if false

var customId20 = 'placeholder';

var custom20 = 'replace'; //'replace' or 'remove'

var customReplace20 = 'placeholder';

var customReplaceWith20 = 'placeholder';


//No. 21

//Placeholder name
var customActive21 = false; //deactivated if false

var customId21 = 'placeholder';

var custom21 = 'replace'; //'replace' or 'remove'

var customReplace21 = 'placeholder';

var customReplaceWith21 = 'placeholder';


//No. 22

//Placeholder name
var customActive22 = false; //deactivated if false

var customId22 = 'placeholder';

var custom22 = 'replace'; //'replace' or 'remove'

var customReplace22 = 'placeholder';

var customReplaceWith22 = 'placeholder';


//No. 23

//Placeholder name
var customActive23 = false; //deactivated if false

var customId23 = 'placeholder';

var custom23 = 'replace'; //'replace' or 'remove'

var customReplace23 = 'placeholder';

var customReplaceWith23 = 'placeholder';


//No. 24

//Placeholder name
var customActive24 = false; //deactivated if false

var customId24 = 'placeholder';

var custom24 = 'replace'; //'replace' or 'remove'

var customReplace24 = 'placeholder';

var customReplaceWith24 = 'placeholder';


//No. 25

//Placeholder name
var customActive25 = false; //deactivated if false

var customId25 = 'placeholder';

var custom25 = 'replace'; //'replace' or 'remove'

var customReplace25 = 'placeholder';

var customReplaceWith25 = 'placeholder';


//No. 26

var customActive26 = false; //deactivated if false

var customId26 = 'placeholder';

var custom26 = 'replace'; //'replace' or 'remove'

var customReplace26 = 'placeholder';

var customReplaceWith26 = 'placeholder';


//No. 27

var customActive27 = false; //deactivated if false

var customId27 = 'placeholder';

var custom27 = 'replace'; //'replace' or 'remove'

var customReplace27 = 'placeholder';

var customReplaceWith27 = 'placeholder';


//No. 28

var customActive28 = false; //deactivated if false

var customId28 = 'placeholder';

var custom28 = 'replace'; //'replace' or 'remove'

var customReplace28 = 'placeholder';

var customReplaceWith28 = 'placeholder';


//No. 29

var customActive29 = false; //deactivated if false

var customId29 = 'placeholder';

var custom29 = 'replace'; //'replace' or 'remove'

var customReplace29 = 'placeholder';

var customReplaceWith29 = 'placeholder';


//No. 30

var customActive30 = false; //deactivated if false

var customId30 = 'placeholder';

var custom30 = 'replace'; //'replace' or 'remove'

var customReplace30 = 'placeholder';

var customReplaceWith30 = 'placeholder';

//Code

//Custom1
if (customActive1 === true){
    if (custom1 === 'remove'){
        var elem1 = document.getElementById(customId1);
        elem1.parentNode.removeChild(elem1);
    } else {
        document.getElementById(customId1).innerHTML = document.getElementById(customId1).innerHTML.replace(customReplace1, customReplaceWith1);
    }
}

//Custom2
if (customActive2 === true) {
    if (custom2 === 'remove') {
        var elem2 = document.getElementById(customId2);
        elem2.parentNode.removeChild(elem2);
    } else {
        document.getElementById(customId2).innerHTML = document.getElementById(customId2).innerHTML.replace(customReplace2, customReplaceWith2);
    }
}

//Custom3
if (customActive3 === true) {
    if (custom3 === 'remove') {
        var elem3 = document.getElementById(customId3);
        elem3.parentNode.removeChild(elem3);
    } else {
        document.getElementById(customId3).innerHTML = document.getElementById(customId3).innerHTML.replace(customReplace3, customReplaceWith3);
    }
}

//Custom4
if (customActive4 === true) {
    if (custom4 === 'remove') {
        var elem4 = document.getElementById(customId4);
        elem4.parentNode.removeChild(elem4);
    } else {
        document.getElementById(customId4).innerHTML = document.getElementById(customId4).innerHTML.replace(customReplace4, customReplaceWith4);
    }
}

//Custom5
if (customActive5 === true) {
    if (custom5 === 'remove') {
        var elem5 = document.getElementById(customId5);
        elem5.parentNode.removeChild(elem5);
    } else {
        document.getElementById(customId5).innerHTML = document.getElementById(customId5).innerHTML.replace(customReplace5, customReplaceWith5);
    }
}

//Custom6
if (customActive6 === true) {
    if (custom6 === 'remove') {
        var elem6 = document.getElementById(customId6);
        elem6.parentNode.removeChild(elem6);
    } else {
        document.getElementById(customId6).innerHTML = document.getElementById(customId6).innerHTML.replace(customReplace6, customReplaceWith6);
    }
}

//Custom7
if (customActive7 === true) {
    if (custom7 === 'remove') {
        var elem7 = document.getElementById(customId7);
        elem7.parentNode.removeChild(elem7);
    } else {
        document.getElementById(customId7).innerHTML = document.getElementById(customId7).innerHTML.replace(customReplace7, customReplaceWith7);
    }
}

//Custom8
if (customActive8 === true) {
    if (custom8 === 'remove') {
        var elem8 = document.getElementById(customId8);
        elem8.parentNode.removeChild(elem8);
    } else {
        document.getElementById(customId8).innerHTML = document.getElementById(customId8).innerHTML.replace(customReplace8, customReplaceWith8);
    }
}

//Custom9
if (customActive9 === true) {
    if (custom9 === 'remove') {
        var elem9 = document.getElementById(customId9);
        elem9.parentNode.removeChild(elem9);
    } else {
        document.getElementById(customId9).innerHTML = document.getElementById(customId9).innerHTML.replace(customReplace9, customReplaceWith9);
    }
}

//Custom10
if (customActive10 === true) {
    if (custom10 === 'remove') {
        var elem10 = document.getElementById(customId10);
        elem10.parentNode.removeChild(elem10);
    } else {
        document.getElementById(customId10).innerHTML = document.getElementById(customId10).innerHTML.replace(customReplace10, customReplaceWith10);
    }
}

//Custom11
if (customActive11 === true) {
    if (custom11 === 'remove') {
        var elem11 = document.getElementById(customId11);
        elem11.parentNode.removeChild(elem11);
    } else {
        document.getElementById(customId11).innerHTML = document.getElementById(customId11).innerHTML.replace(customReplace11, customReplaceWith11);
    }
}

//Custom12
if (customActive12 === true) {
    if (custom12 === 'remove') {
        var elem12 = document.getElementById(customId12);
        elem12.parentNode.removeChild(elem12);
    } else {
        document.getElementById(customId12).innerHTML = document.getElementById(customId12).innerHTML.replace(customReplace12, customReplaceWith12);
    }
}

//Custom13
if (customActive13 === true) {
    if (custom13 === 'remove') {
        var elem13 = document.getElementById(customId13);
        elem13.parentNode.removeChild(elem13);
    } else {
        document.getElementById(customId13).innerHTML = document.getElementById(customId13).innerHTML.replace(customReplace13, customReplaceWith13);
    }
}

//Custom14
if (customActive14 === true) {
    if (custom14 === 'remove') {
        var elem14 = document.getElementById(customId14);
        elem14.parentNode.removeChild(elem14);
    } else {
        document.getElementById(customId14).innerHTML = document.getElementById(customId14).innerHTML.replace(customReplace14, customReplaceWith14);
    }
}

//Custom15
if (customActive15 === true) {
    if (custom15 === 'remove') {
        var elem15 = document.getElementById(customId15);
        elem15.parentNode.removeChild(elem15);
    } else {
        document.getElementById(customId15).innerHTML = document.getElementById(customId15).innerHTML.replace(customReplace15, customReplaceWith15);
    }
}

//Custom16
if (customActive16 === true) {
    if (custom16 === 'remove') {
        var elem16 = document.getElementById(customId16);
        elem16.parentNode.removeChild(elem16);
    } else {
        document.getElementById(customId16).innerHTML = document.getElementById(customId16).innerHTML.replace(customReplace16, customReplaceWith16);
    }
}

//Custom17
if (customActive17 === true) {
    if (custom17 === 'remove') {
        var elem17 = document.getElementById(customId17);
        elem17.parentNode.removeChild(elem17);
    } else {
        document.getElementById(customId17).innerHTML = document.getElementById(customId17).innerHTML.replace(customReplace17, customReplaceWith17);
    }
}

//Custom18
if (customActive18 === true) {
    if (custom18 === 'remove') {
        var elem18 = document.getElementById(customId18);
        elem18.parentNode.removeChild(elem18);
    } else {
        document.getElementById(customId18).innerHTML = document.getElementById(customId18).innerHTML.replace(customReplace18, customReplaceWith18);
    }
}

//Custom19
if (customActive19 === true) {
    if (custom19 === 'remove') {
        var elem19 = document.getElementById(customId19);
        elem19.parentNode.removeChild(elem19);
    } else {
        document.getElementById(customId19).innerHTML = document.getElementById(customId19).innerHTML.replace(customReplace19, customReplaceWith19);
    }
}

//Custom20
if (customActive20 === true) {
    if (custom20 === 'remove') {
        var elem20 = document.getElementById(customId20);
        elem20.parentNode.removeChild(elem20);
    } else {
        document.getElementById(customId20).innerHTML = document.getElementById(customId20).innerHTML.replace(customReplace20, customReplaceWith20);
    }
}

//Custom21
if (customActive21 === true) {
    if (custom21 === 'remove') {
        var elem21 = document.getElementById(customId21);
        elem21.parentNode.removeChild(elem21);
    } else {
        document.getElementById(customId21).innerHTML = document.getElementById(customId21).innerHTML.replace(customReplace21, customReplaceWith21);
    }
}

//Custom22
if (customActive22 === true) {
    if (custom22 === 'remove') {
        var elem22 = document.getElementById(customId22);
        elem22.parentNode.removeChild(elem22);
    } else {
        document.getElementById(customId22).innerHTML = document.getElementById(customId21).innerHTML.replace(customReplace22, customReplaceWith22);
    }
}

//Custom23
if (customActive23 === true) {
    if (custom23 === 'remove') {
        var elem23 = document.getElementById(customId23);
        elem23.parentNode.removeChild(elem23);
    } else {
        document.getElementById(customId23).innerHTML = document.getElementById(customId23).innerHTML.replace(customReplace23, customReplaceWith23);
    }
}

//Custom24
if (customActive24 === true) {
    if (custom24 === 'remove') {
        var elem24 = document.getElementById(customId24);
        elem24.parentNode.removeChild(elem24);
    } else {
        document.getElementById(customId24).innerHTML = document.getElementById(customId24).innerHTML.replace(customReplace24, customReplaceWith24);
    }
}

//Custom25
if (customActive25 === true) {
    if (custom25 === 'remove') {
        var elem25 = document.getElementById(customId25);
        elem25.parentNode.removeChild(elem25);
    } else {
        document.getElementById(customId25).innerHTML = document.getElementById(customId25).innerHTML.replace(customReplace25, customReplaceWith25);
    }
}

//Custom26
if (customActive26 === true) {
    if (custom26 === 'remove') {
        var elem26 = document.getElementById(customId26);
        elem26.parentNode.removeChild(elem26);
    } else {
        document.getElementById(customId26).innerHTML = document.getElementById(customId26).innerHTML.replace(customReplace26, customReplaceWith26);
    }
}

//Custom27
if (customActive27 === true) {
    if (custom27 === 'remove') {
        var elem27 = document.getElementById(customId27);
        elem27.parentNode.removeChild(elem27);
    } else {
        document.getElementById(customId27).innerHTML = document.getElementById(customId27).innerHTML.replace(customReplace27, customReplaceWith27);
    }
}

//Custom28
if (customActive28 === true) {
    if (custom28 === 'remove') {
        var elem28 = document.getElementById(customId28);
        elem28.parentNode.removeChild(elem28);
    } else {
        document.getElementById(customId28).innerHTML = document.getElementById(customId28).innerHTML.replace(customReplace28, customReplaceWith28);
    }
}

//Custom29
if (customActive29 === true) {
    if (custom29 === 'remove') {
        var elem29 = document.getElementById(customId29);
        elem29.parentNode.removeChild(elem29);
    } else {
        document.getElementById(customId29).innerHTML = document.getElementById(customId29).innerHTML.replace(customReplace29, customReplaceWith29);
    }
}

//Custom30
if (customActive30 === true) {
    if (custom30 === 'remove') {
        var elem30 = document.getElementById(customId30);
        elem30.parentNode.removeChild(elem30);
    } else {
        document.getElementById(customId30).innerHTML = document.getElementById(customId30).innerHTML.replace(customReplace30, customReplaceWith30);
    }
}
