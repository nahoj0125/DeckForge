import { DeckModel } from '../models/DeckModel.js'
import { MtgToolKitAdapter } from '../dal/MtgToolKitAdapter.js'
import { DeckView } from '../views/DeckView.js'

export class DeckController {
  constructor() {
    const adapter = new MtgToolKitAdapter('Untitled Deck')
    this.model = new DeckModel(adapter)
    this.view = new DeckView()
  }
}