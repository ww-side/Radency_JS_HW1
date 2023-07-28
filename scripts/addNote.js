import { data } from './arrays.js';
import { displayData } from './notesTable.js';
import { displayNoteCategories } from './countNotesTable.js';
import { formatDateToISO } from './editNote.js';

export function openAddTaskModal() {
  const addTaskModal = document.getElementById('addTaskModal');
  const taskTitleInput = document.getElementById('taskTitle');
  const taskCreatedInput = document.getElementById('taskDate');
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

export function closeAddTaskModal() {
  const addTaskModal = document.getElementById('addTaskModal');
  addTaskModal.classList.remove('show');
  addTaskModal.style.display = 'none';
  addTaskModal.setAttribute('aria-modal', 'false');
  document.body.classList.remove('modal-open');
}

export function generateUniqueId() {
  return Math.random().toString(36).substr(2, 9);
}

export function addNewTask() {
  const taskTitleInput = document.getElementById('taskTitle');
  const taskCreatedInput = document.getElementById('taskDate');
  const taskCategoryInput = document.getElementById('taskCategory');
  const taskContentInput = document.getElementById('taskContent');

  const newTask = {
    id: generateUniqueId(),
    name: taskTitleInput.value,
    created: new Date(),
    category: taskCategoryInput.value,
    content: taskContentInput.value,
    dates: [formatDateToISO(new Date(taskCreatedInput.value))],
  };

  data.push(newTask);
  closeAddTaskModal();
  displayData();
  displayNoteCategories();
}
