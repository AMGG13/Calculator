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
const SLASH_BUTTON = document.getElementById("slash-button");
//Inputs
const history_op = document.getElementById("last-op");
const result = document.getElementById("result");
//Importants
//let numbers = [];
//let last_op = "";

//Constants
const PLUS_SYMBOL = "+";
const MINUS_SYMBOL = "-";
const PRODUCT_SYMBOL = "x";
const SLASH_SYMBOL = "/";
const SYNTAX_ERROR = "Syntax Error";

/*###########################################################
						FUNCTIONS HERE
###########################################################*/
/*#####################__UTILS__##################### */
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
function name() {}
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
function containsPoint(str) {
	let havePoint = false;
	havePoint = str.endsWith(".");
	return havePoint;
}
function countPoints(result_input) {
	let points = [];
	let splitted_input = result_input.split("");
	points = splitted_input.filter((c) => containsPoint(c));

	return points.length;
}
function pointBetween(result_input, button_value) {
	let is_between = false;
	let symbols = [];
	let splitted_input = result_input.split("");
	symbols = splitted_input.filter((c) => isNaN(c));
	if (symbols.length > 0) {
		is_between = symbols.pop() == button_value;
	} else {
		is_between = false;
	}
	return is_between;
}
function cannot_write_a_point(button_value, result_input) {
	let not_able = false;
	let result_input_is_empty = result_input == "" && button_value == ".";
	let ends_with_point = result_input.endsWith(".") && button_value == ".";
	let contans_two_points =
		countPoints(result_input) == 2 && button_value == ".";
	let is_between = pointBetween(result_input, button_value);
	not_able =
		result_input_is_empty ||
		ends_with_point ||
		contans_two_points ||
		is_between;
	return not_able;
}
function getLastOp(operation) {
	let last_op = [];
	let splitted_op = operation.split("");
	last_op = splitted_op.filter((c) => containsOp(c));

	return last_op.pop();
}
function slash(operation) {
	let written_numbers_string = operation.split(SLASH_SYMBOL);
	let written_numbers_parsed_to_number = written_numbers_string.map(
		(string_number) => parseFloat(string_number)
	);
	let slash_result = written_numbers_parsed_to_number.reduce((a, b) => a / b);
	if (slash_result == "Infinity") {
		slash_result = SYNTAX_ERROR;
	}
	return slash_result;
}
function product(operation) {
	let written_numbers_string = operation.split(PRODUCT_SYMBOL);
	let written_numbers_parsed_to_number = written_numbers_string.map(
		(string_number) => parseFloat(string_number)
	);
	let product_result = written_numbers_parsed_to_number.reduce((a, b) => a * b);
	return product_result;
}
function sum(operation) {
	let written_numbers_string = operation.split(PLUS_SYMBOL);
	let written_numbers_parsed_to_number = written_numbers_string.map(
		(string_number) => parseFloat(string_number)
	);
	let sum_result = written_numbers_parsed_to_number.reduce((a, b) => a + b);
	return sum_result;
}
function minus(operation) {
	//Arreglar map
	let minus_result = 0;
	let written_numbers_string = [];
	if (operation.startsWith(MINUS_SYMBOL)) {
		written_numbers_string = operation.split(MINUS_SYMBOL);
		written_numbers_string.shift();
		let written_numbers_parsed_to_number = written_numbers_string.map(
			(string_number) => parseFloat(string_number)
		);
		minus_result = written_numbers_parsed_to_number.reduce(
			(a, b) => a * -1 - b
		);
	} else {
		let written_numbers_string = operation.split(MINUS_SYMBOL);
		let written_numbers_parsed_to_number = written_numbers_string.map(
			(string_number) => parseFloat(string_number)
		);
		minus_result = written_numbers_parsed_to_number.reduce((a, b) => a - b);
	}
	return minus_result;
}
/*#####################__EVENTS__#####################*/

/**
 * Get te inner html of the button and then write the value in the result_input
 * if result contains already a cero. this cero will be replaced by other value
 * @param {Object} Button
 */
function write(button) {
	let number = button.innerHTML;
	let result_input = result.value;
	if (cannot_write_a_point(number, result_input)) {
		return result.value;
	} else {
		result_input === "0" ? (result.value = number) : (result.value += number);
	}
}

/**
 * Empty history and result input
 */
function clear_all() {
	result.value = "";
	history_op.value = "";
}

/**
 * Delete the last character of the result input
 */
function clear() {
	let result_length = result.value.length;
	let result_input = result.value.slice(0, result_length - 1);
	result.value = result_input;
}
function do_plus_event() {
	//PLUS EVENT LOGIC
	let double_op = false;
	let result_input = result.value;
	let result_input_is_a_number = !isNaN(result_input);

	if (result_input_is_a_number) {
		result_input == "" ? result.value : (result.value += PLUS_SYMBOL);
	} else if (result_input == "Syntax Error") {
		result.value = "";
	} else {
		if (endWithOp(result_input) && result_input.length > 1) {
			clear();
			result.value += PLUS_SYMBOL;
		} else if (result_input.length == 1) {
			return;
		} else if (containsOp(result_input)) {
			double_op = true;
			equal_event(PLUS_SYMBOL, double_op);
		} else {
			double_op = false;
			equal_event(PLUS_SYMBOL, double_op);
		}
	}
}

