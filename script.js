function _(query) {
  return document.querySelector(query)
}
function _all(query) {
  return document.querySelectorAll(query)
}
let songList = [
  {
    thumbnail: "",
    audio: "InnerPeace.wav",
    songname: "Inner Peace",
    musictype: "Storytelling Rap"
  },
  {
    thumbnail: "",
    audio: "PromisedLand.wav",
    songname: "Promised Land",
    musictype: "Storytelling Rap"
  },

  {
    thumbnail: "Mellow-Tempest-Art.png",
    audio: "Xiuneng-Mellow-Tempest.wav",
    songname: "Mellow Tempest",
    musictype: "Piano Composition"
  },
  {
    thumbnail: "",
    audio: "Nomad.mp3",
    songname: "Nomad",
    musictype: "Storytelling Rap"
  },
  {
    thumbnail: "GhostPic.jpg",
    audio: "Xiuneng - Ghost - Mastered.wav",
    songname: "Ghost",
    musictype: "Storytelling Rap"
  },

  {
    thumbnail: "",
    audio: "Slide.mp3",
    songname: "Slide",
    musictype: "Storytelling Rap"
  },

  {
    thumbnail: "",
    audio: "SaugaCity.wav",
    songname: "Sauga City",
    musictype: "Storytelling Rap"
  },
  {
    thumbnail: "",
    audio: "NoReasons.wav",
    songname: "No Reasons",
    musictype: "Storytelling Rap"
  },
  {
    thumbnail: "",
    audio: "BreakingThrough.wav",
    songname: "Breaking Through",
    musictype: "Storytelling Rap"
  },

  {
    thumbnail: "My-Time.jpg",
    audio: "My-Time.wav",
    songname: "My Time",
    musictype: "Rap Beat"
  },

  {
    thumbnail: "Under-the-Moonlight.jpg",
    audio: "Under-the-Moonlight.wav",
    songname: "Under the Moonlight",
    musictype: "Rap Beat"
  },
  {
    thumbnail: "The-Search.jpg",
    audio: "The-Search.mp3",
    songname: "The Search",
    musictype: "Rap Beat"
  },
  {
    thumbnail: "Terrible-Calm.jpg",
    audio: "Terrible-Calm.wav",
    songname: "Terrible Calm",
    musictype: "Rap Beat"
  },

  {
    thumbnail: "Midnight-Recollections.jpg",
    audio: "Midnight-Recollections.wav",
    songname: "Midnight Recollections",
    musictype: "Rap Beat"
  },
  {
    thumbnail: "LivingInMyMind.jpg",
    audio: "LivingInMyMind.wav",
    songname: "Living in my Mind",
    musictype: "Rap Beat"
  },
  {
    thumbnail: "KnowMyself.png",
    audio: "KnowMyself.wav",
    songname: "Know Myself",
    musictype: "Rap Beat"
  },
  {
    thumbnail: "BurningDesires.jpg",
    audio: "BurningDesires.wav",
    songname: "Burning Desires",
    musictype: "Rap Beat"
  },
  {
    thumbnail: "",
    audio: "onemoreday.mp3",
    songname: "One More Day",
    musictype: "Rap Beat"
  }
]

let currentSongIndex = 0

let player = _(".maincontainer "),
  toggleSongList = _(".maincontainer .toggle-list")

let main = {
  audio: _(".maincontainer audio"),
  thumbnail: _(".maincontainer img"),
  seekbar: _(".maincontainer input"),
  songname: _(".maincontainer .songinformation h2"),
  musictype: _(".maincontainer .songinformation p"),
  prevControl: _(".maincontainer .playercontrols .backwardbutton"),
  playPauseControl: _(".maincontainer .playercontrols .playbutton"),
  nextControl: _(".maincontainer .playercontrols .forwardbutton")
}

// toggleSongList.addEventListener("click", function () {
//   toggleSongList.classList.toggle("active")
//   player.classList.toggle("activeSongList")
// })

_(".playlist").innerHTML = songList
  .map(function (song, songIndex) {
    return `
		<div class="item" songIndex="${songIndex}">
			
			<div class="songinformation">
				<h2>${song.songname}</h2>
				<p>${song.musictype}</p>
			</div>
		</div>
	`
  })
  .join("")

let songListItems = _all(".maincontainer .playlist .item")
for (let i = 0; i < songListItems.length; i++) {
  songListItems[i].addEventListener("click", function () {
    currentSongIndex = parseInt(songListItems[i].getAttribute("songIndex"))
    loadSong(currentSongIndex)
    player.classList.remove("activeSongList")
  })
}

function loadSong(songIndex) {
  let song = songList[songIndex]
  // main.thumbnail.setAttribute("src", "./files/" + song.thumbnail)
  // document.body.style.background = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.8)), url("./files/${song.thumbnail}") center no-repeat`
  // document.body.style.backgroundSize = "cover"
  main.songname.innerText = song.songname
  main.musictype.innerText = song.musictype
  main.audio.setAttribute("src", "./files/" + song.audio)
  main.seekbar.setAttribute("value", 0)
  main.seekbar.setAttribute("min", 0)
  main.seekbar.setAttribute("max", 0)
  main.audio.addEventListener("canplay", function () {
    main.audio.play()
    if (!main.audio.paused) {
      main.playPauseControl.classList.remove("paused")
    }
    main.seekbar.setAttribute("max", parseInt(main.audio.duration))
    main.audio.onended = function () {
      main.nextControl.click()
    }
  })
}
setInterval(function () {
  main.seekbar.value = parseInt(main.audio.currentTime)
}, 1000)

main.prevControl.addEventListener("click", function () {
  currentSongIndex--
  if (currentSongIndex < 0) {
    currentSongIndex = songList.length + currentSongIndex
  }
  loadSong(currentSongIndex)
})
main.nextControl.addEventListener("click", function () {
  currentSongIndex = (currentSongIndex + 1) % songList.length
  loadSong(currentSongIndex)
})
main.playPauseControl.addEventListener("click", function () {
  if (main.audio.paused) {
    main.playPauseControl.classList.remove("paused")
    main.audio.play()
  } else {
    main.playPauseControl.classList.add("paused")
    main.audio.pause()
  }
})
main.seekbar.addEventListener("change", function () {
  main.audio.currentTime = main.seekbar.value
})
loadSong(currentSongIndex)
