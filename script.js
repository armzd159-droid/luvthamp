/**
 * BE MY VALENTINE / เป็นแฟนกันนะ
 * Full Interactive Logic:
 * 1. Multi-round teasing questions before asking to be girlfriend (5 rounds Yes / 5 rounds No)
 * 2. Proposal step: Runaway 'No' button up to 10 rounds, Yes button grows huge, on 10th round No disappears completely!
 * 3. YouTube BGM (https://youtu.be/6GC8JF2FOgA) gentle looping playback
 * 4. 3D Coverflow Carousel with Ken Burns Slow Zoom
 * 5. Heart-shape Photo Mosaic view (รวม 10 รูปเป็นรูปหัวใจ)
 * 6. Falling pastel confetti & floating hearts
 */

// ---------------------------------------------------------
// 1. DEFAULT 10 STORY DATA
// ---------------------------------------------------------
const DEFAULT_STORIES = [
  {
    chapter: "Chapter 01",
    title: "First Sight",
    desc: "วันแรกที่ความบังเอิญพาเรามาเจอกัน และทำให้โลกสดใสขึ้นทันที",
    image: "images/111.jpg",
    date: "Memory 01"
  },
  {
    chapter: "Chapter 02",
    title: "Late Night Talks",
    desc: "บทสนทนาข้ามคืนที่เราคุยกันจนหลับคาโทรศัพท์แทบทุกวัน",
    image: "images/222.jpg",
    date: "Memory 02"
  },
  {
    chapter: "Chapter 03",
    title: "Sweet Treats",
    desc: "ไปกินของหวานด้วยกันครั้งแรก ขนมที่ว่าหวานยังสู้รอยยิ้มเธอไม่ได้เลย",
    image: "images/333.jpg",
    date: "Memory 03"
  },
  {
    chapter: "Chapter 04",
    title: "Pure Laughter",
    desc: "โมเมนต์ตลกๆ กับเสียงหัวเราะที่เราแกล้งกันจนแก้มปวด",
    image: "images/444.jpg",
    date: "Memory 04"
  },
  {
    chapter: "Chapter 05",
    title: "Rainy Day Warmth",
    desc: "วันที่ฝนตกแล้วเราเดินเบียดกันใต้ร่มคันเดียว แต่อบอุ่นหัวใจที่สุด",
    image: "images/555.jpg",
    date: "Memory 05"
  },
  {
    chapter: "Chapter 06",
    title: "Road Trips",
    desc: "นั่งรถมองวิวข้างทางไปด้วยกัน มีเธออยู่ข้างๆ เพลงธรรมดาก็เพราะขึ้น",
    image: "images/666.jpg",
    date: "Memory 06"
  },
  {
    chapter: "Chapter 07",
    title: "Always By Your Side",
    desc: "ในวันที่เหนื่อยล้าที่สุด แค่ได้จับมือคู่นี้ก็มีพลังสู้ต่อแล้ว",
    image: "images/777.jpg",
    date: "Memory 07"
  },
  {
    chapter: "Chapter 08",
    title: "Little Surprises",
    desc: "ของขวัญชิ้นเล็กๆ ที่ตั้งใจเตรียมให้ เพราะอยากเห็นรอยยิ้มของเธอ",
    image: "images/888.jpg",
    date: "Memory 08"
  },
  {
    chapter: "Chapter 09",
    title: "Under The Same Sky",
    desc: "นั่งมองท้องฟ้าด้วยกัน พร้อมคำอธิษฐานขอให้อยู่ด้วยกันตลอดไป",
    image: "images/999.jpg",
    date: "Memory 09"
  },
  {
    chapter: "Chapter 10",
    title: "You & Me Forever",
    desc: "จากนี้และตลอดไป ขอบคุณที่ตกลงเป็นแฟนกันนะ รักเธอที่สุด ❤️",
    image: "images/100.jpg",
    date: "Memory 10"
  }
];

const stories = JSON.parse(JSON.stringify(DEFAULT_STORIES));