function do_minus_event() {
	//PLUS EVENT LOGIC
	let double_op = false;
	let result_input = result.value;
	let result_input_is_a_number = !isNaN(result_input);

	if (result_input_is_a_number) {
		result.value += MINUS_SYMBOL;
	} else if (result_input == SYNTAX_ERROR) {
		result.value = MINUS_SYMBOL;
	} else {
		if (endWithOp(result_input)) {
			clear();
			result.value += MINUS_SYMBOL;
		} else if (containsOp(result_input)) {
			double_op = true;
			equal_event(MINUS_SYMBOL, double_op);
		} else {
			double_op = false;
			equal_event(MINUS_SYMBOL, double_op);
		}
	}
}
function do_product_event() {
	//PRODUCT EVENT LOGIC
	let double_op = false;
	let result_input = result.value;
	let result_input_is_a_number = !isNaN(result_input);

	if (result_input_is_a_number) {
		result_input == "" ? result.value : (result.value += PRODUCT_SYMBOL);
	} else if (result_input == SYNTAX_ERROR) {
		result.value = "";
	} else {
		if (endWithOp(result_input) && result_input.length > 1) {
			clear();
			result.value += PRODUCT_SYMBOL;
		} else if (result_input.length == 1) {
			return;
		} else if (containsOp(result_input)) {
			double_op = true;
			equal_event(PRODUCT_SYMBOL, double_op);
		} else {
			double_op = false;
			equal_event(PRODUCT_SYMBOL, double_op);
		}
	}
}
function do_slash_event() {
	let double_op = false;
	let result_input = result.value;
	let result_input_is_a_number = !isNaN(result_input);

	if (result_input_is_a_number) {
		result_input == "" ? result.value : (result.value += SLASH_SYMBOL);
	} else if (result_input == SYNTAX_ERROR) {
		result.value = "";
	} else {
		if (endWithOp(result_input) && result_input.length > 1) {
			clear();
			result.value += SLASH_SYMBOL;
		} else if (result_input.length == 1) {
			return;
		} else if (containsOp(result_input)) {
			double_op = true;
			equal_event(SLASH_SYMBOL, double_op);
		} else {
			double_op = false;
			equal_event(SLASH_SYMBOL, double_op);
		}
	}
}

function equal_event(last_operator, double_op) {
	//LOGIC
	let operation = result.value;
	let result_number = -1;
	if (endWithOp(operation)) {
		clear();
		result_number = result.value;
	} else if (operation.startsWith(MINUS_SYMBOL) && !(isNaN(operation))) {
		result.value = operation;
		result_number = operation;
	} else if (operation == SYNTAX_ERROR) {
		return SYNTAX_ERROR;
	} else {
		switch (last_operator) {
			case PLUS_SYMBOL:
				if (getLastOp(operation) === PLUS_SYMBOL) {
					result_number = sum(operation);
				} else {
					result_number = equal_event(getLastOp(operation), false);
				}
				break;
			case MINUS_SYMBOL:
				if (getLastOp(operation) === MINUS_SYMBOL) {
					result_number = minus(operation);
				} else {
					result_number = equal_event(getLastOp(operation), false);
				}
				break;
			case SLASH_SYMBOL:
				if (getLastOp(operation) === SLASH_SYMBOL) {
					result_number = slash(operation);
				} else {
					result_number = equal_event(getLastOp(operation), false);
				}
				break;
			case PRODUCT_SYMBOL:
				if (getLastOp(operation) === PRODUCT_SYMBOL) {
					result_number = product(operation);
				} else {
					result_number = equal_event(getLastOp(operation), false);
				}
				break;
			default:
				return SYNTAX_ERROR;
				break;
		}
	}
	history_op.value = operation;
	double_op
		? (result.value = result_number + last_operator)
		: (result.value = result_number);
	return result_number;
}
/*###########################################################
							MAIN
###########################################################*/
/* 
1.- TODO RESTA
*/
function main() {
	//Go over the buttons class and add a eventlistener to write it in the result-input the value of that button
	Array.from(document.getElementsByClassName("number")).forEach(function (
		element
	) {
		element.addEventListener("click", function () {
			write(element);
		});
	});
	CLEAR_ALL_BUTTON.addEventListener("click", clear_all);
	CLEAR_BUTTON.addEventListener("click", clear);

	PLUS_BUTTON.addEventListener("click", do_plus_event);
	MINUS_BUTTON.addEventListener("click", do_minus_event);
	PRODUCT_BUTTON.addEventListener("click", do_product_event);
	SLASH_BUTTON.addEventListener("click", do_slash_event);

	EQUAL_BUTTON.addEventListener("click", function () {
		let operation = result.value;
		let last_op = getLastOp(operation);
		equal_event(last_op, false);
	});
}

document.addEventListener("DOMContentLoaded", main);
