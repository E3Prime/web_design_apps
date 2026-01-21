/**
 * @typedef {Object} Timeframe
 * @property {number} current
 * @property {number} previous
 */

/**
 * @typedef {Object} Activity
 * @property {string} title
 * @property {Object} timeframes
 * @property {Timeframe} timeframes.daily
 * @property {Timeframe} timeframes.weekly
 * @property {Timeframe} timeframes.monthly
 */

const trackingCards = /** @type {HTMLDivElement} */ (document.getElementById('trackingCards'));
const trackOptions = /** @type {HTMLDivElement} */ (document.getElementById('trackOptions'));

/** @type {Activity[]} */
const activities = [];
renderActivityStats();

/** @param {PointerEvent} e */
trackOptions.addEventListener('click', (e) => {
  // Not working for some reason???
  const target = e.target;
  if (!(target instanceof HTMLButtonElement)) return;
  console.log(target);
});

async function renderActivityStats() {
  await retrieveTimeTrackingStats();

  for (let i = 0; i < activities.length; ++i) {
    const activity = activities[i];
    const htmlStructure = `
      <div class="card">
        <div class="card-header card-bg-${activity.title === 'Self Care' ? 'self-care' : activity.title.toLowerCase()}">
          <img src="images/icon-${activity.title === 'Self Care' ? 'self-care' : activity.title.toLowerCase()}.svg" alt="work icon" />
        </div>
        <div class="card-body">
          <div class="card-title">
            <p>${activity.title}</p>
            <span>...</span>
          </div>
          <div class="card-footer">
            <h2 class="current-stat">${activity.timeframes.weekly.current}hrs</h2>
            <p class="previous-stat">Last week - ${activity.timeframes.weekly.previous}hrs</p>
          </div>
        </div>
      </div>
    `;
    trackingCards.innerHTML += htmlStructure;
  }
}

async function retrieveTimeTrackingStats() {
  const response = await fetch('data.json');
  if (!response) throw new Error('Failed to retrieve time tracking stats!');
  const activityData = await response.json();
  activities.push(...activityData);
}
