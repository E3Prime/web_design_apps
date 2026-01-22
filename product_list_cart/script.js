/**
 * @typedef {object} DessertItem
 * @property {ImagePaths} image
 * @property {string} name
 * @property {string} category
 * @property {number} price
 */

/**
 * @typedef {object} ImagePaths
 * @property {string} thumbnail
 * @property {string} mobile
 * @property {string} tablet
 * @property {string} desktop
 */

/**
 * @typedef {object} CartItem
 * @property {DessertItem} product
 * @property {number} quantity
 */

const dessertCards = /** @type {HTMLDivElement} */ (document.getElementById('dessertCards'));
const emptyCart = /** @type {HTMLDivElement} */ (document.getElementById('emptyCart'));
const checkoutCart = /** @type {HTMLDivElement} */ (document.getElementById('checkoutCart'));
const checkoutItems = /** @type {HTMLDivElement} */ (checkoutCart.querySelector('#checkoutItems'));
const totalPrice = /** @type {HTMLElement} */ (checkoutCart.querySelector('#totalPrice'));
const checkoutBtn = /** @type {HTMLButtonElement} */ (document.getElementById('checkoutBtn'));
const orderConfirmation = /** @type {HTMLElement} */ (document.getElementById('orderConfirmation'));
const orderSummary = /** @type {HTMLElement} */ (document.getElementById('orderSummary'));

/** @type {DessertItem[]} */
const desserts = [];
/** @type {CartItem[]} */
const cart = [];

renderDesserts();

/** @param {PointerEvent} e */
dessertCards.addEventListener('click', (e) => {
  if (!(e.target instanceof HTMLButtonElement)) return;
  const target = e.target;
  const dessertName = /** @type {string} */ (target.dataset.name);

  if (!target.id) {
    target.setAttribute('hidden', '');
    target.nextElementSibling?.removeAttribute('hidden');
    const quantityElem = /** @type {HTMLSpanElement} */ (target.nextElementSibling?.children[1]);
    const dessertItem = /** @type {DessertItem} */ (desserts.find((d) => d.name === dessertName));
    cart.push({product: dessertItem, quantity: 1});
    quantityElem.textContent = '1';
    updateCartUI();
    return;
  }

  if (target.id === 'add') {
    const quantityElem = /** @type {HTMLSpanElement} */ (target.previousElementSibling);
    addToCart(dessertName, quantityElem);
  } else if (target.id === 'remove') {
    const quantityElem = /** @type {HTMLSpanElement} */ (target.nextElementSibling);
    removeFromCart(dessertName, quantityElem);
    const cartDessertItem = /** @type {CartItem} */ (cart.find((d) => d.product.name === dessertName));
    if (!cart.includes(cartDessertItem)) {
      target.parentElement?.setAttribute('hidden', '');
      target.parentElement?.previousElementSibling?.removeAttribute('hidden');
    }
  }
  updateCartUI();
});

/** @param {PointerEvent} e */
checkoutItems.addEventListener('click', (e) => {
  if (!(e.target instanceof HTMLButtonElement)) return;
  const target = e.target;
  const dessertName = /** @type {string} */ (target.dataset.name);
  const cartDessertItem = /** @type {CartItem} */ (cart.find((d) => d.product.name === dessertName));
  const dessertCardBtns = [...dessertCards.querySelectorAll(`[data-name="${dessertName}"]`)];
  const quantityElem = /** @type {HTMLSpanElement} */ (dessertCardBtns[1].nextElementSibling);
  removeFromCart(dessertName, quantityElem);
  if (!cart.includes(cartDessertItem)) {
    quantityElem.parentElement?.setAttribute('hidden', '');
    quantityElem.parentElement?.previousElementSibling?.removeAttribute('hidden');
  }
  updateCartUI();
});

checkoutBtn.addEventListener('click', () => {});

