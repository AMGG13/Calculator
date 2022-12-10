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
const ON_BUTTON = document.getElementById("on-button");
const OFF_BUTTON = document.getElementById("off-button");
//Inputs
const history_op = document.getElementById("last-op");
const result = document.getElementById("result");
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

/**
 * @param {string} result_input
 * @returns  true if the result input contains any of the symbols or false if not.
 */
function contains_op(result_input) {
	let isOp;
	isOp =
		result_input.includes(PLUS_SYMBOL) ||
		result_input.includes(MINUS_SYMBOL) ||
		result_input.includes(PRODUCT_SYMBOL) ||
		result_input.includes(SLASH_SYMBOL);
	return isOp;
}
/**
 * @param {string} result_input 
 * @returns true if the result input ends with any of the symbols or false if not.
 */
function end_with_op(result_input) {
	let isOp;
	isOp =
		result_input.endsWith(PLUS_SYMBOL) ||
		result_input.endsWith(MINUS_SYMBOL) ||
		result_input.endsWith(PRODUCT_SYMBOL) ||
		result_input.endsWith(SLASH_SYMBOL);
	return isOp;
}

/** 
 * @param {string} result_input 
 * @returns true if result input contains a "."
 */
function contains_point(result_input) {
	let havePoint = false;
	havePoint = result_input.endsWith(".");
	return havePoint;
}

/**
 * @param {string} result_input 
 * @returns a Number of "." that contains result input.
 */
function count_points(result_input) {
	let points = [];
	let splitted_input = result_input.split("");
	points = splitted_input.filter((c) => contains_point(c));

	return points.length;
}

/**
 * @param {string} result_input 
 * @param {string} button_value 
 * @returns true if there are 1 "." already in a number of the operation, false if not.
 */
function point_between(result_input, button_value) {
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

/**
 * @param {string} button_value 
 * @param {string} result_input 
 * @returns true if any of the functions of points are true and false if all of this functions are false
 */
function cannot_write_a_point(button_value, result_input) {
	let not_able = false;
	let result_input_is_empty = result_input == "" && button_value == ".";
	let ends_with_point = result_input.endsWith(".") && button_value == ".";
	let contans_two_points =
		count_points(result_input) == 2 && button_value == ".";
	let is_between = point_between(result_input, button_value);
	not_able =
		result_input_is_empty ||
		ends_with_point ||
		contans_two_points ||
		is_between;
	return not_able;
}

/**
 * @param {string} result_input 
 * @returns the lastest symbol that has been used
 */
function get_last_op(result_input) {
	let last_op = [];
	let splitted_op = result_input.split("");
	last_op = splitted_op.filter((c) => contains_op(c));

	return last_op.pop();
}


/*#####################__CALCULATOR_FUNCTIONS__##################### */

/**
 * @param {string} operation 
 * @returns the result of the division (NUMBER) or a Syntax error if divide by zero (STRING)
 */
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

/**
 * @param {string} operation 
 * @returns  the result product of the operation
 */
function product(operation) {
	let written_numbers_string = operation.split(PRODUCT_SYMBOL);
	let written_numbers_parsed_to_number = written_numbers_string.map(
		(string_number) => parseFloat(string_number)
	);
	let product_result = written_numbers_parsed_to_number.reduce((a, b) => a * b);
	return product_result;
}

/**
 * @param {string} operation 
 * @returns the result sum of the operation
 */
function sum(operation) {
	let written_numbers_string = operation.split(PLUS_SYMBOL);
	let written_numbers_parsed_to_number = written_numbers_string.map(
		(string_number) => parseFloat(string_number)
	);
	let sum_result = written_numbers_parsed_to_number.reduce((a, b) => a + b);
	return sum_result;
}

/**
 * @param {string} operation 
 * @returns the result minus of the operation
 */
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
		if (end_with_op(result_input) && result_input.length > 1) {
			clear();
			result.value += PLUS_SYMBOL;
		} else if (result_input.length == 1) {
			return;
		} else if (contains_op(result_input)) {
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
		if (end_with_op(result_input)) {
			clear();
			result.value += MINUS_SYMBOL;
		} else if (contains_op(result_input)) {
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
		if (end_with_op(result_input) && result_input.length > 1) {
			clear();
			result.value += PRODUCT_SYMBOL;
		} else if (result_input.length == 1) {
			return;
		} else if (contains_op(result_input)) {
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
		if (end_with_op(result_input) && result_input.length > 1) {
			clear();
			result.value += SLASH_SYMBOL;
		} else if (result_input.length == 1) {
			return;
		} else if (contains_op(result_input)) {
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
	if (end_with_op(operation)) {
		clear();
		result_number = result.value;
	} else if (operation.startsWith(MINUS_SYMBOL) && !isNaN(operation)) {
		result.value = operation;
		result_number = operation;
	} else if (operation == SYNTAX_ERROR) {
		return SYNTAX_ERROR;
	} else {
		switch (last_operator) {
			case PLUS_SYMBOL:
				if (get_last_op(operation) === PLUS_SYMBOL) {
					result_number = sum(operation);
				} else {
					result_number = equal_event(get_last_op(operation), false);
				}
				break;
			case MINUS_SYMBOL:
				if (get_last_op(operation) === MINUS_SYMBOL) {
					result_number = minus(operation);
				} else {
					result_number = equal_event(get_last_op(operation), false);
				}
				break;
			case SLASH_SYMBOL:
				if (get_last_op(operation) === SLASH_SYMBOL) {
					result_number = slash(operation);
				} else {
					result_number = equal_event(get_last_op(operation), false);
				}
				break;
			case PRODUCT_SYMBOL:
				if (get_last_op(operation) === PRODUCT_SYMBOL) {
					result_number = product(operation);
				} else {
					result_number = equal_event(get_last_op(operation), false);
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
		let last_op = get_last_op(operation);
		equal_event(last_op, false);
	});
}

document.addEventListener("DOMContentLoaded", main);
