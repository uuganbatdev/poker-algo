let { restoreDeck, shuffleDeck, showDeck, clearDeck, popDeck, deckLength } = require('./methods-on-cards');
let { drawToTable, isReadyToPlay, fillTablePlayer, giveCardsToPlayers, showTable } = require('./methods-on-table');

let { Player } = require('./Player');


let players = [new Player('uuganbat', 100000, 1000, 1), new Player('uuganabt1', 100000, 1000, 3)];

restoreDeck();
shuffleDeck();


for (let i = 0; i < players.length; i++) {
	fillTablePlayer(players[i], players[i].get_sitIndex());
}

if(isReadyToPlay()) {
	giveCardsToPlayers();
} else {
	console.log('not able to play');
}

drawToTable();
drawToTable();
drawToTable();
drawToTable();
drawToTable();

showTable();
