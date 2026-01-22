const dayElem = /** @type {HTMLInputElement} */ (document.getElementById('day'));
const monthElem = /** @type {HTMLInputElement} */ (document.getElementById('month'));
const yearElem = /** @type {HTMLInputElement} */ (document.getElementById('year'));
const dateInputs = /** @type {HTMLDivElement} */ (document.getElementById('dateInputs'));

/** @param {InputEvent} e */
dateInputs.addEventListener('input', (e) => {
  if (!(e.target instanceof HTMLInputElement)) return;
  const target = e.target;
  target.value = target.value.replace(/[^0-9]/g, '');
  if (target.id === '')
});