// ---------------------------------------------------------
// 2. DOM ELEMENTS
// ---------------------------------------------------------
const interactiveSection = document.getElementById('interactiveSection');
const subGreeting = document.getElementById('subGreeting');
const mainQuestion = document.getElementById('mainQuestion');
const sweetDescription = document.getElementById('sweetDescription');
const btnGroup = document.getElementById('btnGroup');
const btnOptionA = document.getElementById('btnOptionA');
const btnOptionB = document.getElementById('btnOptionB');
const teaseToast = document.getElementById('teaseToast');

const storySection = document.getElementById('storySection');
const carouselStage = document.getElementById('carouselStage');
const carouselDeck = document.getElementById('carouselDeck');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const playPauseBtn = document.getElementById('playPauseBtn');
const playPauseIcon = document.getElementById('playPauseIcon');
const playPauseText = document.getElementById('playPauseText');
const dotsContainer = document.getElementById('dotsContainer');
const progressBar = document.getElementById('progressBar');
const btnViewHeart = document.getElementById('btnViewHeart');

const heartSection = document.getElementById('heartSection');
const heartMosaic = document.getElementById('heartMosaic');
const btnBackToStory = document.getElementById('btnBackToStory');

const musicToggleBtn = document.getElementById('musicToggleBtn');
const musicIcon = document.getElementById('musicIcon');
const bgAudio = document.getElementById('bgAudio');

// ---------------------------------------------------------
// 3. SAY YES - LOCO & PUNCH (BACKGROUND MUSIC)
// ---------------------------------------------------------
// Soft & Gentle Volume (เบาๆ ละมุนๆ)
bgAudio.volume = 0.15;
let isMusicPlaying = false;

function playSayYesMusic() {
  if (isMusicPlaying) return;
  bgAudio.volume = 0.15;
  const playPromise = bgAudio.play();
  if (playPromise !== undefined) {
    playPromise.then(() => {
      isMusicPlaying = true;
      musicIcon.textContent = '🔊';
    }).catch(() => {
      // Browsers require a user gesture before unmuted playback
    });
  }
}

function toggleMusic() {
  if (bgAudio.paused) {
    bgAudio.volume = 0.15;
    bgAudio.play().then(() => {
      isMusicPlaying = true;
      musicIcon.textContent = '🔊';
    }).catch(() => {});
  } else {
    bgAudio.pause();
    isMusicPlaying = false;
    musicIcon.textContent = '🔈';
  }
}

musicToggleBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  toggleMusic();
});

// Try playing on DOM load and immediately on ANY user interaction
window.addEventListener('DOMContentLoaded', () => {
  playSayYesMusic();
});

['click', 'touchstart', 'keydown', 'pointerdown'].forEach(evt => {
  document.addEventListener(evt, () => {
    playSayYesMusic();
  }, { once: true });
});

// ---------------------------------------------------------
// 4. QUESTIONS FLOW LOGIC
// ---------------------------------------------------------
// Sequence Requirements:
// 1. Initial: "มีเรื่องอยากบอก เธออยากรู้มั้ย"
// 2. If 'ใช่': 5 rounds:
//    - "อยากรู้จริงหรอ"
//    - "อยากรู้จริงมั้ย"
//    - "อยากรู้หรอครับ"
//    - "อยากรู้มากมั้ย"
//    - "อยากรู้จริงอ๊ะป่าว"
// 3. If 'ไม่': 5 rounds:
//    - "ไม่อยากรู้จริงหรอ"
//    - "ไม่อยากรู้จริงๆใช่มั้ย"
//    - "ไม่อยากรู้เลยหรอครับ"
//    - "ไม่อยากรู้ซักนิดเดียวเบ๋อ"
//    - "อยากรู้อ๊ะป่าว"
// 4. Then -> Proposal Screen ("เป็นแฟนกันนะ? 💖")

