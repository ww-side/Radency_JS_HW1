import { archive, data } from './arrays.js';
import { TYPE_CATEGORY } from './types.js';

function clearTable() {
  const tableBody = document.querySelector('tbody');
  while (tableBody.firstChild) {
    tableBody.removeChild(tableBody.firstChild);
  }
}

function displayData() {
  clearTable();
  const tableBody = document.querySelector('tbody');

  data.forEach((item, index) => {
    const row = document.createElement('tr');

    const nameCell = document.createElement('td');
    nameCell.textContent = item.name;
    row.appendChild(nameCell);

    const createdCell = document.createElement('td');
    createdCell.textContent = item.created.toISOString().slice(0, 10);
    row.appendChild(createdCell);

    const categoryCell = document.createElement('td');
    categoryCell.textContent = item.category;
    row.appendChild(categoryCell);

    const contentCell = document.createElement('td');
    contentCell.textContent = item.content;
    row.appendChild(contentCell);

    const datesCell = document.createElement('td');
    if (item.dates.length > 0) {
      datesCell.textContent = `${createdCell.textContent}, ${item.dates.join(
        ', '
      )}`;
    } else {
      datesCell.textContent = createdCell.textContent;
    }
    row.appendChild(datesCell);

    const iconsCell = document.createElement('td');
    iconsCell.classList.add('d-flex', 'gap-2', 'justify-content-end');

    const editIcon = document.createElement('img');
    editIcon.classList.add('icon');
    editIcon.src = './assets/img/edit.png';
    editIcon.alt = 'delete';
    iconsCell.appendChild(editIcon);

    editIcon.addEventListener('click', () => {
      openEditModal(item);
    });

    const archiveIcon = document.createElement('img');
    archiveIcon.classList.add('icon');
    archiveIcon.src = './assets/img/archive.png';
    archiveIcon.alt = 'archive';
    iconsCell.appendChild(archiveIcon);

    archiveIcon.addEventListener('click', () => {
      archiveItem(index);
    });

    const deleteIcon = document.createElement('img');
    deleteIcon.classList.add('icon');
    deleteIcon.src = './assets/img/delete.png';
    deleteIcon.alt = 'delete';
    iconsCell.appendChild(deleteIcon);

    deleteIcon.addEventListener('click', () => {
      removeItem(index);
    });

    row.appendChild(iconsCell);

    tableBody.appendChild(row);
  });
}

function removeItem(index) {
  data.splice(index, 1);
  displayData();
}

function archiveItem(index) {
  const selectedItem = data.splice(index, 1)[0];
  archive.push(selectedItem);
  console.log(archive);
  displayData();
  displayArchiveData();
  displayNoteCategories();
}

