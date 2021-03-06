const URL = 'https://api.mlab.com/api/1/databases/todo-list-db/collections/lista?apiKey=Rden4Y9d9SKz1Lq8bEc_EKN3N2OBo7PD'
const putURL = 'https://api.mlab.com/api/1/databases/todo-list-db/collections/lista/4e7315a65e4ce91f885b7dde?apiKey=Rden4Y9d9SKz1Lq8bEc_EKN3N2OBo7PD'
class TaskController{
	constructor(text){
		this.textInput = document.querySelector("#text")
		this.dateInput = document.querySelector("#dueDate")
		this.taskList = new TaskList()
		this.taskView = new TaskView(document.querySelector("#todo-table"), document.querySelector("#done-table"), document.querySelector("#postpone-table"))
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
	postponeItem(taskId){
		for(var i=0; i<this.taskList.tasks.length; i++){
			if(this.taskList.tasks[i]._id.$oid == taskId){
				this.taskList.tasks[i].isDeleted = true
				axios.put(`https://api.mlab.com/api/1/databases/todo-list-db/collections/lista/${taskId}?apiKey=Rden4Y9d9SKz1Lq8bEc_EKN3N2OBo7PD`, { ...this.taskList.tasks[i], isDeleted: true})
					.then(res=>this.taskView.update(this.taskList.tasks))
					alertify.notify('Task postponed', 'error', 5);
			}
		}
	}
	retrieveTask(taskId){
		let task = this.taskList.tasks.find(item => item._id.$oid === taskId)
		task.isDeleted = false
		axios.put(`https://api.mlab.com/api/1/databases/todo-list-db/collections/lista/${taskId}?apiKey=Rden4Y9d9SKz1Lq8bEc_EKN3N2OBo7PD`, { ...task, isDeleted: false })
			.then(res => {
				this.taskView.update(this.taskList.tasks)
				alertify.notify('Task retrieved', 'success', 5);
			})
		
	}
	removeTask(taskId){
		alertify.confirm('Are you sure? This cannot be undone', ()=>{
			let task = this.taskList.tasks.find(item => item._id.$oid === taskId)
			this.taskList.tasks.splice(1, task)
			axios.delete(`https://api.mlab.com/api/1/databases/todo-list-db/collections/lista/${taskId}?apiKey=Rden4Y9d9SKz1Lq8bEc_EKN3N2OBo7PD`)
			.then(res => {
				this.taskView.update(this.taskList.tasks)
				alertify.notify('Task permanently removed', 'error', 5);
			})
		}), () => true
	}
	markAsDone(taskId){
			for(var i=0; i<this.taskList.tasks.length; i++){
				if(this.taskList.tasks[i]._id.$oid == taskId){
					this.taskList.tasks[i].isDone = true
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
	editText(taskId){
		const newText = document.querySelector(`#id-${taskId}`)
		newText.classList.add("editing")
		newText.setAttribute("contenteditable", "true")
		const range = document.createRange();
		const sel = window.getSelection();
		range.selectNodeContents(newText);
		range.collapse(false);
		sel.removeAllRanges();
		sel.addRange(range);
		newText.focus();
		newText.addEventListener("keypress", e=>{ 
			if (e.which === 13) {
				e.preventDefault();
				newText.blur()
			}
		})
		newText.addEventListener("focusout", ()=>{ 
			newText.removeAttribute("contenteditable")
			newText.classList.remove("editing")
			let task = this.taskList.tasks.find(item => item._id.$oid === taskId)
			if(task.text != newText.innerText){ 
				task.text = newText.innerText
				axios.put(`https://api.mlab.com/api/1/databases/todo-list-db/collections/lista/${taskId}?apiKey=Rden4Y9d9SKz1Lq8bEc_EKN3N2OBo7PD`, { ...task, text: newText.innerText })
					.then(res => {
						this.taskView.update(this.taskList.tasks)
						alertify.notify('Task changed', 'success', 5);
					})
			}
		})
	}
}