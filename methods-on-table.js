let { Table } = require('./Table');
let { popDeck, restoreDeck, deckLength } = require('./methods-on-cards');
let { checkRanking } = require('./checkRanking');
let consts = require('./constants-in-check-ranking');

let drawToTable = () => {
	Table.communityCards.push(popDeck());
}

let getCommunityCards = () => {
	return Table.communityCards;
}

let clearCommunityCards = () => {
	Table.communityCards = [];
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

let doSomethingOnPlayers = (callback) => {
	for (let i = 0; i < Table.players.length; i++) {
		if (Table.players[i]) {
			callback(Table.players[i]);
		}
	}
}

let whoWinner = () => {
	let result;

	doSomethingOnPlayers(
		(player) => {
			result = checkRanking(player.get_handCards(),Table.communityCards);
			player.set_roundRank(result[0]);
			player.set_roundCard(result[1]);
		}
	);


}

let showTable = () => console.log(Table);

module.exports = {
	drawToTable,
	isReadyToPlay,
	fillTablePlayer,
	showTable,
	giveCardsToPlayers,
	getCommunityCards,
	clearCommunityCards,
	whoWinner
}
