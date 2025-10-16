import {
  CardValidationException,
  DeckConstraintException,
} from '../dal/exceptions/DataExceptions.js'
import { AddCardResult } from './dto/AddCardResult.js'
import { RemoveCardResult } from './dto/RemoveCardResult.js'

export class DeckModel {
  constructor(deckAdapter) {
    if (!deckAdapter) {
      throw new Error('DeckAdapter is required')
    }

    this.deckAdapter = deckAdapter
  }

  addCard(cardData, quantity = 1) {
    if (quantity < 1 || !Number.isInteger(quantity)) {
      throw new CardValidationException('quantity', 'Qauntity must be a positive integer')
    }

    for (let i = 0; i < quantity; i++) {
      this.deckAdapter.addCard(cardData)
    }

    return new AddCardResult(
      true,
      cardData.name,
      quantity,
      this.deckAdapter.getCardCount()
    )
  }

  getCards() {
    return this.deckAdapter.getCards()
  }

  getCardCount() {
    return this.deckAdapter.getCardCount()
  }

  removeCard(cardName, quantity = 1) {
    if (!cardName || cardName.trim() === '') {
      throw new CardValidationException('cardName', 'Card name cannot be empty')
    }

    if (quantity < 1 || !Number.isInteger(quantity)) {
      throw new CardValidationException('quantity', 'Quantity must be a positive integer')
    }

    for (let i = 0; i < quantity; i++) {
      this.deckAdapter.removeCard(cardName)
    }

    return new RemoveCardResult(
      true,
      cardData,
      quantity,
      this.deckAdapter.getCardCount()
    )
  }
}
