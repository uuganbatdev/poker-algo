let { names, suits, deck} = require('./cards');
let { Card } = require('./Card');


let restoreDeck = (passedDeck) => {
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
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = deck[currentIndex];
    deck[currentIndex] = deck[randomIndex];
    deck[randomIndex] = temporaryValue;
  }
}

let showDeck = () => {
	console.log(deck);
}

let clearDeck = () => {
	deck = [];
}

module.exports = { 
	restoreDeck,
	shuffleDeck,
	showDeck,
	clearDeck
};
