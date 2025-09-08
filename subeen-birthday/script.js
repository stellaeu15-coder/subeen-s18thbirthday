// ---------- Elements ----------
const landing = document.getElementById('landing');
const coverChoice = document.getElementById('cover-choice');
const funnySlide = document.getElementById('funny-slide');
const scrapbook = document.getElementById('scrapbook');

const startBtn = document.getElementById('start-btn');
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const backToChoice = document.getElementById('back-to-choice');

const mainCard = document.getElementById('main-card');
const prevBtn = document.getElementById('prev-card');
const nextBtn = document.getElementById('next-card');

// Present elements
const presentContainer = document.getElementById('present-container');
const presentLid = document.getElementById('present-lid');

// CD player
const cdPlayer = document.getElementById('music-cd');
const bgMusic = document.getElementById('bg-music');
let musicPlaying = false;

// Envelope + Campbell
const envelopeContainer = document.getElementById('envelope-container');
const envelope = document.getElementById('envelope');
const campbell = document.getElementById('campbell-letter');

// Blueletter + Lauren
const blueletterContainer = document.getElementById('blueletter-container');
const blueletter = document.getElementById('blueletter');
const laurenLetter = document.getElementById('lauren-letter');

// Green envelope + Chelsea
const greenletterContainer = document.getElementById('greenletter-container');
const greenEnvelope = document.getElementById('green-envelope');
const chelseaLetter = document.getElementById('chelsea-letter');

// ---------- Pages array ----------
const pages = [
  'images/cover.png',
  'images/firstpage.png',
  'images/secondpage.png',  // Present
  'images/thirdpage.png',   // CD
  'images/fourthpage.png',
  'images/fifthpage.png',   // Campbell
  'images/sixthpage.png',
  'images/seventhpage.png', // Lauren
  'images/eighthpage.png',  // Chelsea
  'images/ninethpage.png',
  'images/tenthpage.png',
  'images/eleventhpage.png',
  'images/twelthpage.png',
  'images/13page.png',
  'images/14page.png',
  'images/15page.png'
];

let pageIndex = 0;
let isAnimating = false;

// ---------- Screen helpers ----------
function showLanding(){ landing.classList.remove('hidden'); coverChoice.classList.add('hidden'); scrapbook.classList.add('hidden'); funnySlide.classList.add('hidden'); }
function showCoverChoice(){ landing.classList.add('hidden'); coverChoice.classList.remove('hidden'); scrapbook.classList.add('hidden'); funnySlide.classList.add('hidden'); }
function showScrapbook(){ landing.classList.add('hidden'); coverChoice.classList.add('hidden'); scrapbook.classList.remove('hidden'); funnySlide.classList.add('hidden'); }
function showFunny(){ landing.classList.add('hidden'); coverChoice.classList.add('hidden'); scrapbook.classList.add('hidden'); funnySlide.classList.remove('hidden'); }

// ---------- Update main card ----------
function updateMainCard(){
  mainCard.src = pages[pageIndex];

  // 🎁 Present (2nd page)
  presentContainer.style.display = (pageIndex === 2) ? 'block' : 'none';

  // 💿 CD player (3rd page)
  cdPlayer.style.display = (pageIndex === 3) ? 'block' : 'none';
  if(pageIndex !== 3 && musicPlaying){
    bgMusic.pause();
    musicPlaying = false;
  }

  // ✉️ Campbell envelope (5th page)
  if(pageIndex === 5){
    envelopeContainer.style.display = 'block';
    envelope.style.display = 'block';
    campbell.style.display = 'none';
  } else {
    envelopeContainer.style.display = 'none';
  }

  // 💙 Lauren letter (7th page)
  if(pageIndex === 7){
    blueletterContainer.style.display = 'block';
    blueletter.style.display = 'block';
    laurenLetter.style.display = 'none';
  } else {
    blueletterContainer.style.display = 'none';
  }

  // 💚 Chelsea letter (8th page)
if(pageIndex === 8){
  greenletterContainer.style.display = 'block';
  greenEnvelope.style.display = 'block';
  chelseaLetter.style.display = 'none';
} else {
  greenletterContainer.style.display = 'none';
}
}

