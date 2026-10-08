'use strict';

const photos = [
  ['IMG_1831', 'Senyum kesayanganku', 'Lucky tersenyum sambil menopang dagu di meja makan'],
  ['IMG_1863', 'Senang bisa menjalani hari bersamamu', 'Foto berdua dengan senyum ceria dan seragam kerja'],
  ['IMG_1927', 'Hal sederhana, kenangan berharga', 'Lucky menikmati waktu makan di restoran'],
  ['IMG_1934', 'Tempat ternyamanku: di dekatmu', 'Swafoto berdua dengan pakaian berwarna krem'],
  ['IMG_2205', 'Bahagiamu, bahagiaku juga', 'Lucky tersenyum sambil menunjukkan jam tangannya'],
  ['IMG_2369', 'Bunga dan perempuan kesayanganku', 'Foto berdua dengan sebuket bunga'],
  ['IMG_2677', 'Hari biasa terasa istimewa denganmu', 'Lucky tersenyum dengan semangkuk makanan di meja'],
  ['IMG_2780', 'Selalu ada alasan untuk tersenyum', 'Lucky mengenakan seragam sambil duduk di kafe'],
  ['IMG_4679', 'Satu meja, banyak cerita kita', 'Lucky tersenyum di meja restoran'],
  ['IMG_4720', 'Kamu memberi warna pada hidupku', 'Foto berdua di depan instalasi cahaya warna-warni'],
  ['IMG_4795', 'Kamu, aku, dan perjalanan kita', 'Swafoto berdua sambil memperlihatkan cincin'],
  ['IMG_5022', 'Jatuh cinta pada senyum yang sama', 'Lucky tersenyum saat duduk di kafe'],
  ['IMG_5093', 'Semoga senyum ini selalu ada', 'Lucky membawa beberapa kotak makanan sambil tersenyum'],
];

const wishes = [
  'Semoga kita selalu sehat untuk menikmati hari-hari bersama dan menyambut anak-anak kita kelak.',
  'Semoga tubuhmu sehat, hatimu tenang, dan harimu terasa lebih ringan.',
  'Semoga mimpi yang kamu simpan diam-diam menemukan jalannya untuk jadi nyata.',
  'Semoga rumah kita selalu menjadi tempat yang hangat dan nyaman untukmu pulang.',
  'Semoga ada banyak tempat baru yang bisa kita jelajahi bersama keluarga kecil kita.',
  'Semoga kamu punya keberanian untuk memulai hal yang selama ini ingin kamu coba.',
  'Semoga hal-hal yang kamu usahakan dengan tulus tumbuh pada waktu terbaiknya.',
  'Semoga kamu bisa beristirahat tanpa merasa harus membuktikan apa-apa.',
  'Semoga cinta kita terus tumbuh, dalam saling mendengar, menjaga, dan memahami.',
  'Semoga ada kabar baik yang datang di saat kamu paling membutuhkannya.',
  'Semoga kamu lebih sering merayakan langkahmu, sekecil apa pun itu.',
  'Semoga suatu hari rumah kita diramaikan tawa anak-anak yang kita besarkan dengan penuh cinta.',
  'Semoga kamu menemukan ruang untuk tumbuh tanpa harus terburu-buru.',
  'Semoga ada lagu, buku, atau perjalanan yang membuatmu jatuh cinta lagi pada hidup.',
  'Semoga rezekimu cukup, berkah, dan memberi ruang untuk berbagi kebahagiaan.',
  'Semoga kamu semakin pandai mendengar apa yang sebenarnya dibutuhkan hatimu.',
  'Semoga saat kamu lelah, pelukanku bisa menjadi tempatmu beristirahat.',
  'Semoga kamu bertemu kesempatan baik yang sejalan dengan impianmu.',
  'Semoga kamu tidak lupa bahwa dirimu berharga, bahkan saat sedang merasa biasa saja.',
  'Semoga meja makanmu penuh cerita hangat dan makanan favorit.',
  'Semoga kamu bisa berdamai dengan yang lalu dan menyambut yang baru dengan lapang.',
  'Semoga dalam perjalanan kita, termasuk saat kelak menjadi ibu, kamu tetap punya waktu untuk dirimu sendiri.',
  'Semoga versi dirimu hari ini bangga melihat sejauh apa kamu sudah melangkah.',
  'Semoga kita diberi banyak tahun untuk saling mencintai dan, kelak, melihat anak-anak kita tumbuh. Selamat 24 tahun, sayang. ♡',
];

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const pages = [...document.querySelectorAll('.card-page')];
const pageNames = ['Ucapan untukmu', 'Surat dari suamimu', 'Kenangan kita', 'Lilin ulang tahun', '24 doa untukmu'];
const nextLabels = ['Buka surat', 'Kenangan kita', 'Buat harapan', 'Doa untukmu', ''];
const previousPage = document.querySelector('#previous-page');
const nextPage = document.querySelector('#next-page');
let currentPage = 0;
let turning = false;
const pageDots = pages.map((page, index) => {
  const dot = document.createElement('button');
  dot.className = 'page-dot';
  dot.setAttribute('aria-label', `Lembar ${index + 1}: ${pageNames[index]}`);
  dot.addEventListener('click', () => turnPage(index));
  document.querySelector('#page-dots').append(dot);
  return dot;
});
function updatePageNavigation() {
  previousPage.disabled = currentPage === 0 || turning;
  nextPage.disabled = currentPage === pages.length - 1 || turning;
  nextPage.style.visibility = currentPage === pages.length - 1 ? 'hidden' : 'visible';
  nextPage.querySelector('span').textContent = nextLabels[currentPage];
  pageDots.forEach((dot, index) => {
    dot.setAttribute('aria-current', String(index === currentPage));
    dot.disabled = turning;
  });
  document.querySelector('#page-count').textContent = `Lembar ${currentPage + 1} dari ${pages.length} · untukmu, dengan cinta`;
}
async function animateElement(element, frames, options) {
  if (reducedMotion.matches || !element.animate) return;
  try { await element.animate(frames, options).finished; } catch { /* A canceled animation must never block navigation. */ }
}
async function turnPage(index) {
  if (turning || index === currentPage || index < 0 || index >= pages.length) return;
  turning = true;
  updatePageNavigation();
  const direction = index > currentPage ? 1 : -1;
  const oldPage = pages[currentPage];
  await animateElement(oldPage, [{ opacity: 1, transform: 'perspective(1200px) rotateY(0)' }, { opacity: 0, transform: `perspective(1200px) rotateY(${-direction * 12}deg) translateX(${-direction * 15}px)` }], { duration: 180, easing: 'ease-in' });
  oldPage.hidden = true;
  currentPage = index;
  const newPage = pages[index];
  newPage.hidden = false;
  window.scrollTo({ top: 0, behavior: 'instant' });
  newPage.querySelector('h2').focus({ preventScroll: true });
  await animateElement(newPage, [{ opacity: 0, transform: `perspective(1200px) rotateY(${direction * 10}deg) translateX(${direction * 20}px)` }, { opacity: 1, transform: 'perspective(1200px) rotateY(0) translateX(0)' }], { duration: 420, easing: 'ease-out' });
  turning = false;
  updatePageNavigation();
}
previousPage.addEventListener('click', () => turnPage(currentPage - 1));
nextPage.addEventListener('click', () => turnPage(currentPage + 1));
document.querySelector('#restart-card').addEventListener('click', () => turnPage(0));
updatePageNavigation();

