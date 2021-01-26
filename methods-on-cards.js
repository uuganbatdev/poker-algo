let { names, suits, deck} = require('./cards');
let { Card } = require('./Card');


let restoreDeck = () => {
	for (let i=0;i < names.length;i++) {
		for (let j=0;j < suits.length;j++) {
			deck.push(new Card(names[i],suits[j]))
		}
	}
}


let shuffleDeck = () => {
  let currentIndex = deck.length//, temporaryValue, randomIndex;
  let temporaryValue;
  let randomIndex;

  while (0 !== currentIndex) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = deck[currentIndex];
    deck[currentIndex] = deck[randomIndex];
    deck[randomIndex] = temporaryValue;
  }
}

let sortCards = (cards) => {
	return cards.sort((a,b) => b.get_rank() - a.get_rank());
}

let getHighRankCards = ( inputCards, removeCards, howManyCards ) => {
	let cards1 = [...inputCards];
	let cards2 = [...removeCards];

	for ( let i = 0; i < cards2.length; i++ ) {
		for( let j = 0; j < cards1.length; j++ ) {
			if ( cards2[i].get_name() == cards1[j].get_name() && 
				cards2[i].get_suit() == cards1[j].get_suit() 
			) {
				cards1.splice(j,1);
				j = 0;
			}
		}
	}

	return sortCards(cards1).splice(0,howManyCards);
}

let showDeck = () => {
	console.log(deck);
}

let popDeck = () => {
	return deck.pop();
}

let deckLength = () => {
	console.log(deck.length);
}

let clearDeck = () => {
	deck = [];
}

module.exports = { 
	restoreDeck,
	shuffleDeck,
	showDeck,
	clearDeck,
	popDeck,
	deckLength,
	sortCards,
	getHighRankCards
};
