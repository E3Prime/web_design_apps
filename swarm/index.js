/**
 * @typedef {object} Locale
 * @property {string} name
 * @property {string} icon
 */

/**
 * @typedef {object} People
 * @property {string} name
 * @property {string} picture
 * @property {string} location
 */

const locationList = /** @type {HTMLElement} */ (document.getElementById('locationList'));
const timeElem = /** @type {HTMLParagraphElement} */ (document.getElementById('gameTime'));

/** @type {Locale[]} */
const locations = [
  {
    name: 'Post Office',
    icon: '🏤',
  },
  {
    name: 'Hospital',
    icon: '🏥',
  },
  {
    name: 'Factory',
    icon: '🏭',
  },
  {
    name: 'Office Building',
    icon: '🏢',
  },
  {
    name: 'Japanese Post Office',
    icon: '🏣',
  },
];

/** @type {People[]} */
const people = [
  {
    name: 'Jimbo',
    picture: '🤵',
    location: '🏤',
  },
  {
    name: 'Sammy',
    picture: '🙆‍♀️',
    location: '🏤',
  },
  {
    name: 'Michael',
    picture: '👷',
    location: '🏤',
  },
  {
    name: 'Robert',
    picture: '👷',
    location: '🏥',
  },
  {
    name: 'Terry',
    picture: '🤴',
    location: '🏥',
  },
  {
    name: 'Bill',
    picture: '🕵️',
    location: '🏥',
  },
  {
    name: 'Marie',
    picture: '👩‍🍳',
    location: '🏭',
  },
  {
    name: 'Michael',
    picture: '💂',
    location: '🏭',
  },
  {
    name: 'Phil',
    picture: '🧜‍♂️',
    location: '🏭',
  },
  {
    name: 'Wilson',
    picture: '🏐',
    location: '🏢',
  },
  {
    name: 'Wendy',
    picture: '👩‍⚕️',
    location: '🏢',
  },
  {
    name: 'Jeremy',
    picture: '🦹',
    location: '🏢',
  },
];
const hunter = people[Math.floor(Math.random() * people.length)].picture;
console.log(hunter);

let time = 40;
renderLocations();
locationList.addEventListener('click', attackAction);

/** @param {Event} e */
function attackAction(e) {
  const target = e.target;
  if (!(target instanceof HTMLButtonElement)) return;
  time -= 5;
  const foundPeople = people.filter((p) => p.location === target.id);
  const hunterIsPresent = foundPeople.some((h) => h.picture === hunter);
  if (hunterIsPresent) {
    endGame(true);
    return;
  }

  if (!hunterIsPresent) foundPeople.forEach((p) => (p.picture = '🦇'));
  movePeople();
  renderLocations();
  endGame();
}

function movePeople() {
  people.forEach((p) => {
    const newLocationIndex = Math.floor(Math.random() * locations.length);
    p.location = locations[newLocationIndex].icon;
  });
}

function endGame(slain = false) {
  if (time <= 0 || slain) {
    alert('YOU LOSE!');
    location.reload();
    return;
  }

  const loneSurvivor = people.find((p) => p.picture !== '🦇');
  if (loneSurvivor?.picture === hunter) {
    alert('YOU WIN!');
    location.reload();
  }
}

function renderLocations() {
  timeElem.textContent = `Time: ${time.toString()}`;
  locationList.innerHTML = '';
  for (let i = 0; i < locations.length; ++i) {
    const location = locations[i];
    const filteredPeople = people.filter((p) => p.location === location.icon).map((person) => person.picture);

    const locationStruct = `
    <div class='location'>
      <span class='location-icon'>${location.icon}</span>
      <p class='location-name'>${location.name}</p>
      <span class='location-people'>${filteredPeople.join(' ')}</span>
      <button type='button' id='${location.icon}'></button>
    </div>
    `;

    locationList.innerHTML += locationStruct;
  }
}
