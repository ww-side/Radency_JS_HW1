import { formatDateToISO, openEditModal } from './editNote.js';

export function createTable(
  array,
  icons,
  tableBody,
  archiveAction,
  deleteAction
) {
  array.forEach((item, index) => {
    const row = document.createElement('tr');

    const nameCell = document.createElement('td');
    nameCell.textContent = item.name;
    row.appendChild(nameCell);

    const createdCell = document.createElement('td');
    createdCell.textContent = formatDateToISO(new Date(item.created));
    row.appendChild(createdCell);

    const categoryCell = document.createElement('td');
    categoryCell.textContent = item.category;
    row.appendChild(categoryCell);

    const contentCell = document.createElement('td');
    contentCell.textContent = item.content;
    row.appendChild(contentCell);

    const datesCell = document.createElement('td');

    if (item.dates.length === 0) item.dates.push(formatDateToISO(item.created));

    if (item.dates.length > 0) {
      datesCell.textContent = `${item.dates.join(', ')}`;
    } else {
      datesCell.textContent = createdCell.textContent;
    }
    row.appendChild(datesCell);

    const iconsCell = document.createElement('td');
    iconsCell.classList.add('d-flex', 'gap-2', 'justify-content-end');

    if (icons.editIcon) {
      const editIcon = document.createElement('img');
      editIcon.classList.add('icon');
      editIcon.src = './assets/img/edit.png';
      editIcon.alt = 'edit';
      iconsCell.appendChild(editIcon);

      editIcon.addEventListener('click', () => {
        openEditModal(item);
      });
    }

    if (icons.archiveIcon) {
      const archiveIcon = document.createElement('img');
      archiveIcon.classList.add('icon');
      archiveIcon.src = './assets/img/archive.png';
      archiveIcon.alt = 'archive';
      iconsCell.appendChild(archiveIcon);

      archiveIcon.addEventListener('click', () => {
        archiveAction(index);
      });
    }

    if (icons.deleteIcon) {
      const deleteIcon = document.createElement('img');
      deleteIcon.classList.add('icon');
      deleteIcon.src = './assets/img/delete.png';
      deleteIcon.alt = 'delete';
      iconsCell.appendChild(deleteIcon);

      deleteIcon.addEventListener('click', () => {
        deleteAction(index);
      });
    }

    row.appendChild(iconsCell);
    tableBody.appendChild(row);
  });
}
