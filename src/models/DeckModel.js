import {
  CardValidationException,
  DeckConstraintException,
} from '../dal/exceptions/DataExceptions.js'
import { AddCardResult } from './dto/AddCardResult.js'
import { RemoveCardResult } from './dto/RemoveCardResult.js'
import { ClearDeckResult } from './dto/ClearDeckResult.js'
import { DeckStateDTO } from './dto/DeckStateDTO.js'

/**
 * Manages deck state and card operations
 */
export class DeckModel {
  #MAX_DECK_SIZE = 60
  #MIN_DECKSIZE = 0

  constructor(deckAdapter) {
    if (!deckAdapter) {
      throw new Error('DeckAdapter is required')
    }

    this.deckAdapter = deckAdapter
  }

  addCard(cardData, quantity = 1) {
    this.#validateQuantity(quantity)
    this.#validateDeckMaxSize(quantity)
    this.#addQuantityOfCards(cardData, quantity)

    return new AddCardResult(
      true,
      cardData.name,
      quantity,
      this.deckAdapter.getCardCount()
    )
  }

  removeCard(cardName, quantity = 1) {
    this.#validateCardName(cardName)
    this.#validateQuantity(quantity)
    this.#removeQuantityOfCards(cardName, quantity)

    return new RemoveCardResult(
      true,
      cardName,
      quantity,
      this.deckAdapter.getCardCount()
    )
  }

  clearDeck() {
    this.deckAdapter.clearDeck()

    return new ClearDeckResult(true, this.deckAdapter.getCardCount())
  }

  getCards() {
    return this.deckAdapter.getCards()
  }

  getCardCount() {
    return this.deckAdapter.getCardCount()
  }

  getDeckState() {
    const cardCount = this.deckAdapter.getCardCount()
    return new DeckStateDTO({
      totalCards: cardCount,
      isEmpty: this.isDeckEmpty(),
      isFull: this.isDeckFull(),
      remainingSlots: this.#MAX_DECK_SIZE - cardCount,
    })
  }

  isDeckFull() {
    return this.getCardCount() >= this.#MAX_DECK_SIZE
  }

  isDeckEmpty() {
    return this.getCardCount() === this.#MIN_DECKSIZE
  }

  #validateQuantity(quantity) {
    if (quantity < 1 || !Number.isInteger(quantity)) {
      throw new CardValidationException(
        'quantity',
        'Quantity must be a positive integer'
      )
    }
  }

  #validateDeckMaxSize(quantity) {
    const currentCount = this.getCardCount()
    const newCount = currentCount + quantity
    if (newCount > this.#MAX_DECK_SIZE) {
      throw new DeckConstraintException(
        `Cannot add ${quantity} card(s). Deck has ${currentCount} cards, maximum is ${
          this.#MAX_DECK_SIZE
        }`
      )
    }
  }

  #addQuantityOfCards(cardData, quantity) {
    for (let i = 0; i < quantity; i++) {
      this.deckAdapter.addCard(cardData)
    }
  }

  #validateCardName(cardName) {
    if (!cardName || cardName.trim() === '') {
      throw new CardValidationException('cardName', 'Card name cannot be empty')
    }
  }

  #removeQuantityOfCards(cardName, quantity) {
    for (let i = 0; i < quantity; i++) {
      this.deckAdapter.removeCard(cardName)
    }
  }
}
