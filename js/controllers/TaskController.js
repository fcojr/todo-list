class TaskController{
	constructor(){
		this.textInput = document.querySelector("#text");
		this.dateInput = document.querySelector("#dueDate");
		this.taskList = new TaskList();
	}
	create(event){
		event.preventDefault();
		let data = DateHelper.textToDate(this.dateInput.value);
		let task = new Task(this.textInput.value, data);
		let formatedData = DateHelper.dateToText(task.dueDate);
		this.taskList.addTask(task);
		console.log(this.taskList.getTasks());
	}
}