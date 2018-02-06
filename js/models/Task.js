class Task { 
	constructor(text, dueDate){
		this.text = text
		this.dueDate = dueDate
		this.id = Task.getId()
		this.creationTime = new Date()
		this.isDone = false
	}
	static getId(){ 
		if (!this.latestId) this.latestId = 1
	    else this.latestId++
	    return this.latestId
	}
}