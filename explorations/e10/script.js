// The phone screen shows the same wallpaper as the page, cut at the exact spot the screen covers.
const hero = document.querySelector('.hero');
const phone = document.querySelector('.device .phone');
const screen = phone.querySelector('.screen');

function docOffset(el) {
  let x = 0;
  let y = 0;
  for (let node = el; node; node = node.offsetParent) {
    x += node.offsetLeft;
    y += node.offsetTop;
  }
  return { x, y };
}

function align() {
  const h = docOffset(hero);
  const s = docOffset(screen);
  screen.style.setProperty('--wp-size', `${hero.offsetWidth}px ${hero.offsetHeight}px`);
  screen.style.setProperty('--wp-pos', `${h.x - s.x}px ${h.y - s.y}px`);
}

align();
addEventListener('resize', align);
document.fonts.ready.then(align);
addEventListener('load', () => {
  align();
  if (document.documentElement.classList.contains('motion')) {
    setTimeout(() => phone.classList.add('grown'), 1200);
  }
});
