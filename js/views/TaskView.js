class TaskView {
    constructor(app, app2){
        this.app = app
        this.app2 = app2
    }
    todoTable(taskList){
        let tasks = taskList.filter(tasks => !tasks.isDone)
        if(tasks.length === 0) return this.noTasks()
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
                ${tasks.map(tasks =>
                     `<tr class="id-${tasks._id}">
                        <td>${tasks.text}</td>
                        <td>${DateHelper.dateToText(tasks.dueDate)}</td>
                        <td>${DateHelper.dateToText(tasks.creationTime)}</td>
                        <td>
                            <button onclick="taskController.markAsDone('${tasks._id}')" class="btn btn-sm btn-dark" title="Mark task as done"><i class="fas fa-check"></i></button>
                            <button onclick=taskController.removeItem({id}) class="btn btn-sm btn-dark" title="Remove task"><i class="fas fa-times"></i></button>
                            <button onclick="" class="btn btn-sm btn-dark" title="Edit task"><i class="fas fa-pencil-alt"></i></button>
                        </td>
                    </tr>`
                ).join('')}
            </table> `
    }
    doneTable(taskList){
        let doneTasks = taskList.filter(taskList => taskList.isDone)
        if(doneTasks.length === 0) return this.noDoneTasks()
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
                ${doneTasks.map(doneTasks =>
                     `<tr>
                        <td>${doneTasks.text}</td>
                        <td>${DateHelper.dateToText(doneTasks.dueDate)}</td>
                        <td>${DateHelper.dateToText(doneTasks.creationTime)}</td>
                        <td>
                            <button onclick="taskController.backToDo('${doneTasks._id}')" class="btn btn-sm btn-dark" title="Undo task"><i class="fas fa-undo"></i></i></button>
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
    initList(listaTask){
        //console.log(listaTask)
        axios.get('http://localhost:3003/api/todos')
            .then(res => { 
                res.data.forEach(task=>listaTask.addTask(task))
                //console.log(listaTask)
            })
    }
    update(taskList){
        //console.log(taskList)
        axios.get('http://localhost:3003/api/todos')
            .then(res => {
                taskList = res.data;
                this.app.innerHTML = this.todoTable(taskList)
                this.app2.innerHTML = this.doneTable(taskList)
            })
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