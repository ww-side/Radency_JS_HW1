# Radency_JS_HW1

Link - https://ww-side.github.io/Radency_JS_HW1/

- Vanilla JS
- Bootstrap

![Pic](https://images2.imgbox.com/15/00/ofRsavgx_o.png)

### Categories 
Categories are predefined: “Task”, “Random Thought”, “Idea” and "Quote".
![Pic](https://images2.imgbox.com/5b/4a/u0xqshpg_o.png)

### Dates
Notes in the table also display a list of dates mentioned in this note as a separate column.
The user can change the date in the Edit window and the new date will appear in the Dates column.
![Pic](https://images2.imgbox.com/e9/f9/jNz7S7cA_o.png)

### Archive and summary table
There is a summary table that counts notes by category: separately for active and archived notes.
Users can archive notes. Archived notes are not shown in the notes list. Users can view archived 
notes and unarchive them.
![Pic](https://images2.imgbox.com/63/6f/Rjxt1ySH_o.png)

### Add a new note
Users can add a new note.
![Pic](https://images2.imgbox.com/7a/c7/zVbG9CiZ_o.png)

### Task text
- Your task is to create a notes app in JS as a web app. Users can add, edit and remove notes.
- List of notes is displayed in a form of table (HTML representation may vary: table, divs etc). The columns are time of creation, note content, note category. Categories are predefined: “Task”, “Random Thought”, “Idea”.
- Notes in the table should also display a list of dates mentioned in this note as a separate column. For example, for a note “I’m gonna have a dentist appointment on the 3/5/2021, I moved it from 5/5/2021” the dates column is “3/5/2021, 5/5/2021”.
- Users can archive notes. Archived notes are not shown in the notes list. Users can view archived notes and unarchive them.
- There should also be a summary table which counts notes by categories: separately for active and archived. The table is updated whenever users perform some action on notes. The summary table is shown on the same page as the notes table.
- There is no need to implement data storage. Simply create a JS variable which stores the data and prepopulate it with 7 notes so that they are shown when the page is reloaded.

Aim to write clean code.  
Write small functions, pure functions.
Adhere to the single responsibility principle. Separate the logic of rendering and data processing, ideally to separate files.
Give variables and functions descriptive names.


The goal of the task is to let you get better acquainted with the JavaScript language and browser DOM API. If you don’t know some of the APIs needed for the task, you might use these resources as references:
https://exploringjs.com/impatient-js      https://developer.mozilla.org/ru/docs/Web/API/Document

While working on your task you should utilize all of the following:

1. JavaScript
- Import / export
- Array methods: map, reduce, filter (some of them)
- Array spread operator
- Regular expressions
- Try / catch 
2. DOM API
- document.querySelector
- document.addEventListener

Another skill you should practice is working with Git and Github. Implement the following git requirements while working on the task:
- Make at least 3 commits
- Push commits to the develop branch to your Github repository
- When finished, create a pull request to the master branch
- Try several git commands
  1) See commit log
  2) See diff between commits 
  3) Make some code changes and see git status 
  4) Perform reset --hard

https://git-scm.com/docs
https://guides.github.com/introduction/flow/ 
