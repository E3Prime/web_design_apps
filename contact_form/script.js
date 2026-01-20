/**
 * @typedef {Object} ContactFormElements
 * @property {HTMLInputElement} email
 * @property {HTMLInputElement} generalEnquiry
 * @property {HTMLInputElement} supportRequest
 * @property {HTMLTextAreaElement} contactMessage
 * @property {HTMLInputElement} confirmationCheck
 */

/** @param {number} ms */
const sleep = async (ms) => new Promise((r) => setTimeout(r, ms));

const contactForm = /** @type {HTMLFormElement} */ (document.getElementById('contactForm'));
const queryErrorElem = /** @type {HTMLParagraphElement} */ (contactForm.querySelector('.query-error'));
const contactErrorMsgElem = /** @type {HTMLParagraphElement} */ (contactForm.querySelector('.contact-error-msg'));
const confirmationErrorMsgElem = /** @type {HTMLParagraphElement} */ (contactForm.querySelector('.confirmation-error-msg'));
const successMsg = /** @type {HTMLDivElement} */ (document.getElementById('successMsg'));

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
contactForm.addEventListener('submit', validateForm);

/** @param {SubmitEvent} e */
async function validateForm(e) {
  e.preventDefault();
  const form = /** @type {HTMLFormElement} */ (e.currentTarget);
  const {email, generalEnquiry, supportRequest, contactMessage, confirmationCheck} = /** @type {ContactFormElements} */ (/** @type {any} */ (form.elements));

  const validEmail = emailRegex.test(email.value);

  if (!validEmail) {
    email.nextElementSibling?.classList.add('error');
    return;
  }
  email.nextElementSibling?.classList.remove('error');

  if (!generalEnquiry.checked && !supportRequest.checked) {
    queryErrorElem.classList.add('error');
    return;
  }
  queryErrorElem.classList.remove('error');

  if (contactMessage.value.trim().length < 10) {
    contactErrorMsgElem.classList.add('error');
    return;
  }
  contactErrorMsgElem.classList.remove('error');

  if (!confirmationCheck.checked) {
    confirmationErrorMsgElem.classList.add('error');
    return;
  }
  confirmationErrorMsgElem.classList.remove('error');
  contactForm.removeEventListener('submit', validateForm);
  successMsg.classList.remove('fade-out');
}