const invitation = document.querySelector('#invitation');
const openCard = document.querySelector('#open-card');
openCard.addEventListener('click', async () => {
  openCard.disabled = true;
  invitation.classList.add('opening');
  if (!reducedMotion.matches) await new Promise(resolve => setTimeout(resolve, 1200));
  await animateElement(invitation, [{ opacity: 1 }, { opacity: 0, transform: 'translateY(-12px)' }], { duration: 250 });
  invitation.hidden = true;
  document.querySelector('#book').hidden = false;
  window.scrollTo({ top: 0, behavior: 'instant' });
  pages[0].querySelector('h2').focus({ preventScroll: true });
});

const ambient = document.querySelector('#ambient');
for (let i = 0; i < 22; i++) {
  const mote = document.createElement('span');
  mote.className = 'floating-mote';
  mote.textContent = ['✧', '♡', '·', '✦'][i % 4];
  mote.style.setProperty('--x', `${(i * 43 + 7) % 100}%`);
  mote.style.setProperty('--y', `${(i * 31 + 9) % 100}%`);
  mote.style.setProperty('--size', `${12 + i % 5 * 4}px`);
  mote.style.setProperty('--duration', `${8 + i % 7}s`);
  mote.style.setProperty('--delay', `${-i * 1.7}s`);
  ambient.append(mote);
}

