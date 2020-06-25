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
        let text = e.target.textContent.toLowerCase();
        switch (text) {
            case '[enter]':
                const br = document.createElement('br');
                p1.appendChild(br);
                break;
            case '[backspace]':
                p1.innerText = p1.innerText.slice(0,p1.innerText.length - 1);
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
                p1.innerText = p1.innerText + ' ';
                break;
            default:
                if (shift ^ capslock) {
                    text = text.toUpperCase();
                }
                if (shift) {
                    shift = false;
                    upperCase();
                }
                p1.innerText = p1.innerText + text;
        }
    }
}