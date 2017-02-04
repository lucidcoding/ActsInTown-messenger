interface Array<T> {
	where(expression: Function): T[];
	single(expression: Function): T;
	exists(expression: Function): boolean;
	last(): T;
	//move(oldIndex: number, newIndex: number);
	max(expression: Function): T;
}

Array.prototype.where = function (expression: Function) {
	var matchingElements = [];

	for (var index: number = 0; index < this.length; index++) {
		var element = this[index];

		if (expression(element)) {
			matchingElements.push(element);
		}
	}

	return matchingElements;
};

Array.prototype.single = function (expression: Function) {
	return this.where(expression)[0];
};

Array.prototype.exists = function (expression: Function) {
	return this.where(expression).length > 0;
};

Array.prototype.last = function () {
	return this[this.length - 1];
};

/* Array.prototype.move = function (oldIndex: number, newIndex: number) {
	if (newIndex >= this.length) {
		var k = newIndex - this.length;
		while ((k--) + 1) {
			this.push(undefined);
		}
	}
	this.splice(newIndex, 0, this.splice(oldIndex, 1)[0]);
	return this; // for testing purposes
};*/

Array.prototype.max = function (expression: Function) {
	if (this.length === 0) {
		return null;
	}

	var currentMaxElement = this[0];

	for (var index: number = 1; index < this.length; index++) {
		var element = this[index];
		var currentValue = expression(element);

		if (expression(element) > expression(currentMaxElement)) {
			currentMaxElement = element;
		}
	}

	return currentMaxElement;
};
