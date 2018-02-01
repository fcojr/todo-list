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
                    </tr>
                    <tr>
                        <td>Learn Vanilla JS</td>
                        <td>10/02/2019</td>
                        <td>01/02/2018</td
                    </tr>
                </thead>
                ${taskList.getTasks().map(taskList =>{
                    return `<tr>
                        <td>${taskList.text}</td>
                        <td>${DateHelper.dateToText(taskList.dueDate)}</td>
                        <td>${DateHelper.dateToText(taskList.creationTime)}</td>
                    </tr>`
                }).join('')}
            </table> `
    }
    update(taskList){
        this.app.innerHTML = this.layout(taskList)
    }
}