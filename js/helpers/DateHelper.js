class DateHelper{
	static textToDate(dateText){
		return new Date(...dateText.split("-").map((item, indice) => item - indice % 2))
	}
	static dateToText(date){
		return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
	}
}