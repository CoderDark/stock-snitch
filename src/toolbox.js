class Control {
  constructor(controlId, checkable) {
    if (checkable) {
      this.control = document.getElementsByName(controlId);
    } else {
      this.control = document.getElementById(controlId);
    }
  }

  onEvent(eventId, onEventTrigger) {
    if (this.control)
      this.control.addEventListener(eventId, (event) => {
        onEventTrigger(event);
      });
  }

  onFocus(onClickEvent) {
    this.onEvent('focus', (event) => {
      onClickEvent(event);
    });
  }

  onContextMenu(onClickEvent) {
    this.onEvent('contextmenu', (event) => {
      onClickEvent(event);
    });
  }

  onClick(onClickEvent) {
    this.onEvent('click', (event) => {
      onClickEvent(event);
    });
  }

  onDoubleClick(onClickEvent) {
    this.onEvent('dblclick', (event) => {
      onClickEvent(event);
    });
  }

  onChange(onClickEvent) {
    this.onEvent('change', (event) => {
      onClickEvent(event);
    });
  }

  onKeyPress(onClickEvent) {
    this.onEvent('keypress', (event) => {
      onClickEvent(event);
    });
  }

  onKeyUp(onClickEvent) {
    this.onEvent('keyup', (event) => {
      onClickEvent(event);
    });
  }

  onKeyDown(onClickEvent) {
    this.onEvent('keydown', (event) => {
      onClickEvent(event);
    });
  }
}

class Button extends Control {
  constructor(controlId) {
    super(controlId);
  }

  set title(string) {
    if (this.control)
      this.control.innerText = string;
  }
}

class Label extends Control {
  constructor(controlId) {
    super(controlId);
  }

  get text() {
    if (this.control)
      return this.control.innerText;
  }

  set text(string) {
    if (this.control && string)
      this.control.innerText = string;
  }
}

class TextBox extends Control {
  constructor(controlId) {
    super(controlId);
  }

  get text() {
    if (this.control)
      return this.control.value;
  }

  set text(string) {
    if (this.control && string)
      this.control.value = string;
  }

  set numbers(only) {
    if (this.control.options)
      if (only) {
        this.control.setAttribute('type', 'number');
      } else {
        this.control.setAttribute('type', 'text');
      }
  }
}

class ListBox extends Control {
  constructor(controlId) {
    super(controlId);
  }

  get selectedIndex() {
    if (this.control)
      return this.control.selectedIndex;
  }

  value(index) {
    if (this.control.options && index)
      return this.control.options[index].value;
  }

  text(index) {
    if (this.control.options && index)
      return this.control.options[index].text;
  }

  items() {
    if (this.control.options)
      return this.control.options;
  }

  item(index) {
    if (this.control.options && index)
      return this.control.options[index];
  }

  addItem(text, value) {
    if (this.control) {
      let option = document.createElement('option');

      option.innerText = text;
      option.value = value;

      this.control.appendChild(option);
    }
  }

  removeItems() {
    if (this.control)
      this.control.options.length = 0;
  }

  onClick(onClickEvent) {
    this.onEvent('click', (event) => {
      onClickEvent(event, this.control.selectedIndex, this.control.options[this.control.selectedIndex].value);
    });
  }

  onDoubleClick(onClickEvent) {
    this.onEvent('dblclick', (event) => {
      onClickEvent(event, this.control.selectedIndex, this.control.options[this.control.selectedIndex].value);
    });
  }
}

class Checkable extends Control {
  constructor(controlId) {
    super(controlId, true);
  }

  get values() {
    let checkboxValues = [];

    if (this.control) {
      this.control.forEach((checkbox, index) => {
        if (checkbox.checked) {
          checkboxValues.push(checkbox.value);
        }
      });
    }

    return checkboxValues;
  }
}

class Checkbox extends Checkable {
  constructor(controlId) {
    super(controlId);
  }
}

class Radio extends Checkable {
  constructor(controlId) {
    super(controlId);
  }

  get value() {
    return this.values.length > 1 ? this.values : this.values[0];
  }
}

module.exports = {
  Label,
  Button,
  TextBox,
  ListBox,
  Checkbox,
  Radio
};
