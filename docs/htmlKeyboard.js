let shift = false,
    capslock = false;
const style = document.createElement('style'),
    p1 = document.getElementById("p1");
style.innerHTML = 'button:not(.not){text-transform:uppercase}';
document.getElementById('table').onclick = addTextNode;

function upperCase() {
    if (shift ^ capslock) {
        document.head.appendChild(style);
    } else {
        document.head.removeChild(style);
    }
}

function addTextNode(e) {
    if (e.target.nodeName === 'BUTTON') {
        let text = e.target.innerHTML.toLowerCase();
        switch (text) {
            case '[enter]':
                p1.innerHTML = p1.innerHTML + '\n';
                break;
            case '[backspace]':
                p1.innerHTML = p1.innerHTML.slice(0,p1.innerHTML.length - 1);
                break;
            case '[capslk]':
                capslock = !capslock;
                upperCase();
                break;
            case '[shift]':
                shift = !shift;
                upperCase();
                break;
            case '[space]':
                p1.innerHTML = p1.innerHTML + ' ';
                break;
            default:
                if (shift ^ capslock) {
                    text = text.toUpperCase();
                }
                if (shift) {
                    shift = false;
                    upperCase();
                }
                p1.innerHTML = p1.innerHTML + text;
        }
    }
}