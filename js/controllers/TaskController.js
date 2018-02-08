class TaskController{
	constructor(text){
		this.textInput = document.querySelector("#text")
		this.dateInput = document.querySelector("#dueDate")
		this.taskList = new TaskList()
		this.taskView = new TaskView(document.querySelector("#app"), document.querySelector("#app2"))
		this.taskView.initList(this.taskList)
		this.taskView.update(this.taskList)
		//console.log(this.taskList)
	}
	create(){
		if(this.verifica(this.textInput, this.dateInput)){
			let data = DateHelper.textToDate(this.dateInput.value)
			//console.log(dataValue)
			let task = new Task(this.textInput.value, data)
			let formatedData = DateHelper.dateToText(task.dueDate)
			this.taskList.addTask(task)
			//console.log(this.taskList)
			this.reset(this.textInput, this.dateInput)
			axios.post('http://localhost:3003/api/todos', { ...task })
				 .then(resp => {console.log('Enviado ao banco')
				 this.taskView.update(this.taskList)})
			//this.taskView.update(this.taskList)
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
		//console.log(taskId)
		for(var i=0; i<this.taskList.tasks.length; i++){
			if(this.taskList.tasks[i].id == taskId){
				this.taskList.tasks.splice(i, 1)
			}
		}
		this.taskView.update(this.taskList)
	}
	markAsDone(taskId){
			for(var i=0; i<this.taskList.tasks.length; i++){
				if(this.taskList.tasks[i]._id == taskId){
					this.taskList.tasks[i].isDone = !this.taskList.tasks[i].isDone
					console.log(this.taskList.tasks)
					axios.put(`http://localhost:3003/api/todos/${taskId}`, { ...this.taskList.tasks[i], isDone: true })
						.then(res => this.taskView.update(this.taskList.tasks))
				}
			}
	}
	backToDo(taskId){
		for(var i=0; i<this.taskList.tasks.length; i++){
			if(this.taskList.tasks[i]._id == taskId){
				this.taskList.tasks[i].isDone = !this.taskList.tasks[i].isDone
				//console.log(this.taskList.tasks[i])
				axios.put(`http://localhost:3003/api/todos/${taskId}`, { ...this.taskList.tasks[i], isDone: false })
					.then(res => this.taskView.update(this.taskList.tasks))
			}
		}
	}
}