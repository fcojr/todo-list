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
                     `<tr class="id-${tasks._id.$oid}">
                        <td id="id-${tasks._id.$oid}">
                            ${tasks.text}
                        </td>
                        <td>
                            ${moment(tasks.dueDate).format("DD/MM/YYYY")}
                            <input id="date-id-${tasks._id.$oid}" class="form-control" value="${moment(tasks.dueDate).format("YYYY-MM-DD")}" id="dueDate" name="dueDate" type="date">
                        </td>
                        <td>${moment(tasks.creationTime).format("DD/MM/YYYY")}</td>
                        <td>
                            <button onclick="taskController.markAsDone('${tasks._id.$oid}')" class="btn btn-sm btn-dark" title="Mark task as done"><i class="fas fa-check"></i></button>
                            <button onclick="taskController.removeItem('${tasks._id.$oid}')" class="btn btn-sm btn-dark" title="Remove task"><i class="fas fa-times"></i></button>
                            <button onclick="taskController.editTask('${tasks._id.$oid}')" class="btn btn-sm btn-dark" title="Edit task"><i class="fas fa-pencil-alt"></i></button>
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
                            <button onclick="taskController.backToDo('${doneTasks._id.$oid}')" class="btn btn-sm btn-dark" title="Undo task"><i class="fas fa-undo"></i></i></button>
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
        axios.get(URL)
            .then(res => { 
                //console.log(res.data)
                res.data.forEach(task=>listaTask.addTask(task))
            })
    }
    update(taskList){
        axios.get(URL)
            .then(res => {
                taskList = res.data;
                this.app.innerHTML = this.todoTable(taskList)
                this.app2.innerHTML = this.doneTable(taskList)
            })
    }
}