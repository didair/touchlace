function debounce(func, wait, immediate) {
	var timeout;

	return function executedFunction() {
		let context = this;
		let args = arguments;

		let later = function () {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};

		let callNow = immediate && !timeout;

		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

export default debounce;