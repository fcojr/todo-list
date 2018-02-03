class TaskView {
    constructor(app, app2){
        this.app = app
        this.app2 = app2
    }
    todoTable(taskList){
        return `
            <table class="table table-striped">
                <thead class="thead-dark">
                    <tr>
                        <th>Task</th>
                        <th>Due Date</th>
                        <th>Creation Time</th>
                        <th>Change Status</th>
                    </tr>
                </thead>
                ${taskList.getTasks().map(taskList =>
                     `<tr class="id-${taskList.id}">
                        <td>${taskList.text}</td>
                        <td>${DateHelper.dateToText(taskList.dueDate)}</td>
                        <td>${DateHelper.dateToText(taskList.creationTime)}</td>
                        <td>
                            <button onclick=taskController.markAsDone(${taskList.id}) class="btn btn-sm btn-dark" title="Mark task as done"><i class="fas fa-check"></i></button>
                            <button onclick=taskController.removeItem(${taskList.id}) class="btn btn-sm btn-dark" title="Remove task"><i class="fas fa-times"></i></button>
                            <button onclick="" class="btn btn-sm btn-dark" title="Edit task"><i class="fas fa-pencil-alt"></i></button>
                        </td>
                    </tr>`
                ).join('')}
            </table> `
    }
    doneTable(doneTasks){
        return `
            <table class="table table-striped">
                <thead class="thead-dark">
                    <tr>
                        <th class="bg-success">Task</th>
                        <th class="bg-success">Due Date</th>
                        <th class="bg-success">Creation Time</th>
                        <th class="bg-success">Change Status</th>
                    </tr>
                </thead>
                ${doneTasks.getTasks().map(doneTasks =>
                     `<tr>
                        <td>${doneTasks.text}</td>
                        <td>${DateHelper.dateToText(doneTasks.dueDate)}</td>
                        <td>${DateHelper.dateToText(doneTasks.creationTime)}</td>
                        <td>
                            <button onclick="taskController.backTodo(${doneTasks.id})" class="btn btn-sm btn-dark" title="Undo task"><i class="fas fa-undo"></i></i></button>
                        </td>
                    </tr>`
                ).join('')}
            </table> `
    }
    noTasks(){
        return `
        <table class="table table-striped">
                <thead class="thead-dark">
                    <tr>
                        <th>Task</th>
                        <th>Due Date</th>
                        <th>Creation Time</th>
                        <th>Change Status</th>
                    </tr>
                </thead>
            </table>
            <p>No tasks</p>
        `
    }
    noDoneTasks(){
        return `<p>No done tasks</p>`
    }
    update(taskList, doneTasks){
        if(typeof taskList !== 'undefined' && taskList.tasks.length > 0)
            this.app.innerHTML = this.todoTable(taskList)
        else
            this.app.innerHTML = this.noTasks()
        if(typeof doneTasks !== 'undefined' && doneTasks.tasks.length > 0)
            this.app2.innerHTML = this.doneTable(doneTasks)
        else
            this.app2.innerHTML = this.noDoneTasks()
    }
    fadeOut(taskId){
		document.querySelector(".id-"+taskId).classList.add("fadeOut")
		setTimeout(()=> {
			this.update(this.taskList, this.doneTasks)
		}, 500)
    }
    fadeIn(taskId){
        document.querySelector(".id-"+taskId).classList.add("fadeIn")
        setTimeout(()=> {
            this.update(this.taskList, this.doneTasks)
        }, 500)
    }
}