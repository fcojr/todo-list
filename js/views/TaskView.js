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
                     `<tr>
                        <td>${taskList.text}</td>
                        <td>${DateHelper.dateToText(taskList.dueDate)}</td>
                        <td>${DateHelper.dateToText(taskList.creationTime)}</td>
                        <td>
                            <button onclick=taskController.markAsDone(${taskList.id}) class="btn btn-sm btn-dark"><i class="fas fa-check"></i></button>
                            <button onclick="taskController.removeItem(${taskList.id})" class="btn btn-sm btn-dark"><i class="fas fa-times"></i></button>
                        </td>
                    </tr>`
                ).join('')}
            </table> `
    }
    doneTable(taskList){
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
                     `<tr>
                        <td>${taskList.text}</td>
                        <td>${DateHelper.dateToText(taskList.dueDate)}</td>
                        <td>${DateHelper.dateToText(taskList.creationTime)}</td>
                        <td>
                            <button class="btn btn-sm btn-dark"><i class="fas fa-undo"></i></i></button>
                        </td>
                    </tr>`
                ).join('')}
            </table> `
    }
    update(taskList, doneTasks){
        this.app.innerHTML = this.todoTable(taskList)
       // let textnode = document.createTextNode(this.doneTable(taskList));
        // let doneTable = this.doneTable(doneTasks)
        this.app2.innerHTML = this.doneTable(doneTasks)
    }
}