// ---------- Button bindings ----------
startBtn.addEventListener('click', ()=>{ pageIndex=0; updateMainCard(); showScrapbook(); });
yesBtn.addEventListener('click', ()=>{ pageIndex=0; updateMainCard(); showScrapbook(); });
noBtn.addEventListener('click', showFunny);
backToChoice.addEventListener('click', showCoverChoice);

// ---------- Page flip ----------
function goToIndex(newIndex){
  if(isAnimating || newIndex<0 || newIndex>=pages.length || newIndex===pageIndex) return;
  isAnimating = true;
  const direction = newIndex>pageIndex?'left':'right';
  const outClass = direction==='left'?'swipe-left':'swipe-right';
  mainCard.classList.add(outClass);

  setTimeout(()=>{
    mainCard.classList.remove(outClass);
    pageIndex=newIndex;
    updateMainCard();
    mainCard.style.transform='scale(0.98) translateY(-6px)';
    mainCard.style.opacity='0';
    requestAnimationFrame(()=>{
      mainCard.style.transition='transform 300ms ease, opacity 300ms ease';
      mainCard.style.transform='translateY(0) scale(1)';
      mainCard.style.opacity='1';
    });
    setTimeout(()=>{
      mainCard.style.transition=''; mainCard.style.transform=''; mainCard.style.opacity=''; isAnimating=false;
    },350);
  },420);
}

// Card click
mainCard.addEventListener('click', ()=>{ if(pageIndex<pages.length-1) goToIndex(pageIndex+1); });
prevBtn.addEventListener('click', ()=>{ if(pageIndex>0) goToIndex(pageIndex-1); });
nextBtn.addEventListener('click', ()=>{ if(pageIndex<pages.length-1) goToIndex(pageIndex+1); });

// ---------- Present click ----------
presentContainer.addEventListener('click', ()=>{
  presentLid.style.transform = 'rotateX(-120deg) translateY(-25%)';
  for(let i=0;i<6;i++){
    const balloon=document.createElement('div');
    balloon.classList.add('balloon');
    balloon.style.left=`${Math.random()*120}px`;
    balloon.style.background=`hsl(${Math.random()*360},70%,60%)`;
    presentContainer.appendChild(balloon);
    balloon.addEventListener('animationend', ()=>balloon.remove());
  }
});

// ---------- CD click ----------
cdPlayer.addEventListener('click', ()=>{
  if(bgMusic.paused){ bgMusic.play(); musicPlaying=true; }
  else{ bgMusic.pause(); musicPlaying=false; }
});

// ---------- Envelope click & hover ----------
envelope.addEventListener('click', () => {
  envelope.style.display = 'none';
  campbell.style.display = 'block';
});
campbell.addEventListener('mouseenter', () => {
  campbell.style.transform = 'scale(1.8) translateY(-10px)';
});
campbell.addEventListener('mouseleave', () => {
  campbell.style.transform = 'scale(1) translateY(0)';
});

// ---------- Blueletter click & hover ----------
blueletter.addEventListener('click', ()=>{
  blueletter.style.display = 'none';
  laurenLetter.style.display = 'block';
});
laurenLetter.addEventListener('mouseenter', ()=>{
  laurenLetter.style.transform = 'scale(1.8) translateY(-10px)';
});
laurenLetter.addEventListener('mouseleave', ()=>{
  laurenLetter.style.transform = 'scale(1) translateY(0)';
});

// ---------- Green envelope click & hover ----------
greenEnvelope.addEventListener('click', ()=>{
  greenEnvelope.style.display = 'none';
  chelseaLetter.style.display = 'block';
});
chelseaLetter.addEventListener('mouseenter', ()=>{
  chelseaLetter.style.transform = 'scale(1.8) translateY(-10px)';
});
chelseaLetter.addEventListener('mouseleave', ()=>{
  chelseaLetter.style.transform = 'scale(1) translateY(0)';
});

// ---------- Init ----------
showLanding();
updateMainCard();
