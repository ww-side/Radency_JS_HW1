import { displayData } from './notesTable.js';
import { addNewTask, openAddTaskModal } from './addNote.js';
import { displayArchiveData } from './archiveTable.js';
import { displayNoteCategories } from './countNotesTable.js';

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
