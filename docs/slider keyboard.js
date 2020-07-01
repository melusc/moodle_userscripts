const slider = document.getElementById('slider'),
    output = document.getElementById('output'),
    submit = document.getElementById('submit'),
    text = document.getElementById('text'),
    send = document.getElementById('send');

const chars = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'M', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '[Delete]', '[Space]', '[Enter]'];
slider.oninput = e => {
    output.textContent = chars[slider.value];
};
submit.onclick = e => {

    switch (chars[slider.value]) {
        case ('[Delete]'):
            text.textContent = text.textContent.slice(0, text.textContent.length - 1);
            break;
        case ('[Space]'):
            text.textContent = text.textContent + ' ';
            break;
        case ('[Enter]'):
            text.textContent = text.textContent + '\n';
            break;
        default:
            text.textContent = text.textContent + output.textContent;
            break;
    }
    output.textContent = 'A';
    slider.value = 0;
};
send.onclick = e => {
    location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
};