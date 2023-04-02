const inputEl = document.querySelector('input');
const buttonEl = document.querySelector('button');
const timerEl = document.querySelector('span');

const createTimerAnimator = () => {
  let timer = null;
  const render = (timerStopDate) => {
    const durationLeftToWait = Math.max(
      0,
      Math.round((timerStopDate.getTime() - new Date().getTime()) / 1000)
    );
    const hours = Math.trunc(durationLeftToWait / 60 / 60);
    const minutes = Math.trunc(durationLeftToWait / 60) - hours * 60;
    const seconds = durationLeftToWait - hours * 60 * 60 - minutes * 60;

    timerEl.innerText = `${String(hours).padStart(2, '0')}:${String(
      minutes
    ).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    if (durationLeftToWait === 0) clearInterval(timer);
  };
  return (timerStopDate) => {
    clearInterval(timer);
    render(timerStopDate);
    timer = setInterval(render.bind(null, timerStopDate), 1000);
  };
};

const animateTimer = createTimerAnimator();

inputEl.addEventListener('input', (event) => {
  if (!/^[0-9]*$/.test(event.currentTarget.value))
    event.currentTarget.value = event.currentTarget.value.replace(
      /[^0-9]+/g,
      ''
    );
});

buttonEl.addEventListener('click', () => {
  const seconds = Number(inputEl.value);
  const timerStopDate = new Date();
  timerStopDate.setSeconds(timerStopDate.getSeconds() + seconds);
  animateTimer(timerStopDate);
  inputEl.value = '';
});
