import { CardFormDataDTO } from '../models/dto/CardFormDataDTO.js'
import { Div } from '../ui/index.js'
import { ColorSelectorComponent } from '../components/ColorSelectorComponent.js'

/**
 * Manages the card form display and input
 */
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

  /**
   * Collects and returns form data as DTO
   *
   * @returns {CardFormDataDTO} Form data with card details and quantity
   */
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

  /**
   * Resets all form fields to defaults
   */
  clearCardForm() {
    this.cardForm.reset()
    this.quantityInput.value = '1'
  }

  /**
   * Displays a success message
   *
   * @param {string} message - Success message
   */
  showSuccess(message) {
    this.#showMessage(message, 'success', 3000)
  }

  /**
   * Displays an error message
   *
   * @param {string} message - Error message
   */
  showError(message) {
    this.#showMessage(message, 'error', 5000)
  }

  /**
   * Binds form submit handler
   *
   * @param {Function} handler - Handler function (formData) => void
   */
  bindSubmit(handler) {
    this.cardForm.addEventListener('submit', (event) => {
      event.preventDefault()

      if (!this.colorSelector.validate()) {
        return
      }
      handler(this.getCardFormData())
    })
  }

  // Injects color selector component into DOM
  #addColorSelector() {
    const colorContainer = document.querySelector('.color-container')
    if (colorContainer) {
      const component = this.colorSelector.toDOMElement()
      colorContainer.appendChild(component)
    }
  }

  // Displays temporary message
  #showMessage(message, type, duration) {
    const messageDiv = new Div()
      .addClass(`${type}-message`)
      .appendChild(message)

    const container = this.cardForm.parentElement
    container.insertBefore(messageDiv.toDOMElement(), this.cardForm)

    setTimeout(() => messageDiv.remove(), duration)
  }
}
