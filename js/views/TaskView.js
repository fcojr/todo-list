class TaskView {
    constructor(app){
        this.app = app
    }
    layout(taskList){
        return `
            <table class="table table-striped">
                <thead class="thead-dark">
                    <tr>
                        <th>Task</th>
                        <th>Due Date</th>
                        <th>Creation Time</th>
                        <th>Change Status</th>
                    </tr>
                    <tr>
                        <td>Learn Vanilla JS</td>
                        <td>10/2/2019</td>
                        <td>1/2/2018</td>
                        <td>
                            <button class="btn btn-sm btn-dark"><i class="fas fa-check"></i></button>
                            <button onclick="taskController.removeItem(${taskList.id})" class="btn btn-sm btn-dark"><i class="fas fa-times"></i></button>
                        </td>
                    </tr>
                </thead>
                ${taskList.getTasks().map(taskList =>{
                    return `<tr>
                        <td>${taskList.text}</td>
                        <td>${DateHelper.dateToText(taskList.dueDate)}</td>
                        <td>${DateHelper.dateToText(taskList.creationTime)}</td>
                        <td>
                            <button class="btn btn-sm btn-dark"><i class="fas fa-check"></i></button>
                            <button onclick="taskController.removeItem(${taskList.id})" class="btn btn-sm btn-dark"><i class="fas fa-times"></i></button>
                        </td>
                    </tr>`
                }).join('')}
            </table> `
    }
    update(taskList){
        this.app.innerHTML = this.layout(taskList)
    }
}