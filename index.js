let { restoreDeck, shuffleDeck, showDeck, clearDeck, popDeck, deckLength } = require('./methods_on_cards');
let { Player } = require('./Player');

let uuganbat = new Player('uuganbat', 100000, 1000, 2);
let uuganbat1 = new Player('uuganabt1', 100000, 1000, 3);
restoreDeck();
shuffleDeck();
uuganbat.set_handCards();
uuganbat1.set_handCards();
console.log(uuganbat.get_handCards());
console.log(uuganbat1.get_handCards());
deckLength();
