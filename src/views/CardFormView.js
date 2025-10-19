import { CardFormDataDTO } from '../models/dto/CardFormDataDTO.js'
import { Div } from '../ui/index.js'
import { ColorSelectorComponent } from '../components/ColorSelectorComponent.js'

export class CardFormView {
  constructor() {
    this.cardForm = document.getElementById('add-card-form')
    this.cardNameInput = document.getElementById('card-name')
    this.manaCostInput = document.getElementById('card-mana')
    this.cardTypeSelect = document.getElementById('card-type')
    this.colorCheckboxes = document.querySelectorAll('input[name="color"]')
    this.powerToughnessInput = document.getElementById('card-power')
    this.quantityInput = document.getElementById('card-quantity')

    this.colorSelector = new ColorSelectorComponent(null, true)
    this.#addColorSelector()
  }

  getCardFormData() {
    const selectedColors = this.colorSelector.getSelectedColors()

    const cardData = {
      name: this.cardNameInput.value.trim(),
      manaCost: this.manaCostInput.value.trim(),
      type: this.cardTypeSelect.value,
      color: selectedColors.join(' '),
      powerToughness: this.powerToughnessInput.value.trim(),
    }

    const quantity = parseInt(this.quantityInput.value) || 1

    return new CardFormDataDTO(cardData, quantity)
  }

  clearCardForm() {
    this.cardForm.reset()
    this.quantityInput.value = '1'
  }

  showSuccess(message) {
    this.#showMessage(message, 'success', 3000)
  }

  showError(message) {
    this.#showMessage(message, 'error', 5000)
  }

  bindSubmit(handler) {
    this.cardForm.addEventListener('submit', (event) => {
      event.preventDefault()

      if (!this.colorSelector.validate()) {
        return
      }
      handler(this.getCardFormData())
    })
  }

  #addColorSelector() {
    const colorContainer = document.querySelector('.color-container')
    if (colorContainer) {
      const component = this.colorSelector.toDOMElement()
      colorContainer.appendChild(component)
    }
  }

  #showMessage(message, type, duration) {
  const messageDiv = new Div()
    .addClass(`${type}-message`)
    .appendChild(message)
  
    const container = this.cardForm.parentElement
    container.insertBefore(messageDiv.toDOMElement(), this.cardForm)

    setTimeout(() => messageDiv.remove(), duration)
  }
}
