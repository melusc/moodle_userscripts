// ===UserScript===
// @name        Clean moodle
// @grant       none
// @version     3.3.4
// @include     *://moodle.ksasz.ch/*
// @downloadURL https://github.com/melusc/lusc/raw/master/clean%20moodle.user.js
// @updateURL   https://github.com/melusc/lusc/raw/master/clean%20moodle.user.js
// @Author      lusc
// @description Improving the looks of moodle
// ===/UserScript===

//This is for moodle.ksasz.ch and it was written for me, so if you install it it might not work perfectly for you.
//To fix that you can modify the code for yourself, it's pretty straightforward to do.

//true is active, false isn't

/*Geschichte M1a*/      var gr = true;//removes content
/*ECDL*/                var ec = true;//removes content
/*Herbstwoche*/         var hw = true;//removes content
/*Studienwahlparcours*/ var sw = true;//removes content
/*Umfrage S2d*/         var uf = true;//removes content
/*Weihnachtslauf*/      var wl = true;//removes content
/*Febstudienwoche*/     var fs = true;//removes content
/*Schneesportlager*/    var sl = true;//removes content

/*SPFWahl*/             var sp = true;//removes content //if false it replaces with specified text
                        var rsp = 'SPFWahl';

/*Geschichte HuI*/      var gs = true;//replaces content with specified text
                        var rgs = 'Geschichte';

/*Klassenstunde*/       var kl = true;//replaces content with specified text
                        var rkl = 'Klassenstunde';

/*Geografie*/           var gg = true;//replaces content with specified text
                        var rgg = 'Geografie';

/*Physik*/              var ps = true;//replaces content with specified text
                        var rps = 'Physik';

/*Mathematik*/          var ma = true;//replaces content with specified text
                        var rma = 'Mathematik';

/*Wirtschaft*/          var wr = true;//replaces content with specified text
                        var rwr = 'Wirtschaft und Recht';

/*Deutsch*/             var de = true;//replaces content with specified text
                        var rde = 'Deutsch';

/*Biologie*/            var bi = true;//replaces content with specified text
                        var rbi = 'Biologie';

/*Französisch*/         var fr = true;//replaces content with specified text
                        var rfr = 'Französisch';

/*Geschichte M1a*/      var gm = true;//replaces content with specified text
                        var rgm = 'Geschichte M1a';

/*Chemie*/              var ch = true;//replaces content with specified text
                        var rch = 'Chemie';

/*Musik*/               var mu = true;//replaces content with specified text
                        var rmu = 'Musik';


//Add custom customisations

//No. 1

var customActive1 = false //deactivated if false

var customId1 = 'placeholder'; //Id (press f12, pick the text of link to see id

var custom1 = true; //Replace = true, remove = false;

var customReplace1 = 'placeholder'; //Text to replace (just copy-paste it) //leave empty if remove

var customReplaceWith1 = 'placeholder'; //Replace with


//No. 2

var customActive2 = false //deactivated if false

var customId2 = 'placeholder'; //Id (on moodle press f12, pick the text of link to see id)

var custom2 = true; //Replace = true, remove = false;

var customReplace2 = 'placeholder'; //Text to replace (just copy-paste it) //leave empty if remove

var customReplaceWith2 = 'placeholder'; //Replace with


//No. 3

var customActive3 = false //deactivated if false

var customId3 = 'placeholder'; //Id (press f12, pick the text of link to see id

var custom3 = true; //Replace = true, remove = false;

var customReplace3 = 'placeholder'; //Text to replace (just copy-paste it) //leave empty if remove

var customReplaceWith3 = 'placeholder'; //Replace with

//Code



//Herbstwoche
var id1 = 'label_3_8';
if (hw === true) {
    var elem1 = document.getElementById(id1);
    elem1.parentNode.removeChild(elem1);
}

//ECDL
var id2 = 'label_3_7';
if (ec === true) {
    var elem2 = document.getElementById(id2);
    elem2.parentNode.removeChild(elem2);
}

//Studienwahlparcours
var id3 = 'label_3_9';
if (sw === true) {
    var elem345 = document.getElementById(id3);
    elem345.parentNode.removeChild(elem345);
}

//Umfrage S2d
var id4 = 'label_3_10';
if (uf === true) {
    var elem45 = document.getElementById(id4);
    elem45.parentNode.removeChild(elem45);
}

//Weihnachtslauf
var id6 = 'label_3_12';
if (wl === true) {
    var elem6 = document.getElementById(id6);
    elem6.parentNode.removeChild(elem6);
}

