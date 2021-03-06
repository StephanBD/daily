const query = node => document.querySelector(node);

const songImage = document.querySelector(".day-9-portrait");
const songTitle = document.getElementById("day-9-title");
const songArtist = document.getElementById("day-9-artist");
const music = document.querySelector("audio");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const prevBtn = document.querySelector("#day-9-backward");
const playBtn = document.querySelector("#day-9-play");
const nextBtn = document.querySelector("#day-9-forward");
const songsList = document.querySelector(".day-9-list");

// --------------
const metric1 = require("../music/metric-1.mp3");
const jacinto1 = require("../music/jacinto-1.mp3");
const jacinto2 = require("../music/jacinto-2.mp3");
const jacinto3 = require("../music/jacinto-3.mp3");

const metric1_img = require("../img/metric-1.jpg");
const jacinto1_img = require("../img/jacinto-1.jpg");
const jacinto2_img = require("../img/jacinto-2.jpg");
const jacinto3_img = require("../img/jacinto-3.jpg");

// music
const songs = [
  {
    name: jacinto1,
    displayName: "Electric Chill Machine",
    artist: "Jacinto Desing",
    img: jacinto1_img
  },
  {
    name: jacinto2,
    displayName: "Seven nation Armi (Remix)",
    artist: "Jacinto Desing",
    img: jacinto2_img
  },
  {
    name: jacinto3,
    displayName: "Goodnight, Disco Queen",
    artist: "Jacinto Desing",
    img: jacinto3_img
  },
  {
    name: metric1,
    displayName: "Front Row (Remix)",
    artist: "Metric/Jacinto Desing",
    img: metric1_img
  }
];

// -----
// check if Playing
let isPlaying = false;
let isReady = true;
// play
function playSong() {
  isPlaying = true;
  playBtn.classList.replace("fa-play-circle", "fa-pause-circle");
  playBtn.setAttribute("title", "pause");
  music.play();
}
// pause
function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace("fa-pause-circle", "fa-play-circle");
  playBtn.setAttribute("title", "play");
  music.pause();
}
// prevSong
let songIndex = 0;
// prevSong
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}
// nextSong
function nextSong() {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}
//
playBtn.addEventListener("click", () => {
  isPlaying ? pauseSong() : playSong();
});
// update dom
function loadSong(song) {
  // console.log(song);
  songTitle.textContent = song.displayName;
  songArtist.textContent = song.artist;
  music.src = song.name;
  songImage.src = song.img;
  // music.src = `music/${song.name}.mp3`;
  // songImage.src = `img/${song.name}.jpg`;
}
// update progress bar

function updateProgressBar(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    //
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }
    // delay
    if (durationSeconds) {
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
      //
      const currentMinutes = Math.floor(currentTime / 60);
      let currentSeconds = Math.floor(currentTime % 60);
      if (currentSeconds < 10) {
        currentSeconds = `0${currentSeconds}`;
      }
      currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }
  }
}
// setProgressBar
function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const { duration } = music;
  // console.log((clickX / width) * duration);
  music.currentTime = (clickX / width) * duration;
}
//
function renderSongsList() {
  let listSongstemplate = ``;
  songs.forEach((song, index) => {
    const classActive = songIndex == index ? "day-9-li-active" : "day-9-li";
    const template = `	
			<li class="${classActive}" id="${index}">
				${song.displayName}
			</li>`;
    // <span class="mx-a float-right t-sm">${song.duration}</span>
    listSongstemplate += template;
  });
  songsList.innerHTML += listSongstemplate;
}
// select song
function selectSong(e) {
  if (e.target.id != songIndex && isReady && e.target.id) {
    isReady = false;
    songIndex = e.target.id;
    loadSong(songs[songIndex]);
    playSong();
    // console.log(e.target);
    document.querySelector(".day-9-li-active")
      ? document
          .querySelector(".day-9-li-active")
          .classList.replace("day-9-li-active", "day-9-li")
      : e.target.classList.replace("day-9-li", "day-9-li-active");
    e.target.classList.replace("day-9-li", "day-9-li-active");
    isReady = true;
  }
}
// on load
loadSong(songs[songIndex]);
renderSongsList();
// event
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
music.addEventListener("ended", nextSong);
songsList.addEventListener("click", selectSong);
progressContainer.addEventListener("click", setProgressBar);

/**************************************************/

const animatedMenu = query("#animated-menu");
const navList = query("#nav-list");
const back = query("#back");
let backPosition = {};

let tl = gsap.timeline({});

navList.addEventListener("click", e => {
  const bg = e.target.dataset.bg;
  if (bg) {
    let x = e.target.offsetLeft - back.offsetLeft;
    let y = e.target.offsetTop - back.offsetLeft;

    tl.to(back, {
      duration: 0.2,
      scaleY: 0.5,
      scaleX: 1.2,
      ease: "power2.inOut",
      x: x,
      y: y,
      background: bg
    }).to(back, { duration: 0.2, scaleY: 1, scaleX: 1, ease: "power2.inOut" });

    for (let index = 0; index < navList.children.length - 1; index++) {
      navList.children[index].classList.remove("t-light", "active");
    }

    e.target.classList.add("t-light", "active");

    animatedMenu.className = "";
    animatedMenu.style.background = bg;
    back.style.background = bg;
  }
});

function reportWindowSize() {
  const active = navList.querySelector(".active");

  let x = active.offsetLeft - back.offsetLeft;
  let y = active.offsetTop - back.offsetLeft;
  tl.to(back, {
    duration: 0,
    scaleY: 1,
    scaleX: 1,
    ease: "power2.inOut",
    x: x,
    y: y
  });
}
reportWindowSize();
// const mql = window.matchMedia('screen and (max-width: 576px)');
// window.onresize = reportWindowSize;

window.addEventListener("resize", () => {
  reportWindowSize();
  // const active = navList.querySelector(".active")

  // let x = active.offsetLeft - back.offsetLeft
  // let y = active.offsetTop - back.offsetLeft
  // tl
  // 	.to(back, { duration: 0, scaleY: 1, scaleX: 1, ease: "power2.inOut", x: x, y: y },)
});

/**************************************************/

const modalOpen = query("#modal-open");
const modal = query("#modal");
const modalAcept = query("#modal-accept");

modalOpen.addEventListener("click", e => {
  modal.classList.remove("hide");
});

modalAcept.addEventListener("click", e => {
  modal.classList.add("hide");
});
modal.addEventListener("click", e => {
  // if (e.target.id == modal.id) {
  // 	modal.classList.add("hide")
  // }
  e.target.id == modal.id ? modal.classList.add("hide") : false;
});

/**************************************************/
const theme = localStorage.getItem("theme");
if (theme) {
  // body.classList.add(theme);
  document.body.classList.toggle(theme);
}
// Select the button
const darkBtn = document.querySelector("#toggledark");
// Listen for a click on the button
darkBtn.addEventListener("click", function() {
  switchTheme("dark-theme");
});
function switchTheme(themeName) {
  document.body.classList.toggle(themeName);
  if (!theme) {
    localStorage.setItem("theme", "dark-theme");
  } else {
    localStorage.removeItem("theme");
  }
}
/**************************************************/
var html = document.getElementsByTagName("html")[0];

// function fontSize(size = "10%") {
//    html.style.fontSize = size
// }

function fontSize(size = "10%") {
  html.style.fontSize = size;
}
