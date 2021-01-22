let { restoreDeck, shuffleDeck, showDeck, clearDeck, popDeck, deckLength } = require('./methods-on-cards');
let { drawToTable, getCommunityCards, isReadyToPlay, fillTablePlayer, giveCardsToPlayers, showTable } = require('./methods-on-table');
let { checkRanking } = require('./checkRanking');

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

checkRanking(players[0].get_handCards(),getCommunityCards());
console.log(players[0]);

showTable();

