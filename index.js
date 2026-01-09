// HTML objects
const inputTask = document.getElementById('inputNewTask')
const titleRoller = document.getElementById('introRoller')
const boxList = document.getElementById('listTasks')
const btnNewTask = document.getElementById('addNewTask')
const btnDelMemory = document.getElementById('delMemory')

// Variables
let taskId = 0
let savedTasks;

// Title roller
let titleList = [
    "Qu’aimerais-tu faire ensuite ?",
    "Quelle est la prochaine étape ?",
    "Une nouvelle idée à ajouter ?",
    "Qu’aimerais-tu accomplir aujourd’hui ?",
    "Que prévois-tu de faire ensuite ?",
    "Quelle est la suite ?",
    "Un nouvel objectif en tête ?",
    "Qu’aimerais-tu noter ici ?"
]
window.addEventListener('DOMContentLoaded', () => {
    let titleSelected = Math.floor(Math.random() * titleList.length);
    titleRoller.innerHTML = titleList[titleSelected]
    if (localStorage.getItem('tasks') == null) {
        savedTasks = false;
    } else {
        savedTasks = true
    }
    if (savedTasks == true) {
        console.log(localStorage.getItem('tasks'))
    }
})

// Check if there aren't tasks in the localStorage
//function isExist


// Add tasks by input
function newTask(content, priority) {
    const input = document.createElement('input')
    input.type = 'checkbox'
    input.id = taskId
    const label = document.createElement('label')
    label.htmlFor = input.id
    label.textContent = content
    const container = document.createElement('div')
    container.id = `task` + input.id

    localStorage.setItem('tasks', `${localStorage.getItem('tasks')}|&|${content}`)
    container.append(input, label)
    boxList.appendChild(container)
    taskId++
}


btnNewTask.addEventListener('click', (e) => {
    switch (inputTask.value) {
        case '':
            console.warn('Input vide')
            break;
        default:
            newTask(inputTask.value)
            inputTask.value = ''
    }

})

inputTask.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        switch (inputTask.value) {
            case '':
                console.warn('Input vide')
                break;
            default:
                newTask(inputTask.value)
                inputTask.value = ''
        }
    }
})

// Delete all tasks in local storage
btnDelMemory.addEventListener('click', (e) => {
    localStorage.removeItem('tasks')
    console.warn('Local storage has been cleared');
})