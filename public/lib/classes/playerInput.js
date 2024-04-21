import { EventSUB, EventTargetSUB } from './eventsSUB.js';

let keyboardLayoutMap = {};
navigator.keyboard.getLayoutMap().then(layout => keyboardLayoutMap = Object.fromEntries(layout.entries()));

class Input {
	class ({ key, alt = false, ctrl = false, meta = false, shift = false }) {
		if ('string' !== typeof key) {
			throw new Error('the first argument (the key) must be a string!');
		}
		this.key = key;
		this.alt = alt;
		this.ctrl = ctrl;
		this.meta = meta;
		this.shift = shift;
	}
}

class InputBind {
	constructor ({ eventName, description = '', inputs = [], down = true, up = true }) {
		if ('string' !== typeof eventName) {
			throw new Error('the first argument (the event name) must be a string!');
		}

		if (!Array.isArray(keys)) {
			throw new Error("'inputs' must be an array of Input instances!");
		}

		for (let i in keys) {
			if (!(keys[i] instanceof Input)) {
				throw new Error('item number ' + i + " of 'inputs' must be an instance of Input!");
			}
		}

		this.eventName = eventName;
		this.description = description;
		this.keys = keys;
		this.down = down;
		this.up = up;
	}
}

class PlayerInput extends EventTargetSUB {
	constructor (element, inputbinds, activated = true) {
		super();
		this.activated = activated;
		this.initElement(element);
		this.initInputBinds(inputbinds);
	}

	initInputBinds (inputbinds) {
		if (!Array.isArray(inputbinds)) {
			throw new Error("the argument must be an array of Input instances!");
		}

		for (let i in inputbinds) {
			if (!(inputbinds[i] instanceof InputBind)) {
				throw new Error('item number ' + i + " of the argument must be an instance of Input!");
			}
		}

		this.inputbinds = inputbinds;
	}

	initElement (element) {
		element.tabIndex = 0; // RIP people who use Tab to navigate

		element.addEventListener('wheel', event => {
			if (!this.activated || !event.isTrusted) return;
			this.handleMouseEvent({
				isTrusted: true,
				button: event.deltaY > 0 ? 'WheelDown' : 'WheelUp',
				preventDefault: () => event.preventDefault()
			}, Math.abs(event.deltaY));
		});

		element.addEventListener('mousemove', event => this.handleMouseMoveEvent(event));
		element.addEventListener('mouseup', event => this.handleMouseEvent(event, false));
		element.addEventListener('mousedown', event => this.handleMouseEvent(event, true));
		element.addEventListener('keyup', event => this.handleKeyboardEvent(event, false));
		element.addEventListener('keydown', event => this.handleKeyboardEvent(event, true));
		this.element = element;
	}

	handleMouseEvent (mouseEvent, extra) {
		if (!this.activated || !mouseEvent.isTrusted) return;

		let event = this.inputbinds['Mouse' + mouseEvent.button];
		if (event) {
			mouseEvent.preventDefault();

			if ('boolean' === typeof extra) {
				if (extra && !event.down) return;
				if (!extra && !event.up) return;
			}

			// i know that this ternary is a bad idea but its 5:43:55 rn and i dont care
			this.dispatchEvent(new EventSUB(event.eventName, Object.assign({ x: mouseEvent.x, y: mouseEvent.y }, 'boolean' === typeof extra ? { isPressed: extra } : { yDelta: extra }) ));
		}
	}

	handleMouseMoveEvent (mouseMoveEvent) {
		if (!this.activated || !mouseMoveEvent.isTrusted) return;

		let event = this.inputbinds['MouseMove'];
		if (event) {
			mouseMoveEvent.preventDefault();
			this.dispatchEvent(new EventSUB(event.eventName, {
				x: mouseMoveEvent.x,
				y: mouseMoveEvent.y,
				xDelta: mouseMoveEvent.movementX,
				yDelta: mouseMoveEvent.movementY
			} ));
		}
	}

	handleKeyboardEvent (keyboardEvent, isPressed) {
		if (!this.activated || !keyboardEvent.isTrusted) return;

		let keyboardInput = keyboardEvent.key in keyboardLayoutMap ? keyboardLayoutMap[keyboardEvent.key] : keyboardEvent.key,

			event = this.inputbinds[keyboardInput];
		if (event) {
			keyboardEvent.preventDefault();

			if ('boolean' === typeof extra) {
				if (isPressed && !event.down) return;
				if (!isPressed && !event.up) return;
			}

			this.dispatchEvent(new EventSUB(event.eventName, { isPressed } ));
		}
	}
}

export { PlayerInput, InputBind, Input };