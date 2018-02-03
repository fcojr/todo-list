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
			//console.log(this.taskList)
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
		this.taskView.fadeOut(taskId)
	}
	markAsDone(taskId){
		this.swapItems(taskId, this.taskList, this.doneTasks)
		this.taskView.update(this.taskList, this.doneTasks)
		//this.taskView.fadeOut(taskId)
	}
	backTodo(taskId){
		this.swapItems(taskId, this.doneTasks, this.taskList)
		this.taskView.update(this.taskList, this.doneTasks)
	}
	swapItems(taskId, src, dest){
		for(var i=0; i<src.tasks.length; i++){
			if(src.tasks[i].id == taskId){
				src.tasks[i].isDone = !src.tasks[i].isDone
				dest.tasks.push(src.tasks[i])
				src.tasks.splice(i, 1)
			}
		}
		//this.taskView.fadeOut(taskId)
		this.taskView.update(this.taskList, this.doneTasks)
	}

}