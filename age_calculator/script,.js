const dateInputs = /** @type {HTMLDivElement} */ (document.getElementById('dateInputs'));
const calculateAgeBtn = /** @type {HTMLButtonElement} */ (document.getElementById('calculateAge'));
const [dayElemParent, monthElemParent, yearParentElem] = /** @type {HTMLDivElement[]} */ ([...dateInputs.children]);
const dayElem = /** @type {HTMLInputElement} */ (dayElemParent.children[1]);
const dayErrorMsg = /** @type {HTMLParagraphElement} */ (dayElemParent.lastElementChild);
const monthElem = /** @type {HTMLInputElement} */ (monthElemParent.children[1]);
const monthErrorMsg = /** @type {HTMLParagraphElement} */ (monthElemParent.lastElementChild);
const yearElem = /** @type {HTMLInputElement} */ (yearParentElem.children[1]);
const yearErrorMsg = /** @type {HTMLParagraphElement} */ (yearParentElem.lastElementChild);
const futureDateErrorMsg = /** @type {HTMLParagraphElement} */ (dateInputs.nextElementSibling);
const yearResultElem = /** @type {HTMLParagraphElement} */ (document.getElementById('yearResult'));
const monthResultElem = /** @type {HTMLParagraphElement} */ (document.getElementById('monthResult'));
const dayResultElem = /** @type {HTMLParagraphElement} */ (document.getElementById('dayResult'));

/** @param {InputEvent} e */
dateInputs.addEventListener('input', (e) => {
  if (!(e.target instanceof HTMLInputElement)) return;
  const target = e.target;
  target.value = target.value.replace(/[^0-9]/g, '');
});

calculateAgeBtn.addEventListener('click', validateUserDate);

function validateUserDate() {
  const userDay = Number(dayElem.value);
  const userMonth = Number(monthElem.value);
  const userYear = Number(yearElem.value);
  const currentYear = new Date().getFullYear();

  if (dayElem.value === '' || !(userDay >= 1 && userDay <= 31)) {
    dayElem.value === '' ? (dayErrorMsg.textContent = 'This field is required') : (dayErrorMsg.textContent = 'Number must be between 1 & 31');
    dayElemParent.dataset.state = 'error';
    return;
  }
  dayErrorMsg.textContent = '';
  dayElemParent.dataset.state = 'idle';

  if (monthElem.value === '' || !(userMonth >= 1 && userMonth <= 12)) {
    monthElem.value === '' ? (monthErrorMsg.textContent = 'This field is required') : (monthErrorMsg.textContent = 'Number must be between 1 & 12');
    monthElemParent.dataset.state = 'error';
    return;
  }
  monthErrorMsg.textContent = '';
  monthElemParent.dataset.state = 'idle';

  if (yearElem.value === '' || !(userYear >= 1900 && userYear <= currentYear)) {
    yearElem.value === '' ? (yearErrorMsg.textContent = 'This field is required') : (yearErrorMsg.textContent = `Year must be between 1900 & ${currentYear}`);
    yearParentElem.dataset.state = 'error';
    return;
  }
  yearErrorMsg.textContent = '';
  yearParentElem.dataset.state = 'idle';

  const userDate = new Date(userYear, userMonth - 1, userDay);
  const currentDate = new Date();

  if (userDate > currentDate) {
    futureDateErrorMsg.style.visibility = 'visible';
    return;
  }
  futureDateErrorMsg.style.visibility = 'hidden';

  renderAgeGap(userDate, currentDate);
}

/**
 * @param {Date} userDate
 * @param {Date} currentDate
 */
function renderAgeGap(userDate, currentDate) {
  let years = currentDate.getFullYear() - userDate.getFullYear();
  let months = currentDate.getMonth() - userDate.getMonth();
  let days = currentDate.getDate() - userDate.getDate();

  if (days < 0) {
    --months;
    const previousMonth = new Date(currentDate.getFullYear(), userDate.getMonth(), 0);
    days += previousMonth.getDate();
  }

  if (months < 0) {
    --years;
    months += 12;
  }

  yearResultElem.textContent = years + 'years';
  monthResultElem.textContent = months + 'months';
  dayResultElem.textContent = days + 'days';
}
