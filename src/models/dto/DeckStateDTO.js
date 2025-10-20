// Data transfer object for deck state information
export class DeckStateDTO {
  constructor({ totalCards, isEmpty, isFull, remainingSlots }) {
    this.totalCards = totalCards
    this.isEmpty = isEmpty
    this.isFull = isFull
    this.remainingSlots = remainingSlots
  }
}