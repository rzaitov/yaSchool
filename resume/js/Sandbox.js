var sandBox = new SandBox();
function SandBox()
{
	var handlersHash = {};
	// #ifdef DEBUG
	this.handlersHash = handlersHash;
	// #endif

	/**
	 * Добавляет обработчик события
	 * @param {String} eventName имя события
	 * @param {Function} callback обработчик события
	 */
	this.addEventListener = function(eventName, callback) {
		// TODO: проверять тип eventName, callback

		if(!(handlersHash[eventName] instanceof  Array))
		{
			handlersHash[eventName] = [];
		}

		handlersHash[eventName].push(callback);
	};

	this.removeEventListener = function(eventName, callback) {
		if(handlersHash[eventName] instanceof  Array)
		{
			var eventHandlers = handlersHash[eventName];
			for(var i = eventHandlers.length - 1; i >= 0; i -= 1)
			{
				if(eventHandlers[i] === callback)
				{
					eventHandlers.splice(i, 1);
				}
			}
		}
	};

	/**
	 * Инициирует событие
	 * @param {String} eventName имя события
	 * @param {Object} data параметры события
	 */
	this.notify = function(eventName, data) {
		var handlers = handlersHash[eventName];
		if(handlers instanceof Array)
		{
			for(var i = handlers.length - 1; i >= 0; i -=1)
			{
				handlers[i](data);
			}
		}
	};
}