const YES_ROUNDS = [
  { q: "อยากรู้จริงหรอ?", a: "จริงสิ! 🥺", b: "ไม่ละะ" },
  { q: "อยากรู้จริงมั้ย?", a: "จริงที่สุด! ✨", b: "ชักไม่อยากละ" },
  { q: "อยากรู้หรอครับ?", a: "อยากรู้ค้าบ/ค่ะ 🤍", b: "เฉยๆ อะ" },
  { q: "อยากรู้มากมั้ย?", a: "มากกกกกก! 🥰", b: "นิดเดียวเอง" },
  { q: "อยากรู้จริงอ๊ะป่าว?", a: "จริงจริ๊งงงง! 💖", b: "หยอกเล่นน้า" }
];

const NO_ROUNDS = [
  { q: "ไม่อยากรู้จริงหรอ?", a: "อยากรู้ก็ได้ 🥺", b: "ไม่อยากจริง!" },
  { q: "ไม่อยากรู้จริงๆใช่มั้ย?", a: "ล้อเล่น อยากรู้! 🥰", b: "จริงแท้แน่นอน" },
  { q: "ไม่อยากรู้เลยหรอครับ?", a: "รู้นิดนึงก็ได้ ✨", b: "ไม่เลยครับ" },
  { q: "ไม่อยากรู้ซักนิดเดียวเบ๋อ?", a: "โอเคๆ อยากรู้แล้วว 🤍", b: "ไม่เบ๋ออ" },
  { q: "อยากรู้อ๊ะป่าว?", a: "อยากรู้แล้วจ้าาา 💖", b: "ไม่อยากกก" }
];

let currentFlowState = "INITIAL"; // "INITIAL", "YES_BRANCH", "NO_BRANCH", "PROPOSAL"
let currentRoundIndex = 0;

function updateQuestionUI() {
  if (currentFlowState === "INITIAL") {
    subGreeting.textContent = "เค้ามีอะไรจะบอกแก...";
    mainQuestion.textContent = "มีเรื่องอยากบอก เธออยากรู้มั้ย?";
    sweetDescription.textContent = "ลองเลือกตอบดูหน่อยสินะครับ...";
    btnOptionA.textContent = "ใช่! 🙋‍♀️";
    btnOptionB.textContent = "ไม่ 🙅‍♀️";
  } else if (currentFlowState === "YES_BRANCH") {
    subGreeting.textContent = "แน่ะ... ถามย้ำอีกนิดนะ!";
    const step = YES_ROUNDS[currentRoundIndex];
    mainQuestion.textContent = step.q;
    sweetDescription.textContent = "ตอบตรงๆ ห้ามโกหกน้าา";
    btnOptionA.textContent = step.a;
    btnOptionB.textContent = step.b;
  } else if (currentFlowState === "NO_BRANCH") {
    subGreeting.textContent = "ฮั่นแน่... ใจแข็งจังเลย!";
    const step = NO_ROUNDS[currentRoundIndex];
    mainQuestion.textContent = step.q;
    sweetDescription.textContent = "คิดดูใหม่อีกทีจิ...";
    btnOptionA.textContent = step.a;
    btnOptionB.textContent = step.b;
  } else if (currentFlowState === "PROPOSAL") {
    setupProposalScreen();
  }
}

btnOptionA.addEventListener('click', () => {
  playSayYesMusic();
  if (currentFlowState === "INITIAL") {
    currentFlowState = "YES_BRANCH";
    currentRoundIndex = 0;
    updateQuestionUI();
  } else if (currentFlowState === "YES_BRANCH") {
    currentRoundIndex++;
    if (currentRoundIndex >= YES_ROUNDS.length) {
      currentFlowState = "PROPOSAL";
      updateQuestionUI();
    } else {
      updateQuestionUI();
    }
  } else if (currentFlowState === "NO_BRANCH") {
    currentFlowState = "PROPOSAL";
    updateQuestionUI();
  } else if (currentFlowState === "PROPOSAL") {
    handleProposalAccept();
  }
});

