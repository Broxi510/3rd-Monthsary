// ==========================
// 🌟 INIT
// ==========================
window.onload = () => {
  document.body.classList.add("loaded");
  updateTime();
  setInterval(updateTime, 1000);
  initPlayer();
};

// ==========================
// 📱 NAVIGATION (FIXED)
// ==========================
function goPage(page){
  document.body.classList.remove("loaded");
  setTimeout(()=>window.location.href = page,300);
}

function goBack(){
  document.body.classList.remove("loaded");
  setTimeout(()=>window.location.href = "home.html",300); // 🔥 FIXED
}

// ==========================
// 🔐 UNLOCK
// ==========================
function unlock(){
  const status = document.getElementById("status");

  if(status) status.innerText = "Scanning face...";

  setTimeout(()=>{
    if(status) status.innerText = "Face recognized 💖";
  },1000);

  setTimeout(()=>{
    goPage("home.html");
  },2000);
}

// ==========================
// 🕒 TIME & DATE
// ==========================
function updateTime() {
  const now = new Date();

  const time = now.toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit'
  });

  const date = now.toLocaleDateString([], {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });

  const t = document.getElementById("time");
  const d = document.getElementById("date");

  if (t) t.innerText = time;
  if (d) d.innerText = date;
}

// ==========================
// 🎵 MUSIC PLAYER
// ==========================
let songs = [
  {
    title: "Deer",
    artist: "Ben&Ben",
    src: "music/test.mp3",
    cover: "download2.jpg"
  },
  {
    title: "Duyan",
    artist: "Ben&Ben",
    src: "music/test2.mp3",
    cover: "download.jpg"
  }
];

let currentSong = 0;
let audio, title, artist, cover, progress, playBtn, currentTimeEl, durationEl;

function initPlayer(){
  audio = document.getElementById("audio");
  if(!audio) return;

  title = document.getElementById("songTitle");
  artist = document.getElementById("artist");
  cover = document.getElementById("albumCover");
  progress = document.getElementById("progress");
  playBtn = document.getElementById("playBtn");
  currentTimeEl = document.getElementById("currentTime");
  durationEl = document.getElementById("duration");

  currentSong = parseInt(localStorage.getItem("songIndex")) || 0;

  loadSong(currentSong);

  audio.addEventListener("timeupdate", updateProgress);
  audio.addEventListener("ended", nextSong);
}

// ==========================
// LOAD SONG
// ==========================
function loadSong(index){
  let song = songs[index];

  audio.src = song.src;

  if(title) title.innerText = song.title;
  if(artist) artist.innerText = song.artist;
  if(cover) cover.src = song.cover;

  localStorage.setItem("songIndex", index);
}

// ==========================
// PLAY / PAUSE
// ==========================
function togglePlay(){
  if(audio.paused){
    audio.play().then(()=>{
      localStorage.setItem("isPlaying","true");
      if(playBtn) playBtn.innerText = "⏸️";
    }).catch(()=>{});
  } else {
    audio.pause();
    localStorage.setItem("isPlaying","false");
    if(playBtn) playBtn.innerText = "▶️";
  }
}

// ==========================
// NEXT / PREV
// ==========================
function nextSong(){
  currentSong = (currentSong + 1) % songs.length;
  loadSong(currentSong);
  audio.play();
  if(playBtn) playBtn.innerText = "⏸️";
}

function prevSong(){
  currentSong = (currentSong - 1 + songs.length) % songs.length;
  loadSong(currentSong);
  audio.play();
  if(playBtn) playBtn.innerText = "⏸️";
}

// ==========================
// PROGRESS
// ==========================
function updateProgress(){
  if(audio.duration){
    let percent = (audio.currentTime / audio.duration) * 100;
    if(progress) progress.style.width = percent + "%";

    let curMin = Math.floor(audio.currentTime / 60);
    let curSec = Math.floor(audio.currentTime % 60);
    if(curSec < 10) curSec = "0" + curSec;

    if(currentTimeEl)
      currentTimeEl.innerText = curMin + ":" + curSec;

    let durMin = Math.floor(audio.duration / 60);
    let durSec = Math.floor(audio.duration % 60);
    if(durSec < 10) durSec = "0" + durSec;

    if(durationEl)
      durationEl.innerText = durMin + ":" + durSec;
  }
}

// ==========================
// 🔥 RESUME AFTER CLICK
// ==========================
document.addEventListener("click", () => {
  if(!audio) return;

  if(localStorage.getItem("isPlaying") === "true"){
    audio.play().catch(()=>{});
    if(playBtn) playBtn.innerText = "⏸️";
  }
}, { once: true });