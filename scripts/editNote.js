import { displayData } from './notesTable.js';
import { TYPE_CATEGORY } from './types.js';

export function formatDateToISO(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

let editedItem = null;

export function openEditModal(item) {
  if (editedItem !== null) {
    closeEditModal();
  }

  editedItem = item;

  const editModal = document.getElementById('editModal');
  const editTitleInput = document.getElementById('editTitle');
  const editCategoryInput = document.getElementById('editCategory');
  const editContentInput = document.getElementById('editContent');
  const editDatesInput = document.getElementById('editDates');

  editTitleInput.value = editedItem.name;
  editContentInput.value = editedItem.content;
  editDatesInput.value = formatDateToISO(editedItem.created);

  if (editedItem.dates.length === 0) {
    editDatesInput.value = formatDateToISO(editedItem.created);
  } else {
    const lastDate = new Date(editedItem.dates[editedItem.dates.length - 1]);

    editDatesInput.value = formatDateToISO(new Date(lastDate.getTime()));
  }

  editDatesInput.addEventListener('input', () => {
    const dateValue = new Date(editDatesInput.value);
    editDatesInput.value = dateValue.toISOString().slice(0, 10);
  });

  editModal.classList.add('show');
  editModal.style.display = 'block';
  editModal.setAttribute('aria-modal', 'true');
  document.body.classList.add('modal-open');

  const closeButton = editModal.querySelector('[data-dismiss="modal"]');
  closeButton.addEventListener('click', () => {
    closeEditModal();
  });

  editModal.addEventListener('click', event => {
    if (event.target === editModal) {
      closeEditModal();
    }
  });

  const saveChangesBtn = document.getElementById('saveChangesBtn');
  saveChangesBtn.addEventListener('click', () => {
    editedItem.name = editTitleInput.value;
    editedItem.category = editCategoryInput.value;
    editedItem.content = editContentInput.value;
    const dateValue = new Date(editDatesInput.value);
    const formattedDate = dateValue.toISOString().slice(0, 10);
    if (formattedDate !== editedItem.dates[editedItem.dates.length - 1]) {
      editedItem.dates.push(formattedDate);
    }
    closeEditModal();
    displayData();
  });
}

const editCategoryInput = document.getElementById('editCategory');
for (const category in TYPE_CATEGORY) {
  const option = document.createElement('option');
  option.value = TYPE_CATEGORY[category];
  option.textContent = TYPE_CATEGORY[category];
  editCategoryInput.appendChild(option);
}

export function closeEditModal() {
  const editModal = document.getElementById('editModal');
  editModal.classList.remove('show');
  editModal.style.display = 'none';
  editModal.setAttribute('aria-modal', 'false');
  document.body.classList.remove('modal-open');
}
