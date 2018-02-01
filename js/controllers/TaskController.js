class TaskController{
	constructor(){
		this.textInput = document.querySelector("#text")
		this.dateInput = document.querySelector("#dueDate")
		this.taskList = new TaskList()
		this.taskView = new TaskView(document.querySelector("#app"))
		this.taskView.update(this.taskList)
	}
	create(event){
		event.preventDefault()
		let data = DateHelper.textToDate(this.dateInput.value)
		let task = new Task(this.textInput.value, data)
		let formatedData = DateHelper.dateToText(task.dueDate)
		this.taskList.addTask(task)
		//console.log(this.taskList.getTasks())
		this.taskView.update(this.taskList)
		this.reset(this.textInput, this.dateInput)
	}
	reset(textInput, dateInput){
		textInput.value = ""
		dateInput.value = ""
		textInput.focus()
	}
	removeItem(taskId){
		console.log(taskId)
		this.taskList.tasks.splice((taskId-1), 1)
		console.log(this.taskList)
		this.taskView.update(this.taskList)
	}
}