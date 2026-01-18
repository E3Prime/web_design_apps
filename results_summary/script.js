const summaryResults = /** @type {HTMLElement} */ (document.getElementById('summaryResults'));
fetchDataResults();

async function fetchDataResults() {
  try {
    const response = await fetch('data.json');
    if (!response) throw new Error('There was an issue retrieving results');
    const data = await response.json();
    renderResults(data);
  } catch (e) {
    console.error(e);
  }
}

/** @param {Array<object>} results */
function renderResults(results) {
  for (let i = 0; i < results.length; ++i) {
    const result = results[i];
    summaryResults.innerHTML += `
      <div class="attribute-result ${result.category}-result">
        <img src="${result.icon}" alt="${result.category} icon" />
        <p>Reaction</p>
        <p>${result.score} / 100</p>
      </div>
    `;
  }
}
