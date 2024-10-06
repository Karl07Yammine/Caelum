function toggleMenu() {
    const sideMenu = document.getElementById("side-menu");
    if (sideMenu.style.width === "250px") {
        sideMenu.style.width = "0";
    } else {
        sideMenu.style.width = "250px";
    }
}



var video = document.getElementById("Anim");
var playPauseIcon = document.getElementById("play");


function togglePlayPause() {
    console.log("tried to play/pause")
  if (video.paused) {
    video.play();
    playPauseIcon.src = "/img/pause.png";  // Change to pause icon
    playPauseIcon.alt = "Pause";
  } else {
    video.pause();
    playPauseIcon.src = "/img/play.png";  // Change to play icon
    playPauseIcon.alt = "Play";
  }
}

function fastForward() {
  video.playbackRate = 2.0;  // Speed up video (2x)
  setTimeout(function() {
    video.playbackRate = 1.0;  // Return to normal speed after 3 seconds
  }, 3000);
}

function playBackward() {
  if (!video.paused) {
    video.pause();  // Pause if it's playing to handle reverse playback
  }

  const reverseDuration = 5000;  // Play backward for 5 seconds
  const reverseInterval = setInterval(function() {
    video.currentTime = Math.max(0, video.currentTime - 0.1);  // Decrease currentTime by 0.1s every 100ms
  }, 100);

  setTimeout(function() {
    clearInterval(reverseInterval);  // Stop reverse playback after 5 seconds
    video.play();  // Resume normal playback
  }, reverseDuration);
}


const jsonData = [
    {"Second":"1","Time":"1:23","Speed":"970.3","Density":"1.36","IMF - Bt":"7.34","IMF - Bz":"0.96"},
    {"Second":"2","Time":"1:23","Speed":"992.2","Density":"1.93","IMF - Bt":"7.62","IMF - Bz":"-5.17"},
    {"Second":"3","Time":"1:24","Speed":"967.6","Density":"2.19","IMF - Bt":"8.16","IMF - Bz":"-5.71"},
    {"Second":"4","Time":"1:24","Speed":"959.8","Density":"2.07","IMF - Bt":"7.71","IMF - Bz":"-2.56"},
    {"Second":"5","Time":"1:25","Speed":"938.7","Density":"6.97","IMF - Bt":"6.71","IMF - Bz":"-4.28"},
    {"Second":"6","Time":"1:25","Speed":"916.5","Density":"4.16","IMF - Bt":"8.24","IMF - Bz":"-3.38"},
    {"Second":"7","Time":"1:26","Speed":"932.8","Density":"10.18","IMF - Bt":"6.27","IMF - Bz":"-4.28"},
    {"Second":"8","Time":"1:26","Speed":"887.3","Density":"3.52","IMF - Bt":"7.22","IMF - Bz":"4.21"},
    {"Second":"9","Time":"1:27","Speed":"905.8","Density":"8.13","IMF - Bt":"6.66","IMF - Bz":"-3.74"},
    {"Second":"10","Time":"1:27","Speed":"915.7","Density":"10.56","IMF - Bt":"6.39","IMF - Bz":"1.79"},
    {"Second":"11","Time":"1:28","Speed":"923.6","Density":"4.5","IMF - Bt":"8.12","IMF - Bz":"1.68"},
    {"Second":"12","Time":"1:28","Speed":"893.6","Density":"5.83","IMF - Bt":"7.63","IMF - Bz":"3.14"},
    {"Second":"13","Time":"1:29","Speed":"888.9","Density":"3.82","IMF - Bt":"6.55","IMF - Bz":"3.75"},
    {"Second":"14","Time":"1:29","Speed":"887.1","Density":"3.37","IMF - Bt":"6.11","IMF - Bz":"2.9"},
    {"Second":"15","Time":"1:30","Speed":"869.7","Density":"4.21","IMF - Bt":"5.74","IMF - Bz":"2.27"},
    {"Second":"16","Time":"1:30","Speed":"874","Density":"3.29","IMF - Bt":"5.72","IMF - Bz":"1.97"}
];

const totalIntervals = jsonData.length;

video.addEventListener('timeupdate', () => {
    const currentTime = video.currentTime;
    const duration = video.duration;
    const intervalIndex = Math.floor((currentTime / duration) * totalIntervals);
    
    if (intervalIndex < totalIntervals && intervalIndex >= 0) {
        const data = jsonData[intervalIndex];
        document.getElementById('time').textContent = `Time: ${data.Time}`;
        document.getElementById('speed').textContent = `Speed: ${data.Speed} km/s`;
        document.getElementById('density').textContent = `Density: ${data.Density} cm³`;
        document.getElementById('imf-bt').textContent = `IMF - Bt: ${data['IMF - Bt']}`;
        document.getElementById('imf-bz').textContent = `IMF - Bz: ${data['IMF - Bz']}`;
    }
});