btnOptionB.addEventListener('click', (e) => {
  playSayYesMusic();
  if (currentFlowState === "INITIAL") {
    currentFlowState = "NO_BRANCH";
    currentRoundIndex = 0;
    updateQuestionUI();
  } else if (currentFlowState === "NO_BRANCH") {
    currentRoundIndex++;
    if (currentRoundIndex >= NO_ROUNDS.length) {
      currentFlowState = "PROPOSAL";
      updateQuestionUI();
    } else {
      updateQuestionUI();
    }
  } else if (currentFlowState === "YES_BRANCH") {
    currentRoundIndex++;
    if (currentRoundIndex >= YES_ROUNDS.length) {
      currentFlowState = "PROPOSAL";
      updateQuestionUI();
    } else {
      updateQuestionUI();
    }
  } else if (currentFlowState === "PROPOSAL") {
    e.preventDefault();
    runawayProposalNo();
  }
});

// ---------------------------------------------------------
// 5. PROPOSAL SCREEN & RUNAWAY 'NO'
// ---------------------------------------------------------
let noProposalAttempts = 0;
const PROPOSAL_TEASES = [
  "คิดดูใหม่อีกทีนะ 🥺",
  "กดผิดป่าวแกรรร 😆",
  "อย่าใจร้ายกับเค้าจิ 😭",
  "ให้โอกาสอีกรอบน้าา",
  "ปุ่มนี้กดไม่ได้หรอกกก 😜",
  "ยอมเป็นแฟนเหอะนะ น้าาา ❤️",
  "มือลื่นแน่ๆ เลยยย",
  "ไม่มีทางเลือกอื่นแล้ววว 🥰",
  "อีกนิดนึงปุ่มจะหายแล้วน้าา 😆",
  "ยอมเค้าเถอะนะคนดี! ❤️"
];

function setupProposalScreen() {
  subGreeting.textContent = "ตั้งใจฟังเค้าดีๆ นะ...";
  mainQuestion.textContent = "เป็นแฟนกันนะ? 💖";
  sweetDescription.textContent = "อยู่เป็นความสดใส รอยยิ้ม และความอบอุ่นให้เค้าไปนานๆ นะครับ";
  
  btnOptionA.textContent = "เป็นแฟน ❤️";
  btnOptionA.style.transform = "scale(1)";
  
  btnOptionB.textContent = "ไม่เป็น 😜";
  btnOptionB.classList.remove('running');
  btnOptionB.style.position = "";
  btnOptionB.style.left = "";
  btnOptionB.style.top = "";

  // Add hover & touch runaway listener for No button in proposal
  btnOptionB.addEventListener('mouseenter', handleProposalNoTrigger);
  btnOptionB.addEventListener('touchstart', (e) => {
    if (currentFlowState === "PROPOSAL") {
      e.preventDefault();
      handleProposalNoTrigger();
    }
  });
}

function handleProposalNoTrigger() {
  if (currentFlowState === "PROPOSAL") {
    runawayProposalNo();
  }
}

function runawayProposalNo() {
  noProposalAttempts++;

  if (noProposalAttempts >= 10) {
    // 10 attempts reached: No button DISAPPEARS completely!
    btnOptionB.style.display = "none";
    showTeaseToast("ยอมเป็นเถอะน้าาา ไม่มีปุ่มไม่เป็นให้กดแล้วนะ 🥰");
    btnOptionA.style.transform = `scale(1.55)`;
    btnOptionA.textContent = "ต้องเป็นแฟนแล้วแหละ! ❤️🎉";
    return;
  }

  // Move button away safely within viewport
  btnOptionB.classList.add('running');
  const padding = 25;
  const btnWidth = btnOptionB.offsetWidth || 120;
  const btnHeight = btnOptionB.offsetHeight || 50;

  const maxX = window.innerWidth - btnWidth - padding;
  const maxY = window.innerHeight - btnHeight - padding;

  const randomX = Math.max(padding, Math.floor(Math.random() * maxX));
  const randomY = Math.max(padding, Math.floor(Math.random() * maxY));

  btnOptionB.style.left = `${randomX}px`;
  btnOptionB.style.top = `${randomY}px`;

  // Update text
  const phrase = PROPOSAL_TEASES[(noProposalAttempts - 1) % PROPOSAL_TEASES.length];
  btnOptionB.textContent = phrase;
  showTeaseToast(phrase);

  // Scale Yes button bigger and bigger
  const scale = 1 + (noProposalAttempts * 0.14);
  btnOptionA.style.transform = `scale(${Math.min(2.1, scale)})`;
}

