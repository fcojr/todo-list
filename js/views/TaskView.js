class TaskView {
    constructor(table1, table2, table3){
        this.table1 = table1
        this.table2 = table2
        this.table3 = table3
    }
    todoTable(taskList){
        let tasks = taskList.filter(tasks => !tasks.isDone && !tasks.isDeleted)
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
                     `<tr id="tr-id-${tasks._id.$oid}">
                        <td class="text" id="id-${tasks._id.$oid}">
                            <span>${tasks.text}</span>
                            <button onclick="taskController.editText('${tasks._id.$oid}')" class="btn btn-sm btn-dark" title="Edit task text"><i class="fas fa-pencil-alt"></i></button>
                        </td>
                        <td>
                            ${moment(tasks.dueDate).format("DD/MM/YYYY")}
                            <input id="date-id-${tasks._id.$oid}" class="form-control" value="${moment(tasks.dueDate).format("YYYY-MM-DD")}" id="dueDate" name="dueDate" type="date">
                        </td>
                        <td>${moment(tasks.creationTime).format("DD/MM/YYYY")}</td>
                        <td>
                            <button onclick="taskController.markAsDone('${tasks._id.$oid}')" class="btn btn-sm btn-dark" title="Mark task as done"><i class="fas fa-check"></i></button>
                            <button onclick="taskController.postponeItem('${tasks._id.$oid}')" class="btn btn-sm btn-dark" title="Postpone task"><i class="fas fa-times"></i></button>
                        </td>
                    </tr>`
                ).join('')}
            </table> `
    }
    doneTable(taskList){
        let doneTasks = taskList.filter(tasks => tasks.isDone && !tasks.isDeleted)
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
    postponeTable(taskList){
        let postponeTasks = taskList.filter(tasks => tasks.isDeleted)
        if(postponeTasks.length === 0) return this.noPostponeTasks()
        return `
            <h2 class="title">Postponed Tasks</h2>
            <table class="table table-striped">
                <thead class="thead-dark">
                    <tr>
                        <th class="bg-danger">Task</th>
                        <th class="bg-danger">Due Date</th>
                        <th class="bg-danger">Creation Time</th>
                        <th class="bg-danger">Change Status</th>
                    </tr>
                </thead>
                ${postponeTasks.map(postponeTasks =>
                    `<tr>
                        <td>${postponeTasks.text}</td>
                        <td>${DateHelper.dateToText(postponeTasks.dueDate)}</td>
                        <td>${DateHelper.dateToText(postponeTasks.creationTime)}</td>
                        <td>
                            <button onclick="taskController.retrieveTask('${postponeTasks._id.$oid}')" class="btn btn-sm btn-dark" title="Undo task"><i class="fas fa-undo"></i></i></button>
                            <button onclick="taskController.removeTask('${postponeTasks._id.$oid}')" class="btn btn-sm btn-dark" title="Remove permanently"><i class="fas fa-times"></i></i></button>
                    </td>
                </tr>`
                ).join('')}
            </table>`
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
    noPostponeTasks(){
        return `
        <h2 class="title">Postponed Tasks</h2>
        <p>No postponed tasks</p>
        `
    }
    initList(listaTask){
        axios.get(URL)
            .then(res => {
                res.data.forEach(task=>listaTask.addTask(task))
            })
    }
    update(taskList){
        axios.get(URL)
            .then(res => {
                taskList = res.data;
                this.table1.innerHTML = this.todoTable(taskList)
                this.table2.innerHTML = this.doneTable(taskList)
                this.table3.innerHTML = this.postponeTable(taskList)
            })
    }
}