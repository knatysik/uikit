const video = document.getElementById('video')

function videoLoaded () {
  const playPause = document.getElementById('playpause')
  const currentTime = document.getElementById('currentTime')
  const duration = document.getElementById('duration')
  const timerWrapper = document.getElementById('timerWrapper')
  const volumeWrapper = document.getElementById('volumeWrapper')
  const timerBar = document.getElementById('timerBar')
  const timerLine = document.getElementById('timerLine')
  const volumeBar = document.getElementById('volumeBar')
  const volumeLine = document.getElementById('volumeLine')

  function playPauseMedia() {
    if (video.paused) {
      playPause.className = 'c-media__play'
      return video.play()
    }
    playPause.className = 'c-media__pause'
    video.pause()
  }

  function formatDuration (duration) {
    const minutes = Math.floor(duration / 60)
    const seconds = Math.floor(duration - minutes * 60)
    let minuteValue
    let secondValue

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

    return `${minuteValue}:${secondValue}`
  }

  function updateProgressBar (all, current, wrapper, bar) {
    const barLength = wrapper.clientWidth * (current/all)
    bar.style.width = barLength + 'px'
  }

  function setTime() {
    currentTime.textContent = formatDuration(video.currentTime)
    updateProgressBar(video.duration, video.currentTime, timerWrapper, timerBar)
  }

  function updateVolumeBar (volume) {
    updateProgressBar(1, volume, volumeWrapper, volumeBar)
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
      video.requestFullscreen()
    } else if (video.mozRequestFullScreen) {
      video.mozRequestFullScreen()
    } else if (video.webkitRequestFullscreen) {
      video.webkitRequestFullscreen()
    }
  }

  updateVolumeBar(video.volume)

  duration.textContent = formatDuration(video.duration)

  timerLine.addEventListener('click', onProgressClick(video.duration, updateVideoTime))
  volumeLine.addEventListener('click', onProgressClick(1, updateVideoVolume))
  playPause.addEventListener('click', playPauseMedia)
  video.addEventListener('timeupdate', setTime)
  document.getElementById('fullScreen').onclick = fullScreenButton
}

(function (videoEl) {
  if (videoEl.readyState === 0) {
    videoEl.addEventListener( 'loadedmetadata', function () {
      videoLoaded()
    })
  } else if (videoEl.readyState >= 1) {
    videoLoaded()
  }
})(video)
