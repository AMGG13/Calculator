/*###########################################################
						GLOBALS VARS
###########################################################*/
//Buttons
const EQUAL_BUTTON = document.getElementById("equal-button");
const CLEAR_ALL_BUTTON = document.getElementById("clear-all-button");
const CLEAR_BUTTON = document.getElementById("clear-button");
const PLUS_BUTTON = document.getElementById("plus-button");
const MINUS_BUTTON = document.getElementById("minus-button");
const PRODUCT_BUTTON = document.getElementById("product-button");
//Inputs
let history_op = document.getElementById("last-op");
let result = document.getElementById("result");
//Importants
let numbers = [];
let last_op = "";
//Constants
const PLUS_SYMBOL = "+";
const MINUS_SYMBOL = "-";
const PRODUCT_SYMBOL = "x";
const SLASH_SYMBOL = "/";
//EqualEvent
let equalEvent = new MouseEvent("click", { shiftKey: true });

/*###########################################################
						FUNCTIONS HERE
###########################################################*/
function purgeNumberArray() {
	numbers = numbers.filter(function (num) {
		return !Number.isNaN(num);
	});
}
function getClearNumber(str) {
	if (str.includes(PLUS_SYMBOL)) {
		str = str.replaceAll(PLUS_SYMBOL, "");
	} else if (str.includes(MINUS_SYMBOL)) {
		str = str.replaceAll(MINUS_SYMBOL, "");
	} else if (str.includes(PRODUCT_SYMBOL)) {
		str = str.replaceAll(PRODUCT_SYMBOL, "");
	} else if (str.includes(SLASH_SYMBOL)) {
		str = str.replaceAll(SLASH_SYMBOL, "");
	} else {
	}

	return str;
}
function containsOp(str) {
	let isOp;
	isOp =
		str.includes(PLUS_SYMBOL) ||
		str.includes(MINUS_SYMBOL) ||
		str.includes(PRODUCT_SYMBOL) ||
		str.includes(SLASH_SYMBOL);
	return isOp;
}
function endWithOp(str) {
	let isOp;
	isOp =
		str.endsWith(PLUS_SYMBOL) ||
		str.endsWith(MINUS_SYMBOL) ||
		str.endsWith(PRODUCT_SYMBOL) ||
		str.endsWith(SLASH_SYMBOL);
	return isOp;
}
function isNumber(str) {
	return /^-?[0-9]\d*(\.\d+)?$/.test(str);
}
function write(button) {
	let number = button.innerHTML;
	if (result.value == "0") {
		result.value = number;
	} else {
		result.value += number;
	}
}
function clear_all() {
	result.value = "";
	last_op = "";
	numbers = [];
	history_op.value = "";
}
function clear() {
	let all_text = result.value;
	result.value = all_text.slice(0, -1);
}
function sum() {
	let op = numbers[0] + numbers[1];
	return op;
}
function do_sum() {
	history_op.value = result.value;
	let result_sum = sum();
	numbers = [result_sum];
	result.value = String(result_sum);
	last_op = PLUS_SYMBOL;
	console.log(numbers);
}

function minus() {
	let op = 0;
	op = numbers[0] - numbers[1];
	return op;
}
function do_minus() {
	history_op.value = result.value;
	let result_minus = minus();
	numbers = [result_minus];
	result.value = String(result_minus);
	last_op = MINUS_SYMBOL;
}
function equalMakeOp() {
	//TODO los valores del array se duplican
	let operation = result.value;
	if (!containsOp(operation) && isNaN(operation)) {
		return;
	}
	if (numbers.length == 1) {
		let last_number = "";
		if (operation == numbers[0]) {
			last_number = operation;
		} else {
			last_number = operation.replace(numbers[0], "");
		}

		if (containsOp(last_number)) {
			last_number = getClearNumber(last_number);
			numbers.push(parseInt(last_number));
		} else {
			numbers.push(parseInt(last_number));
		}
	}
	if (!endWithOp(result.value) && isNaN(operation)) {
		switch (last_op) {
			case PLUS_SYMBOL:
				do_sum();
				break;
			case MINUS_SYMBOL:
				do_minus();
				break;
			case PRODUCT_SYMBOL:
				break;
			default:
				break;
		}
	} else {
		purgeNumberArray();
		console.log(numbers);
		result.value = getClearNumber(operation);
	}
}
/*###########################################################
							MAIN
###########################################################*/
function ready() {
	//Write numbers
	Array.from(document.getElementsByClassName("number")).forEach(function (
		element
	) {
		element.addEventListener("click", function () {
			write(element);
		});
	});

	//Clear all inputs
	CLEAR_ALL_BUTTON.addEventListener("click", clear_all);

	//Clear last char of the result input
	CLEAR_BUTTON.addEventListener("click", clear);
	//Plus
	PLUS_BUTTON.addEventListener("click", function () {
		let last_number = result.value;
		if (endWithOp(last_number)) {
			clear();
			result.value += PLUS_SYMBOL;
			return;
		}
		if (last_number === "" || last_number.endsWith(PLUS_SYMBOL)) {
			return;
		}
		if (last_op === "") {
			numbers.push(parseInt(last_number));
			result.value += PLUS_SYMBOL;
			last_op = PLUS_SYMBOL;
		} else {
			result.value += PLUS_SYMBOL;
			equalMakeOp();
		}
	});

	//Minus
	MINUS_BUTTON.addEventListener("click", function () {
		let last_number = result.value;
		if (endWithOp(last_number)) {
			clear();
			result.value += MINUS_SYMBOL;
			last_op = MINUS_SYMBOL;
			return;
		}
		if (last_number === MINUS_SYMBOL) {
			return;
		}
		if (last_number.endsWith(MINUS_SYMBOL)) {
			return;
		} //-50

		if (last_op === "") {
			numbers.push(parseInt(last_number));
			result.value += MINUS_SYMBOL;
			last_op = MINUS_SYMBOL;
		} else {
			equalMakeOp();
			result.value += MINUS_SYMBOL;
			last_op = MINUS_SYMBOL;
		}
	});

	EQUAL_BUTTON.addEventListener("click", function (e) {
		if (e.shiftKey || !e.shiftKey) {
			equalMakeOp();
		} else {
			//TODO
		}
	});
}

document.addEventListener("DOMContentLoaded", ready);
