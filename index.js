/*###########################################################
						GLOBALS VARS
###########################################################*/
//Buttons
const EQUAL_BUTTON = document.getElementById("equal-button");
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
//EqualEvent
let equalEvent = new MouseEvent("click", { shiftKey: true });
/*###########################################################
						FUNCTIONS HERE
###########################################################*/
function containsOnlyNumbers(str) {
	return /^\d+$/.test(str);
}
function write(button) {
	let number = button.innerHTML;
	result.value += number;
}
function clear() {
	result.value = "";
	last_op = "";
	numbers = [];
	history_op.value = "";
}
function sum() {
	return numbers[0] + numbers[1];
}
function do_sum() {
	history_op.value = operation;
	let result_sum = sum();
	numbers = [result_sum];
	result.value = String(result_sum);
	last_op = "";
}

function minus() {
	if (numbers[1] == undefined) {
		return numbers[0];
	}
	if (numbers[0] == undefined) {
		return numbers[1];
	}
	//No deja pasar numeros negativos
	return numbers[0] - numbers[1];
}
function do_minus() {
	history_op.value = operation;
	let result_minus = minus();
	numbers = [result_minus];
	result.value = String(result_minus);
	last_op = "";
}
function equalMakeOp() {
	operation = result.value;
	numbers_strings = operation.split(last_op);//Posible problema
	numbers = numbers_strings.map((num) => {
		//Parse string to number
		if (containsOnlyNumbers(num)) { return parseInt(num) }
		else { return; }
	});

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
}
function saveNumber() {
	
}
/*###########################################################
							MAIN
###########################################################*/
function ready() {
	Array.from(document.getElementsByClassName("number")).forEach(function (
		element
	) {
		element.addEventListener("click", function () {
			write(element);
		});
	});

	CLEAR_BUTTON.addEventListener("click", clear);

	PLUS_BUTTON.addEventListener("click", function () {
		let last_number = result.value;
		if (last_op === "") {
			numbers.push(last_number);
			result.value = `${last_number}+`;
			last_op = PLUS_SYMBOL;
		} else {
			EQUAL_BUTTON.dispatchEvent(equalEvent);
			result.value += PLUS_SYMBOL;
			last_op = PLUS_SYMBOL;
		}
	});

	MINUS_BUTTON.addEventListener("click", function () {
		let last_number = result.value;
		if (containsOnlyNumbers(last_number)) {
			if (last_op === "") {
				numbers.push(last_number);
				result.value = `${last_number}-`;
				last_op = MINUS_SYMBOL;
			} else {
				EQUAL_BUTTON.dispatchEvent(equalEvent);
				result.value += MINUS_SYMBOL;
				last_op = MINUS_SYMBOL;
			}
		} else {
			EQUAL_BUTTON.dispatchEvent(equalEvent);
			result.value += MINUS_SYMBOL;
			last_op = MINUS_SYMBOL;
			console.log(numbers);
			return;
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