function showTeaseToast(msg) {
  teaseToast.textContent = msg;
  teaseToast.classList.add('show');
  clearTimeout(teaseToast.timer);
  teaseToast.timer = setTimeout(() => {
    teaseToast.classList.remove('show');
  }, 1900);
}

// When Yes is clicked -> Go directly to story without asking!
function handleProposalAccept() {
  playSayYesMusic();
  startConfetti();
  
  // Transition directly into 3D Story section without any modal prompt!
  interactiveSection.classList.add('hidden');
  storySection.classList.add('active');
  initCarousel();
  buildHeartMosaic();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ---------------------------------------------------------
// 6. 3D COVERFLOW CAROUSEL & SLOW ZOOM ENGINE
// ---------------------------------------------------------
let currentIndex = 0;
let isPlaying = true;
let slideInterval = null;
let progressInterval = null;
let progressValue = 0;
const SLIDE_DURATION = 7000;

function renderDeck() {
  carouselDeck.innerHTML = '';
  stories.forEach((story, idx) => {
    const card = document.createElement('div');
    card.className = 'story-card';
    card.dataset.index = idx;

    // Pure photo frame without any text inside!
    card.innerHTML = `
      <div class="polaroid-tape"></div>
      <div class="story-img-container">
        <img class="story-img" src="${story.image}" alt="Memory ${idx + 1}" loading="lazy">
      </div>
    `;

    card.addEventListener('click', () => {
      goToSlide(idx);
    });

    carouselDeck.appendChild(card);
  });
}

function renderDots() {
  dotsContainer.innerHTML = '';
  stories.forEach((_, idx) => {
    const dot = document.createElement('div');
    dot.className = `dot ${idx === currentIndex ? 'active' : ''}`;
    dot.addEventListener('click', () => goToSlide(idx));
    dotsContainer.appendChild(dot);
  });
}

function updateCarousel(index) {
  currentIndex = index;
  const cards = document.querySelectorAll('.story-card');
  const isMobile = window.innerWidth <= 600;

  const stepX = isMobile ? 180 : 250;
  const stepZ = isMobile ? -100 : -140;
  const rotateDeg = 24;

  cards.forEach((card, idx) => {
    const offset = idx - currentIndex;
    const absOffset = Math.abs(offset);

    if (offset === 0) {
      card.className = 'story-card active';
      card.style.transform = `translate3d(0, 0, 0) rotateY(0deg) scale(1)`;
      card.style.opacity = '1';
      card.style.zIndex = '20';
      card.style.filter = 'none';
      card.style.pointerEvents = 'auto';
    } else {
      card.className = 'story-card';
      const direction = offset > 0 ? 1 : -1;
      const transX = offset * stepX;
      const transZ = -absOffset * Math.abs(stepZ);
      const rotY = -direction * rotateDeg;
      const scale = Math.max(0.72, 1 - absOffset * 0.12);
      const opacity = Math.max(0, 0.85 - absOffset * 0.28);

      card.style.transform = `translate3d(${transX}px, 0, ${transZ}px) rotateY(${rotY}deg) scale(${scale})`;
      card.style.opacity = `${opacity}`;
      card.style.zIndex = `${20 - absOffset}`;
      card.style.filter = absOffset > 1 ? 'blur(1px)' : 'none';
      card.style.pointerEvents = absOffset <= 2 ? 'auto' : 'none';
    }
  });

  const dots = document.querySelectorAll('.dot');
  dots.forEach((dot, idx) => {
    dot.classList.toggle('active', idx === currentIndex);
  });

  resetProgress();
}

function nextSlide() {
  goToSlide((currentIndex + 1) % stories.length);
}

function prevSlide() {
  goToSlide((currentIndex - 1 + stories.length) % stories.length);
}

function goToSlide(idx) {
  updateCarousel(idx);
}

function startAutoplay() {
  isPlaying = true;
  playPauseIcon.textContent = '⏸';
  playPauseText.textContent = 'หยุดเล่นชั่วคราว';

  clearInterval(slideInterval);
  clearInterval(progressInterval);

  const stepTime = 50;
  const totalSteps = SLIDE_DURATION / stepTime;

  progressInterval = setInterval(() => {
    progressValue += (100 / totalSteps);
    if (progressValue > 100) progressValue = 100;
    progressBar.style.width = `${progressValue}%`;
  }, stepTime);

  slideInterval = setInterval(() => {
    nextSlide();
  }, SLIDE_DURATION);
}

function pauseAutoplay() {
  isPlaying = false;
  playPauseIcon.textContent = '▶';
  playPauseText.textContent = 'เล่นต่อ';
  clearInterval(slideInterval);
  clearInterval(progressInterval);
}

function resetProgress() {
  progressValue = 0;
  progressBar.style.width = '0%';
  if (isPlaying) {
    clearInterval(slideInterval);
    clearInterval(progressInterval);
    startAutoplay();
  }
}

playPauseBtn.addEventListener('click', () => {
  isPlaying ? pauseAutoplay() : startAutoplay();
});

prevBtn.addEventListener('click', prevSlide);
nextBtn.addEventListener('click', nextSlide);

// Keyboard
window.addEventListener('keydown', (e) => {
  if (storySection.classList.contains('active')) {
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === ' ') {
      e.preventDefault();
      isPlaying ? pauseAutoplay() : startAutoplay();
    }
  }
});

