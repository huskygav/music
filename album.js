let container = document.querySelector('.album');
let playlist = document.querySelector('.playlist');

console.log(window.location.search);
let search = new URLSearchParams(window.location.search);
let album = albums[search.get('i')];

container.innerHTML = `
<div class="card mb-3">
<div class="row">
    <div class="col-md-4">
        <img src="${album.img}" class="img-fluid rounded-start">
    </div>
    <div class="col-md-8">
        <div class="card-body">
            <h5 class="card-title">${album.title}</h5>
            <p class="card-text">${album.description}</p>
            <p class="card-text"><small class="text-muted">${album.year} г. </p></small>
        </div>
    </div>
</div>
`
let tracks = album.tracks;

for (j = 0; j<tracks.length; j++){
    let track = tracks[j];

    playlist.innerHTML += `
    <li class="track list-group-item d-flex align-items-center">
        <img src="assets/stop.png" height="30px" class="stop me-3 d-none" alt="">
        <img src="assets/play.png" height="30px" class="play me-3 " alt="">
        <div>
            <div>${track.title}</div>
            <div class="text-secondary">${track.author}</div>
        </div>
        <div class="time ms-auto">${track.time}</div>
        <audio class='audio' src='${track.src}'></audio>
    </li>
    `
}

let isPlaying = false;

function setupAudio() {
    // Найди коллекцию с треками
    let trackNodes = document.querySelectorAll(`.track`); 
    for (let i = 0; i < trackNodes.length; i++) { 
        // Один элемент
        let node = trackNodes[i];   
        // Тег аудио внутри этого элемента
        let audio = node.querySelector(`.audio`); 
        let timeNode = node.querySelector('.time');
        let track = album.tracks[i];

        node.addEventListener('click',function() {
            if (track.isPlaying){  //если играет щас
                track.isPlaying = false; //ставим на паузу
                audio.pause();
                let imgPlay = node.querySelector('.play');
                let imgPause = node.querySelector('.stop');
                imgPlay.classList.remove('d-none');
                imgPause.classList.add('d-none');
            } else {
                track.isPlaying = true;
                audio.play();
                let imgPlay = node.querySelector('.play');
                let imgPause = node.querySelector('.stop');
                imgPlay.classList.add('d-none');
                imgPause.classList.remove('d-none');
                updateProgress();
            }

        });
    
        function updateProgress() {
            // Нарисовать актуальное время
            
            let time = getTime(audio.currentTime);
            timeNode.innerHTML = time;
            // Нужно ли вызвать её ещё раз?
            if (track.isPlaying) {
                    requestAnimationFrame(updateProgress);
            }
  
        }

        function getTime(time){
            let currentSec = Math.floor(time);
            let minut = Math.floor(currentSec/60);
            let sec = Math.floor(currentSec%60);
        
            if (minut<10){
                minut = '0' + minut;
            }
            if (sec<10){
                sec = '0' + sec;
            }
            return `${minut}:${sec}`
        }
    }
}
setupAudio()