function formatDateToISO(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

let editedItem = null;

function openEditModal(item) {
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

  if (
    editedItem.dates.length > 0 &&
    !isNaN(new Date(editedItem.dates[editedItem.dates.length - 1]))
  ) {
    editDatesInput.value = formatDateToISO(
      new Date(editedItem.dates[editedItem.dates.length - 1])
    );
  } else {
    const createdDate = new Date(editedItem.created);

    const oneDayInMillis = 86400000;
    const previousDate = new Date(createdDate.getTime() - oneDayInMillis);

    editDatesInput.value = formatDateToISO(previousDate);
    console.log(editDatesInput.value);
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
    if (!editedItem.dates.includes(formattedDate)) {
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

function closeEditModal() {
  const editModal = document.getElementById('editModal');
  editModal.classList.remove('show');
  editModal.style.display = 'none';
  editModal.setAttribute('aria-modal', 'false');
  document.body.classList.remove('modal-open');
}

function openAddTaskModal() {
  const addTaskModal = document.getElementById('addTaskModal');
  const taskTitleInput = document.getElementById('taskTitle');
  const taskCreatedInput = document.getElementById('taskCreated');
  const taskCategoryInput = document.getElementById('taskCategory');
  const taskContentInput = document.getElementById('taskContent');

  taskTitleInput.value = '';
  taskCreatedInput.value = '';
  taskCategoryInput.value = 'Task';
  taskContentInput.value = '';

  addTaskModal.classList.add('show');
  addTaskModal.style.display = 'block';
  addTaskModal.setAttribute('aria-modal', 'true');
  document.body.classList.add('modal-open');
}

function closeAddTaskModal() {
  const addTaskModal = document.getElementById('addTaskModal');
  addTaskModal.classList.remove('show');
  addTaskModal.style.display = 'none';
  addTaskModal.setAttribute('aria-modal', 'false');
  document.body.classList.remove('modal-open');
}

function displayNoteCategories() {
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

function displayArchiveData() {
  const archiveTableBody = document.querySelector('#archiveTable tbody');
  archiveTableBody.innerHTML = '';

  archive.forEach((item, index) => {
    const row = document.createElement('tr');

    const nameCell = document.createElement('td');
    nameCell.textContent = item.name;
    row.appendChild(nameCell);

    const createdCell = document.createElement('td');
    createdCell.textContent = item.created.toISOString().slice(0, 10);
    row.appendChild(createdCell);

    const categoryCell = document.createElement('td');
    categoryCell.textContent = item.category;
    row.appendChild(categoryCell);

    const contentCell = document.createElement('td');
    contentCell.textContent = item.content;
    row.appendChild(contentCell);

    const datesCell = document.createElement('td');
    if (item.dates.length > 0) {
      datesCell.textContent = `${createdCell.textContent}, ${item.dates.join(
        ', '
      )}`;
    } else {
      datesCell.textContent = createdCell.textContent;
    }
    row.appendChild(datesCell);

    const iconsCell = document.createElement('td');
    iconsCell.classList.add('d-flex', 'gap-2', 'justify-content-end');

    const restoreIcon = document.createElement('img');
    restoreIcon.classList.add('icon');
    restoreIcon.src = './assets/img/archive.png';
    restoreIcon.alt = 'archive';
    iconsCell.appendChild(restoreIcon);

    restoreIcon.addEventListener('click', () => {
      restoreFromArchive(index);
    });

    const deleteIcon = document.createElement('img');
    deleteIcon.classList.add('icon');
    deleteIcon.src = './assets/img/delete.png';
    deleteIcon.alt = 'delete';
    iconsCell.appendChild(deleteIcon);

    deleteIcon.addEventListener('click', () => {
      removeFromArchive(index);
    });

    row.appendChild(iconsCell);

    archiveTableBody.appendChild(row);
  });
}

function restoreFromArchive(index) {
  const selectedItem = archive.splice(index, 1)[0];
  data.push(selectedItem);
  displayArchiveData();
  displayData();
  displayNoteCategories();
}

function removeFromArchive(index) {
  archive.splice(index, 1);
  displayArchiveData();
  displayNoteCategories();
}

window.onload = () => {
  displayData();
  displayArchiveData();
  displayNoteCategories();

  const addTaskButton = document.querySelector(
    'button[data-bs-target="#addTaskModal"]'
  );
  addTaskButton.addEventListener('click', () => {
    openAddTaskModal();
  });

  const addTaskBtn = document.getElementById('addTaskBtn');
  addTaskBtn.addEventListener('click', () => {
    addNewTask();
  });
};

function generateUniqueId() {
  return Math.random().toString(36).substr(2, 9);
}

function addNewTask() {
  const taskTitleInput = document.getElementById('taskTitle');
  const taskCreatedInput = document.getElementById('taskCreated');
  const taskCategoryInput = document.getElementById('taskCategory');
  const taskContentInput = document.getElementById('taskContent');

  const newTask = {
    id: generateUniqueId(),
    name: taskTitleInput.value,
    created: new Date(taskCreatedInput.value),
    category: taskCategoryInput.value,
    content: taskContentInput.value,
    dates: [],
  };

  data.push(newTask);
  closeAddTaskModal();
  displayData();
  displayNoteCategories();
}
