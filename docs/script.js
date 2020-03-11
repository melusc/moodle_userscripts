function getCookie(name) {
  let value = "; " + document.cookie;
  let parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}
let boom = 'Boom!',
	num = 1,
	record = getCookie('record');
	
if (!record){
	record = 1;
}
if (record > 1) {
	document.querySelector('.record').innerHTML = `Current record: ${record}`;
}
console.log(record);
function run(boom) {
	num++;
	if (boom) {
		if (Math.floor((num - 1) / 7) == (num - 1) / 7 || Math.floor((num - 1) / 3) == (num - 1) / 3) {
			document.querySelector('h1.number').innerHTML = num;
		} else {
			failed();
		}
	} else {
		if (!(Math.floor((num - 1) / 7) == (num - 1) / 7 || Math.floor((num - 1) / 3) == (num - 1) / 3)) {
			document.querySelector('h1.number').innerHTML = num;
		} else {
			failed();
		}
	}
}

function failed() {
	document.querySelector('button.nothing').setAttribute('onclick', 'reset()');
	document.querySelector('button.nothing').innerHTML = 'Reset?';
	document.querySelector('button.boom').style.display = 'none';
	document.body.style.backgroundColor = 'red';
	document.querySelector('h3.text').style.color = 'white';
	if (record < num - 1) {
		record = num - 1;
		document.querySelector('h2.record').innerHTML = `Current record: ${record}`;
		document.cookie = `record=${record}`
	}
}

function reset() {
	document.querySelector('button.nothing').setAttribute('onclick', 'run()');
	document.querySelector('button.nothing').innerHTML = 'Safe';
	document.querySelector('button.boom').style.display = '';
	document.body.style.backgroundColor = '';
	document.querySelector('h3.text').style.color = '';
	num = 1
	document.querySelector('h1.number').innerHTML = num;
}
