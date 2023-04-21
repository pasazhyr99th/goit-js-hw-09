import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');

form.addEventListener('submit', submitForm);

function submitForm(e) {
  e.preventDefault();
  const delay = Number(e.target.elements.delay.value);
  const step = Number(e.target.elements.step.value);
  const amount = Number(e.target.elements.amount.value);

  for (let i = 1; i <= amount; i += 1) {
    const position = i;
    const promDelay = delay + step * (i - 1);
    createPromise(position, promDelay)
      .then(({ position, promDelay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${promDelay}ms`);
      })
      .catch(({ position, promDelay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${promDelay}ms`);
      });
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
