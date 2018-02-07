class TaskController{
	constructor(text){
		this.textInput = document.querySelector("#text")
		this.dateInput = document.querySelector("#dueDate")
		this.taskList = new TaskList()
		this.taskView = new TaskView(document.querySelector("#app"), document.querySelector("#app2"))

		this.taskView.update(this.taskList)
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
				 .then(resp => console.log('Enviado ao banco'))
				 setTimeout(()=>{ this.taskView.update(this.taskList) }, 3000);
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
	changeStatus(taskId){
		console.log(taskId)
		console.log(this.taskList.tasks)
		for(var i=0; i<this.taskList.tasks.length; i++){
			console.log(...this.taskList.tasks[i].id)
			if(this.taskList.tasks[i]._id === taskId){
				console.log(this.taskList.tasks[i]._id)
				this.taskList.tasks[i].isDone = !this.taskList.tasks[i].isDone

				axios.put('http://localhost:3003/api/todos', { ...this.taskList.tasks[i] })
					.then((resp => console.log("Alterado no banco")))
			}
		}
		// this.taskView.update(this.taskList)
		//this.taskView.updateViewModel()
	}
}