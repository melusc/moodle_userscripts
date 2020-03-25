window.onload = function() {
    run();
    let inputs = document.querySelectorAll('input');
    inputs.forEach(function(elem) {
        elem.addEventListener('keyup', function(e) {
            run();
        }, false);
    });
};

function run() {
    let doc = {};
    for (let j = 1; j <= 5; j++) {
        for (let i = 1; i <= 9; i++) {
            if (document.querySelector(`[id="${j}-${i}"]`).value) {
                doc[`${j}-${i}`] = document.querySelector(`[id="${j}-${i}"]`).value;
            }
        }
    }
    doc = JSON.stringify(doc);
    if (doc != '{}') {
        doc = doc.replace('{', '{\n    ');
        doc = doc.replace(/,/g, ',\n    ');
        doc = doc.replace('}', '\n}');
    }
    document.querySelector('#result').value = doc;
}