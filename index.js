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

// Check if there aren't tasks in the localStorage
// Select random title
window.addEventListener('DOMContentLoaded', () => {
    let titleSelected = Math.floor(Math.random() * titleList.length);
    titleRoller.innerHTML = titleList[titleSelected]
    if (localStorage.getItem('tasks') == null) {
        savedTasks = false;
    } else {
        savedTasks = true
    }
    tasksInMemory()
    //DEBUG
    if (savedTasks == true) {
        console.log(localStorage.getItem('tasks'))
    }
})

// Add tasks by input
function newTask(content, saveIn) {
    const input = document.createElement('input')
    input.type = 'checkbox'
    input.id = taskId
    const label = document.createElement('label')
    label.htmlFor = input.id
    label.textContent = content
    const container = document.createElement('div')
    container.id = `task` + input.id

    if (saveIn == true) {
        let contentURI = encodeURIComponent(content)
        if (savedTasks == false) {
            localStorage.setItem('tasks', `${contentURI}`)
            savedTasks = true
        } else {
            localStorage.setItem('tasks', `${localStorage.getItem('tasks')}|&|${contentURI}`)
        }
    }

    container.append(input, label)
    boxList.appendChild(container)
    taskId++
}

//Submit a task by Enter key or on click on the btn
btnNewTask.addEventListener('click', (e) => {
    switch (inputTask.value) {
        case '':
            console.warn('Input vide')
            break;
        default:
            newTask(inputTask.value, true)
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
                newTask(inputTask.value, true)
                inputTask.value = ''
        }
    }
})

//Reader
function tasksInMemory() {
    let tasks = localStorage.getItem('tasks')
    if (tasks == null) {
        return;
    } else {
        let taskURI = decodeURIComponent(tasks)
        let Tasks = taskURI.split('|&|')
        for (let task of Tasks) {
            newTask(task, false)
        }
    }
}

// Delete all tasks in local storage
btnDelMemory.addEventListener('click', (e) => {
    localStorage.removeItem('tasks')
    console.warn('Local storage has been cleared');
})