//Febwoche einschreiben
var id7 = 'label_3_13';
if (fs === true) {
    var elem7 = document.getElementById(id7);
    elem7.parentNode.removeChild(elem7);
}

//Schneesportlager
var id8 = 'label_3_14';
if (sl === true) {
    var elem8 = document.getElementById(id8);
    elem8.parentNode.removeChild(elem8);
}

//Geschichte HuI
var id9 = 'label_3_16';
if (gs === true) {
    document.getElementById(id9).innerHTML = document.getElementById(id9).innerHTML.replace('Geschichte HuI', rgs);
}

//SPFWahl
var id10 = 'label_3_6';
if (sp === true) {
    var elem10 = document.getElementById(id10);
    elem10.parentNode.removeChild(elem10);
} else {
    document.getElementById(id10).innerHTML = document.getElementById(id10).innerHTML.replace('Wahl des Schwerpunktfaches für 1. Gymi-Klassen 2020', rsp);
}

//Klassenstunde
var id11 = 'label_3_15';
if (kl === true) {
    document.getElementById(id11).innerHTML = document.getElementById(id11).innerHTML.replace('Klassenstunde UmA 2019-2023 - M1a', rkl);
}

//Geografie
var id12 = 'label_3_17';
if (gg === true) {
    document.getElementById(id12).innerHTML = document.getElementById(id12).innerHTML.replace('Geografie DiR FM1\/M1a 19-20', rgg);
}

//Physik
var id13 = 'label_3_18';
if (ps === true) {
    document.getElementById(id13).innerHTML = document.getElementById(id13).innerHTML.replace('Physik BiM M1a', rps);
}

//Mathematik
var id14 = 'label_3_19';
if (ma === true) {
    document.getElementById(id14).innerHTML = document.getElementById(id14).innerHTML.replace('Mathematik UmA 2019-2020 - M1a', rma);
}

//Wirtschaft
var id15 = 'label_3_20';
if (wr === true) {
    document.getElementById(id15).innerHTML = document.getElementById(id15).innerHTML.replace('Wirtschaft und Recht M1a DiD', rwr);
}

//Deutsch
var id16 = 'label_3_21';
if (de === true) {
    document.getElementById(id16).innerHTML = document.getElementById(id16).innerHTML.replace('Deutsch HaK M1a 2019\/20', rde);
}

//Biologie
var id17 = 'label_3_22';
if (bi === true) {
    document.getElementById(id17).innerHTML = document.getElementById(id17).innerHTML.replace('Biologie WiD M1a 19\/20', rbi);
}

//Französisch
var id18 = 'label_3_23';
if (fr === true) {
    document.getElementById(id18).innerHTML = document.getElementById(id18).innerHTML.replace('Französisch M1a FeM SJ 19\/20', rfr);
}

//Geschichte M1a
var id19 = 'label_3_24';
if (gr === true) {
    var elem19 = document.getElementById(id19);
    elem19.parentNode.removeChild(elem19);
} else {
    if (gm === true) {
        document.getElementById(id19).innerHTML = document.getElementById(id19).innerHTML.replace('Geschichte M1a', rgm);
    }
}

//Chemie
var id20 = 'label_3_25';
if (ch === true) {
    document.getElementById(id20).innerHTML = document.getElementById(id20).innerHTML.replace('Chemie WyE M1a', rch);
}

//Musik
var id21 = 'label_3_26';
if (mu === true) {
    document.getElementById(id21).innerHTML = document.getElementById(id21).innerHTML.replace('Musik AlC Grundlagenfach', rmu);
}

//Custom1
if (customActive1 === true){
    if (custom1 === false){
        var elem22 = document.getElementById(customId1);
        elem22.parentNode.removeChild(elem22);
    } else {
        document.getElementById(customId1).innerHTML = document.getElementById(customId1).innerHTML.replace(customReplace1, customReplaceWith1);
    }
}

//Custom2
if (customActive2 === true){
    if (custom2 === false){
        var elem23 = document.getElementById(customId2);
        elem23.parentNode.removeChild(elem23);
    } else {
        document.getElementById(customId2).innerHTML = document.getElementById(customId2).innerHTML.replace(customReplace2, customReplaceWith2);
    }
}

//Custom3
if (customActive3 === true){
    if (custom3 === false){
        var elem24 = document.getElementById(customId3);
        elem24.parentNode.removeChild(elem24);
    } else {
        document.getElementById(customId3).innerHTML = document.getElementById(customId3).innerHTML.replace(customReplace3, customReplaceWith3);
    }
}
