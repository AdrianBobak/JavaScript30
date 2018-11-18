const timeButtons = document.querySelectorAll(`button[data-time]`),
customForm = document.querySelector("#custom"),
timeLeft = document.querySelector(".display__time-left"),
endTime = document.querySelector(".display__end-time");
let counter = 0;

timeButtons.forEach(function(btn){
    btn.addEventListener("click", function(){
        setCountdown(parseInt(btn.dataset.time));
    })
});

customForm.addEventListener("submit", function(e){
    e.preventDefault();
    let input = e.target.querySelector("input");
    let regex = /\D/g;
    if(!regex.test(input.value)){
        setCountdown(parseInt(input.value)*60);
        this.reset();
    } else alert("Wrong input value");
});

function setCountdown(time){
    counter++;
    const currentTime = new Date();
    const timeObject = {
        seconds: currentTime.getSeconds(),
        minutes: currentTime.getMinutes(),
        hours: currentTime.getHours()
    }
    timeObject.seconds += time;
    while(timeObject.seconds >= 60) {
        timeObject.seconds -= 60;
        timeObject.minutes += 1;
    }
    while(timeObject.minutes >= 60) {
        timeObject.minutes -= 60;
        timeObject.hours += 1;
    }
    while(timeObject.hours >= 24) timeObject.hours = 0;
    if(timeObject.minutes >= 10) endTime.innerHTML = `Be Back At ${timeObject.hours}:${timeObject.minutes}`;
    else endTime.innerHTML = `Be Back At ${timeObject.hours}:0${timeObject.minutes}`;

    let triggerNumber = counter;

    startCountdown(time--);
    let interval = setInterval(function(){
        if(triggerNumber !== counter || time <= 0) clearInterval(interval);
        else startCountdown(time--);
    }, 1000);
}

function startCountdown(time){
    let secs = Math.floor(time%60);
    if(Math.floor(time%60) < 10) secs = "0" + Math.floor(time%60);
    timeLeft.innerHTML = `${Math.floor(time/60)}:${secs}`
}