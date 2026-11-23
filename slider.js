const hero = document.querySelector('.hero');
const slides = [...hero.querySelectorAll('.slide')];
let current = 0;
function advance(step) {
  slides[current].hidden = true;
  current = (current + step + slides.length) % slides.length;
  slides[current].hidden = false;
}
hero.querySelectorAll('[data-step]').forEach(button => {
  button.addEventListener('click', () => advance(Number(button.dataset.step)));
});
hero.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    event.preventDefault();
    advance(event.key === 'ArrowLeft' ? -1 : 1);
  }
});
let startX;
hero.addEventListener('touchstart', event => {
  startX = event.changedTouches[0].clientX;
}, { passive: true });
hero.addEventListener('touchend', event => {
  const distance = event.changedTouches[0].clientX - startX;
  if (Math.abs(distance) > 45) advance(distance < 0 ? 1 : -1);
}, { passive: true });
if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
  setInterval(() => {
    if (!document.hidden && !hero.matches(':hover, :focus-within')) advance(1);
  }, 5000);
}
