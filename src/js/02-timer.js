import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

let intervalId = null;

const refs = {
  inputDate: document.querySelector('#datetime-picker'),
  btnStart: document.querySelector('[data-start]'),
  daysEl: document.querySelector('[data-days]'),
  hoursEl: document.querySelector('[data-hours]'),
  minutesEl: document.querySelector('[data-minutes]'),
  secondsEl: document.querySelector('[data-seconds]'),
};

refs.btnStart.disabled = true;

refs.inputDate.addEventListener('click', flatpickr);
refs.btnStart.addEventListener('click', onClickStartCountdown);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentDate = Date.now();
    const selectedDate = selectedDates[0].getTime();

    if (selectedDate < currentDate) {
      Notify.failure('Please choose a date in the future');
      refs.btnStart.disabled = true;
      return;
    }
    refs.btnStart.disabled = false;
  },
};

const picker = flatpickr(refs.inputDate, options);

function onClickStartCountdown() {
  const endDate = picker.selectedDates[0];

  intervalId = setInterval(() => {
    const currentDate = new Date();
    if (endDate <= currentDate) {
      clearInterval(intervalId);
      return;
    }
    refs.btnStart.disabled = true;
    const ms = endDate - new Date();
    const value = convertMs(ms);
    const formattedTime = addLeadingZero(value);

    refs.daysEl.textContent = formattedTime.daysText;
    refs.hoursEl.textContent = formattedTime.hoursText;
    refs.minutesEl.textContent = formattedTime.minutesText;
    refs.secondsEl.textContent = formattedTime.secondsText;
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero({ days, hours, minutes, seconds }) {
  const secondsText = (seconds % 60).toString().padStart(2, '0');
  const minutesText = (minutes % 60).toString().padStart(2, '0');
  const hoursText = (hours % 24).toString().padStart(2, '0');
  const daysText = days.toString().padStart(2, '0');

  return { secondsText, minutesText, hoursText, daysText };
}
