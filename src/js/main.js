const video = document.getElementById('video')
const playPause = document.getElementById('playpause')
var timerWrapper = document.getElementById('timerWrapper')
//propgress
var timerBar = document.getElementById('timerBar')
var timerLine = document.getElementById('timerLine')
var currentTime = document.getElementById('currentTime')
var duration = document.getElementById('duration')
var volumeBar = document.getElementById('volumeBar')
var volumeLine = document.getElementById('volumeLine')
var volumeWrapper = document.getElementById('volumeWrapper')

function playPauseMedia() {
  if (video.paused) {
    playPause.className = 'play'
    return video.play()
  }
  playPause.className = 'pause'
  video.pause()
}

function setTime() {
  var minutes = Math.floor(video.currentTime / 60)
  var seconds = Math.floor(video.currentTime - minutes * 60)
  var minuteValue
  var secondValue

  if (minutes < 10) {
    minuteValue = '0' + minutes
  } else {
    minuteValue = minutes
  }

  if (seconds < 10) {
    secondValue = '0' + seconds
  } else {
    secondValue = seconds
  }

  var mediaTime = minuteValue + ':' + secondValue

  currentTime.textContent = mediaTime

  var barLength = timerWrapper.clientWidth * (video.currentTime/video.duration)
  timerBar.style.width = barLength + 'px'
}

function videoDurationTime () {
  var all = Math.floor(video.duration)
  var minutes = Math.floor(all / 60);
  var seconds = Math.floor(all - minutes * 60);
  var mediaTime = minutes + ':' + seconds
  duration.textContent = mediaTime
  updateVolumeBar(video.volume)
  timerLine.addEventListener('click', onProgressClick(video.duration, updateVideoTime))
  volumeLine.addEventListener('click', onProgressClick(1, updateVideoVolume))
}

function updateVolumeBar (volume) {
  var barLength = volumeWrapper.clientWidth * (volume/1)
  volumeBar.style.width = barLength + 'px'
}

function onProgressClick (maxVal, cb) {
  return function (event) {
    const rect = event.target.getBoundingClientRect()
    const position = (event.offsetX * maxVal) / rect.width

    cb(position)
  }
}

function updateVideoTime (time) {
  video.currentTime = time
}

function updateVideoVolume (volume) {
  updateVolumeBar(volume)
  video.volume = volume
}

function fullScreenButton() {
  if (video.requestFullscreen) {
    video.requestFullscreen();
  } else if (video.mozRequestFullScreen) {
    video.mozRequestFullScreen();
  } else if (video.webkitRequestFullscreen) {
    video.webkitRequestFullscreen();
  }}

document.getElementById("fullScreen").onclick = function() {
  fullScreenButton()
};

playPause.addEventListener('click', playPauseMedia)
video.addEventListener('timeupdate', setTime)
video.addEventListener('loadedmetadata', videoDurationTime)

