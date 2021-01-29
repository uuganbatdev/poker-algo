let { restoreDeck, shuffleDeck, showDeck, clearDeck, popDeck, deckLength } = require('./methods-on-cards');
let { drawToTable, clearCommunityCards, getCommunityCards, isReadyToPlay, fillTablePlayer, giveCardsToPlayers, showTable } = require('./methods-on-table');
let { checkRanking } = require('./checkRanking');

let consts = require('./constants-in-check-ranking');

let { Player } = require('./Player');


let players = [new Player('uuganbat', 100000, 1000, 1), new Player('uuganabt1', 100000, 1000, 3)];


	//if(isReadyToPlay()) {
	//	giveCardsToPlayers();
	//} else {
	//	console.log('not able to play');
	//}

	for (let i = 0; i < players.length; i++) {
		fillTablePlayer(players[i], players[i].get_sitIndex());
	}

let fkind = 0;
let rflush = 0;
let fhouse = 0;

for (let j = 0; j< 100; j++) {


	restoreDeck();
	shuffleDeck();


	giveCardsToPlayers();

	drawToTable();
	drawToTable();
	drawToTable();
	drawToTable();
	drawToTable();

	let res1 = checkRanking(players[0].get_handCards(),getCommunityCards());
	let res2 = checkRanking(players[1].get_handCards(),getCommunityCards());
	if( res1[0] == consts.FOUR_OF_KIND ) {
		fkind++;
	}

	if( res1[0]  == consts.ROYAL_FLUSH ) {
		rflush++;
	}

	if( res2[0] == consts.FOUR_OF_KIND ) {
		fkind++;
	}

	if( res2[0]  == consts.ROYAL_FLUSH ) {
		rflush++;
	}

	if( res1[0]  == consts.FULL_HOUSE ) {
		fhouse++;
	}

	if( res2[0]  == consts.FULL_HOUSE ) {
		fhouse++;
	}

	players[0].clear_handCards();
	players[1].clear_handCards();

	clearCommunityCards();

	clearDeck();
}

console.log('ROYAL FLUSH: ' , rflush);
console.log('FOUR OF KIND: ' , fkind);
console.log('FULL HOUSE: ' , fhouse);
