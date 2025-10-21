import { Component, Div, Span, Element } from '../ui/index.js'

export class ColorSelectorComponent extends Component {
  constructor(colors, required = true) {
    super()
    this.colors = colors || [
      { value: 'white', label: 'White' },
      { value: 'blue', label: 'Blue' },
      { value: 'black', label: 'Black' },
      { value: 'red', label: 'Red' },
      { value: 'green', label: 'Green' },
      { value: 'colorless', label: 'Colorless' },
    ]
    this.required = required
    this.checkboxes = []
    this.errorElement = null
    this.groupElement = null
  }

  build() {
    const container = new Div()
    container.appendChild(this.#buildColorCheckboxGroup())

    const error = new Span().addClass('error').setAttribute('id', 'error-color')
    this.errorElement = error
    container.appendChild(error)

    return container
  }

  #buildColorCheckboxGroup(){
    const group = new Div().addClass('checkbox-group')
    this.groupElement = group
    this.colors.forEach((color) => {
      const checkbox = this.#createCheckboxWithLabel(color)
      group.appendChild(checkbox)
    })
    return group
  }

  #createCheckboxWithLabel(color) {
    const label = new Element('label').addClass('checkbox-label')
    const checkbox = this.#createCheckbox(color)
    const span = new Span().appendChild(color.label)
    label.appendChild(checkbox).appendChild(span)

    return label
  }

  #createCheckbox(color) {
    const checkbox = new Element('input')
      .setAttribute('type', 'checkbox')
      .setAttribute('name', 'color')
      .setAttribute('value', color.value)
      .on('change', () => this.#handleChange())

    this.checkboxes.push(checkbox)
    return checkbox
  }

  #handleChange() {
    if (this.required) {
      this.validate()
    }
  }

  validate() {
    const isValid = this.getSelectedColors().length > 0

    if (!isValid) {
      this.#showError('Select at least one color')
    } else {
      this.#clearError()
    }

    return isValid
  }

  #showError(message) {
    if (this.errorElement) {
      const errorDom = this.errorElement.toDOMElement()
      errorDom.textContent = message
    }
    if (this.groupElement) {
      const groupDom = this.groupElement.toDOMElement()
      groupDom.classList.add('error')
    }
  }

  #clearError() {
    if (this.errorElement) {
      const errorDom = this.errorElement.toDOMElement()
      errorDom.textContent = ''
    }
    if (this.groupElement) {
      const groupDom = this.groupElement.toDOMElement()
      groupDom.classList.remove('error')
    }
  }

  getSelectedColors() {
    return this.checkboxes
      .map((cb) => cb.toDOMElement())
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.value)
  }

  setSelectedColors(colors) {
    this.checkboxes.forEach((cb) => {
      const dom = cb.toDOMElement()
      dom.checked = colors.includes(dom.value)
    })
  }
}