// Touch Swipe
let touchStartX = 0;
let touchEndX = 0;

carouselStage.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

carouselStage.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  if (touchEndX < touchStartX - 40) nextSlide();
  if (touchEndX > touchStartX + 40) prevSlide();
}, { passive: true });

window.addEventListener('resize', () => {
  if (storySection.classList.contains('active')) {
    updateCarousel(currentIndex);
  }
});

function initCarousel() {
  renderDeck();
  renderDots();
  updateCarousel(0);
  startAutoplay();
}

// ---------------------------------------------------------
// 7. HEART-SHAPE PHOTO MOSAIC VIEW (ทุกรูปรวมกันเป็นรูปหัวใจ)
// ---------------------------------------------------------
// 10 Photos arranged into a heart:
// Row 1: Photos 1, 2
// Row 2: Photos 3, 4, 5, 6
// Row 3: Photos 7, 8, 9
// Row 4: Photo 10
function buildHeartMosaic() {
  heartMosaic.innerHTML = '';

  const rows = [
    [0, 1],          // Row 1 (2 items)
    [2, 3, 4, 5],    // Row 2 (4 items)
    [6, 7, 8],       // Row 3 (3 items)
    [9]              // Row 4 (1 item - heart tip)
  ];

  rows.forEach(rowIndices => {
    const rowEl = document.createElement('div');
    rowEl.className = 'heart-row';

    rowIndices.forEach(idx => {
      const story = stories[idx];
      const cardEl = document.createElement('div');
      cardEl.className = 'heart-photo-card';
      cardEl.innerHTML = `
        <img src="${story.image}" alt="Memory ${idx + 1}">
      `;

      cardEl.addEventListener('click', () => {
        // Jump back to 3D story view at this photo
        heartSection.classList.remove('active');
        storySection.classList.add('active');
        goToSlide(idx);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });

      rowEl.appendChild(cardEl);
    });

    heartMosaic.appendChild(rowEl);
  });
}

