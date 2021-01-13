let Card = class Card {
	constructor(name,suit) {
		this.name = name;
		this.suit = suit;
		switch(name) {
			case '2':
				this.rank = 2;
				break;
			case '3':
				this.rank = 3;
				break;
			case '4':
				this.rank = 4;
				break;
			case '5':
				this.rank = 5;
				break;
			case '6':
				this.rank = 6;
				break;
			case '7':
				this.rank = 7;
				break;
			case '8':
				this.rank = 8;
				break;
			case '9':
				this.rank = 9;
				break;
			case '10':
				this.rank = 10;
				break;
			case 'J':
				this.rank = 11;
				break;
			case 'Q':
				this.rank = 12;
				break;
			case 'K':
				this.rank = 13;
				break;
			case 'A':
				this.rank = 14;
				break;
		}
	}
	getName = () => this.name;
	getRank = () => this.rank;
	getSuit = () => this.suit;
}

module.exports.Card = Card;
