import { CardFormDataDTO } from '../models/dto/CardFormDataDTO.js'
import { Div } from '../ui/index.js'

export class CardFormView {
  constructor() {
    this.cardForm = document.getElementById('add-card-form')
    this.cardNameInput = document.getElementById('card-name')
    this.manaCostInput = document.getElementById('card-mana')
    this.cardTypeSelect = document.getElementById('card-type')
    this.colorCheckboxes = document.querySelectorAll('input[name="color"]')
    this.powerToughnessInput = document.getElementById('card-power')
    this.quantityInput = document.getElementById('card-quantity')
  }

  getCardFormData() {
    const selectedColors = Array.from(this.colorCheckboxes)
      .filter((checkbox) => checkbox.checked)
      .map((colorCheckbox) => colorCheckbox.value)

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

    this.colorCheckboxes.forEach((checkbox) => {
      checkbox.checked = false
    })

    this.quantityInput.value = '1'
  }

  showSuccess(message) {
    const successDiv = new Div()
      .addClass('success-message')
      .appendChild(message)

    const container = this.cardForm.parentElement
    container.insertBefore(successDiv.toDOMElement(), this.cardForm)

    setTimeout(() => successDiv.remove(), 3000)
  }

  showError(message) {
    const errorDiv = new Div().addClass('error-message').appendChild(message)

    const container = this.cardForm.parentElement
    container.insertBefore(errorDiv.toDOMElement(), this.cardForm)

    setTimeout(() => errorDiv.remove(), 5000)
  }

  bindSubmit(handler) {
    this.cardForm.addEventListener('submit', (event) => {
      event.preventDefault()
      handler(this.getCardFormData())
    })
  }
}
