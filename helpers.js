exports.jsonifyMessage = function (msg) {
	return JSON.stringify({
		errorMessage: msg
	});
};