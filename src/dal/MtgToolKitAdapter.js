import { Deck } from 'mtg-deck-toolkit'
import { 
  CardValidationException, 
  DeckConstraintException,
  ExternalModuleException 
} from './exceptions/DataExceptions.js'

/**
 * Adapter for Deck operations
 * 
 *  Wraps deck management operations
 *  Translates errors to our custom exceptions
 * 
 * 
 */
export class MtgToolKitAdapter {
  #deck
  
  constructor(deckName = 'Untitled Deck') {
    try {
      this.#deck = new Deck(deckName)
    } catch (error) {
      throw new ExternalModuleException('create deck', error)
    }
  }
  
  /**
   * Adds a card to the deck
   * 
   * @param {Object} cardData - Card data
   * @param {string} cardData.name - Card name
   * @param {string} cardData.manaCost - Mana cost (e.g., "2R")
   * @param {string} cardData.type - Card type
   * @param {string} cardData.color - Color
   * @param {string} cardData.powerToughness - Power/Toughness for creatures
   * 
   * @throws {CardValidationException} If card data invalid (includes fieldName)
   * @throws {DeckConstraintException} If deck full (60 cards)
   * 
   * @example
   * adapter.addCard({
   *   name: 'Lightning Bolt',
   *   manaCost: 'R',
   *   type: 'instant',
   *   color: 'red',
   *   powerToughness: ''
   * })
   */
  addCard(cardData) {
    try {
      this.#deck.addCard(cardData)
    } catch (error) {
      throw this.#translateAddCardError(error)
    }
  }
  
  /**
   * Removes a card by name
   * 
   * @param {string} cardName - Name of card to remove
   * @throws {ExternalModuleException} If removal fails
   */
  removeCard(cardName) {
    try {
      this.#deck.removeCardByName(cardName)
    } catch (error) {
      throw new ExternalModuleException('remove card', error)
    }
  }
  
  /**
   * Clears all cards from deck
   * 
   * @throws {ExternalModuleException} If clear fails
   */
  clearDeck() {
    try {
      this.#deck.clearDeck()
    } catch (error) {
      throw new ExternalModuleException('clear deck', error)
    }
  }
  
  /**
   * Gets all cards in the deck
   * 
   * @returns {Array<Object>} Array of card objects
   * @throws {ExternalModuleException} If retrieval fails
   */
  getCards() {
    try {
      return this.#deck.getCards()
    } catch (error) {
      throw new ExternalModuleException('get cards', error)
    }
  }
  
  /**
   * Gets total card count
   * 
   * @returns {number} Number of cards in deck
   * @throws {ExternalModuleException} If retrieval fails
   */
  getCardCount() {
    try {
      return this.#deck.getTotalCards()
    } catch (error) {
      throw new ExternalModuleException('get card count', error)
    }
  }

  
  /**
   * Translates external module errors
   * 
   * @private
   * @param {Error} error - Error from external module
   * @returns {DataAccessException} Translated error
   */
  #translateAddCardError(error) {
    const message = error.message.toLowerCase()
    
    // Card name errors
    if (message.includes('card name')) {
      return new CardValidationException(
        'Card name is required and must contain only letters, numbers, spaces, commas, apostrophes, and hyphens',
        'name',
        error
      )
    }
    
    // Mana cost errors
    if (message.includes('mana cost') || message.includes('mana')) {
      return new CardValidationException(
        'Mana cost must contain only X, W, U, B, R, G, and numbers 0-9',
        'manaCost',
        error
      )
    }
    
    // Type errors
    if (message.includes('type') && message.includes('invalid')) {
      return new CardValidationException(
        'Type must be one of: instant, sorcery, creature, enchantment, land, artifact, planeswalker',
        'type',
        error
      )
    }
    
    // Color errors
    if (message.includes('color') && message.includes('invalid')) {
      return new CardValidationException(
        'Color must be one or more of: white, blue, black, red, green, colorless',
        'color',
        error
      )
    }
    
    // Power/Toughness errors
    if (message.includes('power') || message.includes('toughness')) {
      return new CardValidationException(
        'Creatures must have power/toughness in format "power/toughness" (e.g., "2/2")',
        'powerToughness',
        error
      )
    }
    
    // Deck size constraint
    if (message.includes('max size') || message.includes('60')) {
      return new DeckConstraintException(
        'Deck is full (maximum 60 cards)',
        error
      )
    }
    
    // Unknown error
    return new ExternalModuleException('add card', error)
  }
}