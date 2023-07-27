import { archive, data } from './arrays.js';
import { displayArchiveData } from './archiveTable.js';
import { displayNoteCategories } from './countNotesTable.js';
import { createTable } from './tableTemplate.js';

export function clearTable() {
  const tableBody = document.querySelector('tbody');
  while (tableBody.firstChild) {
    tableBody.removeChild(tableBody.firstChild);
  }
}

export function displayData() {
  clearTable();
  const tableBody = document.querySelector('tbody');
  const archiveTableIcons = {
    editIcon: true,
    archiveIcon: true,
    deleteIcon: true,
  };

  createTable(data, archiveTableIcons, tableBody, archiveItem, removeItem);
}

export function removeItem(index) {
  data.splice(index, 1);
  displayData();
}

export function archiveItem(index) {
  const selectedItem = data.splice(index, 1)[0];
  archive.push(selectedItem);
  displayData();
  displayArchiveData();
  displayNoteCategories();
}
