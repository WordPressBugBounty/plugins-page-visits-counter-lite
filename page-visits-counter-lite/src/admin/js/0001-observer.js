/**
 * PUB-SUB observer pattern
 *
 * DESC: This is required for communication with AJAX.
 * INFO: AJAX should be concatenated into separate file from js file.
 *       That way we can exempt ajax file from cashing as ajax communication is protected with NONCE.
 *
 * @since 1.0.0
 */
const StrCPVevents = {

	events: {},

	// Subscribe or ON.
	subscribe: function (eventName, fn) {
		this.events[eventName] = this.events[eventName] || [];
		this.events[eventName].push(fn);
	},


	// Unsubscribe or OFF.
	unsubscribe: function(eventName, fn) {
		if (this.events[eventName]) {
			for (let i = 0; i < this.events[eventName].length; i++) {
				if (this.events[eventName][i] === fn) {
					this.events[eventName].splice(i, 1);
					break;
				}
			}
		}
	},

	// Publish or emit.
	publish: function (eventName, data) {
		if (this.events[eventName]) {
			this.events[eventName].forEach(function(fn) {
				fn(data);
			});
		}
	}

};
