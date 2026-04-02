const adventDoors  = document.getElementById('adventDoors');
const modalOverlay = document.getElementById('modalOverlay');
const modalDay     = document.getElementById('modalDay');
const modalText    = document.getElementById('modalText');
const modalClose   = document.getElementById('modalClose');
const currentDate  = new Date();

// ── Open / close modal ──────────────────────────────
function openModal(dayLabel, text) {
  modalDay.textContent  = dayLabel;
  modalText.textContent = text;
  modalOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modalOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) closeModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// ── Build doors ─────────────────────────────────────
const linkedDoors = [24]; // Türen die externe Links öffnen

function Door(day) {
  this.dayLabel = day + '. Dezember';
  this.message  = messages[day - 1][0];

  this.content = function () {
    const li = document.createElement('li');
    adventDoors.appendChild(li);

    const a = document.createElement('a');
    li.appendChild(a);
    a.innerHTML = day;
    a.href = '#';

    const isLocked =
      currentDate.getMonth() + 1 < 12 ||
      currentDate.getDate() < day;

    if (isLocked) {
      a.className = 'disabled';
      a.setAttribute('aria-disabled', 'true');
      a.setAttribute('aria-label', day + '. Dezember — noch gesperrt');
      a.onclick = (e) => { e.preventDefault(); };

    } else if (linkedDoors.includes(day)) {
      a.href   = 'https://www.loom.com/share/c1b72f206ccc4f8587fccc6eb2dddf4a?sid=28d526ab-d9fa-4f6a-8b97-539de588d242';
      a.target = '_blank';
      a.rel    = 'noopener noreferrer';
      a.setAttribute('aria-label', day + '. Dezember — Video öffnen');

    } else {
      a.setAttribute('aria-label', day + '. Dezember öffnen');
      const label   = this.dayLabel;
      const message = this.message;
      a.onclick = (e) => {
        e.preventDefault();
        a.classList.add('opened');
        openModal(label, message);
      };
    }
  };
}

(function () {
  for (let i = 1; i <= 24; i++) {
    new Door(i).content();
  }
})();
