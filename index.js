let { restoreDeck, shuffleDeck, showDeck, clearDeck, popDeck, deckLength } = require('./methods-on-cards');
let { drawToTable, doSomethingOnPlayers, clearPayersRoundRankCards, whoWinner, clearCommunityCards, getCommunityCards, isReadyToPlay, fillTablePlayer, giveCardsToPlayers, showTable } = require('./methods-on-table');
let { checkRanking } = require('./checkRanking');

let consts = require('./constants-in-check-ranking');

let { Player } = require('./Player');


let players = [new Player('uuganbat', 100000, 1000, 0), new Player('uuganbat1', 100000, 1000, 1), new Player('uuganabt2', 100000, 1000, 3)];



for (let i = 0; i < players.length; i++) {
	fillTablePlayer(players[i], players[i].get_sitIndex());
}

if(isReadyToPlay()) {
	giveCardsToPlayers();
} else {
	console.log('not able to play');
}

restoreDeck();
shuffleDeck();


giveCardsToPlayers();

drawToTable();
drawToTable();
drawToTable();
drawToTable();
drawToTable();

console.log(whoWinner());

console.log('player1 :',players[0].get_roundRank());
console.log('player2 :',players[1].get_roundRank());
console.log('player3 :',players[2].get_roundRank());