let memoryIndex = 0;
const memoryOpen = document.querySelector('#memory-open');
const memoryImage = document.querySelector('#memory-image');
memoryImage.draggable = false;
memoryOpen.addEventListener('dragstart', event => event.preventDefault());
let memoryAnimation;
function showMemory(index) {
  memoryIndex = (index + photos.length) % photos.length;
  const [file, caption, alt] = photos[memoryIndex];
  memoryImage.src = `assets/photos/${file}.webp`;
  memoryImage.alt = alt;
  memoryOpen.dataset.photo = memoryIndex;
  memoryOpen.setAttribute('aria-label', `Perbesar foto: ${alt}`);
  document.querySelector('#memory-caption').textContent = caption;
  document.querySelector('#memory-count').textContent = `${String(memoryIndex + 1).padStart(2, '0')} / ${photos.length}`;
  if (!reducedMotion.matches && memoryOpen.animate) {
    memoryAnimation?.cancel();
    memoryAnimation = memoryOpen.animate([{ opacity: .2, transform: 'translateX(12px) rotate(4deg)' }, { opacity: 1, transform: 'translateX(0) rotate(0)' }], { duration: 400, easing: 'ease-out' });
  }
  // Keep only the next photo warm instead of loading the entire album on entry.
  const nextImage = new Image();
  nextImage.src = `assets/photos/${photos[(memoryIndex + 1) % photos.length][0]}.webp`;
}
document.querySelector('#gallery-prev').addEventListener('click', () => showMemory(memoryIndex - 1));
document.querySelector('#gallery-next').addEventListener('click', () => showMemory(memoryIndex + 1));
let swipeStart;
let lastSwipe = -Infinity;
memoryOpen.addEventListener('pointerdown', event => {
  swipeStart = { x: event.clientX, y: event.clientY };
  memoryOpen.setPointerCapture(event.pointerId);
});
memoryOpen.addEventListener('pointerup', event => {
  if (!swipeStart) return;
  const dx = event.clientX - swipeStart.x;
  const dy = event.clientY - swipeStart.y;
  if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) {
    lastSwipe = performance.now();
    showMemory(memoryIndex + (dx < 0 ? 1 : -1));
  }
  swipeStart = null;
});
memoryOpen.addEventListener('pointercancel', () => { swipeStart = null; });

const dialog = document.querySelector('#photo-dialog');
const fullPhoto = document.querySelector('#full-photo');
let currentPhoto = 0;
function showPhoto(index) {
  currentPhoto = (index + photos.length) % photos.length;
  const [file, caption, alt] = photos[currentPhoto];
  fullPhoto.src = `assets/photos/${file}.webp`;
  fullPhoto.alt = alt;
  document.querySelector('#photo-count').textContent = `${String(currentPhoto + 1).padStart(2, '0')} / ${photos.length}`;
  document.querySelector('#photo-caption').textContent = caption;
}
document.querySelectorAll('[data-photo]').forEach(button => {
  button.addEventListener('click', () => {
    if (button === memoryOpen && performance.now() - lastSwipe < 350) return;
    showPhoto(Number(button.dataset.photo));
    dialog.showModal();
    document.body.classList.add('modal-open');
  });
});
document.querySelector('#close-photo').addEventListener('click', () => dialog.close());
dialog.addEventListener('close', () => document.body.classList.remove('modal-open'));
document.querySelector('#photo-prev').addEventListener('click', () => showPhoto(currentPhoto - 1));
document.querySelector('#photo-next').addEventListener('click', () => showPhoto(currentPhoto + 1));
dialog.addEventListener('keydown', event => {
  if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
    event.preventDefault();
    showPhoto(currentPhoto + (event.key === 'ArrowRight' ? 1 : -1));
  }
});
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const bounds = dialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
});
let touchStart = null;
fullPhoto.addEventListener('touchstart', event => {
  touchStart = event.touches.length === 1 ? { x: event.touches[0].clientX, y: event.touches[0].clientY } : null;
}, { passive: true });
fullPhoto.addEventListener('touchend', event => {
  if (!touchStart) return;
  const dx = event.changedTouches[0].clientX - touchStart.x;
  const dy = event.changedTouches[0].clientY - touchStart.y;
  if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) showPhoto(currentPhoto + (dx < 0 ? 1 : -1));
  touchStart = null;
}, { passive: true });

