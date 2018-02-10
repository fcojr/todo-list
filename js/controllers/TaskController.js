const URL = 'https://api.mlab.com/api/1/databases/todo-list-db/collections/lista?apiKey=Rden4Y9d9SKz1Lq8bEc_EKN3N2OBo7PD'
const putURL = 'https://api.mlab.com/api/1/databases/todo-list-db/collections/lista/4e7315a65e4ce91f885b7dde?apiKey=Rden4Y9d9SKz1Lq8bEc_EKN3N2OBo7PD'
class TaskController{
	constructor(text){
		this.textInput = document.querySelector("#text")
		this.dateInput = document.querySelector("#dueDate")
		this.taskList = new TaskList()
		this.taskView = new TaskView(document.querySelector("#app"), document.querySelector("#app2"))
		this.taskView.initList(this.taskList)
		this.taskView.update(this.taskList)
	}
	create(){
		if(this.verifica(this.textInput, this.dateInput)){
			let data = DateHelper.textToDate(this.dateInput.value)
			let task = new Task(this.textInput.value, data)
			let formatedData = DateHelper.dateToText(task.dueDate)
			this.reset(this.textInput, this.dateInput)
			axios.post(URL, { ...task })
				.then(resp => {
					this.taskList.addTask(resp.data)
					console.log(this.taskList)
					this.taskView.update(this.taskList)
					alertify.notify('Task created', 'success', 5);
				})
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
			if(this.taskList.tasks[i]._id.$oid == taskId){
				this.taskList.tasks.splice(i, 1)
				axios.delete(`https://api.mlab.com/api/1/databases/todo-list-db/collections/lista/${taskId}?apiKey=Rden4Y9d9SKz1Lq8bEc_EKN3N2OBo7PD`)
					.then(res=>this.taskView.update(this.taskList.tasks))
					alertify.notify('Task removed', 'error', 5);
			}
		}
	}
	markAsDone(taskId){
			for(var i=0; i<this.taskList.tasks.length; i++){
				if(this.taskList.tasks[i]._id.$oid == taskId){
					this.taskList.tasks[i].isDone = true
					console.log(taskId)
					axios.put(`https://api.mlab.com/api/1/databases/todo-list-db/collections/lista/${taskId}?apiKey=Rden4Y9d9SKz1Lq8bEc_EKN3N2OBo7PD`, { ...this.taskList.tasks[i], isDone: true })
						.then(res => {
							this.taskView.update(this.taskList.tasks)
							alertify.notify('Marked as done', 'success', 5);
						})
						
				}
			}
	}
	backToDo(taskId){
		for(var i=0; i<this.taskList.tasks.length; i++){
			if(this.taskList.tasks[i]._id.$oid == taskId){
				this.taskList.tasks[i].isDone = !this.taskList.tasks[i].isDone
				axios.put(`https://api.mlab.com/api/1/databases/todo-list-db/collections/lista/${taskId}?apiKey=Rden4Y9d9SKz1Lq8bEc_EKN3N2OBo7PD`, { ...this.taskList.tasks[i], isDone: false })
					.then(res => {
						this.taskView.update(this.taskList.tasks)
						alertify.notify('Back to do', 'success', 5);
					})
			}
		}
	}
}