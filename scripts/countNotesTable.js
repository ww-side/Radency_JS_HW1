import { archive, data } from './arrays.js';
import { TYPE_CATEGORY } from './types.js';

export function displayNoteCategories() {
  const categoryTableBody = document.querySelector('#tableCategory tbody');
  categoryTableBody.innerHTML = '';
  const activeCategories = {};
  const archivedCategories = {};

  data.forEach(item => {
    if (activeCategories[item.category]) {
      activeCategories[item.category]++;
    } else {
      activeCategories[item.category] = 1;
    }
  });

  archive.forEach(item => {
    if (archivedCategories[item.category]) {
      archivedCategories[item.category]++;
    } else {
      archivedCategories[item.category] = 1;
    }
  });

  for (const category in TYPE_CATEGORY) {
    const row = document.createElement('tr');

    const categoryNameCell = document.createElement('td');
    categoryNameCell.textContent = TYPE_CATEGORY[category];
    row.appendChild(categoryNameCell);

    const activeCountCell = document.createElement('td');
    activeCountCell.textContent =
      activeCategories[TYPE_CATEGORY[category]] || '0';
    row.appendChild(activeCountCell);

    const archivedCountCell = document.createElement('td');
    archivedCountCell.textContent =
      archivedCategories[TYPE_CATEGORY[category]] || '0';
    row.appendChild(archivedCountCell);

    categoryTableBody.appendChild(row);
  }
}
