class Task { 
	constructor(text, dueDate){
		this.text = text;
		this.dueDate = dueDate;
		this.id = Task.getId();
		this.creationTime = new Date();
		this.isDone = false;
	}
	static getId(){ 							//peguei esse codigo na net, 
		if (!this.latestId) this.latestId = 1;  //cria um ID 1 e vai incrementando a cada
	    else this.latestId++;					//nova instacia que cria
	    return this.latestId;
	}
};