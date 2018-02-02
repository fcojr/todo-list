class TaskController{
	constructor(text){
		this.textInput = document.querySelector("#text")
		this.dateInput = document.querySelector("#dueDate")
		this.taskList = new TaskList()
		this.doneTasks = new TaskList()
		this.taskView = new TaskView(document.querySelector("#app"), document.querySelector("#app2"))
		this.taskView.update(this.taskList, this.doneTasks)
	}
	create(){
		if(this.verifica(this.textInput, this.dateInput)){
			let data = DateHelper.textToDate(this.dateInput.value)
			let task = new Task(this.textInput.value, data)
			let formatedData = DateHelper.dateToText(task.dueDate)
			this.taskList.addTask(task)
			//console.log(this.taskList.getTasks())
			this.taskView.update(this.taskList, this.doneTasks)
			this.reset(this.textInput, this.dateInput)
		}
	}
	verifica(text, date){
		if(text.value == ""){
			text.classList.add("invalid")
			text.addEventListener("focus", () => text.classList.remove("invalid"))
			return false
		}
		if(date.value == ""){
			date.classList.add("invalid")
			date.addEventListener("focus", () => date.classList.remove("invalid"))
			return false
		}
		return true
	}
	reset(textInput, dateInput){
		textInput.value = ""
		dateInput.value = ""
	}
	removeItem(taskId){
		for(var i=0; i<this.taskList.tasks.length; i++){
			if(this.taskList.tasks[i].id == taskId){
				this.taskList.tasks.splice(i, 1)
			}
		}
		this.taskView.update(this.taskList, this.doneTasks)
	}
	markAsDone(taskId){
		for(var i=0; i<this.taskList.tasks.length; i++){
			if(this.taskList.tasks[i].id == taskId){
				this.taskList.tasks[i].isDone = true
				this.doneTasks.tasks.push(this.taskList.tasks[i])
			}
		}
		console.log(this.doneTasks)
		this.removeItem(i)
		this.taskView.update(this.taskList, this.doneTasks)
	}
} 