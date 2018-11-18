let player = document.querySelector(".player"),
    video = player.querySelector("video"),
    progress = player.querySelector(".progress"),
    progressUpdate = player.querySelector(".progress__filled"),
    playButton = player.querySelector('button[title="Toggle Play"]'),
    volume = player.querySelector('input[name="volume"]'),
    playbackRate = player.querySelector('input[name="playbackRate"]'),
    revButton = player.querySelector('button[data-skip="-10"]'),
    ffButton = player.querySelector('button[data-skip="25"]');

let isDragged = false;

video.addEventListener("click", playVideo);
playButton.addEventListener("click", playVideo);
video.addEventListener("timeupdate", progressBar);
progress.addEventListener("mousedown", startChangeVideo);
volume.addEventListener("input", changeVolume);
playbackRate.addEventListener("input", changePlaybackRate);
revButton.addEventListener("click", moveTo);
ffButton.addEventListener("click", moveTo);
video.addEventListener("ended", switchToStart);

function playVideo(){
    if(video.paused){
        video.play();
        playButton.innerHTML = "❚ ❚";
    } else {
        video.pause();
        playButton.innerHTML = "►";
    }
}

function progressBar(e){
    progressUpdate.style.flexBasis = ((100/e.target.duration)*e.target.currentTime) + "%";
}

function startChangeVideo(e){
    isDragged = true;
    progress.addEventListener("mousemove", dragVideoTime);
    video.removeEventListener("timeupdate", progressBar);
}

function dragVideoTime(e){
    if(isDragged){
        progressUpdate.style.flexBasis = ((100/video.clientWidth)*e.offsetX) + "%";
        progress.addEventListener("mouseup", changeVideoTime);
    }
}

function changeVideoTime(e){
    video.currentTime = (video.duration / 100) * ((100/video.clientWidth) * e.offsetX);
    isDragged = false;
    video.addEventListener("timeupdate", progressBar);
}

function changeVolume(e){
    video.volume = e.target.value;
}

function changePlaybackRate(e){
    video.playbackRate = e.target.value;
}

function moveTo(e){
    let add = parseInt(e.target.dataset.skip);
    if(video.currentTime + add > video.duration) video.currentTime = video.duration;
    else if(video.currentTime + add < 0) video.currentTime = 0;
    else video.currentTime += add;
}

function switchToStart(){
    progressUpdate.style.flexBasis = "0%";
    playButton.innerHTML = "►";
}