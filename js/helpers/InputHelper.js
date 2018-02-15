class InputHelper{
    static ToEndOfInput(target){
        console.log(target)
		const range = document.createRange();
		const sel = window.getSelection();
        range.selectNodeContents(target);
		range.collapse(false);
		sel.removeAllRanges();
		sel.addRange(target);
		target.focus();
    }
}