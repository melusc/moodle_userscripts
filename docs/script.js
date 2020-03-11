let boom = 'Boom!',
    num = 1;
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function run() {
    num++;
    console.log(`By 7: ${Math.floor(num / 7) == num / 7}`);
    console.log(`By 3: ${Math.floor(num / 3) == num / 3}`);
    console.log(`Num: ${num}`);
    if (Math.floor(num / 7) == num / 7) {
        document.querySelector('h1.number').innerHTML = boom;
    } else if (Math.floor(num / 3) == num / 3) {
        document.querySelector('h1.number').innerHTML = boom;
    } else {
        document.querySelector('h1.number').innerHTML = num;
    }
    document.querySelector('h2.number').innerHTML = num;
}