const confetti = document.querySelector('#confetti');
let confettiTimer;
function celebrate() {
  if (reducedMotion.matches) return;
  clearTimeout(confettiTimer);
  confetti.replaceChildren();
  const colors = ['#c1a1dc', '#e4b0c5', '#e6cb85', '#9abbb0', '#b9b5e5'];
  for (let i = 0; i < 65; i++) {
    const piece = document.createElement('span');
    piece.className = 'confetti-piece';
    piece.style.setProperty('--confetti-x', `${Math.random() * 100}%`);
    piece.style.setProperty('--confetti-color', colors[i % colors.length]);
    piece.style.setProperty('--confetti-duration', `${2.5 + Math.random() * 2}s`);
    piece.style.setProperty('--confetti-delay', `${Math.random() * .5}s`);
    piece.style.setProperty('--confetti-drift', `${(Math.random() - .5) * 200}px`);
    confetti.append(piece);
  }
  confettiTimer = setTimeout(() => confetti.replaceChildren(), 5200);
}
const wishButton = document.querySelector('#wish-button');
const relightButton = document.querySelector('#relight-button');
wishButton.addEventListener('click', () => {
  document.querySelector('#cake-scene').classList.add('blown');
  wishButton.disabled = true;
  wishButton.textContent = 'Semoga doamu dikabulkan ♡';
  document.querySelector('#wish-status').textContent = 'Selamat 24 tahun, istriku. Kamu begitu berarti bagiku.';
  document.querySelector('#family-note').hidden = false;
  relightButton.hidden = false;
  relightButton.focus({ preventScroll: true });
  celebrate();
});
relightButton.addEventListener('click', () => {
  document.querySelector('#cake-scene').classList.remove('blown');
  wishButton.disabled = false;
  wishButton.textContent = 'Tiup lilinnya ✧';
  document.querySelector('#wish-status').textContent = 'Aku ikut mengamini setiap doa baikmu.';
  document.querySelector('#family-note').hidden = true;
  wishButton.focus({ preventScroll: true });
  relightButton.hidden = true;
});
let wishIndex = 0;
let wishAnimation;
document.querySelector('#next-wish').addEventListener('click', event => {
  wishIndex = (wishIndex + 1) % wishes.length;
  document.querySelector('#wish-number').textContent = `${String(wishIndex + 1).padStart(2, '0')} / 24`;
  document.querySelector('#wish-text').textContent = wishes[wishIndex];
  document.querySelector('#wish-progress-fill').style.width = `${(wishIndex + 1) / wishes.length * 100}%`;
  event.currentTarget.innerHTML = wishIndex === 23 ? 'Baca dari awal lagi <span aria-hidden="true">↺</span>' : 'Buka doa berikutnya <span aria-hidden="true">↗</span>';
  const wishText = document.querySelector('#wish-text');
  if (!reducedMotion.matches && wishText.animate) {
    wishAnimation?.cancel();
    wishAnimation = wishText.animate([{ opacity: 0, transform: 'translateY(10px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 450, easing: 'ease-out' });
  }
});

// A quiet, original music-box loop. Audio starts only after an explicit tap.
let audioContext;
let musicPlaying = false;
let musicTimer;
let noteIndex = 0;
let nextNoteAt = 0;
const activeNotes = new Set();
const melody = [523.25, 659.25, 783.99, 659.25, 587.33, 659.25, 523.25, 392, 440, 523.25, 659.25, 523.25, 493.88, 587.33, 392, 0];
const musicToggle = document.querySelector('#music-toggle');
function scheduleMusic() {
  if (!musicPlaying) return;
  if (nextNoteAt < audioContext.currentTime) nextNoteAt = audioContext.currentTime;
  while (nextNoteAt < audioContext.currentTime + .4) {
    const frequency = melody[noteIndex % melody.length];
    if (frequency) {
      const oscillator = audioContext.createOscillator();
      const volume = audioContext.createGain();
      oscillator.type = 'sine';
      oscillator.frequency.value = frequency;
      volume.gain.setValueAtTime(0, nextNoteAt);
      volume.gain.linearRampToValueAtTime(.07, nextNoteAt + .025);
      volume.gain.exponentialRampToValueAtTime(.001, nextNoteAt + 1.6);
      oscillator.connect(volume).connect(audioContext.destination);
      oscillator.start(nextNoteAt);
      oscillator.stop(nextNoteAt + 1.7);
      activeNotes.add(oscillator);
      oscillator.onended = () => { activeNotes.delete(oscillator); oscillator.disconnect(); volume.disconnect(); };
    }
    noteIndex++;
    nextNoteAt += .6;
  }
  musicTimer = setTimeout(scheduleMusic, 150);
}
function stopMusic() {
  musicPlaying = false;
  clearTimeout(musicTimer);
  activeNotes.forEach(note => { try { note.stop(); } catch {} });
  activeNotes.clear();
  musicToggle.setAttribute('aria-pressed', 'false');
  musicToggle.setAttribute('aria-label', 'Putar musik lembut');
  document.querySelector('#music-label').textContent = 'Putar musik';
}
musicToggle.addEventListener('click', async () => {
  if (musicPlaying) { stopMusic(); return; }
  musicToggle.disabled = true;
  try {
    const Audio = window.AudioContext || window.webkitAudioContext;
    if (!Audio) throw new Error('Audio unavailable');
    audioContext ??= new Audio();
    await audioContext.resume();
    musicPlaying = true;
    nextNoteAt = audioContext.currentTime + .05;
    musicToggle.setAttribute('aria-pressed', 'true');
    musicToggle.setAttribute('aria-label', 'Matikan musik');
    document.querySelector('#music-label').textContent = 'Matikan musik';
    scheduleMusic();
  } catch {
    stopMusic();
    document.querySelector('#music-label').textContent = 'Musik tidak tersedia';
  } finally {
    musicToggle.disabled = false;
  }
});
document.addEventListener('visibilitychange', () => { if (document.hidden && musicPlaying) stopMusic(); });
