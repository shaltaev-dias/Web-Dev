const dom = {

     new: document.getElementById('new'),
     add: document.getElementById('add'),
     tasks: document.getElementById('tasks')

}

const tasks=[]; 

//add tasks
dom.add.onclick = () =>{
    const newTaskText = dom.new.value
    if(newTaskText && isNotHaveTask(newTaskText, tasks)){
        addTask(newTaskText, tasks)
        dom.new.value = ''
        tasksRender(tasks)
    }
}

// Function to add new task
function addTask(text, list){
    const timestamp=Date.now();
    const task = { 
        id: timestamp,
        text,
        isComplete: false
    }
    // console.log(task.id)
    list.push(task)

}

//Check task in massiv unique?
function isNotHaveTask(text, list){
    let isNotHave = true
    

    list.forEach((task)=> {
        if(task.text == text){
            alert('This task already been!')
            isNotHave=false
        }
    })
    return isNotHave
}

// function to create todo list
function tasksRender(list) {
    let htmlList = ''

    list.forEach((task) => {
        const cls = task.isComplete  ? 'todo_task todo_task_complete' : 'todo_task '
        const checked = task.isComplete ? 'checked' : ''

        const taskHtml =`
        <div id="${task.id}" class="${cls}">
            <label class="todo_checkbox">
                <input class="todo_checkbox-div" type="checkbox" ${checked}>
            </label>
            <div class="todo_task-text">${task.text}</div> 
            <img class="trash" src="./img/red-delete-10437.svg">
        </div>
        `

        htmlList = htmlList + taskHtml
    })

    dom.tasks.innerHTML = htmlList
}
 
//check checkbox
dom.tasks.onclick = (event) =>  { 
    const target = event.target
    const isCheckboxEl = target.classList.contains('todo_checkbox-div')
    const isDeleteEl = target.classList.contains('trash')

    if(isCheckboxEl){
        const task = target.parentElement.parentElement
        const taskId = task.getAttribute('id')
        changeTaskStatus(taskId, tasks)
        tasksRender(tasks)
    }

    if(isDeleteEl){
        const task = target.parentElement
        const taskId = task.getAttribute('id')
        console.log(taskId)
        deleteTask(taskId, tasks)
        tasksRender(tasks)
    }
}

//check changes status of task
function changeTaskStatus(id,list) {
    list.forEach((task) => {
        if(task.id==id){
            task.isComplete = !task.isComplete
        }
    })
}

//delete task
function deleteTask(id, list){
    list.forEach((task, idx) => {
        if(task.id == id){
            delete list[idx]
        }
    })
}

document.getElementById("new")
    .addEventListener("keyup", function(e) {
        if (e.code === 'Enter') {
            document.getElementById("add").click();
        }
    });
 
document.getElementById("add").onclick = function() {
    const newTaskText = dom.new.value
    if(newTaskText && isNotHaveTask(newTaskText, tasks)){
        addTask(newTaskText, tasks)
        dom.new.value = ''
        tasksRender(tasks)
    }
    
}