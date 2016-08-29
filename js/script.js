
var starts, myTimer, result, txt;
stopedTime = 0;
//var result = {milliseconds = '000', seconds = '00', minutes = '00', hours = '00'};


function showTime () {
	var time = result + stopedTime; 
	
	txt = convertTime(time);
	displ.innerHTML = txt;
}

function convertTime(time) {
	var milliseconds = time % 1000;
	if(milliseconds < 10) {
		milliseconds = '00' + milliseconds;
	} else if(milliseconds < 100) {
		milliseconds = '0' + milliseconds;
	}
	var seconds = parseInt(time / 1000) % 60;
	if(seconds < 10) seconds = '0' + seconds;
	var minutes = parseInt( time / 1000 / 60)  % 60;
	if(minutes < 10) minutes = '0' + minutes;
	var hours = parseInt( time / 1000 / 60 / 60)  % 24;
	if(hours < 10) hours = '0' + hours;
	return (hours + " : " + minutes + " : " + seconds + " . " + milliseconds);
}

function runTime() {
	var currentTime = new Date();
	result = currentTime - starts;
	showTime();
}

function start() {
	// console.log(document.getElementById('btn-start'));
	// document.getElementById('btn-start').id = 'btn-stop';
	// document.getElementById('btn-stop').innerHTML = 'Stop';
	document.getElementById('btn-start').removeEventListener("click", start);
	document.getElementById('btn-stop').addEventListener("click", stop);
	document.getElementById('btn-split').addEventListener("click", split);
	document.getElementById('btn-reset').addEventListener("click", reset);  
	starts = new Date();
	myTimer = setInterval(runTime, 10);
};

function stop() {
	// document.getElementById('btn-stop').id = 'btn-start';
	// document.getElementById('btn-start').innerHTML = 'Start';
	// document.getElementById('btn-start').addEventListener("click", start);
	// console.log('stop', document.getElementById('btn-start'));
	clearInterval(myTimer);
	document.getElementById('btn-start').addEventListener("click", resume);
	document.getElementById('btn-stop').removeEventListener("click", stop);
	document.getElementById('btn-split').removeEventListener("click", split);
	stopedTime += result;
	var stop = document.createElement('p');
	stop.innerHTML = 'Stop: ' + convertTime(result);
	resultList.appendChild(stop);
};
function resume() {
	document.getElementById('btn-start').removeEventListener("click", resume);
	document.getElementById('btn-stop').addEventListener("click", stop);
	document.getElementById('btn-split').addEventListener("click", split);
	//document.getElementById('btn-reset').addEventListener("click", reset);  
	starts = new Date();
	myTimer = setInterval(runTime, 10);
};
function split() {
	var split = document.createElement('p');
	split.innerHTML = 'Split: ' + convertTime(result);
	resultList.appendChild(split);
};

function reset() {
	clearInterval(myTimer);
	txt = "00 : 00 : 00 . 000";
	displ.innerHTML = txt;
	resultList.innerHTML = '';
	// document.getElementById('btn-stop').id = 'btn-start';
	// document.getElementById('btn-start').innerHTML = 'Start';
	starts = 0;
	result = 0;
	stopedTime = 0;
	document.getElementById('btn-start').removeEventListener("click", resume);
	document.getElementById('btn-stop').removeEventListener("click", stop);
	document.getElementById('btn-split').removeEventListener("click", split);
	document.getElementById('btn-reset').removeEventListener("click", reset);  
	document.getElementById('btn-start').addEventListener("click", start);
};

// if( document.getElementById('btn-stop') ) {
// 	document.getElementById('btn-stop').addEventListener("click", stop);
// } 
document.getElementById('btn-start').addEventListener("click", start);