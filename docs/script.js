function run() {
    num++;
    if (Math.floor(num / 7) == num / 7) {
        document
            .querySelector('#number')
            .innerHTML = boom;
    } else if (Math.floor(num / 3) == num / 3) {
        document
            .querySelector('#number')
            .innerHTML = boom;
    } else {
        document
            .querySelector('#number')
            .innerHTML = num;
    }
}
