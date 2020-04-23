var shift = false,
    capslock = false,
    style = document.createElement('style');
style.innerHTML = 'button:not(.not){text-transform:uppercase}';

function upperCase() {
    if (shift ^ capslock) {
        document.head.appendChild(style)
    } else {
        document.head.removeChild(style)
    }
}

function addTextNode(text) {
    text = text.innerHTML.toLowerCase();
    console.log(text);
    var p1 = document.getElementById("p1"),
        br = document.createElement('br');
    if (text == '[enter]') {
        p1.appendChild(br)
    } else if (text == '[backspace]') {
        deleter()
    } else if (text == '[capslk]') {
        capsLock()
    } else if (text == '[shift]') {
        shifter()
    } else {
        if (shift ^ capslock) {
            text = text.toUpperCase()
        }
        if (shift) {
            shift = false;
            upperCase()
        }
        if (text.toLowerCase() == '[space]') {
            text = ' '
        }
        let newtext = document.createTextNode(text);
        p1.appendChild(newtext)
    }
}

function shifter() {
    if (!shift) {
        shift = true;
        upperCase()
    } else {
        shift = false;
        upperCase()
    }
}

function capsLock() {
    if (capslock) {
        capslock = false;
        upperCase()
    } else {
        capslock = true;
        upperCase()
    }
}

function deleter() {
    var p1 = document.getElementById('p1');
    p1.innerHTML = p1.innerHTML.slice(0, p1.innerHTML.length - 1)
}
