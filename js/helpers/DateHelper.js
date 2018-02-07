class DateHelper{
	static textToDate(dateText){
		return new Date(...dateText.split("-").map((item, indice) => item - indice % 2))
	}
	static dateToText(date){
		//console.log(date)
		var newDate = new Date(date)
		return `${newDate.getDate()}/${newDate.getMonth() + 1}/${newDate.getFullYear()}`
	}
}
//export default DateHelper;