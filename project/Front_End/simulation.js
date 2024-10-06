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