function updateCartUI() {
  if (cart.length === 0) {
    emptyCart.removeAttribute('hidden');
    checkoutCart.setAttribute('hidden', '');
    return;
  }

  emptyCart.setAttribute('hidden', '');
  checkoutCart.removeAttribute('hidden');
  let htmlContent = '';

  cart.forEach((c) => {
    htmlContent += `
      <div class="checkout-item">
        <div>
          <h3>${c.product.name}</h3>
          <div class="checkout-details">
            <span>${c.quantity}x</span>
            <p>@ $${c.product.price.toFixed(2)} $${(c.product.price * c.quantity).toFixed(2)}</p>
          </div>
        </div>

        <button type="button" data-name="${c.product.name}">
          <img src="images/icon-remove-item.svg" alt="remove item" />
        </button>
      </div>
    `;
  });

  totalPrice.textContent = `$${cart
    .map((c) => c.product.price * c.quantity)
    .reduce((acc, curr) => acc + curr, 0)
    .toFixed(2)}`;

  checkoutItems.innerHTML = htmlContent;
}

/**
 * @param {string} dessertName
 * @param {HTMLSpanElement} quantityElem
 * */
function addToCart(dessertName, quantityElem) {
  const cartDessertItem = /** @type {CartItem} */ (cart.find((d) => d.product.name === dessertName));
  ++cartDessertItem.quantity;
  quantityElem.textContent = cartDessertItem.quantity.toString();
}

/**
 * @param {string} dessertName
 * @param {HTMLSpanElement} quantityElem
 * */
function removeFromCart(dessertName, quantityElem) {
  const cartDessertItemIndex = /** @type {number} */ (cart.findIndex((d) => d.product.name === dessertName));
  const cartDessertItem = /** @type {CartItem} */ (cart.find((d) => d.product.name === dessertName));
  --cartDessertItem.quantity;
  quantityElem.textContent = cartDessertItem.quantity.toString();
  if (cartDessertItem.quantity === 0) cart.splice(cartDessertItemIndex, 1);
}

async function renderDesserts() {
  await fetchDessertData();

  let htmlContent = '';

  for (let i = 0; i < desserts.length; ++i) {
    const dessert = desserts[i];
    htmlContent += `
      <div class="dessert-card">
        <div class="dessert-cover">
          <picture>
            <source media="(min-width: 64rem)" srcset="${dessert.image.desktop}" />
            <source media="(min-width: 48rem)" srcset="${dessert.image.tablet}" />

            <img src="${dessert.image.tablet}" alt="picture of a ${dessert.name}" loading="lazy" />
          </picture>
          <button type="button" class="purchase-dessert-btn" data-name="${dessert.name}">
            <img src="images/icon-add-to-cart.svg"> 
            Add to cart
          </button>
          <div class="purchase-actions" hidden>
            <button type="button" id="remove" data-name="${dessert.name}">
              <img src="images/icon-decrement-quantity.svg" alt="decrease product quantity">
            </button>
            <span>0</span>
            <button type="button" id="add" data-name="${dessert.name}">
              <img src="images/icon-increment-quantity.svg" alt="increase product quantity">
            </button>
          </div>
        </div>

        <div class="dessert-details">
          <span class="dessert-title">${dessert.category}</span>
          <p class="dessert-info">${dessert.name}</p>
          <span class="dessert-price">$${dessert.price.toFixed(2)}</span>
        </div>
      </div>
    `;
  }

  dessertCards.innerHTML = htmlContent;
}

function renderOrderSummary() {
  let htmlContent = `
  <div class="order-item">
    <div class="order-banner">
      <img src="images/image-baklava-thumbnail.jpg" width="50" height="50" alt="" />
      <div>
        <p>Classic Tiramisu</p>
        <span>1x @ $6.50</span>
      </div>
    </div>

    <span>$5.50</span>
  </div>
  `;
}

async function fetchDessertData() {
  const response = await fetch('data.json');
  if (!response) throw new Error('There was problem trying fetch dessert resources!');
  const dessertData = await response.json();
  desserts.push(...dessertData);
}
