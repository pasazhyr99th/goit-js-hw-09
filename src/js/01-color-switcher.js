function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

let intervalId = null;

const refs = {
  btnStart: document.querySelector('[data-start]'),
  btnStop: document.querySelector('[data-stop]'),
  body: document.querySelector('body'),
};

refs.btnStop.disabled = true;

refs.btnStart.addEventListener('click', onClickStart);
refs.btnStop.addEventListener('click', onClickStop);

function onClickStart() {
    refs.btnStart.disabled = true;
    refs.btnStop.disabled = false;

    intervalId = setInterval(() => {
        refs.body.style.backgroundColor = `${getRandomHexColor()}`;
    }, 1000);
}

function onClickStop() {
    refs.btnStart.disabled = false;
    refs.btnStop.disabled = true;

    clearInterval(intervalId);
}