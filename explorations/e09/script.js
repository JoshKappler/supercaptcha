const island = document.querySelector('.island');
const label = island.querySelector('.done-label');

if (document.documentElement.classList.contains('motion')) {
  addEventListener('load', () => setTimeout(() => island.classList.add('arrived'), 1500));
} else {
  island.classList.add('arrived');
}

island.querySelectorAll('button[data-answer]').forEach((button) => {
  button.addEventListener('click', () => {
    label.textContent = button.dataset.answer;
    island.classList.add('answered');
  });
});
