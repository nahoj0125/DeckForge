# DeckForge

A web-based deck builder for Magic: The Gathering, built with JavaScript and MVC architecture.

**[Try DeckForge Live](https://deckforge.jpersson.dev)**

## Features

* **Add Cards to Your Deck**: Add MTG cards with essential details
  * Card name, mana cost, type, and colors
  * Power/Toughness for creatures
  * Support for multiple colors per card
* **Manage Your Deck**: View and remove cards from your deck
* **Deck Validation**: Automatic validation to follow standard 60-card deck rules
  * 60 card maximum enforced
  * Color and mana cost validation
  * Required field checking

## Getting Started

### Prerequisites

* A modern web browser

#### For Developers

* Node.js and npm

### Installation

1. Clone the repository
```bash
git clone https://github.com/nahoj0125/DeckForge.git
cd deckforge
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173` (or the port Vite displays)

## How to Use

### Adding Cards to Your Deck

1. Fill in the card details in the form:
   * **Card Name**: Enter the card's name (required)
   * **Mana Cost**: Use W, U, B, R, G for colors (e.g., "2RR" for two generic and two red)
   * **Type**: Select from creature, instant, sorcery, enchantment, artifact, planeswalker, or land
   * **Color**: Check at least one color box
   * **Power/Toughness**: For creatures only (e.g., "3/3" or "*/2")
   * **Quantity**: Number of copies to add (default: 1)

2. Click "Add Card" to add the card(s) to your deck

3. Your card will appear in the deck list on the right

### Managing Your Deck

* **View Cards**: All cards are displayed in the deck list with their details
* **Remove Cards**: Click the "Remove" button next to any card to remove one copy
* **Clear Deck**: Use the "Clear Deck" button to start fresh (confirmation required)
* **Track Card Count**: The card counter shows your current deck size (max 60 cards)

## Technical Details

Built with:
* Vanilla JavaScript (ES6+)
* MVC architecture
* [mtg-deck-toolkit](https://www.npmjs.com/package/mtg-deck-toolkit) for deck management
* Vite (build tool and dev server)

## Roadmap
### Deck Analytics
- **Mana Curve Chart**: Visual graph displaying card distribution across mana costs to optimize your curve
- **Color Distribution Pie Chart**: See the percentage breakdown of each color in your deck
- **Average Mana Cost Calculator**: Track the average converted mana cost (CMC) of your deck
- **Archetype Identifier**: Automatically detect if your deck is Aggro, Control, or Midrange based on card composition

Want to contribute? Check out the [issues](https://github.com/nahoj0125/DeckForge/issues)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[MIT License](./LICENSE)

## Support

If you encounter any issues or have questions, please [file an issue](https://github.com/nahoj0125/DeckForge/issues) on the GitHub repository.

## Author

  * Johan Persson
  * jp223yp@student.lnu.se

Created as a laboration for educational purposes at Linnaeus University for the course 1DV610

---

*DeckForge is not affiliated with or endorsed by Wizards of the Coast. Magic: The Gathering is a trademark of Wizards of the Coast LLC.*