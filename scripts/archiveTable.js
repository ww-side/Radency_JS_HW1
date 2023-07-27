import { archive, data } from './arrays.js';
import { displayData } from './notesTable.js';
import { displayNoteCategories } from './countNotesTable.js';
import { createTable } from './tableTemplate.js';

export function displayArchiveData() {
  const archiveTableBody = document.querySelector('#archiveTable tbody');
  archiveTableBody.innerHTML = '';
  const archiveTableIcons = {
    editIcon: false,
    archiveIcon: true,
    deleteIcon: true,
  };
  createTable(
    archive,
    archiveTableIcons,
    archiveTableBody,
    restoreFromArchive,
    removeFromArchive
  );
}

export function restoreFromArchive(index) {
  const selectedItem = archive.splice(index, 1)[0];
  data.push(selectedItem);
  displayArchiveData();
  displayData();
  displayNoteCategories();
}

export function removeFromArchive(index) {
  archive.splice(index, 1);
  displayArchiveData();
  displayNoteCategories();
}