btnViewHeart.addEventListener('click', () => {
  storySection.classList.remove('active');
  heartSection.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

btnBackToStory.addEventListener('click', () => {
  heartSection.classList.remove('active');
  storySection.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ---------------------------------------------------------
// 8. BACKGROUND DECORATIONS (FLOATING HEARTS)
// ---------------------------------------------------------
const bgDecorations = document.getElementById('bgDecorations');
const heartSymbols = ['🤍', '🌸', '✨', '💖', '🧸', '🌷'];

function createFloatingHeart() {
  const heart = document.createElement('div');
  heart.className = 'floating-heart';
  heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
  heart.style.left = `${Math.random() * 95}vw`;
  heart.style.animationDuration = `${10 + Math.random() * 10}s`;
  heart.style.fontSize = `${0.9 + Math.random() * 0.9}rem`;
  bgDecorations.appendChild(heart);
  setTimeout(() => heart.remove(), 20000);
}

setInterval(createFloatingHeart, 1200);
for (let i = 0; i < 6; i++) createFloatingHeart();

// ---------------------------------------------------------
// 9. CONFETTI CANVAS
// ---------------------------------------------------------
const canvas = document.getElementById('confettiCanvas');
const ctx = canvas.getContext('2d');
let confettiParticles = [];
let confettiRunning = false;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

const CONFETTI_COLORS = ['#FF7597', '#FFAEC0', '#FFCCD5', '#FFF0F3', '#FFFFFF', '#FF8DA1'];

class ConfettiParticle {
  constructor(isHeart = false) {
    this.x = Math.random() * canvas.width;
    this.y = -20 - Math.random() * 50;
    this.size = isHeart ? (12 + Math.random() * 14) : (7 + Math.random() * 9);
    this.color = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
    this.speedY = 2 + Math.random() * 4;
    this.speedX = -1.5 + Math.random() * 3;
    this.rotation = Math.random() * 360;
    this.rotSpeed = -3 + Math.random() * 6;
    this.isHeart = isHeart;
    this.opacity = 1;
  }

  update() {
    this.y += this.speedY;
    this.x += Math.sin(this.y * 0.02) * 1.5 + this.speedX;
    this.rotation += this.rotSpeed;
    if (this.y > canvas.height - 50) this.opacity -= 0.02;
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = Math.max(0, this.opacity);
    ctx.translate(this.x, this.y);
    ctx.rotate((this.rotation * Math.PI) / 180);

    if (this.isHeart) {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      const topCurveHeight = this.size * 0.3;
      ctx.moveTo(0, topCurveHeight);
      ctx.bezierCurveTo(0, 0, -this.size / 2, 0, -this.size / 2, topCurveHeight);
      ctx.bezierCurveTo(-this.size / 2, (this.size + topCurveHeight) / 2, 0, this.size, 0, this.size * 1.2);
      ctx.bezierCurveTo(0, this.size, this.size / 2, (this.size + topCurveHeight) / 2, this.size / 2, topCurveHeight);
      ctx.bezierCurveTo(this.size / 2, 0, 0, 0, 0, topCurveHeight);
      ctx.closePath();
      ctx.fill();
    } else {
      ctx.fillStyle = this.color;
      ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size * 0.6);
    }
    ctx.restore();
  }
}

function startConfetti() {
  confettiParticles = [];
  confettiRunning = true;
  for (let i = 0; i < 140; i++) {
    confettiParticles.push(new ConfettiParticle(Math.random() > 0.4));
  }
  let spawnTimer = setInterval(() => {
    if (!confettiRunning) {
      clearInterval(spawnTimer);
      return;
    }
    for (let i = 0; i < 5; i++) {
      confettiParticles.push(new ConfettiParticle(Math.random() > 0.4));
    }
  }, 180);

  setTimeout(() => { confettiRunning = false; }, 9000);
  renderConfetti();
}

function renderConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = confettiParticles.length - 1; i >= 0; i--) {
    const p = confettiParticles[i];
    p.update();
    p.draw();
    if (p.opacity <= 0 || p.y > canvas.height + 40) {
      confettiParticles.splice(i, 1);
    }
  }
  if (confettiParticles.length > 0 || confettiRunning) {
    requestAnimationFrame(renderConfetti);
  }
}

// Initialize on page load
updateQuestionUI();
