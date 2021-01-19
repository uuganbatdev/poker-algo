let { Table } = require('./Table');
let { popDeck, restoreDeck, deckLength } = require('./methods-on-cards');

let drawToTable = () => {
	Table.communityCards.push(popDeck());
}

let isReadyToPlay = () => {
	if(Table.players.length < 2){
		return false;
	} else {
		Table.isAbleToPlay = true;
		return true;
	}
}

let fillTablePlayer = (player, playerIndex) => {
	Table.players[playerIndex] = player;
}

let giveCardsToPlayers = () => {
	for(let i = 0; i < Table.players.length; i++) {
		if(Table.players[i]){
			Table.players[i].set_handCards();
		}
	}
}

let showTable = () => console.log(Table);

module.exports = {
	drawToTable,
	isReadyToPlay,
	fillTablePlayer,
	showTable,
	giveCardsToPlayers